from django.test import TestCase
from innoservices.models import ContactUs


class TestContactUs(TestCase):
    '''
    Tests the ContactUs Model for all of its components
    '''
    @classmethod
    def setUpTestData(cls):
        '''
        Sets up test data
        '''
        test_instance = ContactUs.objects.create(
            full_name='Test Full Name',
            email='test_email@test.com',
            inquiry_reason='PR',
            explanation='This is a test'
        )

    def test_objects_max_length(self):
        '''
        Tests the max length of all the fields of the model
        '''
        test_instance = ContactUs.objects.all()[0]
        full_name = test_instance._meta.get_field('full_name').max_length
        inquiry_reason = test_instance._meta.get_field(
            'inquiry_reason').max_length
        explanation = test_instance._meta.get_field('explanation').max_length

        self.assertEqual(
            full_name,
            255
        )
        self.assertEqual(
            inquiry_reason,
            3
        )
        self.assertEqual(
            explanation,
            3000
        )

    def test_object_name_is_accurate(self):
        '''
        Tests the __str__ representation of the instance is accurate
        '''
        test_instance = ContactUs.objects.all()[0]
        expected_name = 'Test Full Name Inquiry'
        self.assertEqual(
            str(test_instance),
            expected_name
        )

    def test_object_labels(self):
        '''
        Tests the object labels for the model instance
        '''
        test_instance = ContactUs.objects.all()[0]
        full_name = test_instance._meta.get_field('full_name').verbose_name
        email = test_instance._meta.get_field('email').verbose_name
        inquiry_reason = test_instance._meta.get_field(
            'inquiry_reason').verbose_name
        explanation = test_instance._meta.get_field('explanation').verbose_name

        self.assertEqual(
            full_name,
            'full name'
        )
        self.assertEqual(
            email,
            'email'
        )
        self.assertEqual(
            inquiry_reason,
            'inquiry reason'
        )
        self.assertEqual(
            explanation,
            'explanation'
        )
