from django import forms
from .models import (
    Project,
    LongTermClient,
    SendInventionDisclosureQuestionnaire,
    InventionDisclosureQuestionnaire
)
import datetime


class LongTermClientForm(forms.ModelForm):
    '''
    Creates a Long Term Client Form for easily creating a Long Term Client
    '''
    class Meta:
        model = LongTermClient
        fields = [
            'client_name',
            'client_company',
            'client_email'
        ]

        widgets = {
            'client_name': forms.TextInput(attrs={
                # 'class': 'form-control form-control-sm lato-regular',
                'id': 'add_long_term_client_clientName',
            }),
            'client_company': forms.TextInput(attrs={
                # 'class': 'form-control form-control-sm lato-regular',
                'id': 'add_long_term_client_clientCompany'
            }),
            'client_email': forms.EmailInput(attrs={
                # 'class': 'form-control form-control-sm lato-regular',
                'id': 'add_long_term_client_clientEmail'
            }),
        }

        labels = {
            'client_name': 'Client Full Name',
            'client_company': 'Client Company',
            'client_email': 'Client Email',
        }


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
            # 'project_assigned_to',
            'project_estimated_days',
            'start_date',
            'end_date',
            'expected_revenue'
        ]

        widgets = {
            'client_name': forms.TextInput(attrs={
                # 'class': 'form-control form-control-sm lato-regular',
                'id': 'add_project_clientName',
            }),
            'client_company': forms.TextInput(attrs={
                # 'class': 'form-control form-control-sm lato-regular',
                'id': 'add_project_clientCompany'
            }),
            'client_long_term': forms.CheckboxInput(attrs={
                # 'class': 'form-control form-control-sm',
                'id': 'add_project_isLongTermClient'
            }),
            'client_email': forms.EmailInput(attrs={
                # 'class': 'form-control form-control-sm lato-regular',
                'id': 'add_project_clientEmail'
            }),
            'project_name': forms.TextInput(attrs={
                # 'class': 'form-control form-control-sm lato-regular',
                'id': 'add_project_projectName'
            }),
            'project_type': forms.Select(attrs={
                # 'class': 'custom-select custom-select-sm lato-regular',
                'id': 'add_project_projectType'
            }),
            'project_deadline': forms.DateInput(attrs={
                # 'class': 'form-control form-control-sm lato-regular',
                'id': 'add_project_projectDeadline',
                'type': 'date'
            }),
            # 'project_assigned_to': forms.TextInput(attrs={
            #     # 'class': 'form-control form-control-sm lato-regular',
            #     'id': 'add_project_assignedTo'
            # }),
            'project_estimated_days': forms.NumberInput(attrs={
                # 'class': 'form-control form-control-sm lato-regular',
                'id': 'add_project_projectEstimatedDays'
            }),
            'start_date': forms.DateInput(attrs={
                # 'class': 'form-control form-control-sm lato-regular',
                'id': 'add_project_startDate',
                'type': 'date'
            }),
            'end_date': forms.DateInput(attrs={
                # 'class': 'form-control form-control-sm lato-regular',
                'id': 'add_project_endDate',
                'type': 'date'
            }),
            'expected_revenue': forms.NumberInput(attrs={
                # 'class': 'form-control form-control-sm lato-regular',
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
            # 'project_assigned_to': 'Assigned To',
            'project_estimated_days': 'Estimated Days for Completion',
            'start_date': 'Project Start Date',
            'end_date': 'Project End Date',
            'expected_revenue': 'Expected Revenue',
        }


class EditProjectForm(forms.ModelForm):
    '''
    Creates an instance of a form that will edit the Project already listed on the front end
    '''
    class Meta:
        model = Project
        fields = [
            'client_name',
            'client_company',
            'client_email',
            'project_name',
            'project_type',
            # 'project_assigned_to',
            'project_deadline',
            'expected_revenue'
        ]

        widgets = {
            'client_name': forms.TextInput(attrs={
                # 'class': 'form-control form-control-sm lato-regular',
                'id': 'edit_project_row_clientName',
            }),
            'client_company': forms.TextInput(attrs={
                # 'class': 'form-control form-control-sm lato-regular',
                'id': 'edit_project_row_clientCompany'
            }),
            'client_email': forms.EmailInput(attrs={
                # 'class': 'form-control form-control-sm lato-regular',
                'id': 'edit_project_row_clientEmail'
            }),
            'project_name': forms.TextInput(attrs={
                # 'class': 'form-control form-control-sm lato-regular',
                'id': 'edit_project_row_projectName'
            }),
            'project_type': forms.Select(attrs={
                # 'class': 'custom-select custom-select-sm lato-regular',
                'id': 'edit_project_row_projectType'
            }),
            # 'assigned_to': forms.TextInput(attrs={
            #     # 'class': 'form-control form-control-sm lato-regular',
            #     'id': 'add_project_assignedTo'
            # }),
            'project_deadline': forms.DateInput(attrs={
                # 'class': 'form-control form-control-sm lato-regular',
                'id': 'edit_project_row_projectDeadline',
                'type': 'date'
            }),
            'expected_revenue': forms.TextInput(attrs={
                # 'class': 'form-control form-control-sm lato-regular',
                'id': 'edit_project_row_expectedRevenue',
                'type': 'number',
                'min': '0',
                'max': '1000000',
                'value': '0'
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
            # 'project_assigned_to': 'Assigned To',
            'expected_revenue': 'Expected Revenue',
        }


class SendInventionDisclosureQuestionnaireForm(forms.ModelForm):
    '''
    The form is the model form for sending the invention disclosure questionnaire
    to the client
    '''
    class Meta:
        model = SendInventionDisclosureQuestionnaire
        fields = [
            'client_name',
            'client_company',
            'client_email'
        ]

        widgets = {
            'client_name': forms.TextInput(attrs={
                'id': 'send_invention_disc_ques_clientName',
                'placeholder': 'Client Full Name',
                'required': 'True'
            }),
            'client_company': forms.TextInput(attrs={
                'id': 'send_invention_disc_ques_clientCompany',
                'placeholder': 'Client Company Name',
                'required': 'False'
            }),
            'client_email': forms.EmailInput(attrs={
                'id': 'send_invention_disc_ques_clientEmail',
                'placeholder': 'client_email@domain.com',
                'required': 'True'
            }),
        }

        labels = {
            'client_name': 'Client Full Name',
            'client_company': 'Client Company',
            'client_email': 'Client Email Address'
        }


class InventionDisclosureQuestionnaireForm(forms.ModelForm):
    '''
    The class creates a form object based on the Invention Disclosure
    Questionnaire model
    '''
    class Meta:
        model = InventionDisclosureQuestionnaire
        fields = [
            'client_name',
            'client_company',
            'client_email',
            'title',
            'category',
            'summary',
            'problem_solved',
            'closest_art',
            'competing_products',
            'advantages',
            'future_improvements',
            'drawings'
        ]

        widgets = {
            'client_name': forms.TextInput(attrs={
                'id': 'invention_disc_quest_clientName',
                'placeholder': 'Full Name',
                'required': 'True'
            }),
            'client_company': forms.TextInput(attrs={
                'id': 'invention_disc_quest_clientCompany',
                'placeholder': 'Company',
                'required': 'False'
            }),
            'client_email': forms.EmailInput(attrs={
                'id': 'invention_disc_quest_clientEmail',
                'placeholder': 'Email',
                'required': 'True'
            }),
            'title': forms.TextInput(attrs={
                'id': 'invention_disc_quest_title',
                # 'placeholder': 'Please provide a short descriptive title which' +
                # ' conveys the nature of the invention',
                'required': 'True'
            }),
            'category': forms.Select(attrs={
                'id': 'invention_disc_quest_category'
            }),
            'summary': forms.Textarea(attrs={
                'id': 'invention_disc_quest_summary',
                # 'placeholder': 'Please provide a summary of the invention in' +
                # ' several sentences, identifying what you consider to be' +
                # ' important aspects of the invention, and/or the' +
                # ' improvements over the existing state of the art',
                'required': 'True',
                'rows': '3'
            }),
            'problem_solved': forms.Textarea(attrs={
                'id': 'invention_disc_quest_problemSolved',
                # 'placeholder': 'The technical problem addressed by the invention',
                'required': 'True',
                'rows': '3'
            }),
            'closest_art': forms.Textarea(attrs={
                'id': 'invention_disc_quest_closestArt',
                # 'placeholder': 'The closest related prior art. This could include:' +
                # ' patents, publications, magazines, articles, website links.',
                'required': 'True',
                'rows': '3'
            }),
            'competing_products': forms.Textarea(attrs={
                'id': 'invention_disc_quest_competingProducts',
                # 'placeholder': 'Please identify any products on the market, ' +
                # 'or products you believe will be entering the market, ' +
                # 'with which the invention will compete.',
                'required': 'True',
                'rows': '3'
            }),
            'advantages': forms.Textarea(attrs={
                'id': 'invention_disc_quest_advantages',
                # 'placeholder': 'Advantages presented by your invention.',
                'required': 'True',
                'rows': '3'
            }),
            'future_improvements': forms.Textarea(attrs={
                'id': 'invention_disc_quest_futureImprovements',
                # 'placeholder': 'Please discuss additional development of the ' +
                # 'invention, that is, improvements and other modifications and ' +
                # 'alternatives you believe are appropriate for the ' +
                # 'invention. If you are currently engaged in working on ' +
                # 'such additional improvements or modifications, please ' +
                # 'describe and estimate when you believe the work will be completed.',
                'required': 'False',
                'rows': '3'
            }),
            'drawings': forms.FileInput(attrs={
                'id': 'invention_disc_quest_drawings',
            })
        }

        labels = {
            'client_name': 'Full Name',
            'client_company': 'Company Name',
            'client_email': 'Your Email',
            'title': 'Proposed Title of the Invention',
            'category': 'Category of the Invention',
            'summary': 'Summary of the Invention',
            'problem_solved': 'Technical Problem Addressed',
            'closest_art': 'Closest Related Art',
            'competing_products': 'Any Competing Products?',
            'advantages': 'Advantages of the Invention',
            'future_improvements': 'Any Planned Future Improvements?',
            'drawings': 'Drawings or Pictures'
        }
