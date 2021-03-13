from django.test import TestCase, TransactionTestCase
from django.contrib.staticfiles.testing import StaticLiveServerTestCase, LiveServerTestCase
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from django.shortcuts import reverse
from django.contrib.auth.models import User
import time
from ClientAdmin.models import PotentialProject
from selenium.webdriver.support import expected_conditions as EC


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


class TestPotentialClient(StaticLiveServerTestCase):
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

        client_name = self.browser.find_element_by_id(
            'add_potentialProject_clientName'
        )
        client_company = self.browser.find_element_by_id(
            'add_potentialProject_clientCompany'
        )
        client_email = self.browser.find_element_by_id(
            'add_potentialProject_clientEmail'
        )
        project_name = self.browser.find_element_by_id(
            'add_potentialProject_projectName'
        )
        project_type = self.browser.find_element_by_xpath(
            '//select[@id="add_potentialProject_projectType"]'
        )
        initial_contact_date = self.browser.find_element_by_id(
            'add_potentialProject_initialContactDate'
        )
        save_potential_client_button = self.browser.find_element_by_id(
            'add_potential_project_form_save'
        )

        for key in form_data.keys():
            # Click the appropriate buttons to get to the form
            self.add_new_client_button.click()
            self.potential_client_radio.find_element_by_xpath('./..').click()

            # Clear out all the inputs from the form
            client_name.clear()
            client_company.clear()
            client_email.clear()
            project_name.clear()
            initial_contact_date.clear()

            # Input the relevant items
            client_name.send_keys(
                form_data[key]['client_name']
            )
            client_company.send_keys(
                form_data[key]['client_company']
            )
            client_email.send_keys(
                form_data[key]['client_email']
            )
            project_name.send_keys(
                form_data[key]['project_name']
            )
            initial_contact_date.send_keys(
                form_data[key]['initial_contact_date']
            )
            project_type = self.browser.find_element_by_xpath(
                '//select[@id="add_potentialProject_projectType"]/option[text()="' +
                form_data[key]['project_type'] + '"]'
            )
            project_type.click()

            # Click save
            save_potential_client_button.click()

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

        client_name = self.browser.find_element_by_id(
            'add_potentialProject_clientName'
        )
        client_company = self.browser.find_element_by_id(
            'add_potentialProject_clientCompany'
        )
        client_email = self.browser.find_element_by_id(
            'add_potentialProject_clientEmail'
        )
        project_name = self.browser.find_element_by_id(
            'add_potentialProject_projectName'
        )
        project_type = self.browser.find_element_by_xpath(
            '//select[@id="add_potentialProject_projectType"]'
        )
        initial_contact_date = self.browser.find_element_by_id(
            'add_potentialProject_initialContactDate'
        )
        save_potential_client_button = self.browser.find_element_by_id(
            'add_potential_project_form_save'
        )

        for key in form_data.keys():
            # Click the appropriate buttons to get to the form
            self.add_new_client_button.click()
            self.potential_client_radio.find_element_by_xpath('./..').click()

            # Clear out all the inputs from the form
            client_name.clear()
            client_company.clear()
            client_email.clear()
            project_name.clear()
            initial_contact_date.clear()

            # Input the relevant items
            client_name.send_keys(
                form_data[key]['client_name']
            )
            client_company.send_keys(
                form_data[key]['client_company']
            )
            client_email.send_keys(
                form_data[key]['client_email']
            )
            project_name.send_keys(
                form_data[key]['project_name']
            )
            initial_contact_date.send_keys(
                form_data[key]['initial_contact_date']
            )
            project_type = self.browser.find_element_by_xpath(
                '//select[@id="add_potentialProject_projectType"]/option[text()="' +
                form_data[key]['project_type'] + '"]'
            )
            project_type.click()

            # Click save
            save_potential_client_button.click()

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


class TestProject(StaticLiveServerTestCase):
    '''
    The class tests the addition of Current Clients to the backend. It will also check that the instance is saved appropriately
    '''

    def setUp(self):
        '''
        Set up
        '''
        # Initiate the browser and navigate to the client admin login page
        self.browser = webdriver.Chrome('/home/pratik/Downloads/chromedriver')
        localhost = 'http://127.0.0.1:8000'
        login_url = localhost + reverse('ClientAdmin:client-admin-login')

        # Navigate to the page
        self.browser.get(login_url)
        self.browser.maximize_window()

        # Getting the user and password inputs
        username_input = self.browser.find_element_by_id('id_username')
        password_input = self.browser.find_element_by_id('id_password')
        login_button = self.browser.find_element_by_xpath(
            '//button[@type="submit"][contains(@class, "btn btn-dark")]'
        )

        username_input.send_keys('pratikmahamuni_superadmin')
        password_input.send_keys('ppdm@love')
        login_button.click()

        # Add new client button on the sidebar
        self.add_new_client_button = self.browser.find_element_by_id(
            'add_new_client_sidebar'
        )
        self.add_new_client_button.click()
        self.current_client_radio = self.browser.find_element_by_id(
            'choose_current_client'
        )
        self.current_client_radio.find_element_by_xpath('./..').click()

    def test_fill_form(self):
        '''
        This function automates filling the contents of the form because I am too lazy to do it
        '''
        client_name = self.browser.find_element_by_id(
            'add_project_clientName'
        )
        client_company = self.browser.find_element_by_id(
            'add_project_clientCompany'
        )
        client_email = self.browser.find_element_by_id(
            'add_project_clientEmail'
        )
        project_name = self.browser.find_element_by_id(
            'add_project_projectName'
        )
        project_deadline = self.browser.find_element_by_id(
            'add_project_projectDeadline'
        )
        project_type = self.browser.find_element_by_xpath(
            '//select[@id="add_project_projectType"]/option[text()="Landscape / State of the Art"]'
        )
        start_date = self.browser.find_element_by_id(
            'add_project_startDate'
        )
        end_date = self.browser.find_element_by_id(
            'add_project_endDate'
        )
        expected_revenue = self.browser.find_element_by_id(
            'add_project_expectedRevenue'
        )
        add_payment_button = self.browser.find_element_by_id(
            'add_project_addPayment'
        )
        save_button = self.browser.find_element_by_id(
            'add_project_form_save'
        )

        client_name.send_keys('Pratik Mahamuni')
        client_company.send_keys('Estokx')
        client_email.send_keys('ppma@mtu.edu')
        project_name.send_keys('Some Patent Work')
        project_type.click()
        project_deadline.send_keys('15 April, 2021')
        start_date.send_keys('15 March, 2021')
        end_date.send_keys('20 March, 2021')
        expected_revenue.clear()
        expected_revenue.send_keys('700')

        add_payment_button.click()
        WebDriverWait(self.browser, 10).until(
            lambda d: d.find_element_by_id('add_project_payment').is_displayed())
        add_payment = self.browser.find_element_by_id('add_project_payment')
        add_payment.send_keys('400')

        save_button.click()

        time.sleep(2)
