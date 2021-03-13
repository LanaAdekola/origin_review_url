from django.contrib import admin
from .models import Payment, Project, PotentialProject


class PaymentAdmin(admin.ModelAdmin):
    '''
    Updates the list of how the payments are shown in the admin portal
    '''
    list_display = ['project', 'amount', 'payment_date']


class PotentialProjectAdmin(admin.ModelAdmin):
    '''
    Updates the list of how the potential projects are shown in the admin portal
    '''
    list_display = ['client_name', 'project_name',
                    'project_type', 'initial_contact_date', 'slug']


class ProjectAdmin(admin.ModelAdmin):
    '''
    Updates the list of how the projects are shown in the admin portal
    '''
    list_display = ['client_name', 'project_name',
                    'project_type', 'project_deadline', 'slug']


# Register your models here.
admin.site.register(Payment, PaymentAdmin)
admin.site.register(Project, ProjectAdmin)
admin.site.register(PotentialProject, PotentialProjectAdmin)
