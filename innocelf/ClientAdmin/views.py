from django.shortcuts import render, redirect, reverse
from django.http import HttpResponse, JsonResponse
from django.contrib import messages
from django.contrib.auth.views import LoginView
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login
from .forms import ProjectForm, PotentialProjectForm
from .models import Project, PotentialProject, Payment
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

    # Obtain all potential clients / projects
    potential_project_clients = PotentialProject.objects.all()
    potential_project_clients_serialize = serializers.serialize(
        'json', potential_project_clients)

    # Obtain all current clients / projects
    current_project_clients = Project.objects.all()
    current_project_clients_serialize = serializers.serialize(
        'json', current_project_clients)

    # obtain all payments
    payments = Payment.objects.all()
    payments_serialize = serializers.serialize(
        'json', payments
    )

    context = {
        'user': request.user,
        'project_form': project_form,
        'potential_project_form': potential_project_form,
        'potential_project_clients_serialize': potential_project_clients_serialize,
        'current_project_clients_serialize': current_project_clients_serialize,
        'payments_serialize': payments_serialize
    }
    return render(request, 'ClientAdmin/client_admin_page.html', context)


def save_potential_project(request, *args, **kwargs):
    '''
    Saves potential project when the the appropriate request comes through AJAX
    '''
    post_request = request.POST
    initial_contact_date_yyyymmdd = datetime.datetime.fromtimestamp(
        int(post_request['initial_contact_date_timestamp']) / 1000.0
    )

    new_potential_project = PotentialProject(
        client_name=post_request['client_name'],
        client_company=post_request['client_company'],
        client_email=post_request['client_email'],
        project_name=post_request['project_name'],
        project_type=post_request['project_type'],
        initial_contact_date=initial_contact_date_yyyymmdd
    )
    new_potential_project.save()

    # Check whether this same instance was saved previously
    potential_project_qs = PotentialProject.objects.filter(
        slug=new_potential_project.slug)
    if len(potential_project_qs) > 1:
        new_potential_project.delete()
        return HttpResponse({'Fail'})
    else:
        return HttpResponse({'Success'})


def save_project(request, *args, **kwargs):
    '''
    Saves project when the appropriate request comes through AJAX
    '''
    post_request = request.POST
    project_deadline_yyyymmdd = datetime.datetime.fromtimestamp(
        int(post_request['project_deadline_timestamp']) / 1000.0
    )
    start_date_yyyymmdd = datetime.datetime.fromtimestamp(
        int(post_request['start_date_timestamp']) / 1000.0
    )
    end_date_yyyymmdd = datetime.datetime.fromtimestamp(
        int(post_request['end_date_timestamp']) / 1000.0
    )

    new_project = Project(
        client_name=post_request['client_name'],
        client_company=post_request['client_company'],
        client_email=post_request['client_email'],
        project_name=post_request['project_name'],
        project_type=post_request['project_type'],
        project_deadline=project_deadline_yyyymmdd,
        start_date=start_date_yyyymmdd,
        end_date=end_date_yyyymmdd,
        expected_revenue=post_request['expected_revenue'],
    )
    new_project.save()

    # Check whether this same instance was saved previously
    project_qs = Project.objects.filter(
        slug=new_project.slug)
    if len(project_qs) > 1:
        new_project.delete()
        return HttpResponse({'Fail'})
    else:
        if 'payment' in post_request:
            payment = float(post_request['payment'])
            new_payment = Payment(
                project=new_project,
                amount=payment,
                payment_date=datetime.datetime.today()
            )
            new_payment.save()
        else:
            payment = 0

        return HttpResponse({'Tested'})


def mark_project_complete(request, *args, **kwargs):
    '''
    Marks the project complete after the particular button has been clicked (via AJAX)
    '''
    project_slug = request.POST['_elementId']
    project_qs = Project.objects.get(
        slug=project_slug
    )

    project_qs.is_project_complete = True
    project_qs.save()

    return HttpResponse({'Success'})


def add_payment_modal(request, *args, **kwargs):
    '''
    Adds payments according to the project which are inputted via the modal
    '''
    project_slug = request.POST['_elementId']
    dollar_value = float(request.POST['dollarValue'])

    project_qs = Project.objects.get(slug=project_slug)
    new_payment = Payment(
        project=project_qs,
        amount=dollar_value,
        payment_date=datetime.datetime.today()
    )
    new_payment.save()

    # Obtain all current clients / projects
    current_project_clients = Project.objects.all()
    current_project_clients_serialize = serializers.serialize(
        'json', current_project_clients)

    # obtain all payments
    payments = Payment.objects.all()
    payments_serialize = serializers.serialize(
        'json', payments
    )

    return JsonResponse({
        'message': 'Success',
        'current_project_clients_serialize': current_project_clients_serialize,
        'payments_serialize': payments_serialize
    })
