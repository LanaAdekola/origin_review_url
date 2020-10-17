from django.db import models


class InnocelfCustomer(models.Model):
    '''
    Initates a customer model for all the customers that are doing business with Innocelf
    '''
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=13)
    company_name = models.CharField(max_length=50, blank=True, null=True)
    total_business_recieved = models.FloatField(default=0)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'
