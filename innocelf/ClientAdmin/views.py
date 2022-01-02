import datetime
import json
import uuid
import os

from django.conf import settings
from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import LoginView
from django.core import serializers
from django.core.mail import send_mail
from django.template.loader import get_template
from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect, render, reverse
from django.middleware.csrf import get_token

from ClientAdmin.forms import (
    LongTermClientForm,
    ProjectForm,
    EditProjectForm,
    SendInventionDisclosureQuestionnaireForm,
    InventionDisclosureQuestionnaireForm
)
from ClientAdmin.models import (
    LongTermClient,
    Payment,
    Project,
    SendInventionDisclosureQuestionnaire,
    InventionDisclosureQuestionnaire,
    Invoice
)
from ClientAdmin.generate_invoice.invoice_generator import create_canvas_and_save


def _csrf_token_input_html(request):
    '''
    The function returns a input element with the appropriate attributes and a
    new csrf token
    '''
    csrf_token = get_token(request)
    csrf_token_html = '<input type="hidden" name="csrfmiddlewaretoken" value="{}" />'.format(
        csrf_token)

    return csrf_token_html


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


def obtain_long_term_client_form(request, *args, **kwargs):
    '''
    The function gathers the long term client form and sends it to the frontend
    via XML request
    '''
    long_term_client_form = LongTermClientForm()
    return HttpResponse(long_term_client_form)


def save_long_term_client_form(request, *args, **kwargs):
    '''
    The function saves the long term client form in a model instance
    '''
    csrf_token_html = _csrf_token_input_html(request)

    if request.method == 'POST':
        post_request = request.POST
        form = LongTermClientForm(request.POST)

        if form.is_valid():
            form.save()

            return JsonResponse(
                {
                    'Success': 'The long term client has been saved successfully.',
                    'csrftoken': csrf_token_html
                }
            )

        else:
            return JsonResponse(
                {
                    'Failure': 'Something went wrong. The form did not save. Please try again.',
                    'csrftoken': csrf_token_html
                }
            )


def obtain_long_term_clients_list(request, *args, **kwargs):
    '''
    The function gathers the long term clients as saved in the database and
    serializes them for pushing them to the front end
    '''
    long_term_clients = LongTermClient.objects.all()
    long_term_clients_serialize = serializers.serialize(
        'json',
        long_term_clients
    )
    return HttpResponse(long_term_clients_serialize)


def obtain_add_project_form(request, *args, **kwargs):
    '''
    The function gathers the add project form and sends it to the frontend via
    XML request
    '''
    add_project_form = ProjectForm()
    return HttpResponse(add_project_form)


def save_add_project_form(request, *args, **kwargs):
    '''
    The function saves the long term client form in a model instance for later use
    '''
    csrf_token_html = _csrf_token_input_html(request)

    if request.method == 'POST':
        post_request = request.POST
        form = ProjectForm(request.POST)

        if form.is_valid():
            form.save()
            return JsonResponse({
                'Success': 'The project was saved successfully.',
                'csrftoken': csrf_token_html
            })
        else:
            return JsonResponse({
                'Failure': 'The project was NOT saved successfully. Please try again and input all values.',
                'csrftoken': csrf_token_html
            })


def obtain_revenue_dict(request, *args, **kwargs):
    '''
    The view / function obtains the revenue dict from the backend and sends it
    to the front end
    '''
    monthly_revenue_dict = monthly_revenue_calculator()
    return JsonResponse(monthly_revenue_dict)


def obtain_projects(request, *args, **kwargs):
    '''
    The function / view obtains all the projects from the backend to the frontend
    '''
    projects = Project.objects.all()

    projects_json_string = serializers.serialize('json', projects)
    projects_json = json.loads(projects_json_string)
    for project in projects_json:
        payment = Payment.objects.filter(
            project=Project.objects.get(
                slug=project['fields']['slug']
            )
        )
        payment_json = serializers.serialize('json', payment)
        project['fields']['payments'] = payment_json

    projects_json_string = json.dumps(projects_json)

    return HttpResponse(projects_json_string)


def mark_project_complete(request, *args, **kwargs):
    '''
    Marks the project complete after the particular button has been clicked (via AJAX)
    '''
    json_response = json.loads(request.read().decode('utf-8'))
    project_slug = json_response['_elementId']
    # project_slug = request.POST['_elementId']
    project_qs = Project.objects.get(
        slug=project_slug
    )

    project_qs.is_project_complete = True
    project_qs.save()

    return HttpResponse({'Success'})


def mark_invoice_sent(request, *args, **kwargs):
    '''
    Marks the invoice as sent after the particular button has been clicked (via AJAX)
    '''
    json_response = json.loads(request.read().decode('utf-8'))
    project_slug = json_response['_elementId']

    # project_slug = request.POST['_elementId']
    project_qs = Project.objects.get(
        slug=project_slug
    )

    project_qs.is_invoice_sent = True
    project_qs.save()

    return HttpResponse({'Success'})


def obtain_payments_for_project(request, *args, **kwargs):
    '''
    The function / view obtains the payment information for a particular project
    This payment information is for only one project based on the slug
    '''
    project_slug = request.headers['Slug']
    project_qs = Project.objects.get(slug=project_slug)

    payments = Payment.objects.filter(
        project=project_qs
    )
    payments_json = serializers.serialize(
        'json', payments
    )

    return HttpResponse(payments_json)


def add_payment_modal(request, *args, **kwargs):
    '''
    Adds payments according to the project which are inputted via the modal
    '''
    json_response = json.loads(request.read().decode('utf-8'))
    project_slug = json_response['_elementId']
    dollar_value = json_response['dollarValue']
    # project_slug = request.POST['_elementId']
    # dollar_value = float(request.POST['dollarValue'])

    project_qs = Project.objects.get(slug=project_slug)
    new_payment = Payment(
        project=project_qs,
        amount=dollar_value,
        payment_date=datetime.datetime.today()
    )
    new_payment.save()

    payments = Payment.objects.filter(
        project=project_qs
    )
    payments_serialize = serializers.serialize('json', payments)

    return JsonResponse({
        'message': 'Success',
        'payments_serialize': payments_serialize
    })


def obtain_edit_project_form(request, *args, **kwargs):
    '''
    The function gathers the add project form and sends it to the frontend via
    XML request
    '''
    edit_project_form = EditProjectForm()
    return HttpResponse(edit_project_form)


def save_edit_project_form(request, *args, **kwargs):
    '''
    The function takes in the edit project form output and saves it into the 
    respective project
    '''
    post_request = request.POST
    project = Project.objects.get(
        slug=post_request['project_slug']
    )
    project.client_name = post_request['client_name']
    project.client_company = post_request['client_company']
    project.client_email = post_request['client_email']
    project.project_name = post_request['project_name']
    project.project_type = post_request['project_type']
    project.project_deadline = datetime.datetime.fromisoformat(
        post_request['project_deadline']
    )
    project.expected_revenue = float(post_request['expected_revenue'])

    project.save()

    project_qs = Project.objects.get(
        slug=project.slug
    )
    project_qs_serialized = serializers.serialize('json', [project_qs])

    return JsonResponse({
        'message': 'Success',
        'project_qs_serialized': project_qs_serialized
    })


def monthly_revenue_calculator():
    '''
    The function calculates and returns the monthly revenue as a dictionary
    '''
    payments = Payment.objects.all()
    unique_years = [d.year for d in payments.dates('payment_date', 'year')]
    unique_months = range(1, 13)

    monthly_revenue_dict = {}
    for year in unique_years:
        monthly_revenue_dict[str(year)] = {}

        # unique_months = [d.month for d in payments.filter(payment_date__year=year).dates(
        #     'payment_date', 'month')]

        for month in unique_months:
            dollar_values = [d.amount for d in payments.filter(
                payment_date__year=year).filter(payment_date__month=month)]
            total_dollar_value = sum(dollar_values)

            monthly_revenue_dict[str(year)][str(month)] = total_dollar_value

    return monthly_revenue_dict


def obtain_send_invention_disclosure_quest_form(request, *args, **kwargs):
    '''
    The view sends the send invention disclosure form questionnaire to the
    frontend
    '''
    send_invention_disc_quest_form = SendInventionDisclosureQuestionnaireForm()
    return HttpResponse(send_invention_disc_quest_form)


def save_send_invention_disclosure_quest_form(request, *args, **kwargs):
    '''
    The view sends the response from the form save event to the frontend
    '''
    csrf_token_html = _csrf_token_input_html(request)

    post_request = request.POST
    form = SendInventionDisclosureQuestionnaireForm(request.POST)

    if form.is_valid():
        unique_uuid = uuid.uuid4().hex
        send_invention_disc_quest = SendInventionDisclosureQuestionnaire.objects.create(
            client_name=post_request['client_name'],
            client_company=post_request['client_company'],
            client_email=post_request['client_email'],
            uuid=unique_uuid
        )

        link_expiry_date = (datetime.date.today() + datetime.timedelta(days=15)).strftime(
            '%d %B, %Y'
        )
        email_context = {
            'client_name': post_request['client_name'],
            'link_expiry_date': link_expiry_date,
            # 'unique_link': f'http://127.0.0.1:8000/complete-invention-disclosure-questionnaire/{unique_uuid}/',
            'unique_link': f'https://www.innocelf.com/complete-invention-disclosure-questionnaire/{unique_uuid}/'
        }
        email_template = get_template(
            '../templates/client_reviews/email_template_invention_disc_quest.html'
        ).render(email_context)

        send_mail(
            subject='Request to Complete Invention Disclosure Questionnaire-- Innocelf, LLC',
            message='',
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[post_request['client_email']],
            html_message=email_template,
            fail_silently=False
        )

        return JsonResponse(
            {
                'Success': 'The questionnaire request was sent successfully.',
                'csrftoken': csrf_token_html
            }
        )
    else:
        return JsonResponse(
            {
                'Failure': 'The form was not validated. Please ensure all fields are inputted',
                'csrftoken': csrf_token_html
            }
        )


def complete_invention_disclosure_questionnaire(request, *args, **kwargs):
    '''
    The function / view renders the invention disclosure form for the client to
    complete the questionnaire
    '''
    unique_uuid = kwargs['uuid_token']
    send_invention_disc_quest = SendInventionDisclosureQuestionnaire.objects.filter(
        uuid=unique_uuid,
        uuid_used=False
    )

    if len(send_invention_disc_quest) > 0:
        client_name = send_invention_disc_quest[0].client_name
        client_company = send_invention_disc_quest[0].client_company
        client_email = send_invention_disc_quest[0].client_email

        context = {
            'uuid_used': False,
            'client_name': client_name,
            'client_company': client_company,
            'client_email': client_email
        }
        return render(
            request,
            'ClientAdmin/invention_disclosure_questionnaire.html',
            context
        )

    else:
        context = {
            'uuid_used': True
        }
        return render(
            request,
            'ClientAdmin/invention_disclosure_questionnaire.html',
            context
        )


def obtain_invention_disclosure_quest_form(request, *args, **kwargs):
    '''
    The view sends the invention disclosure form questionnaire to the
    frontend
    '''
    client_name = request.META.get('HTTP_CLIENTNAME')
    client_company = request.META.get('HTTP_CLIENTCOMPANY')
    client_email = request.META.get('HTTP_CLIENTEMAIL')
    names_dict = {
        'client_name': client_name,
        'client_company': client_company,
        'client_email': client_email
    }
    invention_disc_quest_form = InventionDisclosureQuestionnaireForm(
        initial=names_dict
    )
    return HttpResponse(invention_disc_quest_form)


def recieve_invention_disclosure_quest_form(request, *args, **kwargs):
    '''
    The view recieves the invention disclosure questionnaire form
    '''
    post_request = request.POST
    form = InventionDisclosureQuestionnaireForm(post_request)
    if form.is_valid():
        instance = InventionDisclosureQuestionnaire.objects.create(
            client_name=post_request['client_name'],
            client_company=post_request['client_company'],
            client_email=post_request['client_email'],
            title=post_request['title'],
            category=post_request['category'],
            summary=post_request['summary'],
            problem_solved=post_request['problem_solved'],
            closest_art=post_request['closest_art'],
            competing_products=post_request['competing_products'],
            advantages=post_request['advantages'],
            future_improvements=post_request['future_improvements']
        )
        instance.save()

        all_files = request.FILES.getlist('drawings')

        slug = instance.slug
        os.makedirs(
            os.path.join(
                settings.BASE_DIR,
                'media/InventionDiscQuestForm/' + slug
            ),
            exist_ok=True
        )
        for f in all_files:
            destination_path = os.path.join(
                settings.BASE_DIR,
                'media/InventionDiscQuestForm/' + slug + '/' + f.name
            )
            with open(destination_path, 'wb+') as destination:
                for chunk in f.chunks():
                    destination.write(chunk)

        # Disable the UUID as used
        send_instance = SendInventionDisclosureQuestionnaire.objects.get(
            uuid=post_request['uuid_token'],
            uuid_used=False
        )
        send_instance.uuid_used = True
        send_instance.save()

        return JsonResponse(
            {'Success': 'Your questionnaire entries were recorded successfully. Thank you for taking the time to fill your responses. We will contact you if we need more details.'}
        )

    else:
        return JsonResponse({
            'Failure': 'The form was not valid. Please try again.'
        })


def _get_next_invoice_number():
    '''
    The function returns a valid invoice number to be sent to the front end
    when the current invoice is saved
    '''
    todays_date = datetime.date.today()

    all_invoices_curr_mnth = Invoice.objects.filter(
        created_on__year=todays_date.year,
        created_on__month=todays_date.month
    )

    todays_month_str = "{:02d}".format(todays_date.month)
    next_invoice_str = "{:04d}".format(len(all_invoices_curr_mnth) + 1)

    new_invoice_number = f'{todays_date.year}-{todays_month_str}-{next_invoice_str}'

    return new_invoice_number


def get_next_invoice_number(request, *args, **kwargs):
    '''
    The view sends the next invoice number to the front end
    '''
    next_invoice_number = _get_next_invoice_number()

    return HttpResponse(next_invoice_number)


def generate_invoice(request, *args, **kwargs):
    '''
    The view takes in information from the front end regarding invoice details
    and generates a new invoice using the PDF generator
    '''
    post_request = request.POST

    invoice_filename = post_request['client-name'] + '-' + \
        post_request['invoice-number'] + '.pdf'
    pdf_path = './media/GeneratedInvoices/' + invoice_filename
    invoice_number = post_request['invoice-number']

    if post_request['address-line-2'] != '':
        name_address_list = [
            post_request['client-name'],
            post_request['address-line-1'],
            post_request['address-line-2'],
            post_request['address-line-3']
        ]
        address_list = [
            post_request['address-line-1'],
            post_request['address-line-2'],
            post_request['address-line-3'],
        ]
        complete_address = ",".join(address_list)
    else:
        name_address_list = [
            post_request['client-name'],
            post_request['address-line-1'],
            post_request['address-line-3']
        ]
        address_list = [
            post_request['address-line-1'],
            post_request['address-line-3'],
        ]
        complete_address = ",".join(address_list)

    services_list = []
    total_amount = 0
    for i in range(10):
        if post_request['service-desc-' + str(i + 1)] != '':
            service = [
                post_request['service-desc-' + str(i + 1)],
                post_request['service-quantity-' + str(i + 1)],
                float(post_request['service-cost-' + str(i + 1)])
            ]
            services_list.append(service)

            total_amount += float(post_request['service-cost-' + str(i + 1)])

    create_canvas_and_save(
        pdf_path,
        invoice_number,
        name_address_list,
        services_list,
        total_amount
    )

    # Create new invoice instance
    invoice_ins_filename = '/media/GeneratedInvoices/' + invoice_filename
    Invoice.objects.create(
        number=invoice_number,
        created_on=datetime.date.today(),
        client_name_company=post_request['client-name'],
        address=complete_address,
        filename=invoice_ins_filename
    )

    new_invoice_number = _get_next_invoice_number()

    return JsonResponse(
        {
            'Success': 'Invoice was generated successfully',
            'InvoiceURL': invoice_ins_filename,
            'NewInvoiceNumber': new_invoice_number
        }
    )


def download_invoices(request, *args, **kwargs):
    '''
    The function grabs the latest five invoices that were created and makes
    them available for download
    '''
    invoices = Invoice.objects.all().order_by('-id')[:5]
    invoices_serialize = serializers.serialize('json', invoices)

    return HttpResponse(invoices_serialize)


@login_required(login_url='/client-admin/login')
def client_admin_view(request, *args, **kwargs):
    '''
    Renders the client administration page
    '''
    # Initialize Forms
    long_term_client_form = LongTermClientForm()
    project_form = ProjectForm()
    edit_project_form = EditProjectForm()

    # Obtain all long term clients
    long_term_clients = LongTermClient.objects.all()
    long_term_clients_serialize = serializers.serialize(
        'json', long_term_clients)

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

    # Next Invoice Number
    next_invoice_number = _get_next_invoice_number()

    context = {
        'user': request.user,
        'long_term_client_form': long_term_client_form,
        'project_form': project_form,
        'edit_project_form': edit_project_form,
        'long_term_clients_serialize': long_term_clients_serialize,
        'current_project_clients_serialize': current_project_clients_serialize,
        'payments_serialize': payments_serialize,
        'monthly_revenue_dict': monthly_revenue_dict,
        'next_invoice_number': next_invoice_number
    }
    return render(request, 'ClientAdmin/client_admin_page.html', context)
