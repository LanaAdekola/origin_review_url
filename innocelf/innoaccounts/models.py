from django.db import models

PROJECT_STATUS = (
    ('Pending NDA', 'Pending NDA'),
    ('Not Started', 'Not Started'),
    ('In Progress', 'In Progress'),
    ('Client Review', 'Waiting for Client Review'),
    ('Completed', 'Completed')
)

INNOCELF_SERVICES = (
    ('PS', 'Patentability / Novelty Search'),
    ('IS', 'Invalidity Search'),
    ('FOS', 'Freedom to Operate / Clearance Search'),
    ('PR', 'Product Research'),
    ('LSA', 'Landscape / State of the Art Search'),
    ('OT', 'Other / Not Listed')
)


class InnocelfClient(models.Model):
    '''
    Initates a client model for all the clients that are doing business with Innocelf
    '''
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=13)
    company_name = models.CharField(max_length=50, blank=True, null=True)
    global_nda_authorization = models.BooleanField(default=False)
    global_nda_document = models.FileField(
        max_length=255, blank=True, null=True)
    total_business_recieved = models.FloatField(default=0)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'


class InnocelfPayment(models.Model):
    '''
    Initates a payment model for all the clients that pay through the online portal. This does not
    store credit card information here. That will be stored in the Braintree Vault
    '''
    client = models.ForeignKey(InnocelfClient, on_delete=models.CASCADE)
    amount = models.FloatField(default=0)
    charge_id = models.CharField(max_length=15)
    payment_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.client.first_name} {self.client.last_name} paid {self.amount} on {self.payment_date}'


class InnocelfProject(models.Model):
    '''
    Initiates a project class to start a project and track it and many of its constituents along
    the way.
    '''
    # Project related fields
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    date_initiated = models.DateTimeField(auto_now_add=True)
    project_id = models.CharField(max_length=255)
    project_status = models.CharField(
        max_length=20, choices=PROJECT_STATUS, default='Pending NDA')

    # Client related fields
    client = models.ForeignKey(InnocelfClient, on_delete=models.CASCADE)
    report_reviewed = models.BooleanField(default=False)
    review_comments = models.CharField(max_length=255, blank=True, null=True)

    # Payment related fields
    payment_status = models.BooleanField(default=False)
    payment_amount = models.FloatField(default=0)
    payment_details = models.ForeignKey(
        InnocelfPayment, on_delete=models.CASCADE)

    # Documents associated with the project
    engagement_letter = models.FileField(max_length=255, blank=True, null=True)
    nda_document = models.FileField(max_length=255, blank=True, null=True)
    reports_for_review = models.FileField(
        max_length=255, blank=True, null=True)
    final_reports = models.FileField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f'{self.name}'


class InnocelfInvoice(models.Model):
    '''
    Initiates an invoice model for the project that a client has requested
    '''
    project_associated = models.ForeignKey(
        InnocelfProject, on_delete=models.CASCADE)
    project_amount = models.FloatField(default=0)
    client = models.ForeignKey(InnocelfClient, on_delete=models.CASCADE)
    payment_status = models.BooleanField(default=False)
    can_download_invoice = models.BooleanField(default=False)
    # FIXME Remove the blank and null true statements
    invoice_file = models.FileField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f'{self.project_associated.name} {self.client.first_name}, Amount: {self.project_amount}'


class InnocelfStartProject(models.Model):
    '''
    Model to save all requests for a particular client that wants to start a project with Innocelf
    '''
    client = models.ForeignKey(InnocelfClient, on_delete=models.CASCADE)
    project_type = models.CharField(max_length=4, choices=INNOCELF_SERVICES)
    project_description = models.CharField(max_length=255)
    project_approved = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.client.first_name} {self.client.last_name} requested {self.project_type}'
