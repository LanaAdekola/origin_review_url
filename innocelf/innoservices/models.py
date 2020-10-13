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
