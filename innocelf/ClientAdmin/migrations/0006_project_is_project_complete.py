# Generated by Django 3.1.2 on 2021-03-13 13:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ClientAdmin', '0005_auto_20210312_1218'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='is_project_complete',
            field=models.BooleanField(default=False),
        ),
    ]
