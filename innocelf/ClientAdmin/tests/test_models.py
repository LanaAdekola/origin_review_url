from django.test import TestCase
from ClientAdmin.models import (
    Project,
    Payment,
    LongTermClient,
    SendInventionDisclosureQuestionnaire,
    InventionDisclosureQuestionnaire
)
import datetime
import uuid


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


class LongTermClientTest(TestCase):
    '''
    Tests the Long Term Client model (referencing the Mozilla example)
    https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Testing
    '''

    @classmethod
    def setUpTestData(cls):
        '''
        Creates a test data set that will not be modified during the tests
        'client_name': 'Test Potential Client',
        'client_company': 'Testing Company',
        'client_email': 'test@test.com',
        '''
        LongTermClient.objects.create(
            client_name='Test Potential Client',
            client_company='Testing Company',
            client_email='test@test.com',
        )

    def test_objects_max_length(self):
        '''
        Tests the client's name and company's name max length
        '''
        long_term_client = LongTermClient.objects.get(id=1)
        client_name_maxLength = long_term_client._meta.get_field(
            'client_name'
        ).max_length
        client_company_maxLength = long_term_client._meta.get_field(
            'client_company'
        ).max_length

        self.assertEqual(client_name_maxLength, 250)
        self.assertEqual(client_company_maxLength, 250)

    def test_object_name_is_clientName_of_CompanyName(self):
        '''
        Tests that the object name is Client Names"s Project Type project
        '''
        long_term_client = LongTermClient.objects.get(id=1)
        expected_ltc_name = 'Test Potential Client of Testing Company'
        self.assertEqual(expected_ltc_name, str(long_term_client))

    def test_object_labels(self):
        '''
        Tests the labels for all the fields of the model
        '''
        long_term_client = LongTermClient.objects.get(id=1)
        client_name = long_term_client._meta.get_field(
            'client_name').verbose_name
        client_company = long_term_client._meta.get_field(
            'client_company').verbose_name
        client_email = long_term_client._meta.get_field(
            'client_email').verbose_name

        self.assertEqual(client_name, 'client name')
        self.assertEqual(client_company, 'client company')
        self.assertEqual(client_email, 'client email')


class SendInventionDisclosureQuestionnaireTest(TestCase):
    '''
    Tests the SendInventionDisclosureQuestionnaire Model
    '''

    @classmethod
    def setUpTestData(cls):
        '''
        Sets up a test data
        '''
        SendInventionDisclosureQuestionnaire.objects.create(
            client_name='Test Client Name',
            client_company='Test Client Company',
            client_email='test_email@test.com',
            uuid=uuid.uuid4().hex
        )

    def test_objects_max_length(self):
        '''
        The test tests the objects max_length
        '''
        instance = SendInventionDisclosureQuestionnaire.objects.all()[0]
        client_name = instance._meta.get_field('client_name').max_length
        client_company = instance._meta.get_field('client_company').max_length
        client_email = instance._meta.get_field('client_email').max_length

        self.assertEqual(
            client_name,
            255
        )
        self.assertEqual(
            client_company,
            255
        )
        self.assertEqual(
            client_email,
            255
        )

    def test_defaults(self):
        '''
        The function tests the defaults in the model object. This has just one
        '''
        instance = SendInventionDisclosureQuestionnaire.objects.all()[0]
        self.assertFalse(
            instance.uuid_used
        )

    def test_string_representation(self):
        '''
        The function tests that the string representation of the model / object
        is accurate
        '''
        instance = SendInventionDisclosureQuestionnaire.objects.all()[0]
        string_representation = str(instance)

        self.assertEqual(
            string_representation,
            'Test Client Name of Test Client Company questionnaire request'
        )


class InventionDisclosureQuestionnaireTest(TestCase):
    '''
    The class tests the Invention Disclosure Questionnaire model
    '''

    @classmethod
    def setUpTestData(cls):
        '''
        Sets up a test data
        '''
        instance = InventionDisclosureQuestionnaire.objects.create(
            client_name='Test Client Name',
            client_company='Test Client Company',
            client_email='test_email@test.com',
            title='Test Title',
            category='MECH',
            summary='Test Summary of Invention',
            problem_solved='Test Problem Solved of Invention',
            closest_art='Test Closest Art of Invention',
            competing_products='Test Competing Products of Invention',
            advantages='Test Advantages of Invention',
            future_improvements='Test Future Improvements of Invention'
        )
        instance.save()

    def test_objects_max_length(self):
        '''
        The function tests the objects max length
        '''
        instance = InventionDisclosureQuestionnaire.objects.all()[0]
        client_name = instance._meta.get_field('client_name').max_length
        client_company = instance._meta.get_field('client_company').max_length
        client_email = instance._meta.get_field('client_email').max_length
        title = instance._meta.get_field('title').max_length
        category = instance._meta.get_field('category').max_length
        summary = instance._meta.get_field('summary').max_length
        problem_solved = instance._meta.get_field('problem_solved').max_length
        closest_art = instance._meta.get_field('closest_art').max_length
        competing_products = instance._meta.get_field(
            'competing_products').max_length
        advantages = instance._meta.get_field('advantages').max_length
        future_improvements = instance._meta.get_field(
            'future_improvements').max_length
        slug = instance._meta.get_field('slug').max_length

        self.assertEqual(
            client_name,
            255
        )
        self.assertEqual(
            client_company,
            255
        )
        self.assertEqual(
            client_email,
            255
        )
        self.assertEqual(
            title,
            255
        )
        self.assertEqual(
            category,
            5
        )
        self.assertEqual(
            summary,
            3000
        )
        self.assertEqual(
            problem_solved,
            3000
        )
        self.assertEqual(
            closest_art,
            3000
        )
        self.assertEqual(
            competing_products,
            3000
        )
        self.assertEqual(
            advantages,
            3000
        )
        self.assertEqual(
            future_improvements,
            3000
        )
        self.assertEqual(
            slug,
            2500
        )

    def test_string_representation(self):
        '''
        The function tests that the string representation of the object is accurate
        '''
        instance = InventionDisclosureQuestionnaire.objects.all()[0]
        string_representation = str(instance)

        self.assertEqual(
            string_representation,
            "Test Client Name's questionnaire for Test Title invention"
        )

    def test_slug_saver(self):
        '''
        The function tests that the slug saved is accurate
        '''
        instance = InventionDisclosureQuestionnaire.objects.all()[0]
        expected_slug = 'TestClientName-TestClientCompany-TestTitle-MECH'

        self.assertEqual(
            instance.slug,
            expected_slug
        )
