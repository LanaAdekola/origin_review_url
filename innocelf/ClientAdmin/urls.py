from django.urls import path, include
from django.contrib.auth.views import LogoutView
from ClientAdmin.views import (
    UserLogin,
    obtain_long_term_client_form,
    save_long_term_client_form,
    obtain_long_term_clients_list,
    obtain_add_project_form,
    save_add_project_form,
    obtain_revenue_dict,
    obtain_projects,
    obtain_payments_for_project,
    add_payment_modal,
    obtain_edit_project_form,
    save_edit_project_form,
    client_admin_view,
    mark_project_complete,
    mark_invoice_sent,
    obtain_send_invention_disclosure_quest_form,
    save_send_invention_disclosure_quest_form,
    complete_invention_disclosure_questionnaire,
    obtain_invention_disclosure_quest_form,
    recieve_invention_disclosure_quest_form,
    get_next_invoice_number,
    generate_invoice,
    download_invoices
)

app_name = 'ClientAdmin'

urlpatterns = [
    path(
        'login/',
        UserLogin.as_view(),
        name='client-admin-login'
    ),
    path('logout/', LogoutView.as_view(template_name='user_logout.html'),
         name='client-admin-logout'),

    path('client-admin/', client_admin_view, name='client-admin-view'),

    path(
        'obtain-long-term-client-form',
        obtain_long_term_client_form,
        name='obtain-long-term-client-form'
    ),
    path(
        'save-long-term-client-form',
        save_long_term_client_form,
        name='save-long-term-client-form'
    ),

    path(
        'obtain-long-term-clients-list',
        obtain_long_term_clients_list,
        name='obtain-long-term-clients-list'
    ),

    path(
        'obtain-add-project-form',
        obtain_add_project_form,
        name='obtain-add-project-form'
    ),
    path(
        'save-add-project-form',
        save_add_project_form,
        name='save-add-project-form'
    ),

    path(
        'obtain-revenue-dict',
        obtain_revenue_dict,
        name='obtain-revenue-dict'
    ),

    path(
        'obtain-projects',
        obtain_projects,
        name='obtain-projects'
    ),

    path(
        'mark-project-complete',
        mark_project_complete,
        name='mark-project-complete'
    ),
    path(
        'mark-invoice-sent',
        mark_invoice_sent,
        name='mark-invoice-sent'
    ),

    path(
        'obtain-payments-for-project',
        obtain_payments_for_project,
        name='obtain-payments-for-project'
    ),

    path(
        'add-payment-modal',
        add_payment_modal,
        name='add-payment-modal-ajax'
    ),

    path(
        'obtain-edit-project-form',
        obtain_edit_project_form,
        name='obtain-edit-project-form'
    ),
    path(
        'save-edit-project-form',
        save_edit_project_form,
        name='save-edit-project-form'
    ),

    path(
        'obtain-send-invention-disclosure-quest-form',
        obtain_send_invention_disclosure_quest_form,
        name='obtain-send-invention-disclosure-quest-form'
    ),
    path(
        'save-send-invention-disclosure-quest-form',
        save_send_invention_disclosure_quest_form,
        name='save-send-invention-disclosure-quest-form'
    ),
    path(
        'complete-invention-disclosure-questionnaire/<uuid_token>/',
        complete_invention_disclosure_questionnaire,
        name='complete-invention-disclosure-questionnaire'
    ),
    path(
        'obtain-invention-disclosure-quest-form',
        obtain_invention_disclosure_quest_form,
        name='obtain-invention-disclosure-quest-form'
    ),
    path(
        'recieve-invention-disclosure-quest-form',
        recieve_invention_disclosure_quest_form,
        name='recieve-invention-disclosure-quest-form'
    ),

    path(
        'get-next-invoice-number',
        get_next_invoice_number,
        name='get-next-invoice-number'
    ),
    path(
        'generate-invoice',
        generate_invoice,
        name='generate-invoice'
    ),
    path(
        'download-invoices',
        download_invoices,
        name='download-invoices'
    ),


    # path('save-long-term-client', save_long_term_client,
    #      name='save-long-term-client-ajax'),
    # path('save-potential-project', save_potential_project,
    #      name='save-potential-project-ajax'),
    # path('save-project', save_project, name='save-project-ajax'),

    # path('make-client-current', make_client_current,
    #      name='make-client-current-ajax'),
    # path('abandon-client', abandon_client,
    #      name='abandon-client-ajax'),
    # path('edit-project-row', edit_project_row,
    #      name='edit-project-row-ajax')
]
