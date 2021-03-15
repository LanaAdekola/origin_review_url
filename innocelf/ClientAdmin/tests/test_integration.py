import time

from ClientAdmin.models import Payment, PotentialProject, Project
from django.contrib.auth.models import User
from django.contrib.staticfiles.testing import (LiveServerTestCase,
                                                StaticLiveServerTestCase)
from django.shortcuts import reverse
from django.test import TestCase, TransactionTestCase
from selenium import webdriver
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

from .test_forms import form_data_potential_project, form_data_project
from ClientAdmin.models import PROJECT_TYPE_CHOICES
import random
import datetime


def common_setup_login_client_admin(caller):
    '''
    The function logs in the user with the prrovided credentials and returns a browser instant.
    '''
    # Create a superuser
    test_super_user = User.objects.create_superuser(
        'test_superuser',
        'test@superuser.com',
        '1843_test_superuser'
    )

    # Initiate the browser and navigate to the client admin login page
    browser = webdriver.Chrome('/home/pratik/Downloads/chromedriver')
    localhost = caller.live_server_url
    login_url = localhost + reverse('ClientAdmin:client-admin-login')

    # Navigate to the page
    browser.get(login_url)
    browser.maximize_window()

    # Getting the user and password inputs
    username_input = browser.find_element_by_id('id_username')
    password_input = browser.find_element_by_id('id_password')
    login_button = browser.find_element_by_xpath(
        '//button[@type="submit"][contains(@class, "btn btn-dark")]'
    )

    # Send the appropriate keys
    username_input.send_keys('test_superuser')
    password_input.send_keys('1843_test_superuser')
    login_button.click()

    return test_super_user, browser


class TestLoginCredentials(StaticLiveServerTestCase):
    '''
    The class tests the Login Credentials of the user. The user has to be a superuser to login
    '''

    def setUp(self):
        '''
        Set up
        '''
        self.browser = webdriver.Chrome('/home/pratik/Downloads/chromedriver')

        # Navigate to client admin login url
        self.localhost = self.live_server_url
        add_url = self.localhost + reverse('ClientAdmin:client-admin-login')
        self.browser.get(add_url)

        # Maximize window
        self.browser.maximize_window()

        # Create Users
        test_normal_user = User.objects.create(
            username='test_normaluser',
            password='1843_test_normaluser'
        )
        test_super_user = User.objects.create_superuser(
            'test_superuser',
            'test@test.com',
            '1843_test_superuser'
        )

    def tearDown(self):
        '''
        Close everything once done
        '''
        self.browser.close()

    def test_login_credentials(self):
        '''
        Tries out multiple login attempts and asserts that the login is successful or not
        '''

        LOGIN_DATA = {
            '1': {
                'username': 'test_normaluser',
                'password': '1843_test_',
                'result': False
            },
            '2': {
                'username': 'test_normal',
                'password': '1843_test_normaluser',
                'result': False
            },
            '3': {
                'username': 'test_normaluser',
                'password': '1843_test_normaluser',
                'result': False
            },
            '4': {
                'username': 'test_superuser',
                'password': '1843_test_',
                'result': False
            },
            '5': {
                'username': 'test_super',
                'password': '1843_test_superuser',
                'result': False
            },
            '6': {
                'username': 'test_superuser',
                'password': '1843_test_superuser',
                'result': True
            },
        }

        for key in LOGIN_DATA.keys():
            # Username and password inputs
            username_input = self.browser.find_element_by_id('id_username')
            password_input = self.browser.find_element_by_id('id_password')
            # Login Button
            login_button = self.browser.find_element_by_xpath(
                '//button[@type="submit"][contains(@class, "btn btn-dark")]')

            time.sleep(1)
            username_input.clear()
            password_input.clear()

            username_input.send_keys(LOGIN_DATA[key]['username'])
            password_input.send_keys(LOGIN_DATA[key]['password'])
            login_button.click()

            # Landing url if successful
            landing_url = self.localhost + \
                reverse('ClientAdmin:client-admin-view')

            # Assert URLS
            if LOGIN_DATA[key]['result']:
                self.assertEqual(landing_url, self.browser.current_url)
            else:
                self.assertNotEqual(landing_url, self.browser.current_url)


class TestPotentialProjectSave(StaticLiveServerTestCase):
    '''
    The class tests the addition of Potential Clients to the backend. It will also check that the
    instance is saved appropriately to the backend
    '''

    def setUp(self):
        '''
        Set up
        '''
        # Initiate the browser and navigate to the client admin login page
        self.test_super_user, self.browser = common_setup_login_client_admin(
            self)

        # Add new client button on the sidebar
        self.add_new_client_button = self.browser.find_element_by_id(
            'add_new_client_sidebar'
        )

        # Find radio buttons for potential client and current clients
        self.potential_client_radio = self.browser.find_element_by_id(
            'choose_potential_client'
        )
        self.current_client_radio = self.browser.find_element_by_id(
            'choose_current_client'
        )

        # Potential Project Form Inputs and Button
        self.client_name = self.browser.find_element_by_id(
            'add_potentialProject_clientName'
        )
        self.client_company = self.browser.find_element_by_id(
            'add_potentialProject_clientCompany'
        )
        self.client_email = self.browser.find_element_by_id(
            'add_potentialProject_clientEmail'
        )
        self.project_name = self.browser.find_element_by_id(
            'add_potentialProject_projectName'
        )
        self.project_type = self.browser.find_element_by_xpath(
            '//select[@id="add_potentialProject_projectType"]'
        )
        self.initial_contact_date = self.browser.find_element_by_id(
            'add_potentialProject_initialContactDate'
        )
        self.save_potential_client_button = self.browser.find_element_by_id(
            'add_potential_project_form_save'
        )

    def tearDown(self):
        '''
        Close browser and be done
        '''
        self.browser.close()

    def test_add_client_button(self):
        '''
        Tests the add client button to understand whether everything is visible how its supposed to
        '''
        # Find button of add new client

        # Find radio buttons
        potential_client_radio_label = self.potential_client_radio.find_element_by_xpath(
            './..'
        )
        current_client_radio_label = self.current_client_radio.find_element_by_xpath(
            './..'
        )

        # Click the add new client button
        self.add_new_client_button.click()

        # Wait for the add new client container to be displayed
        add_new_client_container = self.browser.find_element_by_id(
            'add_new_client_container'
        )
        WebDriverWait(self.browser, 30).until(
            lambda d: d.find_element_by_id(
                'add_new_client_container'
            ).is_displayed()
        )

        # Assert that the radios are displayed
        self.assertTrue(potential_client_radio_label.is_displayed())
        self.assertTrue(current_client_radio_label.is_displayed())

        # Click the icon on the side bar for everything to disappear
        icon_button = self.browser.find_element_by_id(
            'sidebar_icon'
        )
        icon_button.click()

        # Assert that the radios are not displayed
        self.assertFalse(potential_client_radio_label.is_displayed())
        self.assertFalse(current_client_radio_label.is_displayed())

    def test_submit_potential_client_form(self):
        '''
        Tests the filling and submission of the potential client form
        '''

        form_data = {
            '1': {
                'client_name': 'Test Potential Client',
                'client_company': 'Testing Company',
                'client_email': 'test@test.com',
                'project_name': 'Test Patent Search',
                'project_type': 'Product Research',
                'initial_contact_date': '08 March, 2021',
                'project_type_backend': 'PRR'
            },
            '2': {
                'client_name': 'Pest Potential Client',
                'client_company': 'Pesting Company',
                'client_email': 'pest@test.com',
                'project_name': 'Pest Patent Search',
                'project_type': 'Full Patent Draft',
                'initial_contact_date': '2021-09-10',
                'project_type_backend': 'FPD'
            }
        }

        for key in form_data.keys():
            # Click the appropriate buttons to get to the form
            self.add_new_client_button.click()
            self.potential_client_radio.find_element_by_xpath('./..').click()

            # Clear out all the inputs from the form
            self.client_name.clear()
            self.client_company.clear()
            self.client_email.clear()
            self.project_name.clear()
            self.initial_contact_date.clear()

            # Input the relevant items
            self.client_name.send_keys(
                form_data[key]['client_name']
            )
            self.client_company.send_keys(
                form_data[key]['client_company']
            )
            self.client_email.send_keys(
                form_data[key]['client_email']
            )
            self.project_name.send_keys(
                form_data[key]['project_name']
            )
            self.initial_contact_date.send_keys(
                form_data[key]['initial_contact_date']
            )
            project_type = self.browser.find_element_by_xpath(
                '//select[@id="add_potentialProject_projectType"]/option[text()="' +
                form_data[key]['project_type'] + '"]'
            )
            project_type.click()

            # Click save
            self.save_potential_client_button.click()

            # Check that no container is showed.
            add_new_client_container = self.browser.find_element_by_id(
                'add_new_client_container'
            )
            self.assertFalse(add_new_client_container.is_displayed())

            self.assertTrue(
                isinstance(
                    PotentialProject.objects.get(
                        client_name=form_data[key]['client_name']),
                    PotentialProject
                )
            )

        potential_project_qs = PotentialProject.objects.all()
        self.assertEqual(len(potential_project_qs), 2)

    def test_same_information_doesnt_save(self):
        '''
        Tests the fact that the same information if inputted by the user will be not saved and
        an alert will be shown
        '''

        form_data = {
            '1': {
                'client_name': 'Test Potential Client',
                'client_company': 'Testing Company',
                'client_email': 'test@test.com',
                'project_name': 'Test Patent Search',
                'project_type': 'Product Research',
                'initial_contact_date': '08 March, 2021',
                'project_type_backend': 'PRR'
            },
            '2': {
                'client_name': 'Test Potential Client',
                'client_company': 'Testing Company',
                'client_email': 'test@test.com',
                'project_name': 'Test Patent Search',
                'project_type': 'Product Research',
                'initial_contact_date': '08 March, 2021',
                'project_type_backend': 'PRR'
            }
        }

        for key in form_data.keys():
            # Click the appropriate buttons to get to the form
            self.add_new_client_button.click()
            self.potential_client_radio.find_element_by_xpath('./..').click()

            # Clear out all the inputs from the form
            self.client_name.clear()
            self.client_company.clear()
            self.client_email.clear()
            self.project_name.clear()
            self.initial_contact_date.clear()

            # Input the relevant items
            self.client_name.send_keys(
                form_data[key]['client_name']
            )
            self.client_company.send_keys(
                form_data[key]['client_company']
            )
            self.client_email.send_keys(
                form_data[key]['client_email']
            )
            self.project_name.send_keys(
                form_data[key]['project_name']
            )
            self.initial_contact_date.send_keys(
                form_data[key]['initial_contact_date']
            )
            project_type = self.browser.find_element_by_xpath(
                '//select[@id="add_potentialProject_projectType"]/option[text()="' +
                form_data[key]['project_type'] + '"]'
            )
            project_type.click()

            # Click save
            self.save_potential_client_button.click()

            if key == '1':
                # Check that no container is showed.
                add_new_client_container = self.browser.find_element_by_id(
                    'add_new_client_container'
                )
                self.assertFalse(add_new_client_container.is_displayed())
            elif key == '2':
                WebDriverWait(self.browser, 10).until(
                    lambda d: EC.alert_is_present())
                alert = self.browser.switch_to_alert()

                self.assertEqual(
                    alert.text,
                    'A similar client with the same project exists in the DB. Please rename the project to something specific.'
                )
                alert.accept()
                add_new_client_container = self.browser.find_element_by_id(
                    'add_new_client_container'
                )
                self.assertTrue(add_new_client_container.is_displayed())

    def test_form_validation(self):
        '''
        Tests that the form doesnt go through when all the required information is not filled in
        '''
        # Open the potential project form
        self.add_new_client_button.click()
        self.potential_client_radio.find_element_by_xpath('./..').click()

        for key in form_data_potential_project.keys():
            project_type_long = [i[1] for i in PROJECT_TYPE_CHOICES if form_data_potential_project[key]['project_type']
                                 in i]
            project_type_long_name = '---------' if len(
                project_type_long) == 0 else project_type_long[0]

            # Clear out all the inputs from the form
            self.client_name.clear()
            self.client_company.clear()
            self.client_email.clear()
            self.project_name.clear()
            self.initial_contact_date.clear()

            # Input the relevant items
            self.client_name.send_keys(
                form_data_potential_project[key]['client_name']
            )
            self.client_company.send_keys(
                form_data_potential_project[key]['client_company']
            )
            self.client_email.send_keys(
                form_data_potential_project[key]['client_email']
            )
            self.project_name.send_keys(
                form_data_potential_project[key]['project_name']
            )
            self.initial_contact_date.send_keys(
                form_data_potential_project[key]['initial_contact_date']
            )
            project_type = self.browser.find_element_by_xpath(
                '//select[@id="add_potentialProject_projectType"]/option[text()="' +
                project_type_long_name + '"]'
            )
            project_type.click()

            # Click save
            self.save_potential_client_button.click()

            if form_data_potential_project[key]['is_valid'] == True:
                if key == '8':
                    WebDriverWait(self.browser, 10).until(
                        EC.alert_is_present())
                    alert = self.browser.switch_to_alert()

                    self.assertEqual(
                        alert.text,
                        'A similar client with the same project exists in the DB. Please rename the project to something specific.'
                    )
                    alert.accept()
                    add_new_client_container = self.browser.find_element_by_id(
                        'add_new_client_container'
                    )
                    self.assertTrue(add_new_client_container.is_displayed())
                else:
                    add_new_client_container = self.browser.find_element_by_id(
                        'add_new_client_container'
                    )
                    # Check that no container is showed.
                    self.assertFalse(add_new_client_container.is_displayed())
                    self.add_new_client_button.click()
                    self.potential_client_radio.find_element_by_xpath(
                        './..').click()
            else:
                add_new_client_container = self.browser.find_element_by_id(
                    'add_new_client_container'
                )
                self.assertTrue(add_new_client_container.is_displayed())


class TestProjectSave(StaticLiveServerTestCase):
    '''
    The class tests the addition of Current Clients to the backend. It will also check that the instance is saved appropriately
    '''

    def setUp(self):
        '''
        Set up
        '''
        # Initiate the browser and navigate to the client admin login page
        self.test_super_user, self.browser = common_setup_login_client_admin(
            self)

        # Add new client button on the sidebar
        self.add_new_client_button = self.browser.find_element_by_id(
            'add_new_client_sidebar'
        )

        # Find radio buttons for potential client and current clients
        self.potential_client_radio = self.browser.find_element_by_id(
            'choose_potential_client'
        )
        self.current_client_radio = self.browser.find_element_by_id(
            'choose_current_client'
        )

        self.add_new_client_button.click()
        self.current_client_radio.find_element_by_xpath('./..').click()

        self.client_long_term = self.browser.find_element_by_id(
            'add_project_isLongTermClient'
        )
        self.client_name = self.browser.find_element_by_id(
            'add_project_clientName'
        )
        self.client_company = self.browser.find_element_by_id(
            'add_project_clientCompany'
        )
        self.client_email = self.browser.find_element_by_id(
            'add_project_clientEmail'
        )
        self.project_name = self.browser.find_element_by_id(
            'add_project_projectName'
        )
        self.project_deadline = self.browser.find_element_by_id(
            'add_project_projectDeadline'
        )
        self.project_estimated_days = self.browser.find_element_by_id(
            'add_project_projectEstimatedDays'
        )
        self.start_date = self.browser.find_element_by_id(
            'add_project_startDate'
        )
        self.end_date = self.browser.find_element_by_id(
            'add_project_endDate'
        )
        self.expected_revenue = self.browser.find_element_by_id(
            'add_project_expectedRevenue'
        )
        self.add_payment_button = self.browser.find_element_by_id(
            'add_project_addPayment'
        )
        self.save_button = self.browser.find_element_by_id(
            'add_project_form_save'
        )

    def tearDown(self):
        '''
        Close everything once done
        '''
        self.browser.close()

    def test_submit_current_client_form(self):
        '''
        This function automates filling the contents of the form because I am too lazy to do it
        '''

        self.browser.execute_script(
            'arguments[0].click()', self.client_long_term
        )
        self.client_name.send_keys('Pratik Mahamuni')
        self.client_company.send_keys('Estokx')
        self.client_email.send_keys('ppma@mtu.edu')
        self.project_name.send_keys('Some Patent Work')
        project_type = self.browser.find_element_by_xpath(
            '//select[@id="add_project_projectType"]/option[text()="Landscape / State of the Art"]'
        )
        project_type.click()
        self.project_deadline.send_keys('15 April, 2021')
        self.start_date.send_keys('15 March, 2021')
        self.end_date.send_keys('20 March, 2021')
        self.expected_revenue.clear()
        self.expected_revenue.send_keys('700')

        self.add_payment_button.click()
        WebDriverWait(self.browser, 10).until(
            lambda d: d.find_element_by_id('add_project_payment').is_displayed())
        add_payment = self.browser.find_element_by_id('add_project_payment')
        add_payment.send_keys('400')

        self.save_button.click()

        # Assert front end stuff
        current_client_form_container = self.browser.find_element_by_id(
            'current_client_details')
        self.assertFalse(current_client_form_container.is_displayed())
        current_client_table_container = self.browser.find_element_by_id(
            'table_current_client_container'
        )
        self.assertTrue(current_client_table_container.is_displayed())

        # Assert backend stuff
        project_qs = Project.objects.all()
        self.assertEqual(len(project_qs), 1)
        payment_qs = Payment.objects.all()
        self.assertEqual(len(payment_qs), 1)
        self.assertEqual(
            project_qs[0].slug,
            'PratikMahamuni-SomePatentWork-LAN-20210415-700'
        )

    def test_same_information_doesnt_save(self):
        '''
        Tests that if the same information was sent via the form, then it will not save
        '''
        form_data = {
            '1': {
                'client_name': 'Pratik Mahamuni',
                'client_company': 'Estokx',
                'client_email': 'ppma@mtu.edu',
                'project_name': 'Some Patent Work',
                'project_type': 'Landscape / State of the Art',
                'project_deadline': '15 April, 2021',
                'start_date': '15 March, 2021',
                'end_date': '20 March, 2021',
                'expected_revenue': '700'
            }
        }
        form_data['2'] = form_data['1']

        for key in form_data.keys():
            if key == '2':
                self.add_new_client_button.click()
                self.current_client_radio.find_element_by_xpath('./..').click()

            self.client_name.send_keys(form_data[key]['client_name'])
            self.client_company.send_keys(form_data[key]['client_company'])
            self.client_email.send_keys(form_data[key]['client_email'])
            self.project_name.send_keys(form_data[key]['project_name'])
            self.browser.find_element_by_xpath(
                '//select[@id="add_project_projectType"]/option[text()="Landscape / State of the Art"]'
            ).click()
            self.project_deadline.send_keys(form_data[key]['project_deadline'])
            self.start_date.send_keys(form_data[key]['start_date'])
            self.end_date.send_keys(form_data[key]['end_date'])
            self.expected_revenue.clear()
            self.expected_revenue.send_keys(
                form_data[key]['expected_revenue'])

            self.save_button.click()

            if key == '2':
                WebDriverWait(self.browser, 10).until(
                    lambda d: EC.alert_is_present())
                alert = self.browser.switch_to_alert()

                self.assertEqual(
                    alert.text,
                    'A similar client with the same project exists in the DB. Please rename the project to something specific.'
                )
                alert.accept()
                add_new_client_container = self.browser.find_element_by_id(
                    'add_new_client_container'
                )
                self.assertTrue(add_new_client_container.is_displayed())

        project_qs = Project.objects.all()
        self.assertEqual(len(project_qs), 1)
        self.assertNotEqual(len(project_qs), 2)

    def test_form_validation(self):
        '''
        Tests that the form doesnt go through when all the required information is not filled in
        '''
        # Open the potential project form
        self.add_new_client_button.click()
        self.current_client_radio.find_element_by_xpath('./..').click()

        for key in form_data_project.keys():
            project_type_long = [i[1] for i in PROJECT_TYPE_CHOICES if form_data_project[key]['project_type']
                                 in i]
            project_type_long_name = '---------' if len(
                project_type_long) == 0 else project_type_long[0]

            # Clear out all the inputs from the form
            self.client_name.clear()
            self.client_company.clear()
            self.client_email.clear()
            self.project_name.clear()
            self.project_deadline.clear()
            self.project_estimated_days.clear()
            self.start_date.clear()
            self.end_date.clear()
            self.expected_revenue.clear()

            # Input the relevant items
            self.client_name.send_keys(form_data_project[key]['client_name'])
            self.client_company.send_keys(
                form_data_project[key]['client_company'])
            self.client_email.send_keys(form_data_project[key]['client_email'])
            self.project_name.send_keys(form_data_project[key]['project_name'])
            self.browser.find_element_by_xpath(
                '//select[@id="add_project_projectType"]/option[text()="' +
                project_type_long_name + '"]'
            ).click()
            self.project_deadline.send_keys(
                form_data_project[key]['project_deadline'])
            self.project_estimated_days.send_keys(
                form_data_project[key]['project_estimated_days'])
            self.start_date.send_keys(form_data_project[key]['start_date'])
            self.end_date.send_keys(form_data_project[key]['end_date'])
            self.expected_revenue.send_keys(
                form_data_project[key]['expected_revenue'])

            self.save_button.click()

            if form_data_project[key]['is_valid'] == True:
                if key == '2':
                    WebDriverWait(self.browser, 10).until(
                        EC.alert_is_present())
                    alert = self.browser.switch_to_alert()

                    self.assertEqual(
                        alert.text,
                        'A similar client with the same project exists in the DB. Please rename the project to something specific.'
                    )
                    alert.accept()
                    add_new_client_container = self.browser.find_element_by_id(
                        'add_new_client_container'
                    )
                    self.assertTrue(add_new_client_container.is_displayed())
                else:
                    add_new_client_container = self.browser.find_element_by_id(
                        'add_new_client_container'
                    )
                    # Check that no container is showed.
                    self.assertFalse(
                        add_new_client_container.is_displayed(),
                        msg=f'For {key}, container is displayed'
                    )
                    self.add_new_client_button.click()
                    self.current_client_radio.find_element_by_xpath(
                        './..').click()
            else:
                add_new_client_container = self.browser.find_element_by_id(
                    'add_new_client_container'
                )
                self.assertTrue(
                    add_new_client_container.is_displayed(),
                    msg=f'For {key}, container is not displayed'
                )


class TestPotentialProjectTable(StaticLiveServerTestCase):
    '''
    Tests that the Potential project table has been displayed correctly and that the functionality makes sense
    '''


class TestProjectTable(StaticLiveServerTestCase):
    '''
    Tests that the Project table has been displayed correctly and that the functionality makes sense
    for all the button clicks on it.
    '''

    # @classmethod
    # def setUpClass(cls):
    #     '''
    #     Creating projects for the rest of the class
    #     '''
    #     super().setUpClass()

    def setUp(self):
        '''
        Set up, make new projects and open browser
        '''
        for i in range(30):
            random_project_type = random.randrange(0, 5)
            random_estimated_days = random.randrange(5, 40)
            random_expected_revenue = random.randrange(500, 1000)
            Project.objects.create(
                client_name='Test Client ' + str(i),
                client_company='Test Company ' + str(i),
                client_email='test' + str(i) + '@email.com',
                project_name='Test Project ' + str(i),
                project_type=PROJECT_TYPE_CHOICES[random_project_type][0],
                project_deadline=datetime.datetime(2021, 3, 30),
                project_estimated_days=random_estimated_days,
                start_date=datetime.datetime(2021, 3, 15),
                end_date=datetime.datetime(2021, 3, 20),
                expected_revenue=random_expected_revenue,
            )

        self.test_super_user, self.browser = common_setup_login_client_admin(
            self)

        self.current_clients_sidebar = self.browser.find_element_by_id(
            'show_current_client_table'
        )

    def tearDown(self):
        '''
        Tear Down
        '''
        self.browser.close()

    def test_table_contents_are_displayed(self):
        '''
        Tests that the table contents are displayed correctly
        '''
        self.browser.execute_script(
            'arguments[0].click()', self.current_clients_sidebar
        )

        # Assert that the table container and the table is displayed
        table_container = self.browser.find_element_by_id(
            'table_current_client_container')
        table = self.browser.find_element_by_id('current_client_table')
        self.assertTrue(table_container.is_displayed())
        self.assertTrue(table.is_displayed())

        # Assert that the table numbers being displayed are proper
        table_numbers = self.browser.find_element_by_id(
            'current_client_table_info'
        )
        self.assertEqual(table_numbers.text, '1 - 10 of 30')

        # Change the number of rows displayed to 50
        self.browser.find_element_by_xpath(
            '//select[@name="current_client_table_length"]/option[text()="50"]'
        ).click()
        table_numbers = self.browser.find_element_by_id(
            'current_client_table_info'
        )
        self.assertEqual(table_numbers.text, '1 - 30 of 30')

        # Verify that the buttons are the same color we anticipate (text muted color)
        for project in Project.objects.all():
            mark_project_done_button = self.browser.find_element_by_id(
                project.slug + '_markProjectDone'
            )
            self.assertTrue(
                mark_project_done_button.value_of_css_property('color'),
                '#6c757d !important'
            )

    def test_mark_projects_done(self):
        '''
        Tests the clicking of the mark project done and verifying that they are marked complete in
        the backend and the button color changes to green
        '''
        self.browser.execute_script(
            'arguments[0].click()', self.current_clients_sidebar
        )

        # Change the number of rows displayed to 50
        self.browser.find_element_by_xpath(
            '//select[@name="current_client_table_length"]/option[text()="50"]'
        ).click()

        # Assert that the buttons change color when they are clicked
        # Text Success #00c851 !important
        for project in Project.objects.all():
            mark_project_done_button = self.browser.find_element_by_id(
                project.slug + '_markProjectDone'
            )

            # Click the button
            mark_project_done_button.click()

            # Assert Front End
            self.assertTrue(
                mark_project_done_button.value_of_css_property('color'),
                '#00c851 !important'
            )
            # Assert Backend
            project_real_time = Project.objects.get(slug=project.slug)
            self.assertTrue(project_real_time.is_project_complete)

        # Assert that the length of projects that are marked complete are 30
        projects_complete = Project.objects.filter(is_project_complete=True)
        self.assertEqual(len(projects_complete), 30)

    def test_add_payment_to_projects(self):
        '''
        Tests the addition of payments to the project through the modal route
        '''
        self.browser.execute_script(
            'arguments[0].click()', self.current_clients_sidebar
        )

        # Change the number of rows displayed to 50
        self.browser.find_element_by_xpath(
            '//select[@name="current_client_table_length"]/option[text()="50"]'
        ).click()

        # Assert that the payments are created correctly and that they are displayed here properly
        for project in Project.objects.all():
            WebDriverWait(self.browser, 10).until(
                lambda d: d.find_element_by_id(
                    'table_current_client_container').is_displayed()
            )
            random_payment = random.randrange(100, 500)

            add_payment_button = self.browser.find_element_by_id(
                project.slug + '_addPaymentButton'
            )

            # Click the button
            add_payment_button.click()

            # Wait for the modal to be displayed
            WebDriverWait(self.browser, 10).until(
                lambda d: d.find_element_by_id(
                    'add_payment_modal').is_displayed()
            )
            # Input the random amount
            add_payment_input_modal = self.browser.find_element_by_id(
                project.slug + '_addPaymentModal'
            )
            add_payment_input_modal.send_keys(str(random_payment))
            # Save the payment
            save_payment_button_modal = self.browser.find_element_by_id(
                'add_payment_modal_footer_submit'
            )
            save_payment_button_modal.click()

            WebDriverWait(self.browser, 10).until(
                lambda d: d.find_element_by_id(
                    'table_current_client_container').is_displayed()
            )
            self.assertIn(
                '$' + str(round(float(random_payment), 2)),
                self.browser.find_element_by_id(
                    project.slug).find_elements_by_tag_name('td')[7].text,
            )

        for project in Project.objects.all():
            project_real_time = Project.objects.get(
                slug=project.slug)
            payment_real_time = Payment.objects.filter(
                project=project_real_time)

            self.assertEqual(len(payment_real_time), 1)

        for i in range(10):
            WebDriverWait(self.browser, 10).until(
                lambda d: d.find_element_by_id(
                    'table_current_client_container').is_displayed()
            )
            random_payment = random.randrange(100, 500)

            project = Project.objects.get(id=i + 1)
            add_payment_button = self.browser.find_element_by_id(
                project.slug + '_addPaymentButton'
            )

            # Click the button
            add_payment_button.click()

            # Wait for the modal to be displayed
            WebDriverWait(self.browser, 10).until(
                lambda d: d.find_element_by_id(
                    'add_payment_modal').is_displayed()
            )
            # Input the random amount
            add_payment_input_modal = self.browser.find_element_by_id(
                project.slug + '_addPaymentModal'
            )
            add_payment_input_modal.send_keys(str(random_payment))
            # Save the payment
            save_payment_button_modal = self.browser.find_element_by_id(
                'add_payment_modal_footer_submit'
            )
            save_payment_button_modal.click()

            project_real_time = Project.objects.get(slug=project.slug)
            payment_real_time = Payment.objects.filter(
                project=project_real_time)

            self.assertEqual(len(payment_real_time), 2)
