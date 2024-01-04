import json
import uuid
import datetime
from django.test import TestCase
from django.urls import reverse
from django.core import mail
from django.contrib.auth.models import User
from innoservices.forms import ContactUsForm, SendReviewRequestForm
from innoservices.models import SendReviewRequest, ClientReview


class TestHomeView(TestCase):
    '''
    Tests the home view
    '''

    def test_home_view(self):
        response = self.client.get(
            reverse('innoservices:home')
        )
        self.assertEqual(
            response.status_code,
            200
        )
        self.assertTemplateUsed(
            response,
            'innoservices/homepage.html'
        )
        self.assertIn(
            'PrivacyPolicy',
            response.cookies
        )


class TestServicesView(TestCase):
    '''
    Tests the service page view
    '''

    def test_services_view(self):
        response = self.client.get(
            reverse('innoservices:services')
        )
        self.assertEqual(
            response.status_code,
            200
        )
        self.assertTemplateUsed(
            response,
            'innoservices/services.html'
        )


class TestAboutUsView(TestCase):
    '''
    Tests the service page view
    '''

    def test_aboutus_view(self):
        response = self.client.get(
            reverse('innoservices:about-us')
        )
        self.assertEqual(
            response.status_code,
            200
        )
        self.assertTemplateUsed(
            response,
            'innoservices/about_us.html'
        )


class TestTestimonialsView(TestCase):
    '''
    Tests the testimonials page view
    '''

    def test_testimonials_view(self):
        response = self.client.get(
            reverse('innoservices:testimonials-page')
        )
        self.assertEqual(
            response.status_code,
            200
        )
        self.assertTemplateUsed(
            response,
            'innoservices/testimonials.html'
        )


class TestFaqPage(TestCase):
    '''
    Tests the faq page view
    '''

    def test_faq_view(self):
        response = self.client.get(
            reverse('innoservices:frequently-asked-questions')
        )
        self.assertEqual(
            response.status_code,
            200
        )
        self.assertTemplateUsed(
            response,
            'innoservices/faq.html'
        )


class TestOurProcessPage(TestCase):
    '''
    Tests the our process page view
    '''

    def test_our_process_view(self):
        response = self.client.get(
            reverse('innoservices:our-process')
        )
        self.assertEqual(
            response.status_code,
            200
        )
        self.assertTemplateUsed(
            response,
            'innoservices/our_process.html'
        )


class TestContactUsView(TestCase):
    '''
    Tests the contact us page view
    '''

    def test_contactus_view(self):
        response = self.client.get(
            reverse('innoservices:contact-us')
        )
        self.assertEqual(
            response.status_code,
            200
        )
        self.assertTemplateUsed(
            response,
            'innoservices/contact_us.html'
        )

    def test_obtain_contact_us_form(self):
        '''
        The function tests the view of obtaining the contact us form
        '''
        self.maxDiff = None
        response = self.client.get(
            reverse('innoservices:obtain-contact-us-form')
        )
        self.assertEqual(
            response.status_code,
            200
        )

        form = ContactUsForm()
        form_string = str(form).replace(' ', '').replace('\n', '')
        response_string = str(response.content.decode(
            'utf-8')).replace(' ', '').replace('\n', '')
        self.assertIn(
            '<input type="text" name="full_name" id="contact_us_first_name" placeholder="Name" required maxlength="255">',
            response.content.decode('utf-8')
        )
        self.assertIn(
            '<input type="email" name="email" id="contact_us_email" placeholder="your_email@domain.com" required maxlength="254">',
            response.content.decode('utf-8')
        )
        self.assertIn(
            '<select name="inquiry_reason" id="contact_us_reason" required>\n  <option value="" selected>---------</option>\n\n  <option value="PS">Patentability / Novelty Search</option>\n\n  <option value="CS">Clearance Search</option>\n\n  <option value="IS">Invalidity Search</option>\n\n  <option value="FS">Freedom to Operate Search</option>\n\n  <option value="LA">Landscape / State of the Art</option>\n\n  <option value="PR">Product Research</option>\n\n  <option value="NS">Introduction / Unsure</option>\n\n</select>',
            response.content.decode('utf-8')
        )
        self.assertIn(
            '<textarea name="explanation" cols="40" rows="3" id="contact_explanation" placeholder="Please provide a brief summary of your inquiry. DO NOT include confidential information." maxlength="3000">\n</textarea>',
            response.content.decode('utf-8')
        )

    def test_receive_contact_us_form_response(self):
        '''
        The function tests the view of receiving the the form data from the front end
        '''
        response = self.client.post(
            reverse('innoservices:receive-contact-us-form'),
            {
                'full_name': ['Test Full Name'],
                'email': ['testEmailAddress@test.com'],
                'inquiry_reason': ['PS'],
                'explanation': ['This is a test explanation']
            }
        )
        self.assertEqual(
            response.status_code,
            200
        )
        self.assertEqual(
            len(mail.outbox),
            1
        )

        email = mail.outbox[0]
        self.assertEqual(
            email.recipients(),
            ['ppd24@case.edu', 'dharmadhikari.pranita@gmail.com']
        )
        self.assertEqual(
            email.subject,
            'ATTENTION!! Someone contacted you on Innocelf'
        )
        self.assertEqual(
            email.body.replace('\n\n', '').replace('\n', ''),
            'Test Full Name with the email id testEmailAddress@test.com has contacted you.' +
            ' The reason for their inquiry is PS. They typed this message: This is a test explanation'
        )


class TestPrivacyPolicyPage(TestCase):
    '''
    Tests the privacy policy page view
    '''

    def test_privacy_policy_view(self):
        response = self.client.get(
            reverse('innoservices:privacy-policy')
        )
        self.assertEqual(
            response.status_code,
            200
        )
        self.assertTemplateUsed(
            response,
            'innoservices/terms_and_conditions/privacy_policy.html'
        )


class TestDisclaimerPage(TestCase):
    '''
    Tests the disclaimer page view
    '''

    def test_disclaimer_view(self):
        response = self.client.get(
            reverse('innoservices:disclaimer')
        )
        self.assertEqual(
            response.status_code,
            200
        )
        self.assertTemplateUsed(
            response,
            'innoservices/terms_and_conditions/disclaimer.html'
        )


class TestTermsAndConditionsPage(TestCase):
    '''
    Tests the terms and conditions page view
    '''

    def test_disclaimer_view(self):
        response = self.client.get(
            reverse('innoservices:terms-and-conditions')
        )
        self.assertEqual(
            response.status_code,
            200
        )
        self.assertTemplateUsed(
            response,
            'innoservices/terms_and_conditions/terms_and_conditions.html'
        )


class TestSendReviewRequest(TestCase):
    '''
    Tests the terms and conditions page view
    '''

    def test_send_review_request_view(self):
        '''
        The function tests the send review request view
        '''
        response = self.client.get(
            reverse('innoservices:send-review-request')
        )
        self.assertEqual(
            response.status_code,
            200
        )
        self.assertTemplateUsed(
            response,
            'innoservices/send_review_request/send_review_request.html'
        )

    def test_obtain_send_review_request_form(self):
        '''
        The function tests obtaining the send review request form
        '''
        self.maxDiff = None
        response = self.client.get(
            reverse('innoservices:obtain-send-review-request-form')
        )
        self.assertEqual(
            response.status_code,
            200
        )

        form = SendReviewRequestForm()
        form_string = str(form).replace(' ', '').replace('\n', '')
        response_string = str(response.content.decode(
            'utf-8')).replace(' ', '').replace('\n', '')
        self.assertIn(
            '<input type="text" name="first_name" id="contact_us_first_name" placeholder="First Name" required maxlength="255">',
            response.content.decode('utf-8')
        )
        self.assertIn(
            '<input type="text" name="last_name" id="contact_us_last_name" placeholder="Last Name" required maxlength="255">',
            response.content.decode('utf-8')
        )
        self.assertIn(
            '<input type="email" name="email" id="contact_us_email" placeholder="your_email@domain.com" required maxlength="254">',
            response.content.decode('utf-8')
        )


class TestReceiveSendReviewRequestFormResponse(TestCase):
    '''
    The class tests the various iterations of how the receiving of the send
    review request form response behaves
    '''

    def setUp(self):
        '''
        Creates a couple of users
        '''
        self.test_normal_user = User.objects.create(
            username='test_normal_user',
            password='test_normal_password'
        )
        self.test_super_user = User.objects.create_superuser(
            'test_super_user',
            'test_super_user@email.com',
            'test_super_password'
        )

    def test_normal_user(self):
        '''
        The function tests the unsuccessful reciept of the send review request
        '''
        self.client.login(
            username='test_normal_user',
            password='test_normal_password'
        )

        response = self.client.post(
            reverse('innoservices:receive-send-review-request-form'),
            {
                'first_name': ['Test First Name'],
                'last_name': ['Test Last Name'],
                'email': ['test_email@test.com']
            }
        )
        self.assertEqual(
            response.status_code,
            200
        )
        self.assertJSONEqual(
            response.content.decode('utf-8'),
            {
                'Failure': 'You are not authorized to send these requests. Please login as an administrator.'
            },
        )

    def test_super_user(self):
        '''
        The function tests the successful reciept of the send review request
        '''
        self.client.login(
            username='test_super_user',
            password='test_super_password'
        )

        response = self.client.post(
            reverse('innoservices:receive-send-review-request-form'),
            {
                'first_name': ['Test First Name'],
                'last_name': ['Test Last Name'],
                'email': ['test_email@test.com']
            }
        )
        self.assertEqual(
            response.status_code,
            200
        )
        self.assertJSONEqual(
            response.content.decode('utf-8'),
            {
                'Success': 'The request has been sent. Sit tight and wait for the review.'
            },
        )

        # Assert that a send review request object is created
        send_review_requests = SendReviewRequest.objects.all()
        self.assertEqual(
            len(send_review_requests),
            1
        )
        self.assertEqual(
            send_review_requests[0].first_name,
            'Test First Name'
        )
        self.assertEqual(
            send_review_requests[0].last_name,
            'Test Last Name'
        )
        self.assertEqual(
            send_review_requests[0].email,
            'test_email@test.com'
        )
        self.assertIsNotNone(
            send_review_requests[0].uuid
        )

        # Assert that the email object is accurate
        self.assertEqual(
            len(mail.outbox),
            1
        )

        email = mail.outbox[0]
        self.assertEqual(
            email.recipients(),
            ['test_email@test.com']
        )
        self.assertEqual(
            email.subject,
            'Request for Review -- Innocelf, LLC'
        )


class TestWriteReview(TestCase):
    '''
    The class tests the write review views and their accuracy
    '''

    def setUp(self):
        '''
        Set up test data with a new send review request
        '''
        self.unique_uuid = uuid.uuid4().hex
        self.send_review_request = SendReviewRequest.objects.create(
            first_name='Test First Name',
            last_name='Test Last Name',
            email='test_email@test.com',
            uuid=self.unique_uuid
        )

    def tearDown(self):
        '''
        Delete all instances of everything that has been created
        '''
        SendReviewRequest.objects.all().delete()
        ClientReview.objects.all().delete()

    def test_write_review_landing(self):
        '''
        The function tests the landing page of the write review view
        '''
        response = self.client.get(
            reverse('innoservices:write-review', kwargs={
                'uuid_token': self.unique_uuid
            })
        )
        self.assertEqual(
            response.status_code,
            200
        )
        self.assertTemplateUsed(
            response,
            'innoservices/send_review_request/write_review.html'
        )
        self.assertEqual(
            response.context['first_name'],
            'Test First Name'
        )
        self.assertEqual(
            response.context['last_name'],
            'Test Last Name'
        )

    def test_obtain_write_review_form(self):
        '''
        The function tests that the form recieved from the view is accurate
        '''
        headers = {
            'HTTP_FIRSTNAME': 'Test First Name',
            'HTTP_LASTNAME': 'Test Last Name'
        }
        response = self.client.get(
            reverse('innoservices:obtain-write-review-form'),
            **headers
        )
        self.assertEqual(
            response.status_code,
            200
        )

        self.assertIn(
            '<input type="text" name="first_name" value="Test First Name" id="record_review_first_name" placeholder="First Name" required maxlength="255">',
            response.content.decode('utf-8')
        )
        self.assertIn(
            '<input type="text" name="last_name" value="Test Last Name" id="record_review_last_name" placeholder="Last Name" required maxlength="255">',
            response.content.decode('utf-8')
        )
        self.assertIn(
            '<textarea name="review" cols="40" rows="10" id="record_review_review" placeholder="Please write your review here." required maxlength="2000">\n</textarea>',
            response.content.decode('utf-8')
        )

    def test_receive_write_review_form_response(self):
        '''
        The function tests that the receiving of the review form is accurate
        when it is recieved
        '''
        response = self.client.post(
            reverse('innoservices:receive-write-review-form'),
            {
                'first_name': 'Test First Name',
                'last_name': 'Test Last Name',
                'review': 'Test Review',
                'uuid_token': self.unique_uuid
            }
        )
        self.assertEqual(
            response.status_code,
            200
        )
        self.assertJSONEqual(
            response.content.decode('utf-8'),
            {
                'Success': 'Your review has been recorded. Thank you for taking the time to review our services. We appreciate it.'
            },
        )

        # Assert that the send review request uuid is falsed out
        send_review_request = SendReviewRequest.objects.all()[0]
        self.assertTrue(
            send_review_request.uuid_used
        )

        # Assert that a new client review exists
        datetime_today = datetime.datetime.now()
        current_month = datetime_today.strftime('%B')
        current_year = datetime_today.strftime('%Y')
        month_year = current_month + ' ' + current_year

        client_reviews = ClientReview.objects.all()
        self.assertEqual(
            len(client_reviews),
            1
        )
        self.assertEqual(
            client_reviews[0].first_name,
            'Test First Name'
        )
        self.assertEqual(
            client_reviews[0].last_name,
            'Test Last Name'
        )
        self.assertEqual(
            client_reviews[0].review,
            'Test Review'
        )
        self.assertEqual(
            client_reviews[0].month_year,
            month_year
        )
