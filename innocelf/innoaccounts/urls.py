from django.urls import path, include
from django.contrib.auth.views import LoginView, LogoutView
from .views import register_user

app_name = 'innoaccounts'

urlpatterns = [
    path('register-user/', register_user, name='register-user'),
    path('login/', LoginView.as_view(template_name='user_login.html'),
         name='login-user'),
    path('logout/', LogoutView.as_view(template_name='user_logout.html'),
         name='logout-user')
]
