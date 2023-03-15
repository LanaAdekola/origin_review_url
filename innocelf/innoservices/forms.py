from django import forms
from .models import ContactUs, SendReviewRequest, ClientReview


class ContactUsForm(forms.ModelForm):

    class Meta:
        model = ContactUs
        fields = [
            'full_name',
            'email',
            'phone_number',
            'inquiry_reason',
            'explanation'
        ]

        widgets = {
            'full_name': forms.TextInput(attrs={
                'id': 'contact_us_first_name',
                'placeholder': 'Name',
                'required': 'true'
            }),
            'email': forms.EmailInput(attrs={
                'id': 'contact_us_email',
                'placeholder': 'your_email@domain.com',
                'required': 'true'
            }),
            'phone_number': forms.TextInput(attrs={
                'id': 'contact_us_phone',
                'placeholder': 'Phone Number (xxx-xxx-xxxx)',
                'required': 'true'
            }),
            'inquiry_reason': forms.Select(attrs={
                'id': 'contact_us_reason',
                'required': 'true'
            }),
            'explanation': forms.Textarea(attrs={
                'id': 'contact_explanation',
                'rows': '3',
                'placeholder': 'Please provide a brief summary of your inquiry. DO NOT include confidential information.',
            }),
        }

        labels = {
            'full_name': 'Full Name',
            'email': 'Email Address',
            'phone_number': 'Phone Number',
            'inquiry_reason': 'Inquiry Reason',
            'explanation': 'Brief Explanation',
        }


class SendReviewRequestForm(forms.ModelForm):
    '''
    This form will be shown to the person sending the review request to the client
    '''

    class Meta:
        model = SendReviewRequest
        fields = [
            'first_name',
            'last_name',
            'email'
        ]

        widgets = {
            'first_name': forms.TextInput(attrs={
                # 'class': 'form-control lato-regular',
                'id': 'contact_us_first_name',
                'placeholder': 'First Name',
                'required': 'true'
            }),
            'last_name': forms.TextInput(attrs={
                # 'class': 'form-control lato-regular',
                'id': 'contact_us_last_name',
                'placeholder': 'Last Name',
                'required': 'true'
            }),
            'email': forms.EmailInput(attrs={
                # 'class': 'form-control lato-regular',
                'id': 'contact_us_email',
                'placeholder': 'your_email@domain.com',
                'required': 'true'
            })
        }

        labels = {
            'first_name': 'First Name',
            'last_name': 'Last Name',
            'email': 'Email Address',
        }


class ClientReviewForm(forms.ModelForm):
    '''
    This generates a form for the clients to post their review after they have navigated to the page
    using the unique uuid token
    '''

    class Meta:
        model = ClientReview
        fields = [
            'first_name',
            'last_name',
            'review'
        ]

        widgets = {
            'first_name': forms.TextInput(attrs={
                # 'class': 'form-control lato-regular',
                'id': 'record_review_first_name',
                'placeholder': 'First Name',
                'required': 'true'
            }),
            'last_name': forms.TextInput(attrs={
                # 'class': 'form-control lato-regular',
                'id': 'record_review_last_name',
                'placeholder': 'Last Name',
                'required': 'true'
            }),
            'review': forms.Textarea(attrs={
                # 'class': 'form-control lato-regular',
                'id': 'record_review_review',
                'placeholder': 'Please write your review here.',
                'required': 'true'
            })
        }

        labels = {
            'first_name': 'First Name',
            'last_name': 'Last Name',
            'email': 'Email Address',
        }
