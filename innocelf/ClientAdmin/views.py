import datetime
import json

from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import LoginView
from django.core import serializers
from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect, render, reverse

from .forms import LongTermClientForm, PotentialProjectForm, ProjectForm
from .models import LongTermClient, Payment, PotentialProject, Project


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
    long_term_client_form = LongTermClientForm()
    project_form = ProjectForm()
    potential_project_form = PotentialProjectForm()

    # Obtain all long term clients
    long_term_clients = LongTermClient.objects.all()
    long_term_clients_serialize = serializers.serialize(
        'json', long_term_clients)

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

    # Monthly revenue calculator
    monthly_revenue_dict = monthly_revenue_calculator()

    context = {
        'user': request.user,
        'long_term_client_form': long_term_client_form,
        'project_form': project_form,
        'potential_project_form': potential_project_form,
        'long_term_clients_serialize': long_term_clients_serialize,
        'potential_project_clients_serialize': potential_project_clients_serialize,
        'current_project_clients_serialize': current_project_clients_serialize,
        'payments_serialize': payments_serialize,
        'monthly_revenue_dict': monthly_revenue_dict
    }
    return render(request, 'ClientAdmin/client_admin_page.html', context)


def save_long_term_client(request, *args, **kwargs):
    '''
    Saves long term client via AJAX request
    '''
    post_request = request.POST
    long_term_client = LongTermClient(
        client_name=post_request['client_name'],
        client_company=post_request['client_company'],
        client_email=post_request['client_email'],
    )
    long_term_client.save()

    return JsonResponse({
        'message': 'Success'
    })


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
        return JsonResponse({
            'message': 'Fail'
        })
    else:
        potential_project_qs = PotentialProject.objects.all()
        potential_project_clients_serialize = serializers.serialize(
            'json', potential_project_qs)
        return JsonResponse({
            'message': 'Success',
            'potential_project_clients_serialize': potential_project_clients_serialize
        })


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
    if 'client_long_term' in post_request and post_request['client_long_term'] == 'on':
        new_project.client_long_term = True
    new_project.save()

    # Check whether this same instance was saved previously
    project_qs = Project.objects.filter(
        slug=new_project.slug)
    if len(project_qs) > 1:
        new_project.delete()
        return JsonResponse({
            'message': 'Fail'
        })
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

        project_qs = Project.objects.all()
        payment_qs = Payment.objects.all()
        current_project_clients_serialize = serializers.serialize(
            'json', project_qs)
        payments_serialize = serializers.serialize('json', payment_qs)

        return JsonResponse({
            'message': 'Success',
            'current_project_clients_serialize': current_project_clients_serialize,
            'payments_serialize': payments_serialize
        })


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


def make_client_current(request, *args, **kwargs):
    '''
    Makes the client current when the appropriate buttons are clicked, via AJAX
    '''
    potential_project_slug = request.POST['_elementId']
    potential_project = PotentialProject.objects.get(
        slug=potential_project_slug)

    potential_project.is_client_current = True
    potential_project.save()

    potential_project_qs = PotentialProject.objects.all()
    potential_project_clients_serialize = serializers.serialize(
        'json', potential_project_qs)

    return JsonResponse({
        'message': 'Success',
        'potential_project_clients_serialize': potential_project_clients_serialize
    })


def abandon_client(request, *args, **kwargs):
    '''
    Abandons the client when the appropriate buttons are clicked, via AJAX
    '''

    potential_project_slug = request.POST['_elementId']
    potential_project = PotentialProject.objects.get(
        slug=potential_project_slug)

    potential_project.is_client_abandoned = True
    potential_project.save()

    potential_project_qs = PotentialProject.objects.all()
    potential_project_clients_serialize = serializers.serialize(
        'json', potential_project_qs)

    return JsonResponse({
        'message': 'Success',
        'potential_project_clients_serialize': potential_project_clients_serialize
    })


def monthly_revenue_calculator():
    '''
    The function calculates and returns the monthly revenue as a dictionary
    '''
    payments = Payment.objects.all()
    unique_years = [d.year for d in payments.dates('payment_date', 'year')]

    monthly_revenue_dict = {}
    for year in unique_years:
        monthly_revenue_dict[str(year)] = {}

        unique_months = [d.month for d in payments.filter(payment_date__year=year).dates(
            'payment_date', 'month')]

        for month in unique_months:
            dollar_values = [d.amount for d in payments.filter(
                payment_date__year=year).filter(payment_date__month=month)]
            total_dollar_value = sum(dollar_values)

            monthly_revenue_dict[str(year)][str(month)] = total_dollar_value

    return monthly_revenue_dict
