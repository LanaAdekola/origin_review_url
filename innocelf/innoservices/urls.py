from .views import home_view
from django.urls import path, include

app_name = 'innoservices'

urlpatterns = [
    path('', home_view, name='home')
]
