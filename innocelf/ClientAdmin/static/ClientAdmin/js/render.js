'use strict';
import * as ComponentServices from '/static/innoservices/js/components_ts.js';
import * as RenderServices from '/static/innoservices/js/render_ts.js';
import * as Components from './components.js';
import * as _GenerateInvoice from './_generate_invoice.js';
import * as _DownloadInvoice from './_download_invoice.js';

/**
 * The function inserts the csrf token input string before the app div in the
 * document
 * @param {string} csrfTokenInputString The input element HTML for the csrfmiddleware
 * obtained from the backend
 */
export function prependCSRFTokenInput(csrfTokenInputString) {
    let input = new DOMParser()
        .parseFromString(csrfTokenInputString, 'text/html')
        .querySelector('input');

    let app = document.getElementById('app');
    document.body.insertBefore(input, app);
}

/**
 * The function creates a H3 tag with a message obtained from the backend as a
 * text content
 * @param {JSON} responseJson The response obtained from the backend in JSON
 * format after a form has been submitted. The response should have Success or
 * Failure as an item
 * @returns H3 element with the message
 */
export function messageAfterFormSubmission(responseJson) {
    let message;
    if (responseJson.hasOwnProperty('Success')) {
        message = new ComponentServices.HeadingOrParagraph(
            'h3',
            responseJson['Success']
        ).renderWithClass([
            'm-auto',
            'transition-opacity',
            'duration-500',
            'ease-in-out',
            'opacity-0',
        ]).result;
    } else if (responseJson.hasOwnProperty('Failure')) {
        message = new ComponentServices.HeadingOrParagraph(
            'h3',
            responseJson['Failure']
        ).renderWithClass([
            'm-auto',
            'text-red-500',
            'transition-opacity',
            'duration-500',
            'ease-in-out',
            'opacity-0',
        ]).result;
    }

    return message;
}

/**
 * The function obtains the long term client form from the backend and renders it
 * nicely in a div
 * @returns Promise with the long term client form
 */
export async function _longTermClientFormRender() {
    let longTermClientForm = new ComponentServices.TypicalPostForm(
        'add-long-term-client-form'
    ).result;

    let formStringData = await RenderServices._obtainForm(
        '/client-admin/obtain-long-term-client-form'
    );
    let form = new DOMParser().parseFromString(formStringData, 'text/html');
    // let csrfToken = document.querySelector('[name="csrfmiddlewaretoken"]');
    let fullName = new ComponentServices.TextInputWithLabel(
        'Name*',
        form.querySelector('[name="client_name"]')
    ).render().result;
    let company = new ComponentServices.TextInputWithLabel(
        'Company*',
        form.querySelector('[name="client_company"]')
    ).render().result;
    let email = new ComponentServices.TextInputWithLabel(
        'Email*',
        form.querySelector('[name="client_email"]')
    ).render().result;
    let submitButton = new ComponentServices.TypicalFormSubmitButton('Submit')
        .result;

    longTermClientForm.append(
        // csrfToken,
        fullName,
        company,
        email,
        submitButton
    );

    submitButton.onclick = function (event) {
        if (longTermClientForm.checkValidity()) {
            event.preventDefault();
            let csrfToken = document.querySelector(
                '[name="csrfmiddlewaretoken"]'
            );
            longTermClientForm.append(csrfToken);
            _longTermClientFormSubmit(longTermClientForm);
        }
    };

    return longTermClientForm;
}

/*
 * The function submits the HTML form element to the backend via XHTTP
 * @param {HTMLFormElement} formElement The form element for the long term client
 */
export function _longTermClientFormSubmit(formElement) {
    let longTermClientContainer = document.getElementById(
        'add-long-term-client-container'
    );
    let formData = new FormData(formElement);

    let xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        let response = this.response;
        let responseJson = JSON.parse(response);

        prependCSRFTokenInput(responseJson['csrftoken']);

        let message = messageAfterFormSubmission(responseJson);
        longTermClientContainer
            .querySelector('#add-long-term-client-form')
            .remove();
        longTermClientContainer.append(message);

        // Update the long term client list
        let select = document.getElementById(
            'add-project-select-long-term-client'
        );
        _addLongTermClientOptionsInSelect(select);

        // First show the message
        setTimeout(() => {
            message.classList.remove('opacity-0');
            message.classList.add('opacity-100');
        }, 800);

        // Then remove the message and place the form again
        setTimeout(() => {
            message.remove();
            _longTermClientFormRender().then((data) => {
                longTermClientContainer.append(data);
            });
        }, 3000);
    };
    xhttp.open('POST', '/client-admin/save-long-term-client-form');
    xhttp.send(formData);
}

/**
 * The function returns a container with the long term client form
 * @returns container with the long term client form
 */
export function longTermClientContainer() {
    let container = document.createElement('div');
    container.classList.add(
        'flex',
        'flex-col',
        'w-1/3',
        'p-6',
        'rounded-2xl',
        'border',
        'border-black'
    );
    container.id = 'add-long-term-client-container';

    let heading = new ComponentServices.HeadingOrParagraph(
        'h5',
        'Add Long Term Client'
    ).renderWithClass(['my-5', 'text-center']).result;
    container.append(heading);
    _longTermClientFormRender().then((data) => {
        container.append(data);
    });

    return container;
}

/**
 * The function creates a Label element with a span reading "Choose Long Term
 * Client" and a select input with a bunch of options. The options are the
 * long term clients from the backend
 * @returns Label element with a select input with long term client options
 */
export function _createLongTermClientSelect() {
    let label = document.createElement('label');
    label.classList.add('block', 'lato-regular', 'text-gray-200');
    label.setAttribute('disabled', 'true');

    let span = document.createElement('span');
    span.classList.add(
        // 'text-gray-700',
        'lato-regular'
    );
    span.textContent = 'Choose Long Term Client';

    let select = document.createElement('select');
    select.classList.add(
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
        'disabled:border-gray-200'
    );
    select.id = 'add-project-select-long-term-client';
    select.disabled = true;

    // Add Options through a different function to the select
    _addLongTermClientOptionsInSelect(select);

    label.append(span, select);
    return label;
}

/**
 * The function populates the long term client select input with the appropriate
 * long term options.
 * @param {HTMLSelectElement} select The long term client select input with the
 * id "add-project-select-long-term-client"
 */
export function _addLongTermClientOptionsInSelect(select) {
    // let select = document.getElementById('add-project-select-long-term-client');

    // Remove all the contents from the select tag
    select.innerHTML = '';

    // First empty option
    let option = Object.assign(document.createElement('option'), {
        value: '',
        textContent: '',
        selected: true,
    });
    select.append(option);

    // Populate other non-empty options
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let response = this.response;
            let responseJson = JSON.parse(response);

            Object.keys(responseJson).map((item) => {
                let fields = responseJson[item].fields;
                let desiredValue =
                    fields.client_name +
                    '_' +
                    fields.client_company +
                    '_' +
                    fields.client_email;

                let option = Object.assign(document.createElement('option'), {
                    value: desiredValue,
                    textContent: fields.client_company,
                    classList: 'lato-regular',
                });
                option.setAttribute('client-name', fields.client_name);
                option.setAttribute('client-company', fields.client_company);
                option.setAttribute('client-email', fields.client_email);

                select.append(option);
            });
        }
    };

    xhttp.open('GET', '/client-admin/obtain-long-term-clients-list');
    xhttp.send();
}

/**
 * The function enables the long term clients select input in the form after the
 * "Is Long Term Client" checkbox is checked
 */
export function _enableLongTermClientSelect() {
    let longTermClientCheckbox = document
        .getElementById('add-project-form')
        .querySelector('#add_project_isLongTermClient');
    let longTermClientSelect = document
        .getElementById('add-project-form')
        .querySelector('#add-project-select-long-term-client');
    longTermClientCheckbox.addEventListener('click', function () {
        if (this.checked) {
            longTermClientSelect.disabled = false;
            longTermClientSelect.parentElement.classList.replace(
                'text-gray-200',
                'text-gray-700'
            );
        } else {
            longTermClientSelect.disabled = true;
            longTermClientSelect.parentElement.classList.replace(
                'text-gray-700',
                'text-gray-200'
            );
        }
    });
}

/**
 * The function populates the fields: client name, client company and client
 * email of the add project form based on the long term client selected from the
 * select menu
 */
export function _populateLongTermClientInformation() {
    let longTermClientSelect = document
        .getElementById('add-project-form')
        .querySelector('#add-project-select-long-term-client');

    let longTermClientName = document
        .getElementById('add-project-form')
        .querySelector('#add_project_clientName');
    let longTermClientCompany = document
        .getElementById('add-project-form')
        .querySelector('#add_project_clientCompany');
    let longTermClientEmail = document
        .getElementById('add-project-form')
        .querySelector('#add_project_clientEmail');

    longTermClientSelect.addEventListener('change', function (event) {
        let chosenValue = event.target.value;
        let chosenOption = document
            .getElementById('add-project-form')
            .querySelector('option[value="' + chosenValue + '"]');

        let clientName = chosenOption.getAttribute('client-name');
        let clientCompany = chosenOption.getAttribute('client-company');
        let clientEmail = chosenOption.getAttribute('client-email');

        longTermClientName.value = clientName;
        longTermClientCompany.value = clientCompany;
        longTermClientEmail.value = clientEmail;
    });
}

/**
 * The function returns the add project form container after it is invoked
 * @returns container with the add project form
 */
export async function _addProjectFormRender() {
    let addProjectForm = new ComponentServices.TypicalPostForm(
        'add-project-form'
    ).result;
    addProjectForm.classList.remove('flex-col', 'md:w-3/4');
    addProjectForm.classList.add('flex-row', 'flex-wrap', 'md:w-10/12');

    let formStringData = await RenderServices._obtainForm(
        '/client-admin/obtain-add-project-form'
    );
    let form = new DOMParser().parseFromString(formStringData, 'text/html');
    // let csrfToken = document.querySelector('[name="csrfmiddlewaretoken"]');

    let longTermClientCheck = new ComponentServices.CheckboxWithLabel(
        'Is Long Term Client',
        form.querySelector('[name="client_long_term"]')
    ).render().result;
    longTermClientCheck.classList.add('w-2/5', 'justify-center');

    let longTermClientSelect = _createLongTermClientSelect();
    longTermClientSelect.classList.add('w-2/5');

    let fullName = new ComponentServices.TextInputWithLabel(
        'Name*',
        form.querySelector('[name="client_name"]')
    ).render().result;
    fullName.classList.add('w-3/10');

    let company = new ComponentServices.TextInputWithLabel(
        'Company*',
        form.querySelector('[name="client_company"]')
    ).render().result;
    company.classList.add('w-3/10');

    let email = new ComponentServices.TextInputWithLabel(
        'Email*',
        form.querySelector('[name="client_email"]')
    ).render().result;
    email.classList.add('w-3/10');

    let projectName = new ComponentServices.TextInputWithLabel(
        'Project Name*',
        form.querySelector('[name="project_name"]')
    ).render().result;
    projectName.classList.add('w-1/3');

    let projectType = new ComponentServices.SelectInputWithLabel(
        'Project Type*',
        form.querySelector('[name="project_type"]')
    ).render().result;
    projectType.classList.add('w-1/3');

    let projectDeadline = new ComponentServices.TextInputWithLabel(
        'Project Deadline*',
        form.querySelector('[name="project_deadline"]')
    ).render().result;
    projectDeadline.classList.add('w-1/3');
    
    let assignedTo = new ComponentServices.SelectInputWithLabel(
        'Assigned To*',
        form.querySelector('[name="project_assigned_to"]')
    ).render().result;
    assignedTo.classList.add('w-1/4');

    let projectEstimatedDays = new ComponentServices.TextInputWithLabel(
        'Estimated Days for Completion*',
        form.querySelector('[name="project_estimated_days"]')
    ).render().result;
    projectEstimatedDays.classList.add('w-1/4');

    let startDate = new ComponentServices.TextInputWithLabel(
        'Start Date*',
        form.querySelector('[name="start_date"]')
    ).render().result;
    startDate.classList.add('w-1/5');

    let endDate = new ComponentServices.TextInputWithLabel(
        'End Date*',
        form.querySelector('[name="end_date"]')
    ).render().result;
    endDate.classList.add('w-1/5');

    let expectedRevenue = new ComponentServices.TextInputWithLabel(
        'Revenue Expected*',
        form.querySelector('[name="expected_revenue"]')
    ).render().result;
    expectedRevenue.classList.add('w-1/5');

    let submitButton = new ComponentServices.TypicalFormSubmitButton('Submit')
        .result;

    addProjectForm.append(
        // csrfToken,
        longTermClientCheck,
        longTermClientSelect,
        fullName,
        company,
        email,
        projectName,
        projectType,
        assignedTo,
        projectDeadline,
        projectEstimatedDays,
        startDate,
        endDate,
        expectedRevenue,
        submitButton
    );

    submitButton.onclick = function (event) {
        if (addProjectForm.checkValidity()) {
            event.preventDefault();
            let csrfToken = document.querySelector(
                '[name="csrfmiddlewaretoken"]'
            );
            addProjectForm.append(csrfToken);
            _addProjectFormSubmit(addProjectForm);
        }
    };

    return addProjectForm;
}

/**
 * The function takes in the HTML Form Element and submits it via XMLHTTPRequest
 * @param {HTMLFormElement} formElement The form element that needs to be submitted
 */
export function _addProjectFormSubmit(formElement) {
    let addProjectFormContainer = document.getElementById(
        'add-project-container'
    );

    let formData = new FormData(formElement);

    let xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        let response = this.response;
        let responseJson = JSON.parse(response);

        prependCSRFTokenInput(responseJson['csrftoken']);

        let message = messageAfterFormSubmission(responseJson);
        addProjectFormContainer.querySelector('#add-project-form').remove();
        addProjectFormContainer.append(message);

        // First show the message
        setTimeout(() => {
            message.classList.remove('opacity-0');
            message.classList.add('opacity-100');
        }, 800);

        // Then remove the message and place the form again
        setTimeout(() => {
            message.remove();
            _addProjectFormRender().then((data) => {
                addProjectFormContainer.append(data);
            });
        }, 3000);
    };
    xhttp.open('POST', '/client-admin/save-add-project-form');
    xhttp.send(formData);
}

/**
 * The function returns a container with the add new project form.
 * @returns Container with the add new project form
 */
export function addProjectContainer() {
    let container = document.createElement('div');
    container.classList.add(
        'flex',
        'flex-col',
        'w-2/3',
        'p-6',
        'rounded-2xl',
        'border',
        'border-black'
    );
    container.id = 'add-project-container';
    let heading = new ComponentServices.HeadingOrParagraph(
        'h5',
        'Add New Project'
    ).renderWithClass(['my-5', 'text-center']).result;
    container.append(heading);

    _addProjectFormRender().then((data) => {
        container.append(data);
        _enableLongTermClientSelect();
        _populateLongTermClientInformation();
    });

    return container;
}

/**
 * The function returns a canvas object with a chart drawn with ChartJs. The chart
 * includes bars with monthly revenue and cumulative revenue
 * @param {JSON} yearRevenueDataObject Data pertaining to the revenue of each
 * month in json format. Should have index 0 thru 12
 * @returns Canvas object with chart
 */
export function createRevenueChart(yearRevenueDataObject) {
    let canvas = document.createElement('canvas');
    canvas.style.setProperty('display', 'none', 'important');
    // canvas.style.setProperty('width', '700px', 'important');
    // canvas.style.setProperty('height', '700px', 'important');

    let ctx = canvas.getContext('2d');

    let cumulativeArray = [];
    Object.values(yearRevenueDataObject).reduce(
        (prev, curr, i) => (cumulativeArray[i] = prev + curr),
        0
    );
    const myChart = new Chart(ctx, {
        data: {
            datasets: [
                {
                    type: 'bar',
                    label: 'Monthly Revenue',
                    yAxisID: 'monthlyRevenue',
                    data: Object.values(yearRevenueDataObject),
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                },
                {
                    type: 'line',
                    label: 'YTD Revenue',
                    yAxisID: 'cumulativeRevenue',
                    data: cumulativeArray,
                    borderColor: 'rgba(0, 0, 0, 0.5)',
                    backgroundColor: 'rgba(0, 0, 0, 1)',
                },
            ],
            labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
            ],
        },
        options: {
            scales: {
                // y: {
                //     beginAtZero: true,
                // },
                monthlyRevenue: {
                    type: 'linear',
                    position: 'left',
                    offset: true,
                },
                cumulativeRevenue: {
                    type: 'linear',
                    position: 'right',
                },
            },
            layout: {
                padding: {
                    left: 100,
                    right: 100,
                },
            },
            responsive: true,
            maintainAspectRatio: true,
        },
    });

    return canvas;
}

/**
 * The function returns a container with revenue items. They include revenue table
 * and revenue charts
 * @returns Container for revenue items
 */
export function revenueContainer() {
    let container = document.createElement('div');
    container.classList.add(
        'flex',
        'flex-col',
        'my-24',
        'mx-auto',
        'w-11/12',
        'border',
        'border-black',
        'rounded-3xl',
        'hidden'
    );
    container.id = 'revenue-container';

    let heading = new ComponentServices.HeadingOrParagraph(
        'h5',
        'Monthly Revenue'
    ).renderWithClass(['mt-5', 'mb-12', 'text-center']).result;
    // Revenue Table
    let revenueTable = Components.createRevenueTable();

    // Year Dropdown Menu
    let labelForSelect = document.createElement('label');
    labelForSelect.classList.add(
        'ml-auto',
        'mr-36',
        'flex',
        'lato-regular',
        'w-60'
    );
    let labelSpan = document.createElement('span');
    labelSpan.classList.add('text-gray-700', 'lato-regular', 'w-1/2', 'm-auto');
    labelSpan.textContent = 'Choose Year';

    Components._obtainRevenueDict(true).then((response) => {
        let currentYear = new Date().getFullYear();

        let select = document.createElement('select');
        select.classList.add(
            'mt-0',
            'block',
            'lato-regular',
            'bg-transparent',
            'w-1/2',
            'text-sm',
            'p-2',
            'border-0',
            'border-b',
            // 'border-gray-200',
            'border-gray-700',
            'focus:ring-0',
            'focus:border-black'
        );

        select.id = 'revenue-chart-year-select';
        labelForSelect.append(labelSpan, select);

        Object.keys(response).map((item) => {
            let option = document.createElement('option');
            option.value = item;
            option.textContent = item;
            select.append(option);

            // Revenue Chart
            let revenueChart = createRevenueChart(response[item]);
            revenueChart.id = 'revenue-chart-year-' + item;

            if (item === currentYear.toFixed(0)) {
                revenueChart.style.setProperty('display', 'block', 'important');
                select.value = item;
            }

            container.append(revenueChart);
        });

        controlRevenueYearDropdownMenu();
    });

    container.append(heading, revenueTable, labelForSelect);

    return container;
}

/**
 * The function controls the revenue year select / dropdown menu
 */
export function controlRevenueYearDropdownMenu() {
    let select = document
        .getElementById('revenue-container')
        .querySelector('#revenue-chart-year-select');
    let allRevenueCharts = document.querySelectorAll(
        'canvas[id^="revenue-chart-year-"]'
    );

    select.addEventListener('change', function (event) {
        let valueChosen = event.target.value;
        allRevenueCharts.forEach((item) => {
            item.style.setProperty('display', 'none', 'important');
        });

        let revenueChart = document.getElementById(
            'revenue-chart-year-' + valueChosen
        );
        revenueChart.style.setProperty('display', 'block', 'important');
    });
}

/**
 * The function returns a project table container with the projects table in it
 * @returns Container (div) with the project table
 */
export function projectTableContainer() {
    let columnHeads = [
        'Client Name',
        // 'Client Company',
        // 'Client Email',
        'Project Name',
        'Project Type',
        'Deadline',
        'Assigned To',
        'Expected Revenue',
        'Payments',
        'Actions',
    ];
    let tableIdPrepend = 'project-table';

    let container = document.createElement('div');
    container.classList.add(
        'flex',
        'flex-col',
        'my-24',
        'mx-auto',
        'w-8/12',
        'border-t-2',
        'border-black',
        'hidden',
    );
    container.id = 'project-table-container';

    let heading = new ComponentServices.HeadingOrParagraph(
        'h5',
        'All Projects'
    ).renderWithClass(['mt-8', 'mb-12', 'text-center']).result;

    // Project Table
    let projectTable = new Components.ProjectTable(columnHeads, tableIdPrepend)
        .tableContainer;

    container.append(heading, projectTable);
    return container;
}

/**
 * The function returns a ongoing project table container with the projects table in it
 * @returns Container (div) with the project table
 */
export function ongoingProjectTableContainer() {
    let columnHeads = [
        'Client Name',
        // 'Client Company',
        // 'Client Email',
        'Project Name',
        'Project Type',
        'Deadline',
        'Assigned To',
        'Expected Revenue',
        'Payments',
        'Actions',
    ];
    let tableIdPrepend = 'ongoing-project-table';

    let container = document.createElement('div');
    container.classList.add(
        'flex',
        'flex-col',
        'my-24',
        'mx-auto',
        'w-8/12',
        'hidden'
    );
    container.id = 'ongoing-project-table-container';

    let heading = new ComponentServices.HeadingOrParagraph(
        'h5',
        'On-going Projects'
    ).renderWithClass(['mt-8', 'mb-12', 'text-center']).result;

    // Project Table
    let projectTable = new Components.OngoingProjectTable(
        columnHeads,
        tableIdPrepend
    ).tableContainer;

    container.append(heading, projectTable);
    return container;
}

/**
 * The function obtains the long term client form from the backend and renders it
 * nicely in a div
 * @returns Promise with the long term client form
 */
export async function _sendInventionDisclosureQuestionnaireFormRender() {
    let sendQuestionnaireForm = new ComponentServices.TypicalPostForm(
        'send-invention-disclosure-questionnaire-form'
    ).result;

    let formStringData = await RenderServices._obtainForm(
        '/client-admin/obtain-send-invention-disclosure-quest-form'
    );
    let form = new DOMParser().parseFromString(formStringData, 'text/html');
    // let csrfToken = document.querySelector('[name="csrfmiddlewaretoken"]');
    let fullName = new ComponentServices.TextInputWithLabel(
        'Name*',
        form.querySelector('[name="client_name"]')
    ).render().result;
    let company = new ComponentServices.TextInputWithLabel(
        'Company*',
        form.querySelector('[name="client_company"]')
    ).render().result;
    let email = new ComponentServices.TextInputWithLabel(
        'Email*',
        form.querySelector('[name="client_email"]')
    ).render().result;
    let submitButton = new ComponentServices.TypicalFormSubmitButton('Submit')
        .result;

    sendQuestionnaireForm.append(
        // csrfToken,
        fullName,
        company,
        email,
        submitButton
    );

    submitButton.onclick = function (event) {
        if (sendQuestionnaireForm.checkValidity()) {
            event.preventDefault();
            let csrfToken = document.querySelector(
                '[name="csrfmiddlewaretoken"]'
            );
            sendQuestionnaireForm.append(csrfToken);
            _sendInventionDisclosureQuestionnaireFormSubmit(
                sendQuestionnaireForm
            );
        }
    };

    return sendQuestionnaireForm;
}

/*
 * The function submits the HTML form element to the backend via XHTTP
 * @param {HTMLFormElement} formElement The form element for the long term client
 */
export function _sendInventionDisclosureQuestionnaireFormSubmit(formElement) {
    let sendInventionDiscQuestContainer = document.getElementById(
        'send-invention-disclosure-container'
    );
    let formData = new FormData(formElement);

    let xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        let response = this.response;
        let responseJson = JSON.parse(response);

        prependCSRFTokenInput(responseJson['csrftoken']);

        let message = messageAfterFormSubmission(responseJson);
        sendInventionDiscQuestContainer
            .querySelector('#send-invention-disclosure-questionnaire-form')
            .remove();
        sendInventionDiscQuestContainer.append(message);

        // First show the message
        setTimeout(() => {
            message.classList.remove('opacity-0');
            message.classList.add('opacity-100');
        }, 800);

        // Then remove the message and place the form again
        setTimeout(() => {
            message.remove();
            _sendInventionDisclosureQuestionnaireFormRender().then((data) => {
                sendInventionDiscQuestContainer.append(data);
            });
        }, 3000);
    };
    xhttp.open(
        'POST',
        '/client-admin/save-send-invention-disclosure-quest-form'
    );
    xhttp.send(formData);
}

/**
 * The function returns a container with the send invention disclosure
 * questionnaire form
 * @returns container with the invention disclosure questionnaire form
 */
export function sendInventionDisclosureFormContainer() {
    let container = document.createElement('div');
    container.classList.add(
        'flex',
        'flex-col',
        'w-1/3',
        'p-6',
        'rounded-2xl',
        'border',
        'border-black'
    );
    container.id = 'send-invention-disclosure-container';

    let heading = new ComponentServices.HeadingOrParagraph(
        'h5',
        'Send Invention Disclosure Form'
    ).renderWithClass(['my-5', 'text-center']).result;
    container.append(heading);
    _sendInventionDisclosureQuestionnaireFormRender().then((data) => {
        container.append(data);
    });

    return container;
}

/**
 * The function takes in all the container Ids and hides them
 */
export function hideAllContainers() {
    let allContainers = [
        'client-admin-home-container',
        'revenue-container',
        'project-table-container',
        'ongoing-project-table-container',
        'generate-invoice-container',
    ];
    allContainers.map((item) => {
        document.getElementById(item).classList.add('hidden');
    });
}

/**
 * The function takes in the navbar link id and the container id and processes
 * the showing of the container when the said link is clicked
 * @param {string} navbarLinkId The link id of the navbar link
 * @param {string} containerId The id of the container that wants to be shown
 */
export function showSpecificContainer(navbarLinkId, containerId) {
    document
        .getElementById(navbarLinkId)
        .addEventListener('click', function () {
            hideAllContainers();
            document.getElementById(containerId).classList.toggle('hidden');
        });
}

/**
 * The function creates and returns a div element with specific classes that
 * represent a row in the home view of the client-admin
 * @param {number} rowNumber The row number that is being created
 * @returns Container with specific classes that represent the home view row
 */
export function _clientAdminHomeViewRow(rowNumber) {
    let row = document.createElement('div');
    row.classList.add(
        'flex',
        'flex-row',
        'gap-6',
        'px-5',
        'w-full',
        'mx-auto',
        'mt-24'
    );
    row.id = 'client-admin-home-container-row-' + rowNumber.toFixed(0);

    return row;
}

/**
 * The function returns the client admin home view container. This view is the
 * first thing that will be seen and also brought up when the "Home View" button
 * is clicked
 * @returns Div element which represents the home container
 */
export function clientAdminHomeView() {
    let homeContainer = document.createElement('div');
    homeContainer.classList.add('flex', 'flex-col', 'w-full');
    homeContainer.id = 'client-admin-home-container';

    let row1 = _clientAdminHomeViewRow(1);
    let longTermClientFormContainer = longTermClientContainer();
    let addProjectFormContainer = addProjectContainer();
    row1.append(longTermClientFormContainer, addProjectFormContainer);

    let row2 = _clientAdminHomeViewRow(2);
    let sendInventionDiscContainer = sendInventionDisclosureFormContainer();
    let downloadInvoiceContainer = _DownloadInvoice.downloadInvoicesContainer();
    row2.append(sendInventionDiscContainer, downloadInvoiceContainer);

    homeContainer.append(row1, row2);

    return homeContainer;
}

/**
 * The function renders the client admin page /client-admin/client-admin
 */
export function renderClientAdmin() {
    new RenderServices.PageHeadElements({}, 'Innocelf Client Admin');
    let navbar = new Components.ClientAdminNavbar().render().result;

    let homeContainer = clientAdminHomeView();
    let revenue = revenueContainer();
    let projectTable = projectTableContainer();
    let ongoingProjectTable = ongoingProjectTableContainer();
    let generateInvoice = _GenerateInvoice.generateInvoiceContainer();

    let app = document.getElementById('app');
    app.append(
        navbar,
        projectTable,
        ongoingProjectTable,
        homeContainer,
        revenue,
        generateInvoice
    );

    // Home View
    showSpecificContainer('navbar-home-view', 'client-admin-home-container');
    // Projects Container
    showSpecificContainer('navbar-all-projects', 'project-table-container');
    // On Going Projects Container
    showSpecificContainer(
        'navbar-on-going-projects',
        'ongoing-project-table-container'
    );
    // Revenue container
    showSpecificContainer('navbar-revenue', 'revenue-container');
    // Generate Invoice container
    showSpecificContainer(
        'navbar-generate-invoice',
        'generate-invoice-container'
    );
}

export function renderLogin() {
    new RenderServices.PageHeadElements({}, 'Innocelf Client Admin Login');
    let loginForm = document.getElementById('login_user_form');

    let userNameInput = loginForm.querySelector('input#id_username');
    let passwordInput = loginForm.querySelector('input#id_password');

    let userNameInputLabel = new ComponentServices.TextInputWithLabel(
        'Username*',
        userNameInput
    ).render().result;
    userNameInputLabel.classList.add('mb-8');
    let passwordInputLabel = new ComponentServices.TextInputWithLabel(
        'Password*',
        passwordInput
    ).render().result;

    loginForm.querySelectorAll('.form-group').forEach((element) => {
        element.remove();
    });

    loginForm
        .querySelector('fieldset')
        .insertBefore(
            passwordInputLabel,
            loginForm.querySelector('fieldset').querySelector('legend')
                .nextSibling
        );
    loginForm
        .querySelector('fieldset')
        .insertBefore(
            userNameInputLabel,
            loginForm.querySelector('fieldset').querySelector('legend')
                .nextSibling
        );
}
