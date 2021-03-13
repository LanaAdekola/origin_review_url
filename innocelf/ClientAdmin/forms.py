from django import forms
from .models import Project, PotentialProject
import datetime


class ProjectForm(forms.ModelForm):
    '''
    Creates a Project form for easily creating a project for a particular client
    '''
    class Meta:
        model = Project
        fields = [
            'client_name',
            'client_company',
            'client_long_term',
            'client_email',
            'project_name',
            'project_type',
            'project_deadline',
            'project_estimated_days',
            'start_date',
            'end_date',
            'expected_revenue'
        ]

        widgets = {
            'client_name': forms.TextInput(attrs={
                'class': 'form-control lato-regular',
                'id': 'add_project_clientName',
            }),
            'client_company': forms.TextInput(attrs={
                'class': 'form-control lato-regular',
                'id': 'add_project_clientCompany'
            }),
            'client_long_term': forms.CheckboxInput(attrs={
                'class': 'form-control',
                'id': 'add_project_isLongTermClient'
            }),
            'client_email': forms.EmailInput(attrs={
                'class': 'form-control lato-regular',
                'id': 'add_project_clientEmail'
            }),
            'project_name': forms.TextInput(attrs={
                'class': 'form-control lato-regular',
                'id': 'add_project_projectName'
            }),
            'project_type': forms.Select(attrs={
                'class': 'custom-select custom-select-sm lato-regular',
                'id': 'add_project_projectType'
            }),
            'project_deadline': forms.DateInput(attrs={
                'class': 'form-control lato-regular',
                'id': 'add_project_projectDeadline',
                # 'type': 'date'
            }),
            'project_estimated_days': forms.NumberInput(attrs={
                'class': 'form-control lato-regular',
                'id': 'add_project_projectEstimatedDays'
            }),
            'start_date': forms.DateInput(attrs={
                'class': 'form-control lato-regular',
                'id': 'add_project_startDate',
                # 'type': 'date'
            }),
            'end_date': forms.DateInput(attrs={
                'class': 'form-control lato-regular',
                'id': 'add_project_endDate',
                # 'type': 'date'
            }),
            'expected_revenue': forms.TextInput(attrs={
                'class': 'form-control lato-regular',
                'id': 'add_project_expectedRevenue'
            }),
        }

        labels = {
            'client_name': 'Client Full Name',
            'client_company': 'Client Company (Optional)',
            'client_long_term': 'Long Term Client?',
            'client_email': 'Client Email',
            'project_name': 'Project Name',
            'project_type': 'Project Type',
            'project_deadline': 'Project Deadline',
            'project_estimated_days': 'Estimated Days for Completion',
            'start_date': 'Project Start Date',
            'end_date': 'Project End Date',
            'expected_revenue': 'Expected Revenue',
        }


class PotentialProjectForm(forms.ModelForm):
    '''
    Creates an instance of a model form gleaning from the potential project model that has been created
    '''

    class Meta:
        model = PotentialProject
        fields = [
            'client_name',
            'client_company',
            'client_email',
            'project_name',
            'project_type',
            'initial_contact_date',
        ]

        date = datetime.datetime.today().strftime('%Y-%m-%d')

        widgets = {
            'client_name': forms.TextInput(attrs={
                'class': 'form-control lato-regular',
                'id': 'add_potentialProject_clientName',
            }),
            'client_company': forms.TextInput(attrs={
                'class': 'form-control lato-regular',
                'id': 'add_potentialProject_clientCompany'
            }),
            'client_email': forms.EmailInput(attrs={
                'class': 'form-control lato-regular',
                'id': 'add_potentialProject_clientEmail'
            }),
            'project_name': forms.TextInput(attrs={
                'class': 'form-control lato-regular',
                'id': 'add_potentialProject_projectName'
            }),
            'project_type': forms.Select(attrs={
                'class': 'custom-select custom-select-sm lato-regular',
                'id': 'add_potentialProject_projectType'
            }),
            'initial_contact_date': forms.DateInput(attrs={
                'class': 'form-control lato-regular',
                'id': 'add_potentialProject_initialContactDate',
            }),
        }

        labels = {
            'client_name': 'Client Full Name',
            'client_company': 'Client Company',
            'client_email': 'Client Email',
            'project_name': 'Project Name',
            'project_type': 'Project Type',
            'initial_contact_date': 'Initial Contact Date',
        }
