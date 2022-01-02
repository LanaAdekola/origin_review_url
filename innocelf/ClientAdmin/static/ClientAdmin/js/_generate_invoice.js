'use strict';
import * as ComponentServices from '/static/innoservices/js/components_ts.js';

/**
 * The function returns a container that has a dummy invoice with fields to fill
 * @returns Container with the generate invoice functionality
 */
export function generateInvoiceContainer() {
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
    container.id = 'generate-invoice-container';

    let heading = new ComponentServices.HeadingOrParagraph(
        'h5',
        'Generate Invoice'
    ).renderWithClass(['my-5', 'text-center']).result;
    let invoiceForm = createInvoiceGeneratorForm();

    container.append(heading, invoiceForm);

    return container;
}

/**
 * The function creates a form to input all the details about the invoice
 * @returns A form to input all the details about the invoice
 */
function createInvoiceGeneratorForm() {
    let form = document.createElement('form');
    form.classList.add(
        'my-12',
        'mx-auto',
        'w-2/3',
        'flex',
        'flex-col',
        // 'grid-rows-2',
        // 'grid-flow-row',
        'gap-4'
    );
    form.id = 'invoice-generator-form';
    form.method = 'POST';

    let invoiceNumberCell = _invoiceNumberCell();
    let addressCell = _addressCell();
    let servicesCell = _servicesCell();
    let submitButton = new ComponentServices.TypicalFormSubmitButton(
        'Generate Invoice'
    ).result;
    submitButton.onclick = submitInvoiceGeneratorForm;

    form.append(invoiceNumberCell, addressCell, servicesCell, submitButton);
    return form;
}

/**
 * The function handles the submiting of the invoice generator form and the
 * response associated with it
 * @param {object} event Click event of the submit button
 */
function submitInvoiceGeneratorForm(event) {
    let form = document.getElementById('invoice-generator-form');
    let formData = new FormData(form);

    if (form.checkValidity()) {
        event.preventDefault();
        let csrftoken = document.getElementsByName('csrfmiddlewaretoken')[0]
            .value;

        let xhttp = new XMLHttpRequest();
        xhttp.onload = function () {
            let response = this.response;
            let responseJson = JSON.parse(response);
            if (responseJson.hasOwnProperty('Success')) {
                form.reset();

                let downloadButton = new ComponentServices.AnchorLinks(
                    'Download Invoice'
                ).renderLargeInnocelfButton().result;
                downloadButton.classList.remove(
                    'bg-innoblack',
                    'border-innoblack',
                    'focus:ring-innoblack',
                    'hover:bg-gray-800'
                );
                downloadButton.classList.add(
                    'bg-green-500',
                    'border-green-900',
                    'focus:ring-green-900',
                    'hover:bg-green-300'
                );
                downloadButton.href = responseJson['InvoiceURL'];
                downloadButton.download = true;
                form.append(downloadButton);

                form.querySelector('#invoice-number').value =
                    responseJson['NewInvoiceNumber'];
            }
        };

        xhttp.open('POST', '/client-admin/generate-invoice');
        xhttp.setRequestHeader('X-CSRFToken', csrftoken);
        xhttp.send(formData);
    }
}

/**
 * The function returns an input element (text input) for the invoice number
 * @returns Div with the invoice number cell (input)
 */
function _invoiceNumberCell() {
    let invoiceNumberCell = document.createElement('div');
    invoiceNumberCell.classList.add('p-5', 'm-auto', 'w-1/2');

    let title = new ComponentServices.HeadingOrParagraph(
        'h6',
        'Invoice Info'
    ).renderWithClass(['mx-auto', 'text-center']).result;

    invoiceNumberCell.append(title);

    let getNextInvoice = _getNextInvoiceNumber().then((data) => {
        let _invoiceNumberInput = _createtextInput('invoice-number', true);
        _invoiceNumberInput.value = data;

        let invoiceNumberInput = new ComponentServices.TextInputWithLabel(
            'Invoice Number*',
            _invoiceNumberInput
        ).render().result;

        invoiceNumberCell.append(invoiceNumberInput);
    });

    return invoiceNumberCell;
}

/**
 * The function returns the address cell that will be part of the invoice generator
 * form
 * @returns Div with the address elements of the form
 */
function _addressCell() {
    let addressCell = document.createElement('div');
    addressCell.classList.add('p-5', 'm-auto', 'w-1/2');

    let title = new ComponentServices.HeadingOrParagraph(
        'h6',
        'Client Info'
    ).renderWithClass(['mx-auto', 'text-center']).result;

    let clientName = new ComponentServices.TextInputWithLabel(
        'Client Name*',
        _createtextInput('client-name', true)
    ).render().result;
    let addressLine1 = new ComponentServices.TextInputWithLabel(
        'Address Line 1*',
        _createtextInput('address-line-1', true)
    ).render().result;
    let addressLine2 = new ComponentServices.TextInputWithLabel(
        'Address Line 2',
        _createtextInput('address-line-2', false)
    ).render().result;
    let addressLine3 = new ComponentServices.TextInputWithLabel(
        'City, State, Zip*',
        _createtextInput('address-line-3', false)
    ).render().result;
    addressCell.append(
        title,
        clientName,
        addressLine1,
        addressLine2,
        addressLine3
    );

    addressCell.childNodes.forEach((element) => {
        element.classList.add('mb-6');
    });

    return addressCell;
}

/**
 * The function returns the service cell that will be part of the invoice generator
 * form
 * @returns Div with the services cell
 */
function _servicesCell() {
    let servicesCell = document.createElement('div');
    servicesCell.classList.add('col-span-2', 'p-5', 'my-auto');

    let title = new ComponentServices.HeadingOrParagraph(
        'h6',
        'Services Info'
    ).renderWithClass(['mx-auto', 'text-center']).result;

    let headingRow = document.createElement('div');
    headingRow.classList.add('grid', 'grid-cols-3', 'grid-flow-row', 'gap-8');
    let desc = new ComponentServices.HeadingOrParagraph(
        'p',
        'Service Description'
    ).renderWithClass(['my-6', 'text-center']).result;
    let quantity = new ComponentServices.HeadingOrParagraph(
        'p',
        'Service Quantity'
    ).renderWithClass(['my-6', 'text-center']).result;
    let amount = new ComponentServices.HeadingOrParagraph(
        'p',
        'Service Cost'
    ).renderWithClass(['my-6', 'text-center']).result;
    headingRow.append(desc, quantity, amount);
    servicesCell.append(title, headingRow);

    for (let i = 0; i < 10; i++) {
        let service = _createOneServiceRow(i + 1);
        servicesCell.append(service);
    }

    return servicesCell;
}

/**
 * The function returns a row with three inputs, one text and two numbers to
 * put in the service, the amount and the cost associated with the service
 * @param {number} serviceNum A number between 1 thru 10
 * @returns Row with three inputs
 */
function _createOneServiceRow(serviceNum) {
    let serviceRow = document.createElement('div');
    serviceRow.classList.add(
        'grid',
        'grid-cols-3',
        'grid-flow-row',
        'gap-8',
        'mb-6'
    );

    let required;
    if (serviceNum === 0 || serviceNum === 1) {
        required = true;
    } else {
        required = false;
    }

    let service = _createtextInput(
        'service-desc-' + serviceNum.toFixed(0),
        required
    );
    let quantity = _createNumberInput(
        'service-quantity-' + serviceNum.toFixed(0),
        required
    );
    quantity.min = '1';
    let dollarAmount = _createNumberInput(
        'service-cost-' + serviceNum.toFixed(0),
        required
    );

    serviceRow.append(service, quantity, dollarAmount);

    serviceRow.childNodes.forEach((item) => {
        item.classList.add(
            'mt-0',
            'block',
            'lato-regular',
            'w-full',
            'p-2',
            'text-sm',
            'border-0',
            'border-b',
            // 'border-gray-200',
            'border-gray-500',
            'focus:ring-0',
            'focus:border-black'
        );
    });
    return serviceRow;
}

/**
 * The function creates a text input with the desired id and the required flag
 * (if specified)
 * @param {string} desiredId The id of the text input
 * @param {boolean} required Whether the input is required or not
 * @returns A text input
 */
function _createtextInput(desiredId, required = false) {
    let input = document.createElement('input');
    input.type = 'text';
    input.name = desiredId;
    input.id = desiredId;

    if (required) {
        input.required = true;
    }

    return input;
}

/**
 * The function creates a number input with the desired id and the required flag
 * (if specified)
 * @param {string} desiredId The id of the number input
 * @param {boolean} required Whether the input is required or not
 * @returns A number input
 */
function _createNumberInput(desiredId, required = false) {
    let input = document.createElement('input');
    input.type = 'number';
    input.name = desiredId;
    input.id = desiredId;

    if (required) {
        input.required = true;
    }

    return input;
}

/**
 * The function calls the get-next-invoice-number view from the backend to create
 * a return a new invoice number
 * @returns A promise with the new invoice number
 */
function _getNextInvoiceNumber() {
    return new Promise((resolve) => {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                resolve(this.response);
            }
        };
        xhttp.open('GET', '/client-admin/get-next-invoice-number');
        xhttp.send();
    });
}
