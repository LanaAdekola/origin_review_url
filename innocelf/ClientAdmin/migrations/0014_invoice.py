# Generated by Django 3.1.2 on 2022-01-01 14:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ClientAdmin', '0013_inventiondisclosurequestionnaire_sendinventiondisclosurequestionnaire'),
    ]

    operations = [
        migrations.CreateModel(
            name='Invoice',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.CharField(max_length=50)),
                ('created_on', models.DateField()),
                ('filename', models.FileField(upload_to='')),
                ('client_name_company', models.CharField(max_length=500)),
                ('address', models.CharField(max_length=3000)),
            ],
        ),
    ]
