from django.test import TestCase
from ClientAdmin.forms import PotentialProjectForm, ProjectForm, LongTermClientForm, EditProjectForm

form_data_potential_project = {
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

form_data_project = {
    '1': {
        'client_name': 'Test Name',
        'client_company': '',
        'client_email': 'test@mail.com',
        'project_name': 'Test Project Name',
        'project_type': 'PRR',
        'project_deadline': '2021-03-20',
        'project_estimated_days': '20',
        'start_date': '2021-03-15',
        'end_date': '2021-03-20',
        'expected_revenue': '1500',
        'is_valid': True
    },
    '2': {
        'client_name': 'Test Name',
        'client_company': 'Test Company',
        'client_email': 'test@mail.com',
        'project_name': 'Test Project Name',
        'project_type': 'PRR',
        'project_deadline': '2021-03-20',
        'project_estimated_days': '20',
        'start_date': '2021-03-15',
        'end_date': '2021-03-20',
        'expected_revenue': '1500',
        'is_valid': True
    },
    '3': {
        'client_name': 'Test Name',
        'client_company': 'Test Company',
        'client_email': '',
        'project_name': '',
        'project_type': 'PRR',
        'project_deadline': '2021-03-20',
        'project_estimated_days': '20',
        'start_date': '2021-03-15',
        'end_date': '2021-03-20',
        'expected_revenue': '1500',
        'is_valid': False
    },
    '4': {
        'client_name': 'Test Name',
        'client_company': '',
        'client_email': '',
        'project_name': 'Test Project Name',
        'project_type': 'ABC',
        'project_deadline': '2021-03-20',
        'project_estimated_days': '20',
        'start_date': '2021-03-15',
        'end_date': '2021-03-20',
        'expected_revenue': '1500',
        'is_valid': False
    },
    '5': {
        'client_name': '',
        'client_company': '',
        'client_email': 'test@mail.com',
        'project_name': 'Test Project Name',
        'project_type': 'PRR',
        'project_deadline': '2021-03-20',
        'project_estimated_days': '20',
        'start_date': '2021-03-15',
        'end_date': '2021-03-20',
        'expected_revenue': '1500',
        'is_valid': False
    },
    '6': {
        'client_name': 'Test Name',
        'client_company': 'Test Company',
        'client_email': 'test@mail.com',
        'project_name': 'Test Project Name',
        'project_type': 'FPD',
        'project_deadline': '',
        'project_estimated_days': '20',
        'start_date': '2021-03-15',
        'end_date': '2021-03-20',
        'expected_revenue': '1500',
        'is_valid': False
    },
    '7': {
        'client_name': 'Test Name',
        'client_company': 'Test Company',
        'client_email': 'test@mail.com',
        'project_name': 'Test Project Name',
        'project_type': 'FPD',
        'project_deadline': '2021-03-20',
        'project_estimated_days': '20',
        'start_date': '',
        'end_date': '2021-03-20',
        'expected_revenue': '1500',
        'is_valid': False
    },
    '8': {
        'client_name': 'Test Name',
        'client_company': 'Test Company',
        'client_email': 'test@mail.com',
        'project_name': 'Test Project Name',
        'project_type': 'FPD',
        'project_deadline': '2021-03-20',
        'project_estimated_days': '20',
        'start_date': '2021-03-15',
        'end_date': '',
        'expected_revenue': '1500',
        'is_valid': False
    },
    '9': {
        'client_name': 'Test Name',
        'client_company': 'Test Company',
        'client_email': 'test@mail.com',
        'project_name': 'Test Project Name',
        'project_type': 'FPD',
        'project_deadline': 'LOL',
        'project_estimated_days': '20',
        'start_date': '2021-03-15',
        'end_date': '2021-03-20',
        'expected_revenue': '1500',
        'is_valid': False
    },
    '10': {
        'client_name': 'Test Name',
        'client_company': 'Test Company',
        'client_email': 'test@mail.com',
        'project_name': 'Test Project Name',
        'project_type': 'FPD',
        'project_deadline': '2021-03-20',
        'project_estimated_days': 'LOL',
        'start_date': '2021-03-15',
        'end_date': '2021-03-20',
        'expected_revenue': '1500',
        'is_valid': False
    },
    '11': {
        'client_name': 'Test Name',
        'client_company': 'Test Company',
        'client_email': 'LOL',
        'project_name': 'Test Project Name',
        'project_type': 'FPD',
        'project_deadline': '2021-03-20',
        'project_estimated_days': '15',
        'start_date': '2021-03-15',
        'end_date': '2021-03-20',
        'expected_revenue': '1500',
        'is_valid': False
    }
}

form_data_ltc = {
    '1': {
        'client_name': 'Test Name',
        'client_company': '',
        'client_email': 'test@mail.com',
        'is_valid': False
    },
    '2': {
        'client_name': '',
        'client_company': '',
        'client_email': 'test@mail.com',
        'is_valid': False
    },
    '3': {
        'client_name': 'Test Name',
        'client_company': 'Test Company',
        'client_email': '',
        'is_valid': False
    },
    '4': {
        'client_name': 'Test Name',
        'client_company': 'Test Company',
        'client_email': 'absososls',
        'is_valid': False
    },
    '5': {
        'client_name': 'Test Name',
        'client_company': 'Test Company',
        'client_email': 'test@mail.com',
        'is_valid': True
    }
}

form_data_edit_project = {
    '1': {
        'client_name': 'Test Name',
        'client_company': '',
        'client_email': 'test@mail.com',
        'project_name': 'Test Project Name',
        'project_type': 'PRR',
        'project_deadline': '2021-03-20',
        'expected_revenue': '1500',
        'is_valid': True
    },
    '2': {
        'client_name': 'Test Name',
        'client_company': 'Test Company',
        'client_email': 'test@mail.com',
        'project_name': 'Test Project Name',
        'project_type': 'PRR',
        'project_deadline': '2021-03-20',
        'expected_revenue': '1500',
        'is_valid': True
    },
    '3': {
        'client_name': 'Test Name',
        'client_company': 'Test Company',
        'client_email': '',
        'project_name': '',
        'project_type': 'PRR',
        'project_deadline': '2021-03-20',
        'expected_revenue': '1500',
        'is_valid': False
    },
    '4': {
        'client_name': 'Test Name',
        'client_company': '',
        'client_email': '',
        'project_name': 'Test Project Name',
        'project_type': 'ABC',
        'project_deadline': '2021-03-20',
        'expected_revenue': '1500',
        'is_valid': False
    },
    '5': {
        'client_name': '',
        'client_company': '',
        'client_email': 'test@mail.com',
        'project_name': 'Test Project Name',
        'project_type': 'PRR',
        'project_deadline': '2021-03-20',
        'expected_revenue': '1500',
        'is_valid': False
    },
    '6': {
        'client_name': 'Test Name',
        'client_company': 'Test Company',
        'client_email': 'test@mail.com',
        'project_name': 'Test Project Name',
        'project_type': 'FPD',
        'project_deadline': '',
        'expected_revenue': '1500',
        'is_valid': False
    },
    '8': {
        'client_name': 'Test Name',
        'client_company': 'Test Company',
        'client_email': 'test@mail.com',
        'project_name': 'Test Project Name',
        'project_type': 'FPD',
        'project_deadline': '2021-03-20',
        'expected_revenue': '1500',
        'is_valid': True
    },
    '9': {
        'client_name': 'Test Name',
        'client_company': 'Test Company',
        'client_email': 'test@mail.com',
        'project_name': 'Test Project Name',
        'project_type': 'FPD',
        'project_deadline': 'LOL',
        'expected_revenue': '1500',
        'is_valid': False
    },
    '11': {
        'client_name': 'Test Name',
        'client_company': 'Test Company',
        'client_email': 'LOL',
        'project_name': 'Test Project Name',
        'project_type': 'FPD',
        'project_deadline': '2021-03-20',
        'expected_revenue': '1500',
        'is_valid': False
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
        '''
        Tests that the form validation is passed only when all the required fields are inputted and
        that the fields are inputted in the right format i.e. email in emailField etc.
        '''

        for key in form_data_potential_project.keys():
            form = PotentialProjectForm(data={
                'client_name': form_data_potential_project[key]['client_name'],
                'client_company': form_data_potential_project[key]['client_company'],
                'client_email': form_data_potential_project[key]['client_email'],
                'project_name': form_data_potential_project[key]['project_name'],
                'project_type': form_data_potential_project[key]['project_type'],
                'initial_contact_date': form_data_potential_project[key]['initial_contact_date'],
            })
            if form_data_potential_project[key]['is_valid']:
                self.assertTrue(form.is_valid())
            else:
                self.assertFalse(form.is_valid())


class ProjectFormTest(TestCase):
    '''
    Tests the validity of the forms, the labels and other things that are required
    The tests are done with a few form inputs and tested whether they are valid or not
    '''

    def test_form_labels(self):
        '''
        Tets that the form labels are what we intended them to be
        '''
        form = ProjectForm()
        self.assertEqual(form.fields['client_name'].label, 'Client Full Name')
        self.assertEqual(form.fields['client_company'].label,
                         'Client Company (Optional)')
        self.assertEqual(
            form.fields['client_long_term'].label, 'Long Term Client?')
        self.assertEqual(form.fields['client_email'].label, 'Client Email')
        self.assertEqual(form.fields['project_name'].label, 'Project Name')
        self.assertEqual(form.fields['project_type'].label, 'Project Type')
        self.assertEqual(
            form.fields['project_deadline'].label, 'Project Deadline')
        self.assertEqual(
            form.fields['project_estimated_days'].label, 'Estimated Days for Completion')
        self.assertEqual(form.fields['start_date'].label, 'Project Start Date')
        self.assertEqual(form.fields['end_date'].label, 'Project End Date')
        self.assertEqual(
            form.fields['expected_revenue'].label, 'Expected Revenue')

    def test_required_fields(self):
        '''
        Tests that the form validation is passed only when all the required fields are inputted and
        that the fields are inputted in the right format i.e. email in emailField etc.
        '''

        for key in form_data_project.keys():
            form = ProjectForm(data={
                'client_name': form_data_project[key]['client_name'],
                'client_company': form_data_project[key]['client_company'],
                'client_email': form_data_project[key]['client_email'],
                'project_name': form_data_project[key]['project_name'],
                'project_type': form_data_project[key]['project_type'],
                'project_deadline': form_data_project[key]['project_deadline'],
                'project_estimated_days': form_data_project[key]['project_estimated_days'],
                'start_date': form_data_project[key]['start_date'],
                'end_date': form_data_project[key]['end_date'],
                'expected_revenue': form_data_project[key]['expected_revenue'],
            })
            if form_data_project[key]['is_valid']:
                self.assertTrue(form.is_valid(), msg=f'{key} should be False')
            else:
                self.assertFalse(form.is_valid(), msg=f'{key} should be True')


class LongTermClientFormTest(TestCase):
    '''
    Tests the validity of the forms, the labels and other things that are required
    The tests are done with a few form inputs and tested whether they are valid or not
    '''

    def test_form_labels(self):
        '''
        Tets that the form labels are what we intended them to be
        '''
        form = LongTermClientForm()
        self.assertEqual(form.fields['client_name'].label, 'Client Full Name')
        self.assertEqual(form.fields['client_company'].label,
                         'Client Company')
        self.assertEqual(form.fields['client_email'].label, 'Client Email')

    def test_required_fields(self):
        '''
        Tests that the form validation is passed only when all the required fields are inputted and
        that the fields are inputted in the right format i.e. email in emailField etc.
        '''

        for key in form_data_ltc.keys():
            form = LongTermClientForm(data={
                'client_name': form_data_ltc[key]['client_name'],
                'client_company': form_data_ltc[key]['client_company'],
                'client_email': form_data_ltc[key]['client_email'],
            })
            if form_data_ltc[key]['is_valid']:
                self.assertTrue(form.is_valid(), msg=f'{key} should be False')
            else:
                self.assertFalse(form.is_valid(), msg=f'{key} should be True')


class EditProjectFormTest(TestCase):
    '''
    Tests the validity of the forms, the labels and other things that are required
    The tests are done with a few form inputs and tested whether they are valid or not
    '''

    def test_form_labels(self):
        '''
        Tets that the form labels are what we intended them to be
        '''
        form = EditProjectForm()
        self.assertEqual(form.fields['client_name'].label, 'Client Full Name')
        self.assertEqual(form.fields['client_company'].label,
                         'Client Company (Optional)')
        self.assertEqual(form.fields['client_email'].label, 'Client Email')
        self.assertEqual(form.fields['project_name'].label, 'Project Name')
        self.assertEqual(form.fields['project_type'].label, 'Project Type')
        self.assertEqual(
            form.fields['project_deadline'].label, 'Project Deadline')
        self.assertEqual(
            form.fields['expected_revenue'].label, 'Expected Revenue')

    def test_required_fields(self):
        '''
        Tests that the form validation is passed only when all the required fields are inputted and
        that the fields are inputted in the right format i.e. email in emailField etc.
        '''

        for key in form_data_edit_project.keys():
            form = EditProjectForm(data={
                'client_name': form_data_edit_project[key]['client_name'],
                'client_company': form_data_edit_project[key]['client_company'],
                'client_email': form_data_edit_project[key]['client_email'],
                'project_name': form_data_edit_project[key]['project_name'],
                'project_type': form_data_edit_project[key]['project_type'],
                'project_deadline': form_data_edit_project[key]['project_deadline'],
                'expected_revenue': form_data_edit_project[key]['expected_revenue'],
            })
            if form_data_edit_project[key]['is_valid']:
                self.assertTrue(form.is_valid(), msg=f'{key} should be False')
            else:
                self.assertFalse(form.is_valid(), msg=f'{key} should be True')
