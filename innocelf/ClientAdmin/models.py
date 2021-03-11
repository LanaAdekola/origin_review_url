from django.db import models
import datetime


PROJECT_TYPE_CHOICES = (
    ('PAR', 'Patent Research'),
    ('VS', 'Validity and Invalidity Search'),
    ('FTO', 'Freedom to Operate Search'),
    ('PRR', 'Product Research'),
    ('LAN', 'Landscape / State of the Art'),
    ('TS', 'Trademark Search'),
    ('PD', 'Provisional Draft'),
    ('FPD', 'Full Patent Draft')
)


class Payment(models.Model):
    '''
    Creates a payment instance for a particular project
    '''
    amount = models.FloatField(default=0)
    payment_date = models.DateField()


class Project(models.Model):
    '''
    Creates a project instance for a particular client using the Project Type, start dates, end dates,
    revenue expected etc.
    '''

    # Client Details
    client_name = models.CharField(max_length=250)
    client_company = models.CharField(max_length=250, blank=True, null=True)
    client_long_term = models.BooleanField(default=False)
    client_email = models.EmailField()

    # Project Details
    project_name = models.CharField(max_length=250)
    project_type = models.CharField(max_length=4, choices=PROJECT_TYPE_CHOICES)
    project_deadline = models.DateField()
    project_estimated_days = models.IntegerField(default=15)

    # Dates and Times
    start_date = models.DateField()
    end_date = models.DateField()

    # Revenue
    expected_revenue = models.FloatField(default=0)
    payment = models.ForeignKey('Payment', on_delete=models.CASCADE)
    paid = models.BooleanField(default=False)

    # Identifier
    slug = models.SlugField()

    # TODO: Figure out the number of days it took based on start and end dates
    # TODO: Figure out if the project was completed in time (based on deadline and end date)

    def save(self, *args, **kwargs):
        self.slug = self.client_name + '-' + self.project_name + \
            '-' + self.project_type + '-' + self.project_deadline
        super(Project, self).save(*args, **kwargs)


class PotentialProject(models.Model):
    '''
    Creates a potential project instance for a particular client whose project may come but has not
    been discussed / provided.
    '''
    # Client Details
    client_name = models.CharField(max_length=250)
    client_company = models.CharField(max_length=250, blank=True, null=True)
    client_email = models.EmailField(blank=True, null=True)

    # Project Details
    project_name = models.CharField(max_length=250)
    project_type = models.CharField(max_length=4, choices=PROJECT_TYPE_CHOICES)

    # Initial Contact
    initial_contact_date = models.DateField(default=datetime.date.today)

    def __str__(self):
        return f'{self.client_name}"s {self.project_type} project'
