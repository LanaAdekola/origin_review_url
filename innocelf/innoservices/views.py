import os
import urllib.request
import urllib.parse
import json
from django.conf import settings
from django.contrib import messages
from django.shortcuts import render, redirect, reverse
from django.views.generic import FormView, ListView, View
from django.core.mail import send_mail
from django.http import HttpResponse

from .forms import ContactUsForm
from .models import ContactUs

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
    return render(request, 'about_us_and_testimonials.html')


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
