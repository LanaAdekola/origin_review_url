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

    container.append(heading, invoiceForm); // Added sidebar to container

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
    let popUpCell = _popUpCell();
    let { addressCell, popUpCell: pcell } = _addressCell();
    let servicesCell = _servicesCell();
    let submitButton = new ComponentServices.TypicalFormSubmitButton(
        'Generate Invoice'
    ).result;
    submitButton.onclick = submitInvoiceGeneratorForm;

    form.append(
        invoiceNumberCell,
        pcell,
        popUpCell,
        addressCell,
        servicesCell,
        submitButton
    );
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
 * This function retrieves long clients data from the table
 */

function _obtainLongTermClients() {
    return new Promise((resolve) => {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let response = this.response;
                let responseJson = JSON.parse(response);
                let ltArr = [];

                Object.keys((responseJson = JSON.parse(response))).map(
                    (item) => {
                        let fields = responseJson[item].fields;

                        ltArr.push(fields);
                    }
                );

                resolve(ltArr);
            }
        };

        xhttp.open('GET', '/client-admin/obtain-projects');
        xhttp.send();
    });
}

// create a filter per client_type

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

async function fetchClientProjects(clientId) {
    try {
        // Assuming the backend API endpoint to fetch client projects is /clients/{clientId}/projects
        const response = await fetch(
            `/client-admin/obtain-projects?clientId=${clientId}`
        );
        const projects = await response.json();
        projects.forEach((project, index) => {});
        return projects;
    } catch (error) {
        console.error('Error fetching client projects:', error);
        return [];
    }
}
async function fetchClientDetails(project, slug) {
    try {
        // Assuming the backend API endpoint to fetch client projects is /clients/{clientId}/projects
        // const response = await fetch(`/client-admin/obtain-projects?clientId=${clientId}`);
        // const projects = await response.json();
        let result = project.fields.find((slug) => (slug.slug = slug));
        return result;
    } catch (error) {
        console.error('Error fetching client projects:', error);
        return [];
    }
}

async function displayClientProjects(clientId, popUpCell) {
    const projects = await fetchClientProjects(clientId);

    // Remove the existing projectsDiv if it exists
    const existingProjectsDiv = document.getElementById('projects-div');
    if (existingProjectsDiv) {
        existingProjectsDiv.remove();
    }

    let projectsDiv = document.createElement('div');
    projectsDiv.id = 'projects-div';
    projectsDiv.classList.add('mx-auto', 'text-center');

    let projectsTitle = new ComponentServices.HeadingOrParagraph(
        'h6',
        'Client Projects'
    ).renderWithClass(['mx-auto', 'text-center']).result;

    const projectList = document.createElement('div');
    // projectList.id = 'client-projects-list'
    // projectList.style.backgroundColor = '#fbf9fa'
    projectList.style.backgroundColor = '#e3e3e3';
    projectList.style.padding = '20px'; // Padding for better appearance
    projectList.style.width = 'auto';
    // projectList.style.cursor = 'pointer'; // Change cursor to pointer on hover
    // projectList.style.borderRadius = '20px';
    // projectList.style.border = 'solid 1px gray';

    // Light blue background by default
    projectList.style.backgroundColor = '#fbf9fa';

    // // Darker blue background on hover
    // projectList.addEventListener('mouseenter', function() {
    //     projectList.style.backgroundColor = '#e3e3e3'; // Variant blue
    // });

    // projectList.addEventListener('mouseleave', function() {
    //     projectList.style.backgroundColor = '#fbf9fa'; // Revert to light blue on mouse leave
    // });

    // Toggle between different shades of blue on click
    let isChecked = false;
    projectList.addEventListener('click', function () {
        isChecked = !isChecked;
        if (isChecked) {
            projectList.style.backgroundColor = '#dfdfdf'; // Another variant blue
        } else {
            projectList.style.backgroundColor = '#fbf9fa'; // Revert to light blue
        }
    });

    projectsDiv.appendChild(projectsTitle);
    projectsDiv.appendChild(projectList);
    popUpCell.appendChild(projectsDiv);

    // Clear previous projects
    projectList.innerHTML = '';

    //this checks if the project is not empty
    if (projects.length === 0) {
        console.log('No project found for the client.');
        return;
    }

    const filtered_projects = projects.filter((project) => {
        return project?.fields?.client_name === clientId;
    });

    // Display each project as a list item
    filtered_projects.forEach((project) => {
        const listItem = document.createElement('span');
        listItem.id = '#list-item';
        listItem.textContent = project.fields.project_name;
        listItem.dataset.projectId = project.slug; // Assuming project slug is unique
        // configure the styles

        listItem.style.margin = '0px 3px 0px 3px';
        listItem.style.border = '1px solid darkblue';
        listItem.style.backgroundColor = '#e3e3e3';
        listItem.style.color = 'darkBlue';
        listItem.style.cursor = 'pointer';
        listItem.style.padding = '2px 4px 2px 4px';

        listItem.addEventListener('mouseenter', function () {
            listItem.style.backgroundColor =  '#fbf9fa'; // Variant blue
        });

        listItem.addEventListener('mouseleave', function () {
            listItem.style.backgroundColor = '#e3e3e3'; // Revert to light blue on mouse leave
        });

        listItem.draggable = true; // Enable drag and drop

       
        listItem.addEventListener('click', async () => {               
            
            let servicer = document.getElementById('servicesLog')

            let valueArray = []    

            const {client_company, client_email, project_name, project_type, expected_revenue: project_cost} = project.fields


            const selectedClientId = project.fields.client_name; // Assuming the project slug is used as the client ID
            document.getElementById('address-line-1').value =
                client_company;
            document.getElementById('address-line-2').value =
                client_email;
            document.getElementById('address-line-3').value =
                project_name;

                // create the appendable list of services here
                // into the service cell
            
                // create an array first like append the needed values into an array

                valueArray.push({serviceName: project_name, serviceDesc: project_type, serviceCost: project_cost})

                // then map the array into the create service whatever
                valueArray.forEach((value, index) => {
                   let servik = _createOneServiceRow(value.serviceName, value.serviceDesc, value.serviceCost, index + 1)

                   servicer.append(servik)
                })

                console.log(valueArray)
               
        });

        projectList.appendChild(listItem);

        
    });
}

function _addressCell() {
    let popUpCell = document.createElement('div');

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
    insertClientButton.classList.add('p-2', 'bg-blue-800');

    let clientNameLabel = document.createElement('label');
    clientNameLabel.textContent = 'Client Name (Regular Client)';

    let clientNameContainer = document.createElement('div');
    clientNameContainer.classList.add('client-name-container');

    let clientNameInput = _createSelectInput([], 'client-name'); // Empty options for now
    clientNameInput.id = 'client-name';
    clientNameInput.className = 'mx-auto w-3/5';

    let clientNameInputContainer = document.createElement('div');
    clientNameInputContainer.appendChild(clientNameInput);

    let defaultOption = document.createElement('option');
    defaultOption.id = 'client-select';
    defaultOption.value = '';
    defaultOption.textContent = 'Select a client name';
    clientNameInput.appendChild(defaultOption);

    async function contextProcessor(client) {
        if (client === 'regular-client') {
            let result;

            const data = await _obtainLongTermClients();
            let Arr = [];
            data.forEach((value, index) => {
                if (value.client_long_term === false) {
                    Arr.push(value.client_name);
                }
            });
            // remove duplicates
            Arr = [...new Set(Arr)];
            result = { label: 'Regular Client', names: Arr };
            return result;
        }

        if (client === 'long-term') {
            let result;

            const data = await _obtainLongTermClients();
            let Arr = [];
            data.forEach((value, index) => {
                if (value.client_long_term === true) {
                    Arr.push(value.client_name);
                }
            });

            // remove duplicates
            Arr = [...new Set(Arr)];

            await displayClientProjects(Arr[0], popUpCell);

            result = { label: 'Long Term Client', names: Arr };
            return result;
        }
    }

    clientTypeSelect.addEventListener('change', async function () {
        // Remove the existing projectsDiv if it exists
        const existingProjectsDiv = document.getElementById('projects-div');
        if (existingProjectsDiv) {
            existingProjectsDiv.remove();
        }

        let selectedOption = clientTypeSelect.value;
        let ff = await contextProcessor(selectedOption);
        let selectedClient = ff || {
            label: 'Unknown Client',
            names: [],
        };

        clientNameLabel.textContent = `Client Name (${selectedClient.label})`;

        clientNameInput.innerHTML = '';

        selectedClient.names.forEach((name) => {
            let option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            clientNameInput.appendChild(option);
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
    addressLine1.id = '#address-line-1';

    let addressLine2 = new ComponentServices.TextInputWithLabel(
        'Address Line 2',
        _createtextInput('address-line-2', false)
    ).render().result;
    addressLine2.id = '#address-line-2';

    let addressLine3 = new ComponentServices.TextInputWithLabel(
        'City, State, Zip*',
        _createtextInput('address-line-3', false)
    ).render().result;
    addressLine3.id = '#address-line-3';

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

    // return addressCell;
    return { popUpCell, addressCell };
}

function _popUpCell() {
    let popUpCell = document.createElement('div');

    setTimeout(() => {
        document
            .getElementById('client-name')
            .addEventListener('change', function () {
                const selectedClientId = this.value;
                if (selectedClientId) {
                    displayClientProjects(selectedClientId, popUpCell);
                }
            });
    }, 0);

    //    // Function to handle drag and drop
    //    function handleDragStart(event) {
    //     event.dataTransfer.setData('text/plain', event.target.dataset.projectId);
    //     }

    // function handleDrop(event) {
    //     event.preventDefault();
    //     const projectId = event.dataTransfer.getData('text/plain');
    //     const selectedProject = document.querySelector(`[data-project-id="${projectId}"]`);
    //     // Add the selected project as a line item in the invoice form
    //     addLineItem(selectedProject.textContent);
    // }

    // function allowDrop(event) {
    //     event.preventDefault();
    // }

    // // Attach drag and drop event listeners
    // const projectListItems = document.querySelectorAll('#client-projects-list li');
    // projectListItems.forEach(item => {
    //     item.addEventListener('dragstart', handleDragStart);
    // });

    return popUpCell;
}

/**
 * The function returns the service cell that will be part of the invoice generator
 * form
 * @returns Div with the services cell
 */
function _servicesCell() {
    let servicesCell = document.createElement('div');
    servicesCell.classList.add('col-span-2', 'p-5', 'my-auto');
    servicesCell.id='servicesLog'

    let title = new ComponentServices.HeadingOrParagraph(
        'h6',
        'Services Info'
    ).renderWithClass(['mx-auto', 'text-center']).result;

    let headingRow = document.createElement('div');
    headingRow.classList.add('grid', 'grid-cols-4', 'grid-flow-row', 'gap-8');
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

    // for (let i = 0; i < 2; i++) {
    //     let service = _createOneServiceRow('inte', 'inakelr', 800, i + 1);
    //     servicesCell.append(service);
    // }

    return servicesCell;
}

/**
 * The function returns a row with three inputs, one text and two numbers to
 * put in the service, the amount and the cost associated with the service
 * @param {number} serviceNum A number between 1 thru 10
 * @returns Row with three inputs
 */
function _createOneServiceRow(description = null, inputQuantity = null, cost = null, serviceNum) {
    let serviceRow = document.createElement('div');
    serviceRow.classList.add(
        'grid',
        'grid-cols-4',
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
        // replace this with the slug
        'service-desc-' + serviceNum.toFixed(0),
        required
    );
    service.value = description
    // let quantity = _createNumberInput(
    //     'service-quantity-' + serviceNum.toFixed(0),
    //     required
    // );
    let quantity = _createtextInput(
        'service-quantity-' + serviceNum.toFixed(0),
        required
    );
    let dollarAmount = _createNumberInput(
        'service-cost-' + serviceNum.toFixed(0),
        required
    );
    quantity.value = inputQuantity
    dollarAmount.value = cost

    

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

    // add the list cancelation button here

    let button = document.createElement('button')
    button.textContent = 'Remove'
    button.type = 'button'
    button.classList.add('py-4', 'px-2', 'border-2', 'border-gray-600')

    button.addEventListener('click', () => {

        let services = document.getElementById('servicesLog')

        // tidy up the calculation around this end
        services.removeChild(services.childNodes[serviceNum + 2])

        console.log(serviceNum + 2)
        
    })

    serviceRow.append(button)

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

function _createSelectInput(options, desiredId, required = false) {
    let input = document.createElement('select');
    input.name = desiredId;
    input.id = desiredId;

    if (required) {
        input.required = true;
    }

    options.forEach((optionValue) => {
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
