from django.test import TestCase
from ClientAdmin.forms import PotentialProjectForm

form_data = {
    '1': {
        'client_name': 'Test Name',
        'client_company': '',
        'client_email': '',
        'project_name': 'Test Project Name',
        'project_type': 'PRR',
        'initial_contact_date': '2021-08-12',
        'is_valid': True
    },
    '2': {
        'client_name': '',
        'client_company': '',
        'client_email': '',
        'project_name': 'Test Project Name',
        'project_type': 'PRR',
        'initial_contact_date': '2021-08-12',
        'is_valid': False
    },
    '3': {
        'client_name': 'Test Name',
        'client_company': 'Test Company',
        'client_email': '',
        'project_name': '',
        'project_type': 'PRR',
        'initial_contact_date': '2021-08-12',
        'is_valid': False
    },
    '4': {
        'client_name': 'Test Name',
        'client_company': '',
        'client_email': '',
        'project_name': 'Test Project Name',
        'project_type': 'PRR',
        'initial_contact_date': 'xyzoes',
        'is_valid': False
    },
    '5': {
        'client_name': 'Test Name',
        'client_company': '',
        'client_email': '',
        'project_name': 'Test Project Name',
        'project_type': 'ABC',
        'initial_contact_date': '2021-08-12',
        'is_valid': False
    },
    '6': {
        'client_name': 'Test Name',
        'client_company': 'Test Company',
        'client_email': '',
        'project_name': 'Test Project Name',
        'project_type': 'FPD',
        'initial_contact_date': '2021-08-12',
        'is_valid': True
    },
    '7': {
        'client_name': 'Test Name',
        'client_company': 'Test Company',
        'client_email': 'AAA',
        'project_name': 'Test Project Name',
        'project_type': 'FPD',
        'initial_contact_date': '2021-08-12',
        'is_valid': False
    },
    '8': {
        'client_name': 'Test Name',
        'client_company': 'Test Company',
        'client_email': 'test@test.com',
        'project_name': 'Test Project Name',
        'project_type': 'FPD',
        'initial_contact_date': '2021-08-12',
        'is_valid': True
    }
}


class PotentialProjectFormTest(TestCase):
    '''
    Tests the validity of the forms, the labels and other things required
    '''

    def test_form_labels(self):
        '''
        Tests that the form labels are what we intended them to be
        '''
        form = PotentialProjectForm()
        self.assertEqual(form.fields['client_name'].label, 'Client Full Name')
        self.assertEqual(form.fields['client_company'].label, 'Client Company')
        self.assertEqual(form.fields['client_email'].label, 'Client Email')
        self.assertEqual(form.fields['project_name'].label, 'Project Name')
        self.assertEqual(form.fields['project_type'].label, 'Project Type')
        self.assertEqual(
            form.fields['initial_contact_date'].label, 'Initial Contact Date')

    def test_required_fields(self):

        for key in form_data.keys():
            form = PotentialProjectForm(data={
                'client_name': form_data[key]['client_name'],
                'client_company': form_data[key]['client_company'],
                'client_email': form_data[key]['client_email'],
                'project_name': form_data[key]['project_name'],
                'project_type': form_data[key]['project_type'],
                'initial_contact_date': form_data[key]['initial_contact_date'],
            })
            if form_data[key]['is_valid']:
                self.assertTrue(form.is_valid())
            else:
                self.assertFalse(form.is_valid())
