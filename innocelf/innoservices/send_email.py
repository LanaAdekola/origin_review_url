from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import get_template
            

def send_email_pranita_contactus(form):
    """
    Function sends an email to Pranita when someone contacts
    using the website form

    Parameters
    -----------
    form: The form that is submitted by the client
    """
    message = (
        f"{form['full_name'].value()} with email if {form['email'].value()}"
        f" and phone {form['phone_number'].value()} has contacted you.\n\n"
        f"The reason for their enquiry is {form['inquiry_reason'].value()}.\n"
        f"They typed this message: {form['explanation'].value()}."
    )

    send_mail(
        subject='ATTENTION!! Someone contacted you on Innocelf',
        message=message,
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=['ppd24@case.edu',
                        'dharmadhikari.pranita@gmail.com'],
        # recipient_list=['pratikmahamuni@yahoo.com'],
        fail_silently=False
    )


def send_email_client_contactus(form):
    """
    Function sends an email to the client when someone contacts
    using the website form

    Parameters
    ----------
    form: The form that is submitted by the client
    """
    email_context = {
        'full_name': form['full_name'].value(),
    }
    email_template = get_template(
        '../templates/client_reviews/email_template_contact_us.html'
    ).render(email_context)

    send_mail(
        subject='Thank you for contacting us -- Innocelf, LLC',
        message='',
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[form['email'].value()],
        html_message=email_template,
        fail_silently=False
    )