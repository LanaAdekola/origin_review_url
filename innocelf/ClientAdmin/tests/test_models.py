from django.test import TestCase
from ClientAdmin.models import PotentialProject, Project, Payment
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
        Tests the client's name, company's and project's name max length
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

    def test_defaults(self):
        '''
        Tests that the default date is inputted properly
        '''
        potential_project = PotentialProject.objects.get(id=1)
        date_today = datetime.datetime.today().strftime('%Y-%m-%d')
        self.assertEqual(
            potential_project.initial_contact_date.strftime('%Y-%m-%d'),
            date_today
        )

        self.assertFalse(
            potential_project.is_client_abandoned
        )
        self.assertFalse(
            potential_project.is_client_current
        )

    def test_slug_saver(self):
        '''
        Tests whether the slug is being saved properly
        '''
        potential_project = PotentialProject.objects.get(id=1)
        date_today_YYYYMMDD = datetime.datetime.today().strftime('%Y%m%d')
        self.assertEqual(
            potential_project.slug,
            'TestPotentialClient-TestPatentSearch-PRR-' + date_today_YYYYMMDD
        )


class ProjectTest(TestCase):
    '''
    Tests the Project model (referencing the Mozilla example)
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
            'project_deadline': '03/20/2021'
            'project_estimated_days': 40,
            'start_date': '03/15/2021'
            'end_date': '03/25/2021'
            'expected_revenue': 1000
        '''
        Project.objects.create(
            client_name='Test Potential Client',
            client_company='Testing Company',
            client_email='test@test.com',
            project_name='Test Patent Search',
            project_type='PRR',
            project_deadline=datetime.datetime(2021, 3, 20),
            project_estimated_days=40,
            start_date=datetime.datetime(2021, 3, 15),
            end_date=datetime.datetime(2021, 3, 25),
            expected_revenue=1000,
        )

        Project.objects.create(
            client_name='Test Potential Client',
            client_company='Testing Company',
            client_email='test@test.com',
            project_name='Test Patent Search',
            project_type='PRR',
            project_deadline=datetime.datetime(2021, 3, 20),
            start_date=datetime.datetime(2021, 3, 15),
            end_date=datetime.datetime(2021, 3, 25),
        )

    def test_objects_max_length(self):
        '''
        Tests the maximum length of all fields for which the max length was specified in the model
        '''
        project = Project.objects.get(id=1)
        client_name_maxlength = project._meta.get_field(
            'client_name').max_length
        client_company_maxlength = project._meta.get_field(
            'client_company').max_length
        project_name_maxength = project._meta.get_field(
            'project_name').max_length
        project_type_maxlength = project._meta.get_field(
            'project_type').max_length

        self.assertEqual(client_name_maxlength, 250)
        self.assertEqual(client_company_maxlength, 250)
        self.assertEqual(project_name_maxength, 250)
        self.assertEqual(project_type_maxlength, 4)

    def test_object_name_is_clientNames_projectName(self):
        '''
        Tests the string output of the current object is the Clients Name's Project Type project
        '''
        project = Project.objects.get(id=1)
        expected_project_string = 'Test Potential Client"s PRR project'
        self.assertEqual(expected_project_string, str(project))

    def test_object_labels(self):
        '''
        Tests the labels for all the fields for the model
        '''
        project = Project.objects.get(id=1)
        client_name = project._meta.get_field('client_name').verbose_name
        client_company = project._meta.get_field('client_company').verbose_name
        client_email = project._meta.get_field('client_email').verbose_name
        project_name = project._meta.get_field('project_name').verbose_name
        project_type = project._meta.get_field('project_type').verbose_name
        project_deadline = project._meta.get_field(
            'project_deadline').verbose_name
        project_estimated_days = project._meta.get_field(
            'project_estimated_days').verbose_name
        start_date = project._meta.get_field('start_date').verbose_name
        end_date = project._meta.get_field('end_date').verbose_name
        expected_revenue = project._meta.get_field(
            'expected_revenue').verbose_name

        self.assertEqual(client_name, 'client name')
        self.assertEqual(client_company, 'client company')
        self.assertEqual(client_email, 'client email')
        self.assertEqual(project_name, 'project name')
        self.assertEqual(project_type, 'project type')
        self.assertEqual(project_deadline, 'project deadline')
        self.assertEqual(project_estimated_days, 'project estimated days')
        self.assertEqual(start_date, 'start date')
        self.assertEqual(end_date, 'end date')
        self.assertEqual(expected_revenue, 'expected revenue')

    def test_defaults(self):
        '''
        Tests the defaults that are generated from the model
        '''
        project = Project.objects.get(id=2)

        self.assertFalse(
            project.client_long_term
        )
        self.assertEqual(
            project.expected_revenue, 0
        )
        self.assertFalse(
            project.is_project_complete
        )
        self.assertEqual(
            project.project_estimated_days, 15
        )

    def test_slug_saver(self):
        '''
        Tests whether the slug is saved appropriately. We should also check that the relevant characters are capitalized
        '''
        project = Project.objects.get(id=1)
        project_deadline_yyyymmdd = project.project_deadline.strftime('%Y%m%d')

        slug_expected = 'TestPotentialClient-TestPatentSearch-PRR-' + \
            project_deadline_yyyymmdd + '-1000'
        self.assertEqual(project.slug, slug_expected)

        project_1 = Project.objects.get(id=2)
        project_1_deadline_yyyymmdd = project_1.project_deadline.strftime(
            '%Y%m%d')

        slug_expected_1 = 'TestPotentialClient-TestPatentSearch-PRR-' + \
            project_deadline_yyyymmdd + '-0'
        self.assertEqual(project_1.slug, slug_expected_1)

    def test_get_number_of_days_to_complete(self):
        '''
        Tests whether the function outputs the right number of days the project takes to complete
        '''
        project = Project.objects.get(id=1)
        self.assertEqual(
            project.get_number_of_days_to_complete(), 10
        )

    def test_if_project_completed_before_deadline(self):
        '''
        Tests whether the function outputs the right boolean of whether the project was completed
        before the said deadline
        '''
        project = Project.objects.get(id=1)
        self.assertFalse(project.was_project_completed_before_deadline())


class PaymentTest(TestCase):
    '''
    Tests the Payment Model (referencing the Mozilla example)
    '''

    @classmethod
    def setUpTestData(cls):
        '''
        Creates a Test Data that will not be modified during the tests
            'client_name': 'Test Potential Client',
            'client_company': 'Testing Company',
            'client_email': 'test@test.com',
            'project_name': 'Test Patent Search',
            'project_type': 'Product Research',
            'project_deadline': '03/20/2021'
            'project_estimated_days': 40,
            'start_date': '03/15/2021'
            'end_date': '03/25/2021'
            'expected_revenue': 1000

            'amount': 200
            'payment_date': '03/10/2021'

            'amount': 800,
            'payment_date: '03/20/2021'
        '''

        Project.objects.create(
            client_name='Test Potential Client',
            client_company='Testing Company',
            client_email='test@test.com',
            project_name='Test Patent Search',
            project_type='PRR',
            project_deadline=datetime.datetime(2021, 3, 20),
            project_estimated_days=40,
            start_date=datetime.datetime(2021, 3, 15),
            end_date=datetime.datetime(2021, 3, 25),
            expected_revenue=1000,
        )

        Payment.objects.create(
            project=Project.objects.get(id=1),
            amount=200,
            payment_date=datetime.datetime(2021, 3, 10)
        )

        Payment.objects.create(
            project=Project.objects.get(id=1),
            amount=800,
            payment_date=datetime.datetime(2021, 3, 20)
        )

    def test_object_labels(self):
        '''
        Tests the object labels that are associated with the model
        '''
        payment = Payment.objects.get(id=1)
        project_name = payment._meta.get_field('project').verbose_name
        amount = payment._meta.get_field('amount').verbose_name
        payment_date = payment._meta.get_field('payment_date').verbose_name

        self.assertEqual(project_name, 'project')
        self.assertEqual(amount, 'amount')
        self.assertEqual(payment_date, 'payment date')

    def test_number_of_payments(self):
        '''
        Tests that the number of payments are two for the same project
        '''

        payment_qs = Payment.objects.filter(
            project=Project.objects.get(id=1)
        )

        self.assertEqual(len(payment_qs), 2)
