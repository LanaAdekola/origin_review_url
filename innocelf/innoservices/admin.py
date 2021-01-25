from django.contrib import admin
import uuid
from .models import ContactUs, SendReviewRequest, ClientReview


class SendReviewRequestAdmin(admin.ModelAdmin):
    '''
    Uniquely stores all the review requests in the admin portal. Once a review request is generated
    an email will be sent to the receipient with a unique uuid and they can write their review then
    '''
    list_display = ['first_name', 'last_name', 'email', 'uuid']


class ClientReviewAdmin(admin.ModelAdmin):
    '''
    Adjusts the way the client reviews look in the backend. This is mostly preference, no functionality
    added value.
    '''
    list_display = ['first_name', 'last_name', 'review', 'accepted']


# Register your models here.
admin.site.register(ContactUs)
admin.site.register(SendReviewRequest, SendReviewRequestAdmin)
admin.site.register(ClientReview, ClientReviewAdmin)
