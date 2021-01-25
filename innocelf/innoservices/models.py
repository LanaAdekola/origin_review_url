from django.db import models


# Service Choices
SERVICES = (
    ('PS', 'Patentability / Novelty Search'),
    ('CS', 'Clearance Search'),
    ('IS', 'Invalidity Search'),
    ('FS', 'Freedom to Operate Search'),
    ('LA', 'Landscape / State of the Art'),
    ('PR', 'Product Research')
)


class ContactUs(models.Model):

    '''
    Contact us model to help in creating the form for contact us
    '''

    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=12)
    inquiry_reason = models.CharField(max_length=3, choices=SERVICES)
    explanation = models.CharField(max_length=3000)

    def __str__(self):
        return f'{self.first_name} {self.last_name} Inquiry'


class SendReviewRequest(models.Model):
    '''
    This model sends a review request to the client based on the email address and name.
    Stores first name, last name, email, uuid
    '''
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField()
    uuid = models.UUIDField()
    uuid_used = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.first_name} {self.last_name} Review Request'


class ClientReview(models.Model):
    '''
    This model receives and stores the review based on the unique uuid token.
    This will be cross checked with what is being used or not.
    '''
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    review = models.TextField(max_length=2000)
    month_year = models.CharField(max_length=50, default='January 2021')
    accepted = models.BooleanField(default=False)
    upwork_review = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.first_name} {self.last_name} Review'
