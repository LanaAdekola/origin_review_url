# Generated by Django 3.1.2 on 2021-11-23 14:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('innoservices', '0007_auto_20211030_1947'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contactus',
            name='inquiry_reason',
            field=models.CharField(choices=[('PS', 'Patentability / Novelty Search'), ('CS', 'Clearance Search'), ('IS', 'Invalidity Search'), ('FS', 'Freedom to Operate Search'), ('LA', 'Landscape / State of the Art'), ('PR', 'Product Research'), ('NS', 'Introduction / Unsure')], max_length=3),
        ),
    ]
