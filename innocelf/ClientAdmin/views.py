from django.shortcuts import render, redirect, reverse, HttpResponse
from django.contrib import messages
from django.contrib.auth.views import LoginView
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login
from .forms import ProjectForm, PotentialProjectForm
from .models import Project, PotentialProject
import json
from django.core import serializers
import datetime


class UserLogin(LoginView):
    '''
    The class inherits from the login view of Django and expands on that a little bit for providing
    login access for the Client Administration portal
    '''
    template_name = 'ClientAdmin/user_login.html'

    def get(self, *args, **kwargs):
        '''
        Returns the template in a get request
        '''
        return LoginView.get(self, self.request)

    def post(self, *args, **kwargs):
        '''
        Returns the post method when the login button is clicked
        '''
        username = self.request.POST['username']
        password = self.request.POST['password']
        user = authenticate(self.request,
                            username=username,
                            password=password)

        if user is not None:
            login(self.request, user=user)
            if self.request.user.is_superuser:
                return redirect('ClientAdmin:client-admin-view')
            else:
                messages.error(
                    self.request, 'Only administrative personnel are allowed to login into this portal. Please check that you have the necessary permissions and your credentials are accurate.'
                )
                return LoginView.get(self, self.request)
        else:
            messages.error(
                self.request, 'Only administrative personnel are allowed to login into this portal. Please check that you have the necessary permissions and your credentials are accurate.'
            )
            return LoginView.get(self, self.request)


@login_required
def client_admin_view(request, *args, **kwargs):
    '''
    Renders the client administration page
    '''
    # Initialize Forms
    project_form = ProjectForm()
    potential_project_form = PotentialProjectForm()

    # Obtain all potential projects
    potential_project_clients = PotentialProject.objects.all()
    potential_project_clients_serialize = serializers.serialize(
        'json', potential_project_clients)

    context = {
        'user': request.user,
        'project_form': project_form,
        'potential_project_form': potential_project_form,
        'potential_project_clients_serialize': potential_project_clients_serialize
    }
    return render(request, 'ClientAdmin/client_admin_page.html', context)


def save_potential_project(request, *args, **kwargs):
    '''
    Saves potential project when the the appropriate request comes through AJAX
    '''
    post_request = request.POST
    datetime_in_YYYYMMDD = datetime.datetime.fromtimestamp(
        int(post_request['initial_contact_date_timestamp']) / 1000.0
    )

    new_potential_project = PotentialProject(
        client_name=post_request['client_name'],
        client_company=post_request['client_company'],
        client_email=post_request['client_email'],
        project_name=post_request['project_name'],
        project_type=post_request['project_type'],
        initial_contact_date=datetime_in_YYYYMMDD
    )
    new_potential_project.save()

    return HttpResponse({'Success'})
