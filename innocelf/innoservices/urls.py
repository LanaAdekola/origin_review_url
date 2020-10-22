from .views import (
    home_view,
    ContactUsView,
    technology_view,
    privacy_policy,
    disclaimer,
    website_terms_and_conditions
)
from django.urls import path, include

app_name = 'innoservices'

urlpatterns = [
    path('', home_view, name='home'),
    path('home', home_view, name='home'),
    path('technologies/', technology_view, name='technologies'),
    path('contact-us/',  ContactUsView.as_view(), name='contact-us'),
    path('privacy-policy/', privacy_policy, name='privacy-policy'),
    path('disclaimer/', disclaimer, name='disclaimer'),
    path('terms-and-conditions/', website_terms_and_conditions, name='terms-and-conditions'),
    # path('user-login/', '', name='user-login')
]
