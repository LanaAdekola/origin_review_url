from django.contrib import admin
from .models import Payment, Project, PotentialProject


class PaymentAdmin(admin.ModelAdmin):
    '''
    Updates the list of how the payments are shown in the admin portal
    '''
    list_display = ['amount', 'payment_date']


class ProjectAdmin(admin.ModelAdmin):
    '''
    Updates the list of how the projects are shown in the admin portal
    '''
    list_display = ['client_name', 'project_name',
                    'project_type', 'project_deadline', 'paid', 'slug']


# Register your models here.
admin.site.register(Payment)
admin.site.register(Project)
admin.site.register(PotentialProject)
