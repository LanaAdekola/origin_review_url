from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User
import datetime
from ClientAdmin.models import PotentialProject
from ClientAdmin.tests.test_forms import form_data


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
