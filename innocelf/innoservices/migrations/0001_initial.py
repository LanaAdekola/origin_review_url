# Generated by Django 3.1.2 on 2020-10-14 11:09

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ContactUs',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=255)),
                ('last_name', models.CharField(max_length=255)),
                ('email', models.EmailField(max_length=254)),
                ('phone', models.CharField(max_length=12)),
                ('inquiry_reason', models.CharField(choices=[('PS', 'Patentability / Novelty Search'), ('CS', 'Clearance Search'), ('IS', 'Invalidity Search'), ('FS', 'Freedom to Operate Search'), ('LA', 'Landscape / State of the Art'), ('PR', 'Product Research')], max_length=3)),
                ('explanation', models.CharField(max_length=3000)),
            ],
        ),
    ]
