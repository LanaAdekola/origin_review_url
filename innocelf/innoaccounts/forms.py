from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm


class UserRegisterForm(UserCreationForm):

    first_name = forms.CharField(max_length=255, required=True, min_length=2)
    last_name = forms.CharField(max_length=255, required=True, min_length=2)
    email = forms.EmailField()

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username',
                  'email', 'password1', 'password2']

    def clean(self, *args, **kwargs):
        email = self.cleaned_data.get('email')
        email_qs = User.objects.filter(email=email)

        if email_qs.exists():
            raise forms.ValidationError(
                'Account with this email address already exists. Please login to your account.')
