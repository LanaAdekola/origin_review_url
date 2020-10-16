from .views import home_view, ContactUsView
from django.urls import path, include

app_name = 'innoservices'

urlpatterns = [
    path('', home_view, name='home'),
    path('contact-us/',  ContactUsView.as_view(), name='contact-us'),
    # path('user-login/', '', name='user-login')
]
