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

# TODO: Make a model for Long Term Clients. The one where we can add more if need be.


def _camel_case(full_string: str):
    '''
    Joins strings together and returns a "camel cased" string to be used in slugs
    '''
    constituents = full_string.split(' ')
    new_string = constituents[0].title() + ''.join(x.title()
                                                   for x in constituents[1:])

    return new_string


class LongTermClient(models.Model):
    '''
    Creates a Long term client instance using their name, company name and email address
    #TODO: May add more fields later if required
    '''
    client_name = models.CharField(max_length=250)
    client_company = models.CharField(max_length=250)
    client_email = models.EmailField()

    def __str__(self):
        return f'{self.client_name} of {self.client_company}'


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

    # Project Complete?
    is_project_complete = models.BooleanField(default=False)

    # Identifier
    slug = models.SlugField(max_length=2500)

    def __str__(self):
        return f'{self.client_name}"s {self.project_type} project'

    def save(self, *args, **kwargs):
        client_name_cc = _camel_case(self.client_name)
        project_name_cc = _camel_case(self.project_name)
        project_type_cc = self.project_type
        project_deadline_cc = self.project_deadline.strftime('%Y%m%d')
        expected_revenue_cc = str(int(round(float(self.expected_revenue), 0)))

        self.slug = client_name_cc + '-' + project_name_cc + \
            '-' + project_type_cc + '-' + project_deadline_cc + '-' + expected_revenue_cc
        super(Project, self).save(*args, **kwargs)

    def get_number_of_days_to_complete(self):
        '''
        Calculates the number of days it took to complete the project
        '''
        date_difference = self.end_date - self.start_date
        number_of_days = date_difference.days

        return number_of_days

    def was_project_completed_before_deadline(self):
        '''
        Returns a boolean of whether the project was completed on time or not
        '''
        boolean = self.end_date <= self.project_deadline
        return boolean


class Payment(models.Model):
    '''
    Creates a payment instance for a particular project
    '''
    project = models.ForeignKey(
        'Project', on_delete=models.CASCADE, null=True, blank=True)
    amount = models.FloatField(default=0)
    payment_date = models.DateField()


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

    # Is Client current
    is_client_current = models.BooleanField(default=False)

    # Is client abandoned
    is_client_abandoned = models.BooleanField(default=False)

    # Creating a slug
    slug = models.SlugField(default='', max_length=2500)

    def __str__(self):
        return f'{self.client_name}"s {self.project_type} project'

    def save(self, *args, **kwargs):
        client_name_cc = _camel_case(self.client_name)
        project_name_cc = _camel_case(self.project_name)
        project_type_cc = self.project_type
        initial_contact_date_cc = self.initial_contact_date.strftime('%Y%m%d')

        self.slug = client_name_cc + '-' + project_name_cc + \
            '-' + project_type_cc + '-' + initial_contact_date_cc

        super(PotentialProject, self).save(*args, **kwargs)
