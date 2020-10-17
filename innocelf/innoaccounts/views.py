import json
import urllib

from django.conf import settings
from django.contrib import messages
from django.shortcuts import render, redirect
from django.views.generic import View, FormView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.models import User
from django.contrib.auth.views import LoginView
from django.urls import reverse

from .forms import UserRegisterForm
from .models import InnocelfCustomer


def register_user(request):
    '''
    View to handle register user at Innocelf
    '''

    recaptcha_site_key = settings.RECAPTCHA_SITE_KEY

    if request.method == 'POST':
        recaptcha_response = request.POST.get(
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
            form = UserRegisterForm(request.POST)

            if form.is_valid():
                form.save()

                customer = InnocelfCustomer(
                    first_name=form.cleaned_data.get('first_name'),
                    last_name=form.cleaned_data.get('last_name'),
                    email=form.cleaned_data.get('email'),
                    phone=form.cleaned_data.get('phone'),
                    company_name=form.cleaned_data.get('company')
                )
                customer.save()

                messages.success(
                    request, 'Your profile has been created with the given username and password')

                return redirect('innoaccounts:login-user')
        else:
            messages.error(request, 'Invalid Recaptcha. Please try again.')
    else:
        form = UserRegisterForm()

    context = {
        'form': form,
        'recaptcha_site_key': recaptcha_site_key
    }
    return render(request, 'register_user.html', context)


class UserLogin(LoginView):

    template_name = 'user_login.html'

    def get(self, *args, **kwargs):
        return LoginView.get(self, self.request)

    def post(self, *args, **kwargs):
        settings.LOGIN_REDIRECT_URL = reverse(
            'innoaccounts:user-home', kwargs={'username': self.request.POST.get('username')})
        return LoginView.post(self, self.request)


class UserAccountView(View, LoginRequiredMixin):
    '''
    Class for user account view (particularly the homepage)
    '''

    def get(self, *args, **kwargs):
        '''
        Get request views and responses for user account view
        '''
        username = self.kwargs['username']
        user_qs = User.objects.get(username=username)
        context = {
            'user_qs': user_qs
        }

        return render(self.request, 'user_account_home.html', context=context)
