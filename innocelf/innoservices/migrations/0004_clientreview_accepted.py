# Generated by Django 3.1.2 on 2021-01-25 00:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('innoservices', '0003_auto_20210125_0030'),
    ]

    operations = [
        migrations.AddField(
            model_name='clientreview',
            name='accepted',
            field=models.BooleanField(default=False),
        ),
    ]
