import json
import urllib
import os

from django.conf import settings
from django.contrib import messages
from django.shortcuts import render, redirect
from django.views.generic import View, FormView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.models import User
from django.contrib.auth.views import LoginView
from django.urls import reverse
from django.core import serializers
from django.http import HttpResponse

from .forms import (
    UserRegisterForm,
    InnocelfStartProjectForm,
)
from .models import (
    InnocelfClient,
    InnocelfStartProject,
)


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

                client = InnocelfClient(
                    first_name=form.cleaned_data.get('first_name'),
                    last_name=form.cleaned_data.get('last_name'),
                    email=form.cleaned_data.get('email'),
                    phone=form.cleaned_data.get('phone'),
                    company_name=form.cleaned_data.get('company')
                )
                client.save()

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


#class UserLogin(LoginView):

    #template_name = 'user_login.html'

    #def get(self, *args, **kwargs):
        #return LoginView.get(self, self.request)

    #def post(self, *args, **kwargs):
        #settings.LOGIN_REDIRECT_URL = reverse(
            #'innoaccounts:client-home', kwargs={'user': self.request.POST.get('username')})
        #return LoginView.post(self, self.request)


class UserAccountView(View, LoginRequiredMixin):
    '''
    Class for user account view (particularly the homepage)
    '''

    def get(self, *args, **kwargs):
        '''
        Get request views and responses for user account view
        '''
        username = self.kwargs['user']
        user_qs = User.objects.get(username=username)

        client_qs = InnocelfClient.objects.get(
            first_name=user_qs.first_name, last_name=user_qs.last_name)
        json_client_qs = serializers.serialize('json', [client_qs, ])

        context = {
            'user_qs': user_qs,
            'client_qs': client_qs,
            'json_client_qs': json_client_qs
        }

        if 'profile' in self.request.get_full_path():
            return render(self.request, 'client_account_home/client_profile.html', context=context)
        else:
            return render(self.request, 'client_account_home/client_home.html', context=context)


def upload_global_nda_documents(user, client, pdf_binary):
    '''
    Uploads the data in the desired folder based on the Innocelf folder structure
    Returns the folder where it is stored for database saving
    '''

    username = user.username
    client_first_name = client.first_name
    client_last_name = client.last_name
    client_company = client.company_name

    desired_filename = username + '_' + client_first_name + \
        '_' + client_last_name + '_global_nda.pdf'
    desired_folder = username + '_' + client_first_name + '_' + client_last_name

    complete_folder = os.path.join(settings.MEDIA_ROOT, desired_folder)
    os.makedirs(complete_folder, exist_ok=True)

    with open(os.path.join(complete_folder, desired_filename), 'wb') as f:
        for chunks in pdf_binary.open().chunks():
            f.write(chunks)

    database_folder_filename = os.path.join(desired_folder, desired_filename)

    return database_folder_filename


def update_client_profile(request, *args, **kwargs):
    '''
    This function takes in AJAX requests from the server side to update the profile of the client as
    they want it.. Includes parsing NDA document and saving it appropiately
    '''
    post_request = request.POST

    # Obtain user information here
    # FIXME What happens in incognito window
    username = request.user.username
    user_qs = User.objects.get(username=username)

    client_qs = InnocelfClient.objects.get(
        first_name=user_qs.first_name,
        last_name=user_qs.last_name
    )

    client_qs.first_name = post_request.get('client_first_name')
    client_qs.last_name = post_request.get('client_last_name')
    client_qs.company_name = post_request.get('client_company')
    client_qs.email = post_request.get('client_email')
    client_qs.phone = post_request.get('client_phone')

    if post_request.get('client_use_global_nda') == 'on':
        client_qs.global_nda_authorization = True
        global_nda_path = upload_global_nda_documents(
            user_qs,
            client_qs,
            request.FILES.getlist('client_global_nda')[0]
        )
        client_qs.global_nda_document = global_nda_path
    else:
        client_qs.global_nda_authorization = False

    # client_qs.save()

    return HttpResponse({
        'data': 'Successful'
    })


class StartProjectRequest(View):
    '''
    Class to initiate and save a new project request that is based on the InnocelfStartProject model
    '''

    template_name = 'client_account_home/client_start_new_project.html'
    model = InnocelfStartProject
    form = InnocelfStartProjectForm

    def get(self, *args, **kwargs):
        '''
        Get request for the form that will filled out by existing clients to start a project
        '''
        form_qs = self.form
        username = self.kwargs['user']
        user_qs = User.objects.get(username=username)

        client_qs = InnocelfClient.objects.get(
            first_name=user_qs.first_name, last_name=user_qs.last_name)
        json_client_qs = serializers.serialize('json', [client_qs, ])

        context = {
            'form': form_qs,
            'user_qs': user_qs,
            'client_qs': client_qs,
            'json_client_qs': json_client_qs
        }

        return render(self.request, self.template_name, context)

    def post(self, *args, **kwargs):
        '''
        Handle post request of the start project request from a particular client
        '''
        if self.request.is_ajax():
            form_qs = self.form(self.request.POST)
            user = self.request.user
            user_qs = User.objects.get(username=user.get_username())

            client_qs = InnocelfClient.objects.get(
                first_name=user_qs.first_name, last_name=user_qs.last_name
            )

            if form_qs.is_valid():
                new_start_project_request = self.model()
                new_start_project_request.client = client_qs
                new_start_project_request.project_type = form_qs.cleaned_data['project_type']
                new_start_project_request.project_description = form_qs.cleaned_data[
                    'project_description']
                # new_start_project_request.save()

                return HttpResponse({
                    'Success'
                })

            else:

                return HttpResponse({
                    'data': 'Failure'
                })
