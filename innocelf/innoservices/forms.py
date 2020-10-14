from django import forms
from .models import ContactUs


class ContactUsForm(forms.ModelForm):

    class Meta:
        model = ContactUs
        fields = [
            'first_name',
            'last_name',
            'email',
            'phone',
            'inquiry_reason',
            'explanation'
        ]

        widgets = {
            'first_name': forms.TextInput(attrs={
                'class': 'form-control lato-regular bg-transparent text-white',
                'id': 'contact_us_first_name',
                'placeholder': 'First Name'
            }),
            'last_name': forms.TextInput(attrs={
                'class': 'form-control lato-regular bg-transparent text-white',
                'id': 'contact_us_last_name',
                'placeholder': 'Last Name'
            }),
            'email': forms.EmailInput(attrs={
                'class': 'form-control lato-regular bg-transparent text-white',
                'id': 'contact_us_email',
                'placeholder': 'your_email@domain.com'
            }),
            'phone': forms.TextInput(attrs={
                'class': 'form-control lato-regular bg-transparent text-white',
                'id': 'contact_us_phone',
                'placeholder': 'XXX-XXX-XXXX',
                'pattern': '[0-9]{3}-[0-9]{3}-[0-9]{4}'
            }),
            'inquiry_reason': forms.Select(attrs={
                'class': 'custom-select custom-select-md lato-regular bg-transparent text-white',
                'id': 'contact_us_reason'
            }),
            'explanation': forms.Textarea(attrs={
                'class': 'form-control lato-regular bg-transparent text-white',
                'id': 'contact_explanation',
                'rows': '3',
                'placeholder': 'Please provide a brief summary of your inquiry. Please DO NOT provide confidential information.',
            }),
        }

        labels = {
            'first_name': 'First Name',
            'last_name': 'Last Name',
            'email': 'Email Address',
            'phone': 'Phone Number',
            'inquiry_reason': 'Inquiry Reason',
            'explanation': 'Brief Explanation',
        }
