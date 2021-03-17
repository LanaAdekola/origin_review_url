from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User
import datetime
from ClientAdmin.models import PotentialProject, Project, Payment, LongTermClient
import random
from ClientAdmin.views import monthly_revenue_calculator


class UserLoginTest(TestCase):
    '''
    Tests the user login functionality for the Client Admin page. This is required because only
    super users are allowed to pass in
    '''

    def setUp(self):
        '''
        Set up
        '''
        test_normal_user = User.objects.create(
            username='test_normaluser',
            password='1843_test_normaluser'
        )

    def test_login_landing_page(self):
        '''
        Tests that the response is a success and the template used is what we intend to use
        '''
        response = self.client.get(reverse('ClientAdmin:client-admin-login'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'ClientAdmin/user_login.html')

    def test_client_admin_page_landing_redirects_login(self):
        '''
        Tests that the page is redirected to the login page when the client-admin page is accessed
        without login
        '''
        response = self.client.get(reverse('ClientAdmin:client-admin-view'))
        self.assertRedirects(
            response, '/login/?next=/client-admin/client-admin/')

    def test_normal_users_cannot_login(self):
        '''
        Tests that only the normal user is not allowed to login
        '''
        # Login the normal user
        login_normaluser = self.client.login(username='test_normaluser',
                                             password='1843_test_normaluser')

        response = self.client.get(reverse('ClientAdmin:client-admin-view'))
        self.assertEqual(response.status_code, 302)

        # This should not login
        response = self.client.get(
            reverse('ClientAdmin:client-admin-login'), follow=True)
        self.assertEqual(response.status_code, 200)

    def test_only_superusers_can_login(self):
        '''
        Tests that only the super user is allowed in the client admin portal
        '''
        test_super_user = User.objects.create_superuser(
            'test_superuser',
            'test@superuser.com',
            '1843_test_superuser'
        )
        # Login the super user
        login_superuser = self.client.login(username=test_super_user.username,
                                            password='1843_test_superuser')
        response = self.client.get(reverse('ClientAdmin:client-admin-view'))

        self.assertTrue(response.status_code, 200)
        self.assertTemplateUsed(response, 'ClientAdmin/client_admin_page.html')


class SavePotentialProjectTest(TestCase):
    '''
    Tests saving potential projects through the AJAX responses
    '''

    def test_save_potential_project(self):
        datetime_today_timestamp = int(
            round(
                datetime.datetime.today().timestamp() * 1000.0,
                0
            )
        )
        response = self.client.post(
            reverse('ClientAdmin:save-potential-project-ajax'),
            {
                'client_name': 'Test Name',
                'client_company': 'Test Company',
                'client_email': 'test@test.com',
                'project_name': 'Test Project',
                'project_type': 'PRR',
                'initial_contact_date_timestamp': str(datetime_today_timestamp)
            }
        )
        self.assertEqual(response.status_code, 200)

        potential_project_qs = PotentialProject.objects.all()
        self.assertEqual(len(potential_project_qs), 1)

        self.assertEqual(
            potential_project_qs[0].slug,
            'TestName-TestProject-PRR-' + datetime.datetime.today().strftime('%Y%m%d')
        )

        # Send the exact same data again and verify that the qs is still one
        response_same = self.client.post(
            reverse('ClientAdmin:save-potential-project-ajax'),
            {
                'client_name': 'Test Name',
                'client_company': 'Test Company',
                'client_email': 'test@test.com',
                'project_name': 'Test Project',
                'project_type': 'PRR',
                'initial_contact_date_timestamp': str(datetime_today_timestamp)
            }
        )
        self.assertEqual(response_same.status_code, 200)
        potential_project_qs = PotentialProject.objects.all()
        self.assertEqual(len(potential_project_qs), 1)
        self.assertNotEqual(len(potential_project_qs), 2)


class SaveProjectAndPaymentsAndCompletionTest(TestCase):
    '''
    Tests saving Projects through AJAX responses
    '''
    @classmethod
    def setUpTestData(cls):

        cls.project_deadline_timestamp = int(
            round(
                datetime.datetime(2021, 3, 20).timestamp() * 1000.0,
                0
            )
        )
        cls.start_date_timestamp = int(
            round(
                datetime.datetime(2021, 3, 15).timestamp() * 1000.0,
                0
            )
        )
        cls.end_date_timestamp = int(
            round(
                datetime.datetime(2021, 3, 19).timestamp() * 1000.0,
                0
            )
        )

        cls.main_project_data = {
            'client_name': 'Test Potential Client',
            'client_company': 'Testing Company',
            'client_email': 'test@test.com',
            'project_name': 'Test Patent Search',
            'project_type': 'PRR',
            'project_deadline_timestamp': str(cls.project_deadline_timestamp),
            'project_estimated_days': 40,
            'start_date_timestamp': str(cls.start_date_timestamp),
            'end_date_timestamp': str(cls.end_date_timestamp),
            'expected_revenue': 1000
        }

        cls.main_project_data_payment = {
            'client_name': 'Test Potential Client',
            'client_company': 'Testing Company',
            'client_email': 'test@test.com',
            'project_name': 'Test Patent Search',
            'project_type': 'PRR',
            'project_deadline_timestamp': str(cls.project_deadline_timestamp),
            'project_estimated_days': 40,
            'start_date_timestamp': str(cls.start_date_timestamp),
            'end_date_timestamp': str(cls.end_date_timestamp),
            'expected_revenue': 1000,
            'payment': 400
        }

    def test_save_project_without_payment(self):
        '''
        Test project save without payment included
        '''

        response = self.client.post(
            reverse('ClientAdmin:save-project-ajax'),
            self.main_project_data
        )

        self.assertEqual(response.status_code, 200)

        project_qs = Project.objects.all()
        self.assertEqual(len(project_qs), 1)
        self.assertEqual(
            'TestPotentialClient-TestPatentSearch-PRR-' +
            datetime.datetime(2021, 3, 20).strftime('%Y%m%d') + '-1000',
            project_qs[0].slug
        )

        # Try sending the same data again and verify that the instance is not saved
        response = self.client.post(
            reverse('ClientAdmin:save-project-ajax'),
            self.main_project_data
        )

        self.assertEqual(response.status_code, 200)

        project_qs = Project.objects.all()
        self.assertEqual(len(project_qs), 1)
        self.assertNotEqual(len(project_qs), 2)

    def test_save_project_with_payment(self):
        '''
        Test project save with payment included
        '''
        response = self.client.post(
            reverse('ClientAdmin:save-project-ajax'),
            self.main_project_data_payment
        )

        self.assertEqual(response.status_code, 200)

        project_qs = Project.objects.all()
        self.assertEqual(len(project_qs), 1)

        payment_qs = Payment.objects.all()
        self.assertEqual(len(payment_qs), 1)
        self.assertEqual(payment_qs[0].project, project_qs[0])

    def test_add_payment_modal(self):
        '''
        Tests the addition of payments through the modal
        '''
        response_save_project = self.client.post(
            reverse('ClientAdmin:save-project-ajax'),
            self.main_project_data_payment
        )
        self.assertEqual(response_save_project.status_code, 200)

        # Send payment
        response_add_payment = self.client.post(
            reverse('ClientAdmin:add-payment-modal-ajax'),
            {
                '_elementId': 'TestPotentialClient-TestPatentSearch-PRR-' +
                datetime.datetime(2021, 3, 20).strftime('%Y%m%d') + '-1000',
                'dollarValue': 200
            }
        )
        self.assertEqual(response_add_payment.status_code, 200)

        project_qs = Project.objects.all()
        payment_qs = Payment.objects.all()
        payment_qs_project_spec = Payment.objects.filter(project=project_qs[0])

        self.assertEqual(len(payment_qs), 2)
        self.assertEqual(len(payment_qs_project_spec), 2)

    def test_mark_project_complete(self):
        '''
        Tests the completion of projects through AJAX
        '''
        response_save_project = self.client.post(
            reverse('ClientAdmin:save-project-ajax'),
            self.main_project_data_payment
        )
        self.assertEqual(response_save_project.status_code, 200)

        response_mark_complete = self.client.post(
            reverse('ClientAdmin:mark-project-complete-ajax'),
            {
                '_elementId': 'TestPotentialClient-TestPatentSearch-PRR-' +
                datetime.datetime(2021, 3, 20).strftime('%Y%m%d') + '-1000'
            }
        )
        self.assertEqual(response_mark_complete.status_code, 200)

        project_qs = Project.objects.all()
        self.assertTrue(project_qs[0].is_project_complete)

        project_qs_complete = Project.objects.filter(is_project_complete=True)
        self.assertEqual(len(project_qs_complete), 1)


class MakeClientCurrentAndAbandonClientTest(TestCase):
    '''
    Tests Making Client Current and Abandoning Client through AJAX responses
    '''
    @classmethod
    def setUpTestData(cls):
        '''
        Create Potential Projects
        '''
        PotentialProject.objects.create(
            client_name='Test Potential Client',
            client_email='test@test.com',
            project_name='Test Patent Search',
            project_type='PRR'
        )

    def test_make_client_current(self):
        '''
        Tests the view of making the client current through AJAX
        '''
        potential_project = PotentialProject.objects.get(id=1)
        potential_project_slug = potential_project.slug

        response = self.client.post(
            reverse('ClientAdmin:make-client-current-ajax'),
            {
                '_elementId': potential_project_slug
            }
        )
        self.assertEqual(response.status_code, 200)

        potential_project = PotentialProject.objects.get(id=1)
        self.assertTrue(potential_project.is_client_current)

    def test_abandon_client(self):
        '''
        Tests the view of abandoning the client through AJAX
        '''
        potential_project = PotentialProject.objects.get(id=1)
        potential_project_slug = potential_project.slug

        response = self.client.post(
            reverse('ClientAdmin:abandon-client-ajax'),
            {
                '_elementId': potential_project_slug
            }
        )
        self.assertEqual(response.status_code, 200)

        potential_project = PotentialProject.objects.get(id=1)
        self.assertTrue(potential_project.is_client_abandoned)


class MonthlyRevenueDictTest(TestCase):
    '''
    Tests the formation of the dict for the monthly revenue per year
    '''

    @classmethod
    def setUpTestData(cls):
        '''
        Create a bunch of payments for the same project and see if the dict is created properly
        '''

        Project.objects.create(
            client_name='Test Potential Client',
            client_company='Testing Company',
            client_email='test@test.com',
            project_name='Test Patent Search',
            project_type='PRR',
            project_deadline=datetime.datetime(2021, 3, 25),
            project_estimated_days=40,
            start_date=datetime.datetime(2021, 3, 15),
            end_date=datetime.datetime(2021, 3, 20),
            expected_revenue=1000
        )

        years = [2020, 2021, 2022]
        payment_days = [4, 16]

        cls.monthly_revenue_dict_whole = {}
        for year in years:
            cls.monthly_revenue_dict_whole[str(year)] = {}
            for month in range(1, 13):
                monthly_amount = 0
                for day in payment_days:
                    random_amount = random.randrange(300, 400)
                    monthly_amount += random_amount
                    Payment.objects.create(
                        project=Project.objects.get(id=1),
                        amount=random_amount,
                        payment_date=datetime.datetime(year, month, day)
                    )

                cls.monthly_revenue_dict_whole[str(
                    year)][str(month)] = monthly_amount

    def test_monthly_revenue_dict(self):
        '''
        Tests the monthly revenue dict has the right values
        '''
        monthy_revenue_dict = monthly_revenue_calculator()
        self.assertEqual(self.monthly_revenue_dict_whole, monthy_revenue_dict)

        payment_qs = Payment.objects.filter(project=Project.objects.get(id=1))
        self.assertEqual(len(payment_qs), 3*12*2)


class SaveLongTermClientTest(TestCase):
    '''
    Tests saving long term clients via AJAX
    '''

    def test_save_long_term_client(self):
        datetime_today_timestamp = int(
            round(
                datetime.datetime.today().timestamp() * 1000.0,
                0
            )
        )
        response = self.client.post(
            reverse('ClientAdmin:save-long-term-client-ajax'),
            {
                'client_name': 'Test Name',
                'client_company': 'Test Company',
                'client_email': 'test@test.com',
            }
        )
        self.assertEqual(response.status_code, 200)

        ltc_qs = LongTermClient.objects.all()
        self.assertEqual(len(ltc_qs), 1)
