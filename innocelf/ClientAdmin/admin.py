from django.contrib import admin
from ClientAdmin.models import (
    Payment,
    Project,
    LongTermClient,
    SendInventionDisclosureQuestionnaire,
    InventionDisclosureQuestionnaire,
    Invoice
)


class LongTermClientAdmin(admin.ModelAdmin):
    '''
    Updates the list of the the Long Term Clients are shown in the admin portal
    '''
    list_display = ['client_name', 'client_company', 'client_email']


class PaymentAdmin(admin.ModelAdmin):
    '''
    Updates the list of how the payments are shown in the admin portal
    '''
    list_display = ['project', 'amount', 'payment_date']


class ProjectAdmin(admin.ModelAdmin):
    '''
    Updates the list of how the projects are shown in the admin portal
    '''
    list_display = ['client_name', 'project_name',
                    'project_type', 'project_deadline', 'slug']


# Register your models here.
admin.site.register(Payment, PaymentAdmin)
admin.site.register(Project, ProjectAdmin)
admin.site.register(LongTermClient, LongTermClientAdmin)
admin.site.register(SendInventionDisclosureQuestionnaire)
admin.site.register(InventionDisclosureQuestionnaire)
admin.site.register(Invoice)
