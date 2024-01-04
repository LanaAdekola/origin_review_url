from ClientAdmin.models import Project, Payment
import os
import datetime
import csv

# exec(open('/home/pratik/PycharmProjects/Innocelf/innocelf/ClientAdmin/DataUploading/projects.py').read())
folder = '/home/pratik/Documents/InnocelfAdminPortal'
filename = 'InnocelfProjects.csv'
print(os.path.join(folder, filename))

with open(os.path.join(folder, filename)) as f:
    reader = csv.DictReader(f)
    for row in reader:
        if row['ClientLongTerm'] == 'TRUE':
            row['ClientLongTerm'] = True
        elif row['ClientLongTerm'] == 'FALSE':
            row['ClientLongTerm'] = False

        if row['IsComplete'] == 'TRUE':
            row['IsComplete'] = True
        elif row['IsComplete'] == 'FALSE':
            row['IsComplete'] = False

        new_project = Project.objects.create(
            client_name=row['ClientName'],
            client_company=row['ClientCompany'],
            client_long_term=row['ClientLongTerm'],
            client_email=row['ClientEmail'],
            project_name=row['ProjectName'],
            project_type=row['ProjectType'],
            project_deadline=datetime.datetime.strptime(
                row['ProjectDeadline'], '%m/%d/%y'),
            start_date=datetime.datetime.strptime(
                row['StartDate'], '%m/%d/%y'),
            end_date=datetime.datetime.strptime(
                row['EndDate'], '%m/%d/%y'),
            expected_revenue=float(row['ExpectedRevenue']),
            is_project_complete=row['ClientLongTerm'],
        )
        new_project.save()
        if row['Payment'] != '':
            Payment.objects.create(
                project=Project.objects.get(slug=new_project.slug),
                amount=float(row['Payment']),
                payment_date=datetime.datetime.strptime(
                    row['PaymentDate'], '%m/%d/%y')
            )
        print(row)
