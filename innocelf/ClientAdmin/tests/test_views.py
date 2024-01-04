import datetime
import json
import random

from ClientAdmin.models import (
    LongTermClient,
    Payment,
    Project
)
from ClientAdmin.views import (
    mark_project_complete,
    mark_invoice_sent,
    add_payment_modal
)
from ClientAdmin.views import monthly_revenue_calculator
from django.contrib.auth.models import User
from django.test import TestCase, RequestFactory
from django.urls import reverse


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

    # def test_client_admin_page_landing_redirects_login(self):
    #     '''
    #     Tests that the page is redirected to the login page when the client-admin page is accessed
    #     without login
    #     '''
    #     response = self.client.get(reverse('ClientAdmin:client-admin-view'))
    #     self.assertRedirects(
    #         response, '/client-admin/login/?next=/client-admin/client-admin/')

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


class TestLongTermClientForm(TestCase):
    '''
    The function tests the get and post request associated with the Long Term
    Client Form
    '''

    def tearDown(self):
        '''
        Delets all model instances
        '''
        LongTermClient.objects.all().delete()

    def test_long_term_client_form_get(self):
        '''
        The function tests the long term client form get request
        '''
        response = self.client.get(
            reverse('ClientAdmin:obtain-long-term-client-form')
        )
        self.assertEqual(
            response.status_code,
            200
        )
        self.assertIn(
            '<input type="text" name="client_name" id="add_long_term_client_clientName" maxlength="250" required>',
            response.content.decode('utf-8')
        )
        self.assertIn(
            '<input type="text" name="client_company" id="add_long_term_client_clientCompany" maxlength="250" required>',
            response.content.decode('utf-8')
        )
        self.assertIn(
            '<input type="email" name="client_email" id="add_long_term_client_clientEmail" maxlength="254" required>',
            response.content.decode('utf-8')
        )

    def test_long_term_client_form_post_success(self):
        '''
        The function tests the long term client form post request
        '''
        response = self.client.post(
            reverse('ClientAdmin:save-long-term-client-form'),
            {
                'client_name': ['Test Client Name'],
                'client_company': ['Test Client Company'],
                'client_email': ['test_email@test.com']
            }
        )
        self.assertEqual(
            response.status_code,
            200
        )
        self.assertIn(
            '"Success": "The long term client has been saved successfully."',
            response.content.decode('utf-8')
        )

        long_term_clients = LongTermClient.objects.all()
        self.assertEqual(
            len(long_term_clients),
            1
        )
        self.assertEqual(
            long_term_clients[0].client_name,
            'Test Client Name'
        )
        self.assertEqual(
            long_term_clients[0].client_company,
            'Test Client Company'
        )
        self.assertEqual(
            long_term_clients[0].client_email,
            'test_email@test.com'
        )

    def test_long_term_client_form_post_fails(self):
        '''
        The function tests the long term client form post request
        '''
        response = self.client.post(
            reverse('ClientAdmin:save-long-term-client-form'),
            {
                'client_name': ['Test Client Name'],
                'client_company': [],
                'client_email': ['test_email@test.com']
            }
        )
        self.assertEqual(
            response.status_code,
            200
        )
        self.assertIn(
            '"Failure": "Something went wrong. The form did not save. Please try again."',
            response.content.decode('utf-8')
        )

        long_term_clients = LongTermClient.objects.all()
        self.assertEqual(
            len(long_term_clients),
            0
        )


class TestAddProjectForm(TestCase):
    '''
    The function tests the get and post request associated with the long term
    client form
    '''

    def setUp(self):
        '''
        Clear the database of any previous instances of data
        '''
        Project.objects.all().delete()

    def tearDown(self):
        '''
        Delets all model instances
        '''
        Project.objects.all().delete()

    def test_add_project_form_get(self):
        '''
        The function tests the add project form get request
        '''
        response = self.client.get(
            reverse('ClientAdmin:obtain-add-project-form')
        )
        self.assertEqual(
            response.status_code,
            200
        )
        self.assertIn(
            '<input type="text" name="client_name" id="add_project_clientName" maxlength="250" required>',
            response.content.decode('utf-8')
        )
        self.assertIn(
            '<input type="text" name="client_company" id="add_project_clientCompany" maxlength="250">',
            response.content.decode('utf-8')
        )
        self.assertIn(
            '<input type="checkbox" name="client_long_term" id="add_project_isLongTermClient">',
            response.content.decode('utf-8')
        )
        self.assertIn(
            '<input type="text" name="project_name" id="add_project_projectName" maxlength="250" required>',
            response.content.decode('utf-8')
        )
        self.assertIn(
            '<select name="project_type" id="add_project_projectType" required>\n  <option value="" selected>---------</option>\n\n  <option value="PAR">Patent Research</option>\n\n  <option value="VS">Validity and Invalidity Search</option>\n\n  <option value="FTO">Freedom to Operate Search</option>\n\n  <option value="PRR">Product Research</option>\n\n  <option value="LAN">Landscape / State of the Art</option>\n\n  <option value="TS">Trademark Search</option>\n\n  <option value="PD">Provisional Draft</option>\n\n  <option value="FPD">Full Patent Draft</option>\n\n</select>',
            response.content.decode('utf-8')
        )
        self.assertIn(
            '<input type="date" name="project_deadline" id="add_project_projectDeadline" required>',
            response.content.decode('utf-8')
        )
        self.assertIn(
            '<input type="number" name="project_estimated_days" value="15" id="add_project_projectEstimatedDays" required>',
            response.content.decode('utf-8')
        )
        self.assertIn(
            '<input type="date" name="start_date" id="add_project_startDate" required>',
            response.content.decode('utf-8')
        )
        self.assertIn(
            '<input type="date" name="end_date" id="add_project_endDate" required>',
            response.content.decode('utf-8')
        )
        self.assertIn(
            '<input type="number" name="expected_revenue" value="0" id="add_project_expectedRevenue" step="any" required>',
            response.content.decode('utf-8')
        )

    def test_add_project_form_post_success(self):
        '''
        The function tests the add project form post request
        '''
        response = self.client.post(
            reverse('ClientAdmin:save-add-project-form'),
            {
                'client_name': ['Test Client Name'],
                'client_company': ['Test Client Company'],
                'client_email': ['test_email@test.com'],
                'project_name': ['Test Project Name'],
                'project_type': ['LAN'],
                'project_deadline': ['2021-12-25'],
                'project_estimated_days': ['15'],
                'start_date': ['2021-11-15'],
                'end_date': ['2021-11-30'],
                'expected_revenue': ['10000'],
            }
        )
        self.assertEqual(
            response.status_code,
            200
        )
        self.assertIn(
            '"Success": "The project was saved successfully."',
            response.content.decode('utf-8')
        )

        projects = Project.objects.all()
        self.assertEqual(
            len(projects),
            1
        )
        self.assertEqual(
            projects[0].client_name,
            'Test Client Name'
        )
        self.assertEqual(
            projects[0].client_company,
            'Test Client Company'
        )
        self.assertEqual(
            projects[0].client_email,
            'test_email@test.com'
        )
        self.assertEqual(
            projects[0].project_name,
            'Test Project Name'
        )
        self.assertEqual(
            projects[0].project_type,
            'LAN'
        )
        self.assertEqual(
            projects[0].project_deadline,
            datetime.date(2021, 12, 25)
        )
        self.assertEqual(
            projects[0].project_estimated_days,
            15
        )
        self.assertEqual(
            projects[0].start_date,
            datetime.date(2021, 11, 15)
        )
        self.assertEqual(
            projects[0].end_date,
            datetime.date(2021, 11, 30)
        )
        self.assertEqual(
            projects[0].expected_revenue,
            10000
        )

    def test_add_project_form_post_fails(self):
        '''
        The function tests the add project form post request
        '''
        response = self.client.post(
            reverse('ClientAdmin:save-add-project-form'),
            {
                'client_name': ['Test Client Name'],
                'client_company': [],
                'client_email': ['test_email@test.com']
            }
        )
        self.assertEqual(
            response.status_code,
            200
        )
        self.assertIn(
            '"Failure": "The project was NOT saved successfully. Please try again and input all values."',
            response.content.decode('utf-8')
        )

        projects = Project.objects.all()
        self.assertEqual(
            len(projects),
            0
        )


class TestMonthlyRevenueDict(TestCase):
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
        self.assertEqual(self.monthly_revenue_dict_whole,
                         monthy_revenue_dict)

        payment_qs = Payment.objects.filter(
            project=Project.objects.get(id=1))
        self.assertEqual(len(payment_qs), 3*12*2)

    def test_obtain_revenue_dict(self):
        '''
        Tests that the response obtained from the obtain_revenue_dict view is 
        accurate
        '''
        response = self.client.get(
            reverse('ClientAdmin:obtain-revenue-dict')
        )
        self.assertEqual(
            response.status_code,
            200
        )
        self.assertEqual(
            self.monthly_revenue_dict_whole,
            json.loads(response.content.decode('utf-8'))
        )


class TestObtainProjects(TestCase):
    '''
    The class tests the output for the view / function obtain_projects
    '''

    def setUp(self):
        '''
        Set up psuedo projects
        '''
        for i in range(0, 5):
            project = Project.objects.create(
                client_name='Test Client Name ' + str(i),
                client_company='Testing Company ' + str(i),
                client_email='test_' + str(i) + '@test.com',
                project_name='Test Patent Search ' + str(i),
                project_type='PRR',
                project_deadline=datetime.date.today(),
                project_estimated_days=40,
                start_date=datetime.date.today(),
                end_date=datetime.date.today(),
                expected_revenue=1000
            )
            Payment.objects.create(
                project=project,
                amount=1000,
                payment_date=datetime.date(2021, 11, 26)
            )

    def tearDown(self):
        '''
        Tear down all projects
        '''
        Project.objects.all().delete()
        Payment.objects.all().delete()

    def test_obtain_projects(self):
        '''
        The function tries to get the information from the function
        '''
        response = self.client.get(
            reverse('ClientAdmin:obtain-projects')
        )
        self.assertEqual(
            response.status_code,
            200
        )
        response_json = json.loads(response.content.decode('utf-8'))
        for i, content in enumerate(response_json):
            self.assertEqual(
                content['fields']['client_name'],
                'Test Client Name ' + str(i)
            )
            self.assertEqual(
                content['fields']['client_company'],
                'Testing Company ' + str(i)
            )
            self.assertEqual(
                content['fields']['client_email'],
                'test_' + str(i) + '@test.com'
            )
            self.assertEqual(
                content['fields']['project_name'],
                'Test Patent Search ' + str(i)
            )
            self.assertEqual(
                content['fields']['project_type'],
                'PRR'
            )
            self.assertEqual(
                content['fields']['project_deadline'],
                datetime.date.today().strftime('%Y-%m-%d')
            )
            self.assertEqual(
                content['fields']['start_date'],
                datetime.date.today().strftime('%Y-%m-%d')
            )
            self.assertEqual(
                content['fields']['end_date'],
                datetime.date.today().strftime('%Y-%m-%d')
            )
            self.assertEqual(
                content['fields']['project_estimated_days'],
                40
            )
            self.assertEqual(
                content['fields']['expected_revenue'],
                1000
            )
            self.assertEqual(
                content['fields']['payments'],
                '[{"model": "ClientAdmin.payment", "pk": '
                + str(i + 1) + ', "fields": {"project": '
                + str(i + 1) + ', "amount": 1000.0, "payment_date": "2021-11-26"}}]'
            )


class TestMarkProjectCompleteAndInvoiceSent(TestCase):
    '''
    The class tests that the project was marked complete approprriately
    '''

    def setUp(self):
        '''
        Sets up a project to obtain a slug
        '''
        self.factory = RequestFactory()

        self.project = Project.objects.create(
            client_name='Test Client Name',
            client_company='Testing Company',
            client_email='test@test.com',
            project_name='Test Patent Search',
            project_type='PRR',
            project_deadline=datetime.date.today(),
            project_estimated_days=40,
            start_date=datetime.date.today(),
            end_date=datetime.date.today(),
            expected_revenue=1000,
            is_project_complete=False,
            is_invoice_sent=False
        )

    def tearDown(self):
        '''
        Tears down everything
        '''
        Project.objects.all().delete()

    def test_mark_project_complete(self):
        '''
        The function sends data to verify that the project updates successfully
        '''
        request = self.factory.post(
            path='/client-admin/mark-project-complete',
            data=json.dumps({"_elementId": self.project.slug}),
            content_type='application/json; charset=UTF-8'
        )
        response = mark_project_complete(request)

        self.assertEqual(
            response.status_code,
            200
        )
        self.assertEqual(
            response.content.decode('utf-8'),
            'Success'
        )
        project = Project.objects.all()[0]
        self.assertTrue(
            project.is_project_complete
        )

    def test_mark_invoice_sent(self):
        '''
        The function sends data to verify that the project updates successfully
        '''
        request = self.factory.post(
            path='/client-admin/mark-invoice-sent',
            data=json.dumps({"_elementId": self.project.slug}),
            content_type='application/json; charset=UTF-8'
        )
        response = mark_invoice_sent(request)

        self.assertEqual(
            response.status_code,
            200
        )
        self.assertEqual(
            response.content.decode('utf-8'),
            'Success'
        )
        project = Project.objects.all()[0]
        self.assertTrue(
            project.is_invoice_sent
        )


class TestAddPaymentModal(TestCase):
    '''
    The class tests that the payment was added successfully
    '''

    def setUp(self):
        '''
        Sets up a project to obtain a slug
        '''
        self.factory = RequestFactory()

        self.project = Project.objects.create(
            client_name='Test Client Name',
            client_company='Testing Company',
            client_email='test@test.com',
            project_name='Test Patent Search',
            project_type='PRR',
            project_deadline=datetime.date.today(),
            project_estimated_days=40,
            start_date=datetime.date.today(),
            end_date=datetime.date.today(),
            expected_revenue=1000,
            is_project_complete=False,
            is_invoice_sent=False
        )

    def tearDown(self):
        '''
        Tears down everything
        '''
        Project.objects.all().delete()
        Payment.objects.all().delete()

    def test_add_payment_modal(self):
        '''
        The function tests that the add payment functionality works properly
        '''
        request = self.factory.post(
            path='/client-admin/add-payment-modal',
            data=json.dumps(
                {
                    "_elementId": self.project.slug,
                    "dollarValue": '1000'
                }
            ),
            content_type='application/json; charset=UTF-8'
        )
        response = add_payment_modal(request)
        self.assertEqual(
            response.status_code,
            200
        )

        payments = Payment.objects.all()
        self.assertEqual(
            len(payments),
            1
        )
        self.assertEqual(
            payments[0].project,
            self.project
        )
        self.assertEqual(
            payments[0].amount,
            1000
        )
        self.assertEqual(
            payments[0].payment_date,
            datetime.date.today()
        )
        self.assertEqual(
            response.content.decode('utf-8'),
            '{"message": "Success", "payments_serialize": "[{\\"model\\": \\"ClientAdmin.payment\\", \\"pk\\": 1, \\"fields\\": {\\"project\\": 1, \\"amount\\": 1000.0, \\"payment_date\\": \\"' +
            datetime.date.today().strftime('%Y-%m-%d') +
            '\\"}}]"}'
        )


class TestEditProjectForm(TestCase):
    '''
    The function tests the get and post request associated with the edit
    project form
    '''

    def setUp(self):
        '''
        Clear the database of any previous instances of data
        '''
        Project.objects.all().delete()

        self.project = Project.objects.create(
            client_name='Test Client Name',
            client_company='Testing Company',
            client_email='test_email@test.com',
            project_name='Test Patent Search',
            project_type='PRR',
            project_deadline=datetime.date.today(),
            project_estimated_days=40,
            start_date=datetime.date.today(),
            end_date=datetime.date.today(),
            expected_revenue=1000,
            is_project_complete=False,
            is_invoice_sent=False
        )

    def tearDown(self):
        '''
        Delets all model instances
        '''
        Project.objects.all().delete()

    def test_edit_project_form_get(self):
        '''
        The function tests the add project form get request
        '''
        response = self.client.get(
            reverse('ClientAdmin:obtain-edit-project-form')
        )
        self.assertEqual(
            response.status_code,
            200
        )
        self.assertIn(
            '<input type="text" name="client_name" id="edit_project_row_clientName" maxlength="250" required>',
            response.content.decode('utf-8')
        )
        self.assertIn(
            '<input type="text" name="client_company" id="edit_project_row_clientCompany" maxlength="250">',
            response.content.decode('utf-8')
        )
        self.assertIn(
            '<input type="text" name="project_name" id="edit_project_row_projectName" maxlength="250" required>',
            response.content.decode('utf-8')
        )
        self.assertIn(
            '<select name="project_type" id="edit_project_row_projectType" required>\n  <option value="" selected>---------</option>\n\n  <option value="PAR">Patent Research</option>\n\n  <option value="VS">Validity and Invalidity Search</option>\n\n  <option value="FTO">Freedom to Operate Search</option>\n\n  <option value="PRR">Product Research</option>\n\n  <option value="LAN">Landscape / State of the Art</option>\n\n  <option value="TS">Trademark Search</option>\n\n  <option value="PD">Provisional Draft</option>\n\n  <option value="FPD">Full Patent Draft</option>\n\n</select>',
            response.content.decode('utf-8')
        )
        self.assertIn(
            '<input type="date" name="project_deadline" id="edit_project_row_projectDeadline" required>',
            response.content.decode('utf-8')
        )
        self.assertIn(
            '<input type="number" name="expected_revenue" value="0" id="edit_project_row_expectedRevenue" min="0" max="1000000" value="0" required>',
            response.content.decode('utf-8')
        )

    def test_edit_project_form_post_success(self):
        '''
        The function tests the add project form post request
        '''
        projects = Project.objects.all()
        self.assertEqual(
            len(projects),
            1
        )
        self.assertEqual(
            projects[0].client_name,
            'Test Client Name'
        )
        self.assertEqual(
            projects[0].client_company,
            'Testing Company'
        )
        self.assertEqual(
            projects[0].client_email,
            'test_email@test.com'
        )
        self.assertEqual(
            projects[0].project_name,
            'Test Patent Search'
        )
        self.assertEqual(
            projects[0].project_type,
            'PRR'
        )
        self.assertEqual(
            projects[0].project_deadline,
            datetime.date.today()
        )
        self.assertEqual(
            projects[0].expected_revenue,
            1000
        )

        response = self.client.post(
            reverse('ClientAdmin:save-edit-project-form'),
            {
                'project_slug': [self.project.slug],
                'client_name': ['Test New Client Name'],
                'client_company': ['Test New Client Company'],
                'client_email': ['test_email_new@test.com'],
                'project_name': ['Test New Project Name'],
                'project_type': ['FPD'],
                'project_deadline': ['2021-12-25'],
                'expected_revenue': ['10000'],
            }
        )
        self.assertEqual(
            response.status_code,
            200
        )
        self.assertIn(
            '"message": "Success"',
            response.content.decode('utf-8')
        )

        projects = Project.objects.all()
        self.assertEqual(
            len(projects),
            1
        )
        self.assertEqual(
            projects[0].client_name,
            'Test New Client Name'
        )
        self.assertEqual(
            projects[0].client_company,
            'Test New Client Company'
        )
        self.assertEqual(
            projects[0].client_email,
            'test_email_new@test.com'
        )
        self.assertEqual(
            projects[0].project_name,
            'Test New Project Name'
        )
        self.assertEqual(
            projects[0].project_type,
            'FPD'
        )
        self.assertEqual(
            projects[0].project_deadline,
            datetime.date(2021, 12, 25)
        )
        self.assertEqual(
            projects[0].expected_revenue,
            10000
        )
