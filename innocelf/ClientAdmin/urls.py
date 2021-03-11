from django.urls import path, include
from django.contrib.auth.views import LogoutView
from .views import UserLogin, client_admin_view, save_potential_project

app_name = 'ClientAdmin'

urlpatterns = [
    path('login/', UserLogin.as_view(), name='client-admin-login'),
    path('logout/', LogoutView.as_view(template_name='user_logout.html'),
         name='client-admin-logout'),
    path('client-admin/', client_admin_view, name='client-admin-view'),
    path('save-potential-project', save_potential_project, name='save-potential-project-ajax')
]
