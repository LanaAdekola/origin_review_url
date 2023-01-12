from .views import (
    home_view,
    services_view,
    about_us_view,
    testimonials_view,
    contact_us_view,
    _obtain_contact_us_form,
    _obtain_contact_us_form_csrf,
    _receive_contact_us_form_response,
    privacy_policy,
    disclaimer,
    website_terms_and_conditions,
    frequently_asked_questions,
    testimonials,
    send_review_request,
    _obtain_send_review_request_form,
    _receive_send_review_request_form_response,
    write_review,
    _obtain_write_review_form,
    _receive_write_review_form_response,
    our_process_view,
    knowledge_home_view,
    blog_view,
    get_all_blog_posts,
)
from .sitemaps import StaticViewSiteMap, BlogSiteMap
from django.urls import path, include
from django.contrib.sitemaps.views import sitemap
from django.views.generic.base import TemplateView
from .feed import BlogFeed


app_name = 'innoservices'

sitemaps = {
    'static': StaticViewSiteMap,
    'blogs': BlogSiteMap
}


urlpatterns = [
    path('', home_view, name='home'),
    path('home', home_view, name='home'),
    path('services', services_view, name='services'),
    path('about-us', about_us_view, name='about-us'),
    path(
        'frequently-asked-questions/',
        frequently_asked_questions,
        name='frequently-asked-questions'
    ),

    path('testimonials-page', testimonials_view, name='testimonials-page'),
    path('testimonials', testimonials, name='testimonials'),

    path('knowledge-home', knowledge_home_view, name='knowledge-home'),
    path('get-all-blog-posts', get_all_blog_posts, name='get-all-blog-posts'),
    path('knowledge-home/<pk>', blog_view, name='blog-view'),

    path('contact-us/',  contact_us_view, name='contact-us'),
    path(
        'obtain-contact-us-form/',
        _obtain_contact_us_form,
        name='obtain-contact-us-form'
    ),
    path(
        'obtain-contact-us-form-csrf/',
        _obtain_contact_us_form_csrf,
        name='obtain-contact-us-form-csrf'
    ),
    path(
        'receive-contact-us-form/',
        _receive_contact_us_form_response,
        name='receive-contact-us-form'
    ),

    path('our-process/',  our_process_view, name='our-process'),

    path('privacy-policy/', privacy_policy, name='privacy-policy'),
    path('disclaimer/', disclaimer, name='disclaimer'),
    path(
        'terms-and-conditions/',
        website_terms_and_conditions,
        name='terms-and-conditions'
    ),
    path(
        'about-us-and-testimonials/',
        testimonials,
        name='about-us-and-testimonials'
    ),

    path(
        'administrative/send-review-request/',
        send_review_request,
        name='send-review-request'
    ),
    path(
        'obtain-send-review-request-form/',
        _obtain_send_review_request_form,
        name='obtain-send-review-request-form'
    ),
    path(
        'receive-send-review-request-form/',
        _receive_send_review_request_form_response,
        name='receive-send-review-request-form'
    ),

    path(
        'write-review/<uuid_token>/',
        write_review,
        name='write-review'
    ),
    path(
        'obtain-write-review-form/',
        _obtain_write_review_form,
        name='obtain-write-review-form'
    ),
    path(
        'receive-write-review-form/',
        _receive_write_review_form_response,
        name='receive-write-review-form'
    ),
    # path('write-review/<uuid_token>/confirmation/',
    #      record_review_confirmation, name='record-review-confirmation'),

    path('sitemap.xml', sitemap, {'sitemaps': sitemaps},
         name='django.contrib.sitemaps.views.sitemap'),
    path('feed', BlogFeed()),
    path("robots.txt",TemplateView.as_view(template_name="innoservices/robots.txt", content_type="text/plain"))

    # path('user-login/', '', name='user-login')
]
