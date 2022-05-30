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
    ('FPD', 'Full Patent Draft'),
    ('AC', 'Agreements / Contracts'),
    ('LR', 'Legal Research'),
    ('TA', 'Trademark Applications')
)
INVENTION_TYPE_CHOICES = (
    ('MECH', 'Mechanical'),
    ('CONS', 'Consumer Product'),
    ('SOFT', 'Software Application'),
    ('BUSI', 'Business Method'),
    ('BIOM', 'Biomedical'),
    ('PHRM', 'Pharmaceutical / Life Sciences / Chemistry'),
    ('OTHR', 'Other')
)


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
    is_invoice_sent = models.BooleanField(default=False)

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


class SendInventionDisclosureQuestionnaire(models.Model):
    '''
    The class defines the model for the Send Invention Disclosure Questionnaire
    model which will be used to define a unique uuid for the questionnaire
    '''
    client_name = models.CharField(max_length=255)
    client_company = models.CharField(max_length=255, null=True, blank=True)
    client_email = models.EmailField(max_length=255, null=True, blank=True)
    uuid = models.UUIDField()
    uuid_used = models.BooleanField(default=False)

    def __str__(self):
        '''
        String representation of the questionnaire request
        '''
        return f"{self.client_name} of {self.client_company} questionnaire request"


class InventionDisclosureQuestionnaire(models.Model):
    '''
    The class defines the Invention Disclosure Questionnaire which will be sent
    to new clients for defining their invention through an easy form
    '''
    existing_project = models.ForeignKey(
        'Project',
        on_delete=models.SET_NULL,
        blank=True,
        null=True
    )

    client_name = models.CharField(max_length=255)
    client_company = models.CharField(max_length=255, null=True, blank=True)
    client_email = models.EmailField(max_length=255, null=True, blank=True)

    title = models.CharField(max_length=255)
    category = models.CharField(max_length=5, choices=INVENTION_TYPE_CHOICES)
    summary = models.CharField(max_length=3000)

    # Detailed description of the invention questions
    problem_solved = models.CharField(max_length=3000)
    closest_art = models.CharField(max_length=3000)
    competing_products = models.CharField(max_length=3000)
    advantages = models.CharField(max_length=3000)

    # Future Improvements
    future_improvements = models.CharField(
        max_length=3000,
        null=True,
        blank=True
    )

    # Drawings or Pictures
    drawings = models.FileField(null=True, blank=True)

    # Slug
    slug = models.SlugField(max_length=2500)

    def __str__(self):
        '''
        String representation of the model
        '''
        return f"{self.client_name}'s questionnaire for {self.title} invention"

    def save(self, *args, **kwargs):
        '''
        The save method of the project where the slug field of the object will
        be modified
        '''
        client_name_cc = _camel_case(self.client_name)
        client_company_cc = _camel_case(self.client_company)
        title_cc = _camel_case(self.title)
        category_cc = self.category

        self.slug = client_name_cc + '-' + client_company_cc + '-' + title_cc +\
            '-' + category_cc
        super(InventionDisclosureQuestionnaire, self).save(*args, **kwargs)


class Invoice(models.Model):
    '''
    The class creates an Invoice model with an invoice number, date and the file
    name to where the invoice is saved for easy access
    '''
    number = models.CharField(max_length=50)
    created_on = models.DateField()
    filename = models.CharField(max_length=3000)

    client_name_company = models.CharField(max_length=500)
    address = models.CharField(max_length=3000)

    def __str__(self):
        '''
        String representation of the model
        '''
        return f'Invoice# {self.number} to {self.client_name_company}'
