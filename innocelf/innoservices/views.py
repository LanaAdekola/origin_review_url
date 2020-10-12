import os
from django.shortcuts import render

# Create your views here.


def home_view(request, *args, **kwargs):
    '''
    Defining homepage of Innocelf
    '''
    return render(request, 'home_page.html')
