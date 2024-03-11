from django.db import models
from django.utils import timezone


# Service Choices
SERVICES = (
    ('PS', 'Patentability / Novelty Search'),
    ('CS', 'Clearance Search'),
    ('IS', 'Invalidity Search'),
    ('FS', 'Freedom to Operate Search'),
    ('LA', 'Landscape / State of the Art'),
    ('PR', 'Product Research'),
    ('NS', 'Introduction / Unsure')
)

BLOG_CATEGORIES = (
    ('PAT', 'Patents'),
    ('TMK', 'Trademarks'),
    ('FDA', 'FDA'),
    ('CAS', 'Case Studies'),
    ('IPR', 'Intellectual Property')
)


class ContactUs(models.Model):

    '''
    Contact us model to help in creating the form for contact us
    '''

    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone_number = models.CharField(max_length=15, null=True)
    inquiry_reason = models.CharField(max_length=3, choices=SERVICES)
    explanation = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f'{self.full_name} Inquiry'


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
    review = models.TextField(max_length=255)
    month_year = models.CharField(max_length=50, default='January 2021')
    accepted = models.BooleanField(default=False)
    upwork_review = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.first_name} {self.last_name} Review'


class BlogPost(models.Model):
    """
    Class will define a model for a particular blog. The blog will have a 
    particular title, a highlight paragraph and an image. The blog post will also
    have a category as listed in BLOG_CATEGORIES with an author
    """
    title = models.TextField()
    author = models.CharField(max_length = 255)
    category = models.CharField(max_length = 3, choices = BLOG_CATEGORIES)
    publication_date = models.DateField(default=timezone.now)

    highlight_para = models.TextField(null = True, blank = True)
    highlight_img = models.ImageField(null = True, blank = True, upload_to = 'blogpost/')

    content_in_md = models.TextField(null = True, blank = True)

    def __str__(self):
        """
        String representation of the blog post in the Admin portal
        """
        return self.title
