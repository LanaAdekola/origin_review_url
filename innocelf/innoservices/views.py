import json
import os
import urllib.parse
import urllib.request
import uuid
from datetime import datetime

from django.conf import settings
from django.contrib import messages
from django.core import serializers
from django.core.mail import send_mail
from django.core.serializers.json import DjangoJSONEncoder
from django.http import HttpResponse
from django.shortcuts import redirect, render, reverse
from django.template.loader import get_template
from django.views.generic import FormView, ListView, View

from .forms import ClientReviewForm, ContactUsForm, SendReviewRequestForm
from .models import ClientReview, ContactUs, SendReviewRequest

PRIVACY_POLICY_RESPONSE = '''The information contained in this website is provided for informational purposes only, and should not be
                construed as legal advice, nor are they intended as a source of advertising or solicitation. The
                material on this website may not reflect the most current legal developments. We disclaim all liability
                in respect to actions taken or not taken based on any or all the contents of this site to the fullest
                extent permitted by law. Do not act or refrain from acting upon this information without seeking
                professional legal counsel in your own state. No past results serve in any way as a guarantee of future
                results.\nTestimonials found on this website are actual client reviews of INNOCELF, LLC or team members. We
                appreciate our clients and their willingness to share their experiences. Please keep in mind that the
                success of any matter depends on the unique circumstances of each case: we cannot guarantee particular
                results for future clients based on successes we have achieved in past matters.'''


def home_view(request, *args, **kwargs):
    '''
    Defining homepage of Innocelf
    '''

    # Setting the cookies here
    if 'PrivacyPolicy' in request.COOKIES:
        response = render(request, 'home_page.html')
    else:
        response = render(request, 'home_page.html')
        response.set_cookie('PrivacyPolicy', PRIVACY_POLICY_RESPONSE)

    return response


def technology_view(request, *args, **kwargs):
    '''
    Enlisting all the technologies that Innocelf supports with its services
    '''
    return render(request, 'technology_page.html')


def privacy_policy(request, *args, **kwargs):
    '''
    Defining a page for privacy policy that will be tagged on using the link near the footer
    '''
    return render(request, 'terms_and_conditions/privacy_policy.html')


def disclaimer(request, *args, **kwargs):
    '''
    Defining a page for the websites disclaimer and will be part of the footer
    '''
    return render(request, 'terms_and_conditions/disclaimer.html')


def website_terms_and_conditions(request, *args, **kwargs):
    '''
    Defining a page for the websites terms and conditions and will be a part of the footer
    '''
    return render(request, 'terms_and_conditions/terms_and_conditions.html')


def testimonials(request, *args, **kwargs):
    '''
    Defining a page for the websites / the company's testimonials
    '''
    all_reviews = ClientReview.objects.filter(accepted=True)
    all_reviews_json = serializers.serialize(
        'json', all_reviews, cls=DjangoJSONEncoder)
    context = {
        'all_reviews_json': all_reviews_json
    }
    return render(request, 'about_us_and_testimonials.html', context)


def contact_us_confirmation(request, *args, **kwargs):
    '''
    This page will be displayed when the client contacts Innocelf LLC.
    This is a landing page after the contact us portion has been successful.
    '''
    return render(request, 'contact_us_confirmation.html')


class ContactUsView(FormView):

    '''
    Defining the contact us view
    '''

    form = ContactUsForm

    def get(self, *args, **kwargs):
        form = self.form
        recaptcha_site_key = settings.RECAPTCHA_SITE_KEY

        context = {
            'form': form,
            'recaptcha_site_key': recaptcha_site_key
        }

        return render(self.request, 'contact_us.html', context)

    def post(self, *args, **kwargs):

        form = self.form(self.request.POST)
        if form.is_valid():

            # Begin recaptcha validation
            recaptcha_response = self.request.POST.get(
                'g-recaptcha-response')
            url = 'https://www.google.com/recaptcha/api/siteverify'
            values = {
                'secret': settings.RECAPTCHA_SECRET_KEY,
                'response': recaptcha_response
            }
            data = urllib.parse.urlencode(values).encode()
            req = urllib.request.Request(url, data=data)
            response = urllib.request.urlopen(req)
            result = json.loads(response.read().decode())

            if result['success']:
                contact = ContactUs()
                contact.first_name = form['first_name'].value()
                contact.last_name = form['last_name'].value()
                contact.email = form['email'].value()
                contact.phone = form['phone'].value()
                contact.inquiry_reason = form['inquiry_reason'].value()
                contact.explanation = form['explanation'].value()

                contact.save()

                messages.info(
                    self.request, 'Your inquiry has been recorded. We will reach out to you in 1-2 business day(s).')

                send_mail(
                    subject='ATTENTION!! Someone contacted you on Innocelf',
                    message=f"{form['first_name'].value()} {form['last_name'].value()} with the email id {form['email'].value()} and phone number {form['phone'].value()} has contacted you.\n\n The reason for their inquiry is {form['inquiry_reason'].value()}.\n They typed this message: {form['explanation'].value()}",
                    from_email=settings.EMAIL_HOST_USER,
                    recipient_list=['ppd24@case.edu',
                                    'dharmadhikari.pranita@gmail.com'],
                    fail_silently=False
                )

                return redirect('innoservices:contact-us-confirmation')

            else:
                messages.error(
                    self.request, 'Re-Captcha Failed. Please try again later.')


def send_review_request(request, *args, **kwargs):
    '''
    This function sends a reviewe request to a customer with a unique uuid.
    '''
    form = SendReviewRequestForm()
    context = {
        'form': form
    }

    if request.POST:
        if request.user.is_superuser:
            # TODO: Limit sending the emails to the people who are superusers
            form = SendReviewRequestForm(request.POST)
            if form.is_valid():
                unique_uuid = uuid.uuid4().hex
                new_review_request = SendReviewRequest(
                    first_name=request.POST['first_name'],
                    last_name=request.POST['last_name'],
                    email=request.POST['email'],
                    uuid=unique_uuid
                )
                new_review_request.save()

                email_context = {
                    'first_name': request.POST['first_name'],
                    # 'unique_link': f'http://127.0.0.1:8000/write-review/{unique_uuid}/',
                    'unique_link': f'https://www.innocelf.com/write-review/{unique_uuid}/'
                }
                email_template = get_template(
                    '../templates/client_reviews/email_template.html'
                ).render(email_context)

                send_mail(
                    subject='Request for Review -- Innocelf, LLC',
                    message='',
                    from_email=settings.EMAIL_HOST_USER,
                    recipient_list=[request.POST['email']],
                    html_message=email_template,
                    fail_silently=False
                )
                print(request.POST)
                print('post')
        else:
            messages.error(
                request, 'You are not authorized to send these requests. Please login as an administrator.')
            return redirect('innoservices:send-review-request')

    return render(request, 'client_reviews/send_review_request.html', context)


def record_review_confirmation(request, *args, **kwargs):
    '''
    This view will be shown to the clients who post a review for Innocelf.
    '''
    return render(request, 'client_reviews/record_review_confirmation.html')


def record_client_review(request, *args, **kwargs):
    '''
    This function takes in the unique uuid token to record a review that the client posted
    '''
    form = ClientReviewForm()

    unique_uuid = kwargs['uuid_token']

    # Filter review requests to get the client first name and last name
    client_review_request = SendReviewRequest.objects.filter(
        uuid=unique_uuid, uuid_used=False)

    if client_review_request:
        first_name = client_review_request[0].first_name
        last_name = client_review_request[0].last_name
        context = {
            'form': form,
            'first_name': first_name,
            'last_name': last_name
        }

        if request.POST:
            form = ClientReviewForm(request.POST)
            if form.is_valid():
                datetime_today = datetime.now()
                current_month = datetime_today.strftime('%B')
                current_year = datetime_today.strftime('%Y')
                month_year = current_month + ' ' + current_year

                new_review = ClientReview(
                    first_name=request.POST['first_name'],
                    last_name=request.POST['last_name'],
                    review=request.POST['review'],
                    month_year=month_year
                )
                new_review.save()

                client_review_request[0].uuid_used = True
                client_review_request[0].save()

                return redirect('innoservices:record-review-confirmation', uuid_token=unique_uuid)

        return render(request, 'client_reviews/record_review.html', context)

    else:
        messages.error(request,
                       'Your unique link has either expired or is incorrect. Please check the link, try again or contact us from our homepage.')
        return redirect('innoservices:home')
