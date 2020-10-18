from django.contrib import admin
from .models import (
    InnocelfClient,
    InnocelfInvoice,
    InnocelfPayment,
    InnocelfProject
)

# Register your models here.
admin.site.register(InnocelfClient)
admin.site.register(InnocelfInvoice)
admin.site.register(InnocelfPayment)
admin.site.register(InnocelfProject)
