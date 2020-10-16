import json
import urllib

from django.conf import settings
from django.contrib import messages
from django.shortcuts import render

from .forms import UserRegisterForm


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
                username = form.cleaned_data.get('username')

                messages.success(
                    request, f'User {username} created successfully.')
        else:
            messages.error(request, 'Invalid Recaptcha. Please try again.')
    else:
        form = UserRegisterForm()

    context = {
        'form': form,
        'recaptcha_site_key': recaptcha_site_key
    }
    return render(request, 'register_user.html', context)
