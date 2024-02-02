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
    let projectsSidebar = createProjectsSidebar(); // Added line to create sidebar

    container.append(heading, invoiceForm, projectsSidebar); // Added sidebar to container

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
console.log(formData)
        xhttp.open('POST', '/client-admin/generate-invoice');      
        xhttp.setRequestHeader('X-CSRFToken', csrftoken); 
        xhttp.send(formData);
    }
}
/**
 * This function retrieves long clients data from the table
 */

function obtainLongTermClients(){
    return new Promise((resolve) => { 
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if(this.readyState === 4 && this.status === 200) {
                let response = this.response;
                let responseJson = JSON.parse(response);
                let ltArr = []

                console.log(responseJson)

                Object.keys(responseJson = JSON.parse(response)).map((item) => {
                    let fields = responseJson[item].fields

                    let ltClientName = fields.client_name
                    ltArr.push(ltClientName)
                })
                console.log(ltArr)
                resolve(responseJson)               
                
            }
        }      

        xhttp.open('GET', '/client-admin/obtain-long-term-clients-list');
        xhttp.send()
    })
}

// function obtainLongTermClientsObject(){
//     _obtainLongTermClients().then((response) => {
//         this.longTermClientObject = response
//     })
// }
// COME BACK TO THIS

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


function createProjectsSidebar() {
    let sidebar = document.createElement('div');
    sidebar.classList.add('p-5', 'm-auto', 'w-1/4', 'border-l', 'border-gray-500');

    let title = new ComponentServices.HeadingOrParagraph(
        'h6',
        'Ongoing Projects'
    ).renderWithClass(['mx-auto', 'text-center']).result;

    // Add an empty list to display ongoing projects
    let projectList = document.createElement('ul');
    projectList.id = 'ongoing-projects-list';
    sidebar.appendChild(title);
    sidebar.appendChild(projectList);

    return sidebar;
}


function updateProjectsSidebar(clientName) {
    let projectList = document.getElementById('ongoing-projects-list');

    // Fetch ongoing projects for the selected client (using mock data for now)
    let ongoingProjects = getMockOngoingProjects(clientName);

    // Clear existing projects
    projectList.innerHTML = '';

    // Populate the project list
    ongoingProjects.forEach((project) => {
        let projectItem = document.createElement('li');
        projectItem.textContent = project;
        projectList.appendChild(projectItem);
    });
}


function showOngoingProjectsModal(clientName, projects) {
    // Replace this part with your actual modal HTML structure and styling
    let modal = document.createElement('div');
    modal.classList.add('modal', 'bg-white', 'p-4', 'rounded', 'shadow-md', 'absolute');

    let closeModalButton = document.createElement('button');
    closeModalButton.textContent = 'Close';
    closeModalButton.classList.add('bg-blue-500', 'text-white', 'p-2', 'rounded', 'mb-4');

    // Add a heading to the modal
    let heading = document.createElement('h3');
    heading.textContent = `Ongoing Projects for ${clientName}`;
    heading.classList.add('text-lg', 'font-bold', 'mb-2');
    modal.appendChild(heading);

    // Check if there are ongoing projects
    if (projects.length > 0) {
        let projectsList = document.createElement('ul');
        projectsList.classList.add('list-disc', 'pl-6');

        // Populate the list with project details
        projects.forEach(project => {
            let projectItem = document.createElement('li');
            projectItem.innerHTML = `<strong>${project.projectName}</strong>: ${project.startDate} to ${project.endDate}`;
            projectsList.appendChild(projectItem);
        });

        modal.appendChild(projectsList);
    } else {
        let noProjectsMessage = document.createElement('p');
        noProjectsMessage.textContent = 'No ongoing projects for this client.';
        modal.appendChild(noProjectsMessage);
    }

    
    modal.appendChild(closeModalButton);

    // Get the client name dropdown select
    let clientNameSelect = document.getElementById('client-name');

    // Get the position of the client name dropdown select
    let clientNameRect = clientNameSelect.getBoundingClientRect();

    // Set the position of the modal beside the client name dropdown select
    modal.style.top = `${clientNameRect.bottom + window.scrollY}px`;
    modal.style.left = `${clientNameRect.left + window.scrollX + clientNameRect.width}px`;

    // Append the modal to the document body
    document.body.appendChild(modal);

    // Add an event listener to close the modal when the close button is clicked
    closeModalButton.addEventListener('click', function () {
        document.body.removeChild(modal);
    });
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

    let clientTypeSelect = document.createElement('select');
    clientTypeSelect.id = 'client-type';
    clientTypeSelect.name = 'client-name';

    let regularOption = document.createElement('option');
    regularOption.value = 'regular-client';
    regularOption.textContent = 'Regular Client';

    let longTermOption = document.createElement('option');
    longTermOption.value = 'long-term';
    longTermOption.textContent = 'Long Term Client';

    clientTypeSelect.appendChild(regularOption);
    clientTypeSelect.appendChild(longTermOption);

    let insertClientButton = document.createElement('button');
    insertClientButton.id = 'insert-client-button';
    insertClientButton.classList.add('p-2', 'bg-blue-800')
    

    let clientNameLabel = document.createElement('label');
    clientNameLabel.textContent = 'Client Name (Regular Client)';

    let clientNameContainer = document.createElement('div');
    clientNameContainer.classList.add('client-name-container');
    
    let clientNameInput = _createSelectInput([], 'client-name');  // Empty options for now
    clientNameInput.id = 'client-name';
    clientNameInput.className = 'mx-auto w-3/5';

    let clientNameInputContainer = document.createElement('div');
    clientNameInputContainer.appendChild(clientNameInput);
    
    let defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select a client name';
    clientNameInput.appendChild(defaultOption);
        
    console.log(obtainLongTermClients())

    let mockData = {
        'regular-client': { label: 'Regular Client', names: ['John Doe', 'Alice Johnson', 'Bob Smith'] },
        'long-term': { label: 'Long Term Client', names: ['Richard Kelvin', 'Pratik Mahanmuni', 'Sol Pauper'] }
    };
    
    clientTypeSelect.addEventListener('change', function () {
        let selectedOption = clientTypeSelect.value;
        let selectedClient = mockData[selectedOption] || { label: 'Unknown Client', names: [] };

        
        // Update the client name label
        clientNameLabel.textContent = `Client Name (${selectedClient.label})`;

        // Update the projects sidebar when a client is selected
        updateProjectsSidebar(selectedOption);

        clientNameInput.innerHTML = '';

        selectedClient.names.forEach(name => {
            let option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            clientNameInput.appendChild(option);

            let ongoingProjects = getMockOngoingProjects(name);

            // Show a custom-designed modal with ongoing projects when a name is clicked
            option.addEventListener('click', function (event) {
                event.preventDefault();
                showOngoingProjectsModal(name, ongoingProjects);
        });

        });

    });
    
    clientNameInputContainer.appendChild(clientNameInput);
    clientNameContainer.appendChild(clientNameLabel);
    clientNameContainer.appendChild(document.createElement('br'));
    clientNameContainer.appendChild(clientNameInput);    
    
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
    
    addressCell.appendChild(title);
    addressCell.appendChild(clientTypeSelect);
    addressCell.appendChild(insertClientButton);
    addressCell.appendChild(clientNameContainer);
    addressCell.appendChild(addressLine1);
    addressCell.appendChild(addressLine2);
    addressCell.appendChild(addressLine3);

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

function getMockOngoingProjects(clientName) {
    // Simulate fetching ongoing projects based on the selected client
    let mockData = {
        'John Doe': ['Project A', 'Project B', 'Project C'],
        'Alice Johnson': ['Project X', 'Project Y'],
        'Bob Smith': ['Project P', 'Project Q', 'Project R'],
        'Richard Kelvin': ['Project Alpha', 'Project Beta'],
        'Pratik Mahanmuni': ['Project One', 'Project Two', 'Project Three'],
        'Sol Pauper': ['Project Delta', 'Project Gamma']
    };

    return mockData[clientName] || [];
}

function _createSelectInput(options, desiredId, required = false) {
    let input = document.createElement('select');
    input.name = desiredId;
    input.id = desiredId;

    if (required) {
        input.required = true;
    }

    options.forEach(optionValue => {
        let option = document.createElement('option');
        option.value = optionValue;
        option.text = optionValue;
        input.appendChild(option);
    });

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
