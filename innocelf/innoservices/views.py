import json
import os
import urllib.parse
import urllib.request
import uuid
from datetime import datetime

from django.conf import settings
from django.contrib import messages
from django.core import serializers
from django.core.mail import send_mail
from django.core.serializers.json import DjangoJSONEncoder
from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect, render, reverse
from django.template.loader import get_template
from django.views.generic import FormView, ListView, View

from .forms import ClientReviewForm, ContactUsForm, SendReviewRequestForm
from .models import ClientReview, ContactUs, SendReviewRequest, BlogPost
from .send_email import send_email_pranita_contactus, send_email_client_contactus
from ClientAdmin.views import _csrf_token_input_html

PRIVACY_POLICY_RESPONSE = '''The information contained in this website is provided for informational purposes only, and should not be
                construed as legal advice, nor are they intended as a source of advertising or solicitation. The
                material on this website may not reflect the most current legal developments. We disclaim all liability
                in respect to actions taken or not taken based on any or all the contents of this site to the fullest
                extent permitted by law. Do not act or refrain from acting upon this information without seeking
                professional legal counsel in your own state. No past results serve in any way as a guarantee of future
                results.\nTestimonials found on this website are actual client reviews of INNOCELF, LLC or team members. We
                appreciate our clients and their willingness to share their experiences. Please keep in mind that the
                success of any matter depends on the unique circumstances of each case: we cannot guarantee particular
                results for future clients based on successes we have achieved in past matters.'''


def home_view(request):
    '''
    Defining homepage of Innocelf
    '''

    # Setting the cookies here
    if 'PrivacyPolicy' in request.COOKIES:
        response = render(request, 'innoservices/homepage.html')
    else:
        response = render(request, 'innoservices/homepage.html')
        response.set_cookie('PrivacyPolicy', PRIVACY_POLICY_RESPONSE)

    return response


def services_view(request):
    '''
    Defining the services view for Innocelf
    '''

    return render(request, 'innoservices/services.html')


def about_us_view(request):
    '''
    Defining the about us page for Innocelf
    '''

    return render(request, 'innoservices/about_us.html')


def testimonials_view(request):
    '''
    Defining the testimonials page for Innocelf
    '''
    return render(request, 'innoservices/testimonials.html')


def frequently_asked_questions(request):
    '''
    Defining a page for the websites frequently asked questions
    '''
    return render(request, 'innoservices/faq.html')


def contact_us_view(request):
    '''
    Defining a page for the websites contact us page
    '''
    return render(request, 'innoservices/contact_us.html')


def _obtain_contact_us_form(request):
    '''
    Defining a view to get the Contact Us form
    '''
    form = ContactUsForm()
    print(form)

    return HttpResponse(form)


def _obtain_contact_us_form_csrf(request):
    """
    Defining a view to obtain the contact us form csrf token so that the post
    of the form is successful
    """
    csrf_token_html = _csrf_token_input_html(request)

    return HttpResponse(csrf_token_html)


def _receive_contact_us_form_response(request):
    '''
    Defining a view to record the contact us form responses
    '''
    if request.method == 'POST':
        post_request = request.POST
        form = ContactUsForm(request.POST)

        if form.is_valid():
            form.save()
            send_email_pranita_contactus(form)
            send_email_client_contactus(form)

            # send_mail(
            #     subject='ATTENTION!! Someone contacted you on Innocelf',
            #     message=f"{form['full_name'].value()} with the email id {form['email'].value()} has contacted you.\n\n The reason for their inquiry is {form['inquiry_reason'].value()}.\n They typed this message: {form['explanation'].value()}",
            #     from_email=settings.EMAIL_HOST_USER,
            #     recipient_list=['ppd24@case.edu',
            #                     'dharmadhikari.pranita@gmail.com'],
            #     # recipient_list=['ppmahamu@mtu.edu'],
            #     fail_silently=False
            # )

            return JsonResponse({
                'Success': 'Thank you for contacting us. We will get back to you within 24-48 hours. We also sent you a confirmation email (please check your spam folder as well).'
            })
        else:
            return JsonResponse({
                'Failure': 'The server rejected the form. Please refresh and reverify your inputs.'
            })


def privacy_policy(request):
    '''
    Defining a page for privacy policy that will be tagged on using the link near the footer
    '''
    return render(request, 'innoservices/terms_and_conditions/privacy_policy.html')


def disclaimer(request):
    '''
    Defining a page for the websites disclaimer and will be part of the footer
    '''
    return render(request, 'innoservices/terms_and_conditions/disclaimer.html')


def website_terms_and_conditions(request):
    '''
    Defining a page for the websites terms and conditions and will be a part of the footer
    '''
    return render(request, 'innoservices/terms_and_conditions/terms_and_conditions.html')


def our_process_view(request):
    '''
    Defining a page for highlighting our process
    '''
    return render(request, 'innoservices/our_process.html')


def testimonials(request):
    '''
    Defining a page for the websites / the company's testimonials
    '''
    all_reviews = ClientReview.objects.filter(accepted=True)
    all_reviews_json = serializers.serialize(
        'json', all_reviews, cls=DjangoJSONEncoder)
    context = {
        'all_reviews_json': all_reviews_json
    }

    return JsonResponse(context)


def send_review_request(request):
    '''
    The function / view renders the review request template where the administrator
    can send a request for review to a customer of their choice
    '''
    return render(request, 'innoservices/send_review_request/send_review_request.html')


def _obtain_send_review_request_form(request):
    '''
    The function / view sends the send review request form to the frontend via
    XML
    '''
    form = SendReviewRequestForm()
    return HttpResponse(form)


def _receive_send_review_request_form_response(request):
    '''
    The function view accepts a review request form from the front end and stores
    it in the appropriate instance
    '''
    post_request = request.POST
    if request.user.is_superuser:
        form = SendReviewRequestForm(request.POST)
        if form.is_valid():
            unique_uuid = uuid.uuid4().hex
            send_review_request = SendReviewRequest(
                first_name=post_request['first_name'],
                last_name=post_request['last_name'],
                email=post_request['email'],
                uuid=unique_uuid
            )
            send_review_request.save()

            email_context = {
                'first_name': request.POST['first_name'],
                # 'unique_link': f'http://127.0.0.1:8000/write-review/{unique_uuid}/',
                'unique_link': f'https://www.innocelf.com/write-review/{unique_uuid}/'
            }
            email_template = get_template(
                '../templates/client_reviews/email_template_send_review_request.html'
            ).render(email_context)

            send_mail(
                subject='Request for Review -- Innocelf, LLC',
                message='',
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[request.POST['email']],
                html_message=email_template,
                fail_silently=False
            )

        return JsonResponse(
            {'Success': 'The request has been sent. Sit tight and wait for the review.'}
        )
    else:
        return JsonResponse({
            'Failure': 'You are not authorized to send these requests. Please login as an administrator.'
        })


def write_review(request, **kwargs):
    '''
    The function / view renders the review form for the user to write a review
    '''
    unique_uuid = kwargs['uuid_token']

    review_request = SendReviewRequest.objects.filter(
        uuid=unique_uuid,
        uuid_used=False
    )
    first_name = review_request[0].first_name
    last_name = review_request[0].last_name

    context = {
        'first_name': first_name,
        'last_name': last_name
    }
    return render(request, 'innoservices/send_review_request/write_review.html', context)


def _obtain_write_review_form(request):
    '''
    The function sends the ClientReviewForm to the frontend
    '''
    first_name = request.META.get('HTTP_FIRSTNAME')
    last_name = request.META.get('HTTP_LASTNAME')
    names_dict = {
        'first_name': first_name,
        'last_name': last_name
    }

    form = ClientReviewForm(initial=names_dict)
    return HttpResponse(form)


def _receive_write_review_form_response(request):
    '''
    The function receives the response from the ClientReviewForm and saves the 
    review as a new instance. It disables the previously created unique uuid
    '''
    post_request = request.POST

    review_requests_filtered = SendReviewRequest.objects.filter(
        uuid=post_request['uuid_token'],
        uuid_used=False
    )
    review_request = review_requests_filtered[0]
    review_request.uuid_used = True
    review_request.save()

    datetime_today = datetime.now()
    current_month = datetime_today.strftime('%B')
    current_year = datetime_today.strftime('%Y')
    month_year = current_month + ' ' + current_year

    new_review = ClientReview(
        first_name=post_request['first_name'],
        last_name=post_request['last_name'],
        review=post_request['review'],
        month_year=month_year
    )
    new_review.save()

    return JsonResponse({
        'Success': 'Your review has been recorded. Thank you for taking the time to review our services. We appreciate it.'
    })

def knowledge_home_view(request):
    """
    Function is the view of knowledge home which houses all the blogs that are 
    written by staff
    """
    return render(request, 'innoservices/blog_home.html')


def get_all_blog_posts(request):
    """
    Function gets all the blog posts that are stored in the database for easy 
    visualization
    """
    blog_posts = BlogPost.objects.all()
    blog_posts_json = serializers.serialize(
        'json', blog_posts, cls=DjangoJSONEncoder)
    return JsonResponse(blog_posts_json, safe=False)


def blog_view(request, **kwargs):
    """
    Function is the view of one blog post that is being rendered
    """
    # pk = kwargs['pk']
    title_lowered = kwargs['title_lowered']
    title_lowered = title_lowered.replace('-', ' ')
    blog_post = BlogPost.objects.filter(title__iexact = title_lowered)[0]

    context = {
        'pk': blog_post.pk,
        'title': blog_post.title,
        'author': blog_post.author,
        'category': blog_post.category,
        'highlight_para': blog_post.highlight_para,
        'content_in_md': blog_post.content_in_md,
        'publication_date': blog_post.publication_date
    }
    return render(request, 'innoservices/blog.html', context)
