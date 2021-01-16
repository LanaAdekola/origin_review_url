from .views import (
    home_view,
    ContactUsView,
    technology_view,
    privacy_policy,
    disclaimer,
    website_terms_and_conditions,
    testimonials,
    contact_us_confirmation
)
from .sitemaps import StaticViewSiteMap
from django.urls import path, include
from django.contrib.sitemaps.views import sitemap


app_name = 'innoservices'

sitemaps = {
    'static': StaticViewSiteMap,
}


urlpatterns = [
    path('', home_view, name='home'),
    path('home', home_view, name='home'),
    path('technologies/', technology_view, name='technologies'),
    path('contact-us/',  ContactUsView.as_view(), name='contact-us'),
    path('contact-us/confirmation',  contact_us_confirmation,
         name='contact-us-confirmation'),
    path('privacy-policy/', privacy_policy, name='privacy-policy'),
    path('disclaimer/', disclaimer, name='disclaimer'),
    path('terms-and-conditions/', website_terms_and_conditions,
         name='terms-and-conditions'),
    path('about-us-and-testimonials/', testimonials,
         name='about-us-and-testimonials'),

    path('sitemap.xml', sitemap, {'sitemaps': sitemaps},
         name='django.contrib.sitemaps.views.sitemap'),

    # path('user-login/', '', name='user-login')
]
