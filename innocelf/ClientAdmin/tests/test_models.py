from django.test import TestCase
from ClientAdmin.models import PotentialProject
import datetime


class PotentialProjectTest(TestCase):
    '''
    Tests the Potential Project model (referencing the Mozilla example)
    https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Testing
    '''

    @classmethod
    def setUpTestData(cls):
        '''
        Creates a test data set that will not be modified during the tests
        'client_name': 'Test Potential Client',
        'client_company': 'Testing Company',
        'client_email': 'test@test.com',
        'project_name': 'Test Patent Search',
        'project_type': 'Product Research',
        'initial_contact_date': '08 March, 2021',
        '''
        PotentialProject.objects.create(
            client_name='Test Potential Client',
            client_email='test@test.com',
            project_name='Test Patent Search',
            project_type='PRR'
        )

    def test_objects_max_length(self):
        '''
        Tests the client's name max length
        '''
        potential_project = PotentialProject.objects.get(id=1)
        client_name_maxLength = potential_project._meta.get_field(
            'client_name'
        ).max_length
        client_company_maxLength = potential_project._meta.get_field(
            'client_company'
        ).max_length
        project_name_maxLength = potential_project._meta.get_field(
            'project_name'
        ).max_length

        self.assertEqual(client_name_maxLength, 250)
        self.assertEqual(client_company_maxLength, 250)
        self.assertEqual(project_name_maxLength, 250)

    def test_object_name_is_clientNames_projectName(self):
        '''
        Tests that the object name is Client Names"s Project Type project
        '''
        potential_project = PotentialProject.objects.get(id=1)
        expected_project_name = 'Test Potential Client"s PRR project'
        self.assertEqual(expected_project_name, str(potential_project))

    def test_object_labels(self):
        '''
        Tests the labels for all the fields of the model
        '''
        potential_project = PotentialProject.objects.get(id=1)
        client_name = potential_project._meta.get_field(
            'client_name').verbose_name
        client_company = potential_project._meta.get_field(
            'client_company').verbose_name
        client_email = potential_project._meta.get_field(
            'client_email').verbose_name
        project_name = potential_project._meta.get_field(
            'project_name').verbose_name
        project_type = potential_project._meta.get_field(
            'project_type').verbose_name
        initial_contact_date = potential_project._meta.get_field(
            'initial_contact_date').verbose_name

        self.assertEqual(client_name, 'client name')
        self.assertEqual(client_company, 'client company')
        self.assertEqual(client_email, 'client email')
        self.assertEqual(project_name, 'project name')
        self.assertEqual(project_type, 'project type')
        self.assertEqual(initial_contact_date, 'initial contact date')

    def test_default_date(self):
        '''
        Tests that the default date is inputted properly
        '''
        potential_project = PotentialProject.objects.get(id=1)
        date_today = datetime.datetime.today().strftime('%Y-%m-%d')
        self.assertEqual(
            potential_project.initial_contact_date.strftime('%Y-%m-%d'),
            date_today
        )
