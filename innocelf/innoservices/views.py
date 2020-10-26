import os
import urllib
import json
from django.conf import settings
from django.contrib import messages
from django.shortcuts import render, redirect
from django.views.generic import FormView, ListView, View

from .forms import ContactUsForm
from .models import ContactUs

# Create your views here.


def home_view(request, *args, **kwargs):
    '''
    Defining homepage of Innocelf
    '''
    return render(request, 'home_page.html')


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
                return redirect('innoservices:contact-us')

            else:
                messages.error(
                    self.request, 'Re-Captcha Failed. Please try again later.')
