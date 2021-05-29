from .views import (
    home_view,
    ContactUsView,
    technology_view,
    privacy_policy,
    disclaimer,
    website_terms_and_conditions,
    frequently_asked_questions,
    testimonials,
    contact_us_confirmation,
    send_review_request,
    record_client_review,
    #     RecordClientReview,
    record_review_confirmation
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
    path('frequently-asked-questions/', frequently_asked_questions,
         name='frequently-asked-questions'),

    path('administrative/send-review-request/',
         send_review_request, name='send-review-request'),
    path('write-review/<uuid_token>/',
         record_client_review, name='record-review'),
    path('write-review/<uuid_token>/confirmation/',
         record_review_confirmation, name='record-review-confirmation'),

    path('sitemap.xml', sitemap, {'sitemaps': sitemaps},
         name='django.contrib.sitemaps.views.sitemap'),

    # path('user-login/', '', name='user-login')
]
