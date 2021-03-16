from django.urls import path, include
from django.contrib.auth.views import LogoutView
from .views import UserLogin, client_admin_view, save_potential_project, save_project, mark_project_complete, add_payment_modal, make_client_current, abandon_client

app_name = 'ClientAdmin'

urlpatterns = [
    path('login/', UserLogin.as_view(), name='client-admin-login'),
    path('logout/', LogoutView.as_view(template_name='user_logout.html'),
         name='client-admin-logout'),
    path('client-admin/', client_admin_view, name='client-admin-view'),
    path('save-potential-project', save_potential_project,
         name='save-potential-project-ajax'),
    path('save-project', save_project, name='save-project-ajax'),
    path('mark-project-complete', mark_project_complete,
         name='mark-project-complete-ajax'),
    path('add-payment-modal', add_payment_modal,
         name='add-payment-modal-ajax'),
    path('make-client-current', make_client_current,
         name='make-client-current-ajax'),
    path('abandon-client', abandon_client,
         name='abandon-client-ajax')
]
