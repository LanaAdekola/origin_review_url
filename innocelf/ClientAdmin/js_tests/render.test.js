'use strict';

import * as Render from '../static/ClientAdmin/js/render.js';
import * as RenderServices from '../../innoservices/static/innoservices/js/render_ts.js';
import * as ChartJs from '../../static/js/chart.min.js';

describe('Test function prependCSRFTokenInput', function () {
    beforeEach(function () {
        let app = document.createElement('div');
        app.id = 'app';
        document.body.append(app);
    });

    it('Test function prependCSRFTOkenInput', function () {
        let inputString = `<input type="hidden" name="csrfMiddlewareToken"
        value="Test CSRF Token">`;

        // Invoke the function
        Render.prependCSRFTokenInput(inputString);

        // Assert that the input element exists
        let inputElement = document.body.querySelector('input');
        expect(inputElement).not.toBeNull();
        expect(inputElement.type).toBe('hidden');
        expect(inputElement.name).toBe('csrfMiddlewareToken');
        expect(inputElement.value).toBe('Test CSRF Token');
    });

    afterEach(function () {
        document.getElementById('app').remove();
    });
});

describe('Test function _longTermClientFormRender', function () {
    beforeEach(function () {
        RenderServices._obtainForm = jest.fn(() => {
            return `<input type="text" name="client_name" id="add_long_term_client_clientName" maxlength="250" required><input type="text" name="client_company" id="add_long_term_client_clientCompany" maxlength="250" required><input type="email" name="client_email" id="add_long_term_client_clientEmail" maxlength="254" required>`;
        });

        let csrfToken = Object.assign(document.createElement('input'), {
            type: 'hidden',
            name: 'csrfmiddlewaretoken',
            value: 'test csrf token',
        });
        document.body.append(csrfToken);
    });

    it('Test function _longTermClientFormRender', async function () {
        let testOutput = await Render._longTermClientFormRender();
        expect(testOutput).not.toBeNull();

        expect(testOutput.tagName.toLowerCase()).toBe('form');
        expect(testOutput.id).toBe('add-long-term-client-form');
        expect(testOutput.childNodes.length).toBe(4);
    });

    it('Verify form first child is accurate', async function () {
        let testOutput = await Render._longTermClientFormRender();
        let label = testOutput.children[0];
        expect(label).not.toBeNull();
        expect(label.tagName.toLowerCase()).toBe('label');

        let span = label.children[0];
        expect(span.tagName.toLowerCase()).toBe('span');
        expect(span.textContent).toBe('Name*');
        expect(span.classList.contains('text-gray-700')).toBeTruthy();
        expect(span.classList.contains('lato-regular')).toBeTruthy();

        let input = label.children[1];
        expect(input.type).toBe('text');
        expect(input.name).toBe('client_name');
        expect(input.id).toBe('add_long_term_client_clientName');
        expect(input.maxLength).toBe(250);
        expect(input.required).toBeTruthy();
    });

    it('Verify form second child is accurate', async function () {
        let testOutput = await Render._longTermClientFormRender();
        let label = testOutput.children[1];
        expect(label).not.toBeNull();
        expect(label.tagName.toLowerCase()).toBe('label');

        let span = label.children[0];
        expect(span.tagName.toLowerCase()).toBe('span');
        expect(span.textContent).toBe('Company*');
        expect(span.classList.contains('text-gray-700')).toBeTruthy();
        expect(span.classList.contains('lato-regular')).toBeTruthy();

        let input = label.children[1];
        expect(input.type).toBe('text');
        expect(input.name).toBe('client_company');
        expect(input.id).toBe('add_long_term_client_clientCompany');
        expect(input.maxLength).toBe(250);
        expect(input.required).toBeTruthy();
    });

    it('Verify form third child is accurate', async function () {
        let testOutput = await Render._longTermClientFormRender();
        let label = testOutput.children[2];
        expect(label).not.toBeNull();
        expect(label.tagName.toLowerCase()).toBe('label');

        let span = label.children[0];
        expect(span.tagName.toLowerCase()).toBe('span');
        expect(span.textContent).toBe('Email*');
        expect(span.classList.contains('text-gray-700')).toBeTruthy();
        expect(span.classList.contains('lato-regular')).toBeTruthy();

        let input = label.children[1];
        expect(input.type).toBe('email');
        expect(input.name).toBe('client_email');
        expect(input.id).toBe('add_long_term_client_clientEmail');
        expect(input.maxLength).toBe(254);
        expect(input.required).toBeTruthy();
    });

    it('Verify form fourth child is accurate', async function () {
        let testOutput = await Render._longTermClientFormRender();
        let button = testOutput.children[3];
        expect(button).not.toBeNull();
        expect(button.tagName.toLowerCase()).toBe('button');
        expect(button.type).toBe('submit');
        expect(button.textContent).toBe('Submit');
    });

    afterEach(function () {
        jest.clearAllMocks();
    });
});

describe('Test function _longTermClientFormSubmit', function () {
    let xhrMockClass = {
        open: jest.fn(),
        send: jest.fn(),
        onreadystatechange: jest.fn(),
        onload: jest.fn(),
        readyState: 4,
        status: 200,
        response: ``,
    };

    beforeEach(async function () {
        RenderServices._obtainForm = jest.fn(() => {
            return `<input type="text" name="client_name"
            id="add_long_term_client_clientName" maxlength="250" required><input
            type="text" name="client_company"
            id="add_long_term_client_clientCompany" maxlength="250"
            required><input type="email" name="client_email"
            id="add_long_term_client_clientEmail" maxlength="254" required>`;
        });

        let csrfToken = Object.assign(document.createElement('input'), {
            type: 'hidden',
            name: 'csrfmiddlewaretoken',
            value: 'test csrf token',
        });
        let longTermClientContainer = Object.assign(
            document.createElement('div'),
            {
                id: 'add-long-term-client-container',
            }
        );
        let longTermClientSelect = Object.assign(
            document.createElement('select'),
            {
                id: 'add-project-select-long-term-client',
            }
        );
        let app = document.createElement('div');
        app.id = 'app';

        app.append(longTermClientContainer, longTermClientSelect);
        document.body.append(csrfToken, app);

        jest.useFakeTimers();
    });

    it('Test function calls appropriate methods from XMLHttpRequest', async function () {
        let successResponse = {
            Success: 'The long term client has been saved successfully.',
            csrftoken: `<input type="hidden" name="csrfMiddlewareToken"
        value="Test CSRF Token">`,
        };
        xhrMockClass.response = JSON.stringify(successResponse);
        jest.spyOn(window, 'XMLHttpRequest').mockImplementation(
            () => xhrMockClass
        );

        let formElement = await Render._longTermClientFormRender();

        // Invoke the test function
        Render._longTermClientFormSubmit(formElement);

        expect(xhrMockClass.open).toBeCalledTimes(1);
        expect(xhrMockClass.open).toBeCalledWith(
            'POST',
            '/client-admin/save-long-term-client-form'
        );
        expect(xhrMockClass.send).toBeCalledTimes(1);
        expect(xhrMockClass.send).toBeCalledWith(new FormData(formElement));
    });

    it('Test successful submit', async function () {
        let successResponse = {
            Success: 'The long term client has been saved successfully.',
            csrftoken: `<input type="hidden" name="csrfMiddlewareToken"
        value="Test CSRF Token">`,
        };
        xhrMockClass.response = JSON.stringify(successResponse);
        jest.spyOn(window, 'XMLHttpRequest').mockImplementation(
            () => xhrMockClass
        );

        let formElement = await Render._longTermClientFormRender();

        let longTermClientContainer = document.getElementById(
            'add-long-term-client-container'
        );
        longTermClientContainer.append(formElement);

        expect(longTermClientContainer.childNodes.length).toBe(1);
        expect(longTermClientContainer.children[0].tagName.toLowerCase()).toBe(
            'form'
        );

        // Invoke the test function
        Render._longTermClientFormSubmit(formElement);
        // Make sure that the on load cycle is complete
        xhrMockClass.onload(new Event(''));

        expect(longTermClientContainer.children[0].tagName.toLowerCase()).toBe(
            'h3'
        );
        expect(longTermClientContainer.children[0].textContent).toBe(
            'The long term client has been saved successfully.'
        );
        let expectedClasses = [
            'm-auto',
            'transition-opacity',
            'duration-500',
            'ease-in-out',
            'opacity-0',
        ];
        expectedClasses.map((item) => {
            expect(
                longTermClientContainer.children[0].classList.contains(item)
            ).toBeTruthy();
        });

        jest.advanceTimersByTime(800);
        expect(
            longTermClientContainer.children[0].classList.contains(
                'opacity-100'
            )
        ).toBeTruthy();
        expect(
            longTermClientContainer.children[0].classList.contains('opacity-0')
        ).toBeFalsy();

        jest.advanceTimersByTime(3000);
        expect(longTermClientContainer.childNodes.length).toBe(0);
    });

    it('Test failed submit', async function () {
        let successResponse = {
            Failure:
                'Something went wrong. The form did not save. Please try again.',
            csrftoken: `<input type="hidden" name="csrfMiddlewareToken"
        value="Test CSRF Token">`,
        };
        xhrMockClass.response = JSON.stringify(successResponse);
        jest.spyOn(window, 'XMLHttpRequest').mockImplementation(
            () => xhrMockClass
        );

        let formElement = await Render._longTermClientFormRender();

        let longTermClientContainer = document.getElementById(
            'add-long-term-client-container'
        );
        longTermClientContainer.append(formElement);

        expect(longTermClientContainer.childNodes.length).toBe(1);
        expect(longTermClientContainer.children[0].tagName.toLowerCase()).toBe(
            'form'
        );

        // Invoke the test function
        Render._longTermClientFormSubmit(formElement);
        // Make sure that the on load cycle is complete
        xhrMockClass.onload(new Event(''));

        expect(longTermClientContainer.children[0].tagName.toLowerCase()).toBe(
            'h3'
        );
        expect(longTermClientContainer.children[0].textContent).toBe(
            'Something went wrong. The form did not save. Please try again.'
        );
        let expectedClasses = [
            'm-auto',
            'text-red-500',
            'transition-opacity',
            'duration-500',
            'ease-in-out',
            'opacity-0',
        ];
        expectedClasses.map((item) => {
            expect(
                longTermClientContainer.children[0].classList.contains(item)
            ).toBeTruthy();
        });

        jest.advanceTimersByTime(800);
        expect(
            longTermClientContainer.children[0].classList.contains(
                'opacity-100'
            )
        ).toBeTruthy();
        expect(
            longTermClientContainer.children[0].classList.contains('opacity-0')
        ).toBeFalsy();

        jest.advanceTimersByTime(3000);
        expect(longTermClientContainer.childNodes.length).toBe(0);
    });

    afterEach(function () {
        document.getElementById('app').remove();
    });
});

describe('Test function longTermClientContainer', function () {
    it('Test function longTermClientContainer', function () {
        let testOutput = Render.longTermClientContainer();
        expect(testOutput).not.toBeNull();
        expect(testOutput.tagName.toLowerCase()).toBe('div');
        expect(testOutput.id).toBe('add-long-term-client-container');
        expect(testOutput.childNodes.length).toBe(1);
        expect(testOutput.childNodes[0].nodeName.toLowerCase()).toBe('h5');
        expect(testOutput.childNodes[0].textContent).toBe(
            'Add Long Term Client'
        );
        expect(
            testOutput.childNodes[0].classList.contains('my-5')
        ).toBeTruthy();
        expect(
            testOutput.childNodes[0].classList.contains('text-center')
        ).toBeTruthy();
    });

    afterEach(function () {
        jest.clearAllMocks();
    });
});

describe('Test function _createLongTermClientSelect', function () {
    it('Test that the function output is accurate', function () {
        let testOutput = Render._createLongTermClientSelect();

        expect(testOutput).not.toBeNull();
        expect(testOutput.tagName.toLowerCase()).toBe('label');
        let labelClasses = ['block', 'lato-regular', 'text-gray-200'];
        labelClasses.map((item) => {
            expect(testOutput.classList.contains(item)).toBeTruthy();
        });
        expect(testOutput.childNodes.length).toBe(2);
    });

    it('Test that the function output first child is accurate', function () {
        let testOutput = Render._createLongTermClientSelect();
        let child = testOutput.children[0];

        expect(child).not.toBeNull();
        expect(child.tagName.toLowerCase()).toBe('span');
        expect(child.classList.contains('lato-regular')).toBeTruthy();
        expect(child.textContent).toBe('Choose Long Term Client');
    });

    it('Test that the function output second child is accurate', function () {
        let testOutput = Render._createLongTermClientSelect();
        let child = testOutput.children[1];

        expect(child).not.toBeNull();
        expect(child.tagName.toLowerCase()).toBe('select');
        let childClasses = [
            'mt-0',
            'block',
            'lato-regular',
            'bg-transparent',
            'w-full',
            'text-sm',
            'p-2',
            'border-0',
            'border-b',
            'border-gray-700',
            'focus:ring-0',
            'focus:border-black',
            'disabled:border-gray-200',
        ];
        childClasses.map((item) => {
            expect(child.classList.contains(item)).toBeTruthy();
        });
        expect(child.id).toBe('add-project-select-long-term-client');
    });
});

describe('Test function _addLongTermClientOptionsInSelect', function () {
    let xhrMockClass = {
        open: jest.fn(),
        send: jest.fn(),
        onreadystatechange: jest.fn(),
        onload: jest.fn(),
        readyState: 4,
        status: 200,
        response: ``,
    };

    beforeEach(function () {
        // Add select to the page
        let select = document.createElement('select');
        select.id = 'add-project-select-long-term-client';

        for (let i = 0; i < 4; i++) {
            let option = document.createElement('option');
            option.value = 'test name_test company_test email';
            select.append(option);
        }

        document.body.append(select);

        let testResponse = {};
        for (let i = 0; i < 3; i++) {
            testResponse[i] = {
                fields: {
                    client_name: 'Test Name ' + (i + 1).toFixed(0),
                    client_company: 'Test Company ' + (i + 1).toFixed(0),
                    client_email:
                        'test_email_' + (i + 1).toFixed(0) + '@test.com',
                },
            };
        }
        xhrMockClass.response = JSON.stringify(testResponse);
        jest.spyOn(window, 'XMLHttpRequest').mockImplementation(
            () => xhrMockClass
        );
    });

    it('Test that the function calls the right XML functions', function () {
        let select = document.getElementById(
            'add-project-select-long-term-client'
        );
        Render._addLongTermClientOptionsInSelect(select);

        expect(xhrMockClass.open).toBeCalledTimes(1);
        expect(xhrMockClass.open).toBeCalledWith(
            'GET',
            '/client-admin/obtain-long-term-clients-list'
        );
        expect(xhrMockClass.send).toBeCalledTimes(1);
    });

    it('Test that the function produces the appropriate results', function () {
        let select = document.getElementById(
            'add-project-select-long-term-client'
        );
        Render._addLongTermClientOptionsInSelect(select);
        xhrMockClass.onreadystatechange(new Event(''));

        expect(select.childNodes.length).toBe(4);
        let option1 = select.children[0];
        expect(option1.tagName.toLowerCase()).toBe('option');
        expect(option1.value).toBe('');
        expect(option1.textContent).toBe('');
        expect(option1.selected).toBeTruthy();

        for (let i = 1; i < select.childNodes.length; i++) {
            let option = select.children[i];
            expect(option.tagName.toLowerCase()).toBe('option');
            let expectedValue =
                'Test Name ' +
                i.toFixed(0) +
                '_Test Company ' +
                i.toFixed(0) +
                '_test_email_' +
                i.toFixed(0) +
                '@test.com';
            expect(option.value).toBe(expectedValue);
            expect(option.textContent).toBe('Test Company ' + i.toFixed());
            expect(option.getAttribute('client-name')).toBe(
                'Test Name ' + i.toFixed()
            );
            expect(option.getAttribute('client-company')).toBe(
                'Test Company ' + i.toFixed()
            );
            expect(option.getAttribute('client-email')).toBe(
                'test_email_' + i.toFixed() + '@test.com'
            );
        }
    });

    afterEach(function () {
        document.body.innerHTML = '';
        jest.clearAllMocks();
    });
});

describe('Test function _enableLongTermClientSelect', function () {
    beforeEach(function () {
        let form = Object.assign(document.createElement('form'), {
            id: 'add-project-form',
        });
        let checkbox = Object.assign(document.createElement('input'), {
            type: 'checkbox',
            id: 'add_project_isLongTermClient',
        });
        let label = Object.assign(document.createElement('label'), {
            classList: 'text-gray-200',
        });
        let select = Object.assign(document.createElement('select'), {
            id: 'add-project-select-long-term-client',
            classList: 'text-gray-200',
            disabled: true,
        });
        label.append(select);
        form.append(checkbox, label);

        document.body.append(form);
    });

    it('The function produces the right response', function () {
        let checkbox = document.getElementById('add_project_isLongTermClient');
        let select = document.getElementById(
            'add-project-select-long-term-client'
        );
        let label = select.parentElement;

        expect(label.classList.contains('text-gray-200')).toBeTruthy();
        expect(label.classList.contains('text-gray-700')).toBeFalsy();
        expect(select.disabled).toBeTruthy();

        Render._enableLongTermClientSelect();

        // checkbox = document.getElementById('add_project_isLongTermClient');
        // select = document.getElementById('add-project-select-long-term-client');

        checkbox.click();
        expect(checkbox.checked).toBeTruthy();
        expect(label.classList.contains('text-gray-200')).toBeFalsy();
        expect(label.classList.contains('text-gray-700')).toBeTruthy();
        expect(select.disabled).toBeFalsy();

        checkbox.click();
        expect(checkbox.checked).toBeFalsy();
        expect(label.classList.contains('text-gray-200')).toBeTruthy();
        expect(label.classList.contains('text-gray-700')).toBeFalsy();
        expect(select.disabled).toBeTruthy();
    });

    afterEach(function () {
        document.body.innerHTML = '';
    });
});

describe('Test function _populateLongTermClientInformation', function () {
    beforeEach(function () {
        let form = Object.assign(document.createElement('form'), {
            id: 'add-project-form',
        });
        let select = Object.assign(document.createElement('select'), {
            id: 'add-project-select-long-term-client',
        });
        for (let i = 0; i < 4; i++) {
            let iString = i.toFixed(0);
            let desiredValue =
                'Test Name ' +
                iString +
                '_Test Company ' +
                iString +
                '_testEmail' +
                iString +
                '@test.com';
            let option = Object.assign(document.createElement('option'), {
                value: desiredValue,
            });
            option.setAttribute('client-name', 'Test Name ' + iString);
            option.setAttribute('client-company', 'Test Company ' + iString);
            option.setAttribute(
                'client-email',
                'testEmail' + iString + '@test.com'
            );
            select.append(option);
        }
        let nameInput = Object.assign(document.createElement('input'), {
            type: 'text',
            id: 'add_project_clientName',
        });
        let companyInput = Object.assign(document.createElement('input'), {
            type: 'text',
            id: 'add_project_clientCompany',
        });
        let emailInput = Object.assign(document.createElement('input'), {
            type: 'email',
            id: 'add_project_clientEmail',
        });

        form.append(select, nameInput, companyInput, emailInput);
        document.body.append(form);
    });

    it('The function produces the right results', function () {
        let select = document.getElementById(
            'add-project-select-long-term-client'
        );
        let nameInput = document.getElementById('add_project_clientName');
        let companyInput = document.getElementById('add_project_clientCompany');
        let emailInput = document.getElementById('add_project_clientEmail');

        let changeEvent = new Event('change');

        Render._populateLongTermClientInformation();
        for (let i = 0; i < 4; i++) {
            let iString = i.toFixed(0);
            let desiredValue =
                'Test Name ' +
                iString +
                '_Test Company ' +
                iString +
                '_testEmail' +
                iString +
                '@test.com';
            select.value = desiredValue;
            select.dispatchEvent(changeEvent);

            expect(nameInput.value).toBe('Test Name ' + iString);
            expect(companyInput.value).toBe('Test Company ' + iString);
            expect(emailInput.value).toBe('testEmail' + iString + '@test.com');
        }
    });

    afterEach(function () {
        document.body.innerHTML = '';
    });
});

describe('Test function _addProjectFormRender', function () {
    beforeEach(function () {
        RenderServices._obtainForm = jest.fn(() => {
            return `<input type="text" name="client_name"
            id="add_project_clientName" maxlength="250" required><input
            type="text" name="client_company" id="add_project_clientCompany"
            maxlength="250"><input type="checkbox" name="client_long_term"
            id="add_project_isLongTermClient"><input type="email"
            name="client_email" id="add_project_clientEmail" maxlength="254"
            required><input type="text" name="project_name"
            id="add_project_projectName" maxlength="250" required><select
            name="project_type" id="add_project_projectType" required><option
            value="" selected>---------</option><option value="PAR">Patent
            Research</option><option value="VS">Validity and Invalidity
            Search</option><option value="FTO">Freedom to Operate
            Search</option><option value="PRR">Product Research</option><option
            value="LAN">Landscape / State of the Art</option><option
            value="TS">Trademark Search</option><option value="PD">Provisional
            Draft</option><option value="FPD">Full Patent
            Draft</option></select><input type="date" name="project_deadline"
          id="add_project_projectDeadline" required><input type="number"
          name="project_estimated_days" value="15"
          id="add_project_projectEstimatedDays" required><input type="date"
          name="start_date" id="add_project_startDate" required><input
          type="date" name="end_date" id="add_project_endDate" required><input type="number" name="expected_revenue" value="0" id="add_project_expectedRevenue" step="any" required>`;
        });

        let csrfToken = Object.assign(document.createElement('input'), {
            type: 'hidden',
            name: 'csrfmiddlewaretoken',
            value: 'test csrf token',
        });
        document.body.append(csrfToken);
    });

    it('Test function _addProjectFormRender', async function () {
        let testOutput = await Render._addProjectFormRender();
        expect(testOutput).not.toBeNull();

        expect(testOutput.tagName.toLowerCase()).toBe('form');
        expect(testOutput.id).toBe('add-project-form');
        expect(testOutput.childNodes.length).toBe(13);
    });

    it('Verify form first child is accurate', async function () {
        let testOutput = await Render._addProjectFormRender();
        let label = testOutput.children[0];
        expect(label).not.toBeNull();
        expect(label.tagName.toLowerCase()).toBe('label');
        expect(label.classList.contains('w-2/5')).toBeTruthy();
        expect(label.classList.contains('justify-center')).toBeTruthy();

        let span = label.children[1];
        expect(span.tagName.toLowerCase()).toBe('span');
        expect(span.textContent).toBe('Is Long Term Client');
        expect(span.classList.contains('text-gray-700')).toBeTruthy();
        expect(span.classList.contains('lato-regular')).toBeTruthy();

        let input = label.children[0];
        expect(input.type).toBe('checkbox');
        expect(input.name).toBe('client_long_term');
        expect(input.id).toBe('add_project_isLongTermClient');
    });

    it('Verify form third child is accurate', async function () {
        let testOutput = await Render._addProjectFormRender();
        let label = testOutput.children[2];
        expect(label).not.toBeNull();
        expect(label.tagName.toLowerCase()).toBe('label');
        expect(label.classList.contains('w-3/10')).toBeTruthy();

        let span = label.children[0];
        expect(span.tagName.toLowerCase()).toBe('span');
        expect(span.textContent).toBe('Name*');
        expect(span.classList.contains('text-gray-700')).toBeTruthy();
        expect(span.classList.contains('lato-regular')).toBeTruthy();

        let input = label.children[1];
        expect(input.type).toBe('text');
        expect(input.name).toBe('client_name');
        expect(input.id).toBe('add_project_clientName');
        expect(input.maxLength).toBe(250);
        expect(input.required).toBeTruthy();
    });

    it('Verify form fourth child is accurate', async function () {
        let testOutput = await Render._addProjectFormRender();
        let label = testOutput.children[3];
        expect(label).not.toBeNull();
        expect(label.tagName.toLowerCase()).toBe('label');
        expect(label.classList.contains('w-3/10')).toBeTruthy();

        let span = label.children[0];
        expect(span.tagName.toLowerCase()).toBe('span');
        expect(span.textContent).toBe('Company*');
        expect(span.classList.contains('text-gray-700')).toBeTruthy();
        expect(span.classList.contains('lato-regular')).toBeTruthy();

        let input = label.children[1];
        expect(input.type).toBe('text');
        expect(input.name).toBe('client_company');
        expect(input.id).toBe('add_project_clientCompany');
        expect(input.maxLength).toBe(250);
    });

    it('Verify form fifth child is accurate', async function () {
        let testOutput = await Render._addProjectFormRender();
        let label = testOutput.children[4];
        expect(label).not.toBeNull();
        expect(label.tagName.toLowerCase()).toBe('label');
        expect(label.classList.contains('w-3/10')).toBeTruthy();

        let span = label.children[0];
        expect(span.tagName.toLowerCase()).toBe('span');
        expect(span.textContent).toBe('Email*');
        expect(span.classList.contains('text-gray-700')).toBeTruthy();
        expect(span.classList.contains('lato-regular')).toBeTruthy();

        let input = label.children[1];
        expect(input.type).toBe('email');
        expect(input.name).toBe('client_email');
        expect(input.id).toBe('add_project_clientEmail');
        expect(input.maxLength).toBe(254);
        expect(input.required).toBeTruthy();
    });

    it('Verify form sixth child is accurate', async function () {
        let testOutput = await Render._addProjectFormRender();
        let label = testOutput.children[5];
        expect(label).not.toBeNull();
        expect(label.tagName.toLowerCase()).toBe('label');
        expect(label.classList.contains('w-3/10')).toBeTruthy();

        let span = label.children[0];
        expect(span.tagName.toLowerCase()).toBe('span');
        expect(span.textContent).toBe('Project Name*');
        expect(span.classList.contains('text-gray-700')).toBeTruthy();
        expect(span.classList.contains('lato-regular')).toBeTruthy();

        let input = label.children[1];
        expect(input.type).toBe('text');
        expect(input.name).toBe('project_name');
        expect(input.id).toBe('add_project_projectName');
        expect(input.maxLength).toBe(250);
        expect(input.required).toBeTruthy();
    });

    it('Verify form seventh child is accurate', async function () {
        let testOutput = await Render._addProjectFormRender();
        let label = testOutput.children[6];
        expect(label).not.toBeNull();
        expect(label.tagName.toLowerCase()).toBe('label');
        expect(label.classList.contains('w-3/10')).toBeTruthy();

        let span = label.children[0];
        expect(span.tagName.toLowerCase()).toBe('span');
        expect(span.textContent).toBe('Project Type*');
        expect(span.classList.contains('text-gray-700')).toBeTruthy();
        expect(span.classList.contains('lato-regular')).toBeTruthy();

        let select = label.children[1];
        expect(select.tagName.toLowerCase()).toBe('select');
        expect(select.name).toBe('project_type');
        expect(select.id).toBe('add_project_projectType');
        expect(select.required).toBeTruthy();
        expect(select.childNodes.length).toBe(9);
        let expectedValues = [
            '',
            'PAR',
            'VS',
            'FTO',
            'PRR',
            'LAN',
            'TS',
            'PD',
            'FPD',
        ];
        for (let i = 0; i < select.childNodes.length; i++) {
            expect(select.children[i].tagName.toLowerCase()).toBe('option');
            expect(select.children[i].value).toBe(expectedValues[i]);
        }
    });

    it('Verify form eighth child is accurate', async function () {
        let testOutput = await Render._addProjectFormRender();
        let label = testOutput.children[7];
        expect(label).not.toBeNull();
        expect(label.tagName.toLowerCase()).toBe('label');
        expect(label.classList.contains('w-3/10')).toBeTruthy();

        let span = label.children[0];
        expect(span.tagName.toLowerCase()).toBe('span');
        expect(span.textContent).toBe('Project Deadline*');
        expect(span.classList.contains('text-gray-700')).toBeTruthy();
        expect(span.classList.contains('lato-regular')).toBeTruthy();

        let input = label.children[1];
        expect(input.type).toBe('date');
        expect(input.name).toBe('project_deadline');
        expect(input.id).toBe('add_project_projectDeadline');
        expect(input.required).toBeTruthy();
    });

    it('Verify form ninth child is accurate', async function () {
        let testOutput = await Render._addProjectFormRender();
        let label = testOutput.children[8];
        expect(label).not.toBeNull();
        expect(label.tagName.toLowerCase()).toBe('label');
        expect(label.classList.contains('w-1/4')).toBeTruthy();

        let span = label.children[0];
        expect(span.tagName.toLowerCase()).toBe('span');
        expect(span.textContent).toBe('Estimated Days for Completion*');
        expect(span.classList.contains('text-gray-700')).toBeTruthy();
        expect(span.classList.contains('lato-regular')).toBeTruthy();

        let input = label.children[1];
        expect(input.type).toBe('number');
        expect(input.name).toBe('project_estimated_days');
        expect(input.id).toBe('add_project_projectEstimatedDays');
        expect(input.value).toBe('15');
        expect(input.required).toBeTruthy();
    });

    it('Verify form tenth child is accurate', async function () {
        let testOutput = await Render._addProjectFormRender();
        let label = testOutput.children[9];
        expect(label).not.toBeNull();
        expect(label.tagName.toLowerCase()).toBe('label');
        expect(label.classList.contains('w-1/5')).toBeTruthy();

        let span = label.children[0];
        expect(span.tagName.toLowerCase()).toBe('span');
        expect(span.textContent).toBe('Start Date*');
        expect(span.classList.contains('text-gray-700')).toBeTruthy();
        expect(span.classList.contains('lato-regular')).toBeTruthy();

        let input = label.children[1];
        expect(input.type).toBe('date');
        expect(input.name).toBe('start_date');
        expect(input.id).toBe('add_project_startDate');
        expect(input.required).toBeTruthy();
    });

    it('Verify form eleventh child is accurate', async function () {
        let testOutput = await Render._addProjectFormRender();
        let label = testOutput.children[10];
        expect(label).not.toBeNull();
        expect(label.tagName.toLowerCase()).toBe('label');
        expect(label.classList.contains('w-1/5')).toBeTruthy();

        let span = label.children[0];
        expect(span.tagName.toLowerCase()).toBe('span');
        expect(span.textContent).toBe('End Date*');
        expect(span.classList.contains('text-gray-700')).toBeTruthy();
        expect(span.classList.contains('lato-regular')).toBeTruthy();

        let input = label.children[1];
        expect(input.type).toBe('date');
        expect(input.name).toBe('end_date');
        expect(input.id).toBe('add_project_endDate');
        expect(input.required).toBeTruthy();
    });

    it('Verify form twelfth child is accurate', async function () {
        let testOutput = await Render._addProjectFormRender();
        let label = testOutput.children[11];
        expect(label).not.toBeNull();
        expect(label.tagName.toLowerCase()).toBe('label');
        expect(label.classList.contains('w-1/5')).toBeTruthy();

        let span = label.children[0];
        expect(span.tagName.toLowerCase()).toBe('span');
        expect(span.textContent).toBe('Revenue Expected*');
        expect(span.classList.contains('text-gray-700')).toBeTruthy();
        expect(span.classList.contains('lato-regular')).toBeTruthy();

        let input = label.children[1];
        expect(input.type).toBe('number');
        expect(input.name).toBe('expected_revenue');
        expect(input.id).toBe('add_project_expectedRevenue');
        expect(input.required).toBeTruthy();
    });

    it('Verify form thirteenth child is accurate', async function () {
        let testOutput = await Render._addProjectFormRender();
        let button = testOutput.children[12];
        expect(button).not.toBeNull();
        expect(button.tagName.toLowerCase()).toBe('button');
        expect(button.type).toBe('submit');
        expect(button.textContent).toBe('Submit');
    });

    afterEach(function () {
        jest.clearAllMocks();
    });
});

describe('Test function _addProjectFormSubmit', function () {
    let xhrMockClass = {
        open: jest.fn(),
        send: jest.fn(),
        onreadystatechange: jest.fn(),
        onload: jest.fn(),
        readyState: 4,
        status: 200,
        response: ``,
    };

    beforeEach(async function () {
        RenderServices._obtainForm = jest.fn(() => {
            return `<input type="text" name="client_name"
            id="add_project_clientName" maxlength="250" required><input
            type="text" name="client_company" id="add_project_clientCompany"
            maxlength="250"><input type="checkbox" name="client_long_term"
            id="add_project_isLongTermClient"><input type="email"
            name="client_email" id="add_project_clientEmail" maxlength="254"
            required><input type="text" name="project_name"
            id="add_project_projectName" maxlength="250" required><select
            name="project_type" id="add_project_projectType" required><option
            value="" selected>---------</option><option value="PAR">Patent
            Research</option><option value="VS">Validity and Invalidity
            Search</option><option value="FTO">Freedom to Operate
            Search</option><option value="PRR">Product Research</option><option
            value="LAN">Landscape / State of the Art</option><option
            value="TS">Trademark Search</option><option value="PD">Provisional
            Draft</option><option value="FPD">Full Patent
            Draft</option></select><input type="date" name="project_deadline"
          id="add_project_projectDeadline" required><input type="number"
          name="project_estimated_days" value="15"
          id="add_project_projectEstimatedDays" required><input type="date"
          name="start_date" id="add_project_startDate" required><input
          type="date" name="end_date" id="add_project_endDate" required><input type="number" name="expected_revenue" value="0" id="add_project_expectedRevenue" step="any" required>`;
        });

        let csrfToken = Object.assign(document.createElement('input'), {
            type: 'hidden',
            name: 'csrfmiddlewaretoken',
            value: 'test csrf token',
        });
        let longTermClientContainer = Object.assign(
            document.createElement('div'),
            {
                id: 'add-project-container',
            }
        );
        let app = document.createElement('div');
        app.id = 'app';

        app.append(longTermClientContainer);
        document.body.append(csrfToken, app);

        jest.useFakeTimers();
    });

    it('Test function calls appropriate methods from XMLHttpRequest', async function () {
        let successResponse = {
            Success: 'The long term client has been saved successfully.',
            csrftoken: `<input type="hidden" name="csrfMiddlewareToken"
        value="Test CSRF Token">`,
        };
        xhrMockClass.response = JSON.stringify(successResponse);
        jest.spyOn(window, 'XMLHttpRequest').mockImplementation(
            () => xhrMockClass
        );

        let formElement = await Render._addProjectFormRender();

        // Invoke the test function
        Render._addProjectFormSubmit(formElement);

        // expect(xhrMockClass.open).toBeCalledTimes(1);
        expect(xhrMockClass.open).toBeCalledWith(
            'POST',
            '/client-admin/save-add-project-form'
        );
        // expect(xhrMockClass.send).toBeCalledTimes(1);
        expect(xhrMockClass.send).toBeCalledWith(new FormData(formElement));
    });

    it('Test successful submit', async function () {
        let successResponse = {
            Success: 'The long term client has been saved successfully.',
            csrftoken: `<input type="hidden" name="csrfMiddlewareToken"
        value="Test CSRF Token">`,
        };
        xhrMockClass.response = JSON.stringify(successResponse);
        jest.spyOn(window, 'XMLHttpRequest').mockImplementation(
            () => xhrMockClass
        );

        let formElement = await Render._addProjectFormRender();

        let longTermClientContainer = document.getElementById(
            'add-project-container'
        );
        longTermClientContainer.append(formElement);

        expect(longTermClientContainer.childNodes.length).toBe(1);
        expect(longTermClientContainer.children[0].tagName.toLowerCase()).toBe(
            'form'
        );

        // Invoke the test function
        Render._addProjectFormSubmit(formElement);
        // Make sure that the on load cycle is complete
        xhrMockClass.onload(new Event(''));

        expect(longTermClientContainer.children[0].tagName.toLowerCase()).toBe(
            'h3'
        );
        expect(longTermClientContainer.children[0].textContent).toBe(
            'The long term client has been saved successfully.'
        );
        let expectedClasses = [
            'm-auto',
            'transition-opacity',
            'duration-500',
            'ease-in-out',
            'opacity-0',
        ];
        expectedClasses.map((item) => {
            expect(
                longTermClientContainer.children[0].classList.contains(item)
            ).toBeTruthy();
        });

        jest.advanceTimersByTime(800);
        expect(
            longTermClientContainer.children[0].classList.contains(
                'opacity-100'
            )
        ).toBeTruthy();
        expect(
            longTermClientContainer.children[0].classList.contains('opacity-0')
        ).toBeFalsy();

        jest.advanceTimersByTime(3000);
        expect(longTermClientContainer.childNodes.length).toBe(0);
    });

    it('Test failed submit', async function () {
        let successResponse = {
            Failure:
                'Something went wrong. The form did not save. Please try again.',
            csrftoken: `<input type="hidden" name="csrfMiddlewareToken"
        value="Test CSRF Token">`,
        };
        xhrMockClass.response = JSON.stringify(successResponse);
        jest.spyOn(window, 'XMLHttpRequest').mockImplementation(
            () => xhrMockClass
        );

        let formElement = await Render._addProjectFormRender();

        let longTermClientContainer = document.getElementById(
            'add-project-container'
        );
        longTermClientContainer.append(formElement);

        expect(longTermClientContainer.childNodes.length).toBe(1);
        expect(longTermClientContainer.children[0].tagName.toLowerCase()).toBe(
            'form'
        );

        // Invoke the test function
        Render._addProjectFormSubmit(formElement);
        // Make sure that the on load cycle is complete
        xhrMockClass.onload(new Event(''));

        expect(longTermClientContainer.children[0].tagName.toLowerCase()).toBe(
            'h3'
        );
        expect(longTermClientContainer.children[0].textContent).toBe(
            'Something went wrong. The form did not save. Please try again.'
        );
        let expectedClasses = [
            'm-auto',
            'text-red-500',
            'transition-opacity',
            'duration-500',
            'ease-in-out',
            'opacity-0',
        ];
        expectedClasses.map((item) => {
            expect(
                longTermClientContainer.children[0].classList.contains(item)
            ).toBeTruthy();
        });

        jest.advanceTimersByTime(800);
        expect(
            longTermClientContainer.children[0].classList.contains(
                'opacity-100'
            )
        ).toBeTruthy();
        expect(
            longTermClientContainer.children[0].classList.contains('opacity-0')
        ).toBeFalsy();

        jest.advanceTimersByTime(3000);
        expect(longTermClientContainer.childNodes.length).toBe(0);
    });

    afterEach(function () {
        document.getElementById('app').remove();
        jest.clearAllMocks();
        jest.clearAllTimers();
    });
});

describe('Test function createRevenueChart', function () {
    let array = [...Array(12).keys()];
    let yearRevenueDataObject = {};
    array.map((item) => {
        yearRevenueDataObject[item] = yearRevenueDataObject * 1000;
    });

    beforeEach(function () {
        jest.spyOn(ChartJs, 'Chart').mockImplementation((ctx, myObject) => 42);
    });

    it('The function returns the right result', function () {
        let testOutput = Render.createRevenueChart(yearRevenueDataObject);

        expect(testOutput).not.toBeNull();
        expect(testOutput.tagName.toLowerCase()).toBe('canvas');
        expect(testOutput.style.display).toBe('none');
    });

    afterEach(function () {
        jest.clearAllMocks();
    });
});

// describe('Test function controlRevenueYearDropdownMenu', function () {
//     beforeEach(function () {
//         let container = document.createElement('div');
//         container.id = 'revenue-container';

//         let select = document.createElement('select');
//         select.id = 'revenue-chart-year-select';
//         let years = ['2021', '2022', '2023', '2024'];
//         let currentYear = new Date().getFullYear();
//         years.map((item) => {
//             let option = document.createElement('option');
//             option.value = item;
//             option.textContent = item;

//             select.append(option);

//             let canvas = document.createElement('canvas');
//             canvas.id = 'revenue-chart-year-' + item;
//             if (item !== currentYear.toFixed(0)) {
//                 canvas.style.setProperty('display', 'none', 'important');
//             } else {
//                 select.value = item;
//             }
//             container.append(canvas);
//         });

//         container.append(select);
//         document.body.append(container);
//     });

// it('The function produces the right behavior', function () {
//     let select = document.getElementById('revenue-chart-year-select');
//     // expect(select.value).toBe('2021');
//     expect(
//         document.getElementById('revenue-chart-year-2021').style.display
//     ).not.toBe('none');
//     expect(
//         document.getElementById('revenue-chart-year-2022').style.display
//     ).toBe('none');
//     expect(
//         document.getElementById('revenue-chart-year-2023').style.display
//     ).toBe('none');
//     expect(
//         document.getElementById('revenue-chart-year-2024').style.display
//     ).toBe('none');

//     Render.controlRevenueYearDropdownMenu();

//     let changeEvent = new Event('change');
//     select.value = '2022';
//     select.dispatchEvent(changeEvent);

//     expect(
//         document.getElementById('revenue-chart-year-2021').style.display
//     ).toBe('none');
//     expect(
//         document.getElementById('revenue-chart-year-2022').style.display
//     ).not.toBe('none');
//     expect(
//         document.getElementById('revenue-chart-year-2023').style.display
//     ).toBe('none');
//     expect(
//         document.getElementById('revenue-chart-year-2024').style.display
//     ).toBe('none');

//     select.value = '2023';
//     select.dispatchEvent(changeEvent);

//     expect(
//         document.getElementById('revenue-chart-year-2021').style.display
//     ).toBe('none');
//     expect(
//         document.getElementById('revenue-chart-year-2022').style.display
//     ).toBe('none');
//     expect(
//         document.getElementById('revenue-chart-year-2023').style.display
//     ).not.toBe('none');
//     expect(
//         document.getElementById('revenue-chart-year-2024').style.display
//     ).toBe('none');

//     select.value = '2024';
//     select.dispatchEvent(changeEvent);

//     expect(
//         document.getElementById('revenue-chart-year-2021').style.display
//     ).toBe('none');
//     expect(
//         document.getElementById('revenue-chart-year-2022').style.display
//     ).toBe('none');
//     expect(
//         document.getElementById('revenue-chart-year-2023').style.display
//     ).toBe('none');
//     expect(
//         document.getElementById('revenue-chart-year-2024').style.display
//     ).not.toBe('none');

//     select.value = '2021';
//     select.dispatchEvent(changeEvent);

//     expect(
//         document.getElementById('revenue-chart-year-2021').style.display
//     ).not.toBe('none');
//     expect(
//         document.getElementById('revenue-chart-year-2022').style.display
//     ).toBe('none');
//     expect(
//         document.getElementById('revenue-chart-year-2023').style.display
//     ).toBe('none');
//     expect(
//         document.getElementById('revenue-chart-year-2024').style.display
//     ).toBe('none');
// });

//     afterEach(function () {
//         document.body.innerHTML = '';
//     });
// });

describe('Test function hideAllContainers', function () {
    beforeEach(function () {
        let allContainers = [
            'client-admin-home-container',
            'revenue-container',
            'project-table-container',
            'ongoing-project-table-container',
            'generate-invoice-container',
        ];
        allContainers.map((item) => {
            let container = Object.assign(document.createElement('div'), {
                id: item,
            });
            document.body.append(container);
        });
    });

    it('Test function hideAllContainers', function () {
        let allContainers = document.querySelectorAll('div[id$="-container"]');
        allContainers.forEach((element) => {
            expect(element.classList.contains('hidden')).toBeFalsy();
        });

        Render.hideAllContainers();
        allContainers.forEach((element) => {
            expect(element.classList.contains('hidden')).toBeTruthy();
        });
    });

    afterEach(function () {
        document.body.innerHTML = '';
    });
});

describe('Test function showSpecificContainer', function () {
    beforeEach(function () {
        let allContainers = [
            'client-admin-home-container',
            'revenue-container',
            'project-table-container',
            'ongoing-project-table-container',
            'generate-invoice-container',
        ];
        allContainers.map((item) => {
            let container = Object.assign(document.createElement('div'), {
                id: item,
                classList: 'hidden',
            });
            let link = Object.assign(document.createElement('button'), {
                type: 'button',
                id: item + '-link',
            });
            document.body.append(link, container);
        });
    });

    it('Test function showSpecificContainer', function () {
        function testVariousContainers(indexOfContainer) {
            allContainers.map((item, index) => {
                if (index === indexOfContainer) {
                    expect(
                        document
                            .getElementById(item)
                            .classList.contains('hidden')
                    ).toBeFalsy();
                } else {
                    expect(
                        document
                            .getElementById(item)
                            .classList.contains('hidden')
                    ).toBeTruthy();
                }
            });
        }

        let allContainers = [
            'client-admin-home-container',
            'revenue-container',
            'project-table-container',
            'ongoing-project-table-container',
        ];
        allContainers.map((item) => {
            Render.showSpecificContainer(item + '-link', item);
        });

        allContainers.map((item, index) => {
            expect(
                document.getElementById(item).classList.contains('hidden')
            ).toBeTruthy();
        });

        document.getElementById(allContainers[0] + '-link').click();
        testVariousContainers(0);
        document.getElementById(allContainers[1] + '-link').click();
        testVariousContainers(1);
        document.getElementById(allContainers[2] + '-link').click();
        testVariousContainers(2);
        document.getElementById(allContainers[3] + '-link').click();
        testVariousContainers(3);
        document.getElementById(allContainers[0] + '-link').click();
        testVariousContainers(0);
    });

    afterEach(function () {
        document.body.innerHTML = '';
    });
});
