from django.urls import path, include
from django.contrib.auth.views import LoginView, LogoutView
from .views import (
    register_user,
    UserAccountView,
    UserLogin,
    update_client_profile
)

app_name = 'innoaccounts'

urlpatterns = [
    path('register-user/', register_user, name='register-user'),
    path('login/', UserLogin.as_view(),
         name='login-user'),
    path('logout/', LogoutView.as_view(template_name='user_logout.html'),
         name='logout-user'),

    path('client-home/<user>/',
         UserAccountView.as_view(), name='client-home'),
    path('client-home/<user>/profile',
         UserAccountView.as_view(), name='client-home-profile'),

    path('update-client-profile', update_client_profile,
         name='update-client-profile')
]
