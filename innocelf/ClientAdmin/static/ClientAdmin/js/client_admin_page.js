'use strict';

const PROJECT_TYPE_CHOICES = {
	PAR: 'Patent Research',
	VS: 'Validity and Invalidity Search',
	FTO: 'Freedom to Operate Search',
	PRR: 'Product Research',
	LAN: 'Landscape / State of the Art',
	TS: 'Trademark Search',
	PD: 'Provisional Draft',
	FPD: 'Full Patent Draft',
};

///////////////////////////////////// Document on Ready Function /////////////////////////////////////

$(document).ready(function () {
	// Activate the sidebar button
	$('.button-collapse').sideNav({
		edge: 'left',
	});

	// Activate tooltips
	$('[data-toggle="tooltip"]').tooltip();
});

////////////////////////////////////// Window On Load Functions //////////////////////////////////////
window.addEventListener('load', function () {
	// Make all labels Lato Regular
	let allLabels = document.getElementsByTagName('label');
	for (let i = 0; i < allLabels.length; i++) {
		allLabels[i].classList.add('lato-regular');
	}

	// Activate Date Pickers
	$('.datepicker').datepicker({
		onOpen: function () {
			let root = this.$root[0];
			root.classList.add('lato-regular');
		},
	});

	// Activate the tables
	$('#potential_client_table').DataTable();
	$('#current_client_table').DataTable();
});

//////////////////////////////////////// Hide all Containers ////////////////////////////////////////

/**
 * The function hides all containers that are added to the page.
 */
function hideAllContainers() {
	let CONTAINER_ID_LIST = [
		'add_new_client_container',
		'current_client_details',
		'potential_client_details',
		'table_potential_client_container',
		'table_current_client_container',
	];

	for (let i = 0; i < CONTAINER_ID_LIST.length; i++) {
		document.getElementById(CONTAINER_ID_LIST[i]).classList.add('d-none');
	}
}

/**
 * Updates the value of the hidden element Id with the timestamp of the date selected in the explicit element
 * @param {string} explicitElementId Id of the explicit input on which the user actually selects the date
 * @param {string} hiddenElementId Id of the hidden input used to store the timestamp of the date chosen by the user in the explicity element
 */
function populateHiddenDateInputs(explicitElementId, hiddenElementId) {
	let dateString = document.getElementById(explicitElementId).value;
	let dateStringTimeStamp = Date.parse(dateString);
	let dateStringTimeStampString = dateStringTimeStamp.toString();
	document.getElementById(hiddenElementId).value = dateStringTimeStampString;
}

//////////////////////////////////// Add New Client Button Click ////////////////////////////////////

document.getElementById('add_new_client_sidebar').addEventListener('click', function (e) {
	hideAllContainers();
	document.getElementById('add_new_client_container').classList.remove('d-none');
});

///////////////////////////////// Potential or Current Client Radio /////////////////////////////////

// Show the potential client form at the beginning
// document.getElementById('potential_client_details').classList.remove('d-none');

document.getElementById('choose_potential_client').addEventListener('click', function () {
	if (this.checked === true) {
		document.getElementById('potential_client_details').classList.remove('d-none');
		document.getElementById('current_client_details').classList.add('d-none');
	} else if (this.checked === false) {
		document.getElementById('potential_client_details').classList.add('d-none');
		document.getElementById('current_client_details').classList.remove('d-none');
	}
});

document.getElementById('choose_current_client').addEventListener('click', function () {
	if (this.checked === true) {
		document.getElementById('potential_client_details').classList.add('d-none');
		document.getElementById('current_client_details').classList.remove('d-none');
	} else if (this.checked === false) {
		document.getElementById('potential_client_details').classList.remove('d-none');
		document.getElementById('current_client_details').classList.add('d-none');
	}
});

///////////////////////////////////// Long Term Client CheckBox /////////////////////////////////////

document.getElementById('add_project_isLongTermClient').addEventListener('change', function (e) {
	let longTermClientDropdownRow = document.getElementById('add_project_longTermClientList').parentElement;
	if (this.checked === true) {
		longTermClientDropdownRow.classList.remove('d-none');
	} else if (this.checked === false) {
		longTermClientDropdownRow.classList.add('d-none');
	}
});

////////////////////////////////////// Save Potential Project //////////////////////////////////////

document.getElementById('add_potential_project_form_save').addEventListener('click', function (e) {
	// Obtain the form data
	// let serializedFormData = $('#potential_client_details_form').serialize();
	if (document.getElementById('potential_client_details_form').checkValidity()) {
		e.preventDefault();

		populateHiddenDateInputs(
			'add_potentialProject_initialContactDate',
			'add_potentialProject_initialContactDate_TimeStamp'
		);

		let formData = new FormData(document.getElementById('potential_client_details_form'));

		$.ajax({
			type: 'POST',
			url: '/client-admin/save-potential-project',
			data: formData,
			cache: false,
			processData: false,
			contentType: false,
			success: function (data) {
				if (data === 'Success') {
					hideAllContainers();
					document.getElementById('potential_client_details_form').reset();
				} else if (data === 'Fail') {
					alert(
						'A similar client with the same project exists in the DB. Please rename the project to something specific.'
					);
				}
			},
		});
	}
});

////////////////////////////////////// Potential Project Table //////////////////////////////////////

document.getElementById('show_potential_client_table').addEventListener('click', function () {
	hideAllContainers();
	document.getElementById('table_potential_client_container').classList.remove('d-none');
});

/**
 * Creates an instance of the Potential Client / Potential Project Table Row. The row will be appended to
 * the potential_client_table
 * @property {string} elementId - The id the row should have
 * @property {string} clientName - The client name that will be displayed on the row
 * @property {string} clientCompany - The client's company that will be displayed on the row
 * @property {string} clientEmail - The client's email that will be displayed on the row
 * @property {string} projectName - The project name that will be displayed on the row
 * @property {string} projectType - The project type that will be displayed on the row. Takes its values from PROJECT_TYPE_CHOICES displayed above
 * @property {string} initialContactDate - The initial contact date that will be displayed on the row.
 */
class PotentialClientTableRow extends HTMLTableRowElement {
	static get observedAttributes() {
		return [
			'id',
			'client-name',
			'client-company',
			'client-email',
			'project-name',
			'project-type',
			'initial-contact-date',
		];
	}

	get elementId() {
		return this.getAttribute('id');
	}

	get clientName() {
		return this.getAttribute('client-name');
	}

	get clientEmail() {
		return this.getAttribute('client-email');
	}

	get clientCompany() {
		return this.getAttribute('client-company');
	}

	get projectName() {
		return this.getAttribute('project-name');
	}

	get projectType() {
		return this.getAttribute('project-type');
	}

	get initialContactDate() {
		return this.getAttribute('initial-contact-date');
	}

	set elementId(newName) {
		this.setAttribute('id', newName);
	}

	set clientName(newName) {
		this.setAttribute('client-name', newName);
	}

	set clientEmail(newValue) {
		this.setAttribute('client-email', newValue);
	}

	set clientCompany(newName) {
		this.setAttribute('client-company', newName);
	}

	set projectName(newName) {
		this.setAttribute('project-name', newName);
	}

	set projectType(newName) {
		this.setAttribute('project-type', newName);
	}

	set initialContactDate(newName) {
		this.setAttribute('initial-contact-date', newName);
	}

	constructor(_elementId, _clientName, _clientCompany, _clientEmail, _projectName, _projectType, _initialContactDate) {
		super();

		this.elementId = _elementId;
		this.clientName = _clientName;
		this.clientCompany = _clientCompany;
		this.clientEmail = _clientEmail;
		this.projectName = _projectName;
		this.projectType = _projectType;
		this.initialContactDate = _initialContactDate;

		let clientNameCell = this.createTableCell(_clientName);
		let clientCompanyCell = this.createTableCell(_clientCompany);
		let clientEmailCell = this.createTableCell(_clientEmail);
		let projectNameCell = this.createTableCell(_projectName);
		let projectTypeCell = this.createTableCell(_projectType);
		let initialContactDateCell = this.createTableCell(_initialContactDate);
		let tableCellButtons = this.createTableCellButtons();

		this.append(
			clientNameCell,
			clientCompanyCell,
			clientEmailCell,
			projectNameCell,
			projectTypeCell,
			initialContactDateCell,
			tableCellButtons
		);
	}

	connectedCallback() {
		//
	}

	createTableCell(cellText) {
		let td = document.createElement('td');
		td.textContent = cellText;
		td.style.verticalAlign = 'middle';
		td.style.textAlign = 'center';
		td.style.fontSize = 'small';

		return td;
	}

	createTableCellButtons() {
		let td = document.createElement('td');

		let row = document.createElement('div');
		row.classList = 'row m-0 w-100 justify-content-center';

		let col1 = document.createElement('div');
		col1.classList = 'col-5 ml-0 p-0';
		col1.setAttribute('data-toggle', 'tooltip');
		col1.setAttribute('title', 'Make Client Current');
		let checkButton = document.createElement('button');
		checkButton.classList = 'btn btn-link p-1';
		let checkIcon = document.createElement('i');
		checkIcon.classList = 'fas fa-check-circle fa-lg text-success';
		checkButton.append(checkIcon);
		col1.append(checkButton);

		let col2 = document.createElement('div');
		col2.classList = 'col-5 ml-0 p-0';
		col2.setAttribute('data-toggle', 'tooltip');
		col2.setAttribute('title', 'Abandon Client');
		let banButton = document.createElement('button');
		banButton.classList = 'btn btn-link p-1';
		let banIcon = document.createElement('i');
		banIcon.classList = 'fas fa-ban fa-lg text-danger';
		banButton.append(banIcon);
		col2.append(banButton);

		row.append(col1, col2);
		td.append(row);

		return td;
	}
}

customElements.define('potential-client-table-row', PotentialClientTableRow, { extends: 'tr' });

// Populate Potential Project Table
/**
 * Populates the Potential Project / Client Table by using the Json outputs from the backend
 */
function populatePotentialProjectTable() {
	let potentialProjectClients = JSON.parse(document.getElementById('potential_project_clients_serialize').textContent);
	let potentialProjectClientsJson = JSON.parse(potentialProjectClients);

	for (const key in potentialProjectClientsJson) {
		if (Object.hasOwnProperty.call(potentialProjectClientsJson, key)) {
			let fields = potentialProjectClientsJson[key].fields;

			let potentialClientTableRow = new PotentialClientTableRow(
				'this-id-' + key,
				fields.client_name,
				fields.client_company,
				fields.client_email,
				fields.project_name,
				PROJECT_TYPE_CHOICES[fields.project_type],
				fields.initial_contact_date
			);

			document.getElementById('potential_client_table').querySelector('tbody').append(potentialClientTableRow);
		}
	}
}

populatePotentialProjectTable();

/////////////////////////////////////// Add Payment to Project ///////////////////////////////////////

/**
 * The class creates a Payment Text Input which will be created after the button of "add payment" is clicked in the current project addition
 * @property {string} _inputId - The input id or the id that will be given to the input that will be created within this class
 */
class PaymentTextInput extends HTMLDivElement {
	constructor(_inputId) {
		super();
		this.inputId = _inputId;

		this.classList = 'md-form';
		this.append(this.createLabel(), this.createInput());
	}

	createLabel() {
		let label = document.createElement('label');
		label.setAttribute('for', this.inputId);
		label.textContent = 'Payment Received';
		label.classList = 'lato-regular';

		return label;
	}

	createInput() {
		let input = document.createElement('input');
		input.id = this.inputId;
		input.classList = 'form-control lato-regular';
		input.type = 'text';
		input.name = 'payment';
		input.required = true;

		return input;
	}
}

customElements.define('payment-text-input', PaymentTextInput, { extends: 'div' });

document.getElementById('add_project_addPayment').addEventListener(
	'click',
	function () {
		let parentElement = this.parentElement;
		let paymentInput = new PaymentTextInput('add_project_payment');

		parentElement.append(paymentInput);
	},
	{ once: true }
);

/////////////////////////////////////////// Save Project ///////////////////////////////////////////

document.getElementById('add_project_form_save').addEventListener('click', function (e) {
	let projectForm = document.getElementById('current_client_details_form');
	if (projectForm.checkValidity()) {
		e.preventDefault();

		// Check that the end data is not less than the start date
		let startDateTimeStamp = Date.parse(document.getElementById('add_project_startDate').value);
		let endDateTimeStamp = Date.parse(document.getElementById('add_project_endDate').value);
		if (endDateTimeStamp < startDateTimeStamp) {
			alert('Project End Date cannot be less than the Project Start Date. Please update both or one of the fields.');
			return;
		}

		// Populate hidden inputs
		populateHiddenDateInputs('add_project_projectDeadline', 'add_project_projectDeadline_TimeStamp');
		populateHiddenDateInputs('add_project_startDate', 'add_project_startDate_TimeStamp');
		populateHiddenDateInputs('add_project_endDate', 'add_project_endDate_TimeStamp');

		let formData = new FormData(projectForm);
		$.ajax({
			type: 'POST',
			url: '/client-admin/save-project',
			data: formData,
			cache: false,
			processData: false,
			contentType: false,
			success: function (data) {
				if (data === 'Success') {
					hideAllContainers();
					projectForm.reset();
				} else if (data === 'Fail') {
					alert(
						'A similar client with the same project exists in the DB. Please rename the project to something specific.'
					);
				}
			},
		});
	}
});

////////////////////////////////////// Current Project Table //////////////////////////////////////

document.getElementById('show_current_client_table').addEventListener('click', function () {
	hideAllContainers();
	document.getElementById('table_current_client_container').classList.remove('d-none');
});

/**
 * Creates an instance of the Potential Client / Potential Project Table Row. The row will be appended to
 * the potential_client_table
 * @property {string} elementId - The id the row should have
 * @property {string} clientName - The client name that will be displayed on the row
 * @property {string} clientCompany - The client's company that will be displayed on the row
 * @property {string} clientEmail - The client's email that will be displayed on the row
 * @property {string} projectName - The project name that will be displayed on the row
 * @property {string} projectType - The project type that will be displayed on the row. Takes its values from PROJECT_TYPE_CHOICES displayed above
 * @property {string} projectDeadline - The project deadline date that will be displayed on the row.
 * @property {string} expectedRevenue - The expected revenue for the project that will be displayed in the row
 * @property {string} payments - The payments that are already done, their amount and the date the payment was done. Rule to be used ::: dollarAmount-YYYY/MM/DD&dollarAmount-YYYY/MM/DD&...
 */
class CurrentClientTableRow extends HTMLTableRowElement {
	static get observedAttributes() {
		return [
			'id',
			'client-name',
			'client-company',
			'client-email',
			'project-name',
			'project-type',
			'project-deadline',
			'expected-revenue',
			'payments',
			'is-project-complete',
		];
	}

	get elementId() {
		return this.getAttribute('id');
	}

	get clientName() {
		return this.getAttribute('client-name');
	}

	get clientEmail() {
		return this.getAttribute('client-email');
	}

	get clientCompany() {
		return this.getAttribute('client-company');
	}

	get projectName() {
		return this.getAttribute('project-name');
	}

	get projectType() {
		return this.getAttribute('project-type');
	}

	get projectDeadline() {
		return this.getAttribute('project-deadline');
	}

	get expectedRevenue() {
		return this.getAttribute('expected-revenue');
	}

	get payments() {
		return this.getAttribute('payments');
	}

	get isProjectComplete() {
		return this.getAttribute('is-project-complete');
	}

	set elementId(newName) {
		this.setAttribute('id', newName);
	}

	set clientName(newName) {
		this.setAttribute('client-name', newName);
	}

	set clientEmail(newValue) {
		this.setAttribute('client-email', newValue);
	}

	set clientCompany(newName) {
		this.setAttribute('client-company', newName);
	}

	set projectName(newName) {
		this.setAttribute('project-name', newName);
	}

	set projectType(newName) {
		this.setAttribute('project-type', newName);
	}

	set projectDeadline(newName) {
		this.setAttribute('project-deadline', newName);
	}

	set expectedRevenue(newValue) {
		this.setAttribute('expected-revenue', newValue);
	}

	set payments(newValue) {
		this.setAttribute('payments', newValue);
	}

	set isProjectComplete(newValue) {
		this.setAttribute('is-project-complete', newValue);
	}

	constructor(
		_elementId,
		_clientName,
		_clientCompany,
		_clientEmail,
		_projectName,
		_projectType,
		_projectDeadline,
		_expectedRevenue,
		_payments,
		_isProjectComplete
	) {
		super();

		this.elementId = _elementId;
		this.clientName = _clientName;
		this.clientCompany = _clientCompany;
		this.clientEmail = _clientEmail;
		this.projectName = _projectName;
		this.projectType = _projectType;
		this.projectDeadline = _projectDeadline;
		this.expectedRevenue = _expectedRevenue;
		this.payments = _payments;
		this.isProjectComplete = _isProjectComplete;

		let clientNameCell = this.createTableCell(_clientName);
		let clientCompanyCell = this.createTableCell(_clientCompany);
		let clientEmailCell = this.createTableCell(_clientEmail);
		let projectNameCell = this.createTableCell(_projectName);
		let projectTypeCell = this.createTableCell(_projectType);
		let projectDeadlineCell = this.createTableCell(_projectDeadline);
		let expectedRevenueCell = this.createTableCell('$' + _expectedRevenue);
		let paymentsCell = this.createPaymentTableCell(_payments);
		let tableCellButtons = this.createTableCellButtons();

		this.append(
			clientNameCell,
			clientCompanyCell,
			clientEmailCell,
			projectNameCell,
			projectTypeCell,
			projectDeadlineCell,
			expectedRevenueCell,
			paymentsCell,
			tableCellButtons
		);

		let projectDoneButton = this.querySelector('button[id$="_markProjectDone"]');
		projectDoneButton.addEventListener(
			'click',
			function () {
				$.ajax({
					type: 'POST',
					data: {
						_elementId,
						csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
					},
					url: '/client-admin/mark-project-complete',
					success: function (data) {
						if (data === 'Success') {
							projectDoneButton.classList.remove('text-muted');
							projectDoneButton.classList.add('text-success');
						}
					},
				});
			},
			{ once: 'true' }
		);

		let addPaymentButton = this.querySelector('button[id$="_addPaymentButton"]');
		addPaymentButton.addEventListener('click', function () {
			document.getElementById('add_payment_modal_body').innerHTML = '';
			let addPaymentInput = new PaymentTextInput(_elementId + '_addPaymentModal');
			addPaymentInput.classList.add('my-0');
			document.getElementById('add_payment_modal_body').append(addPaymentInput);

			$('#add_payment_modal').modal('show');

			document.getElementById('add_payment_modal_footer_submit').addEventListener('click', function () {
				let dollarValue = addPaymentInput.querySelector('input').value;

				if (!parseFloat(dollarValue)) {
					alert('Only numbers are allowed in this field');
					return;
				}

				$.ajax({
					type: 'POST',
					url: '/client-admin/add-payment-modal',
					data: {
						dollarValue,
						_elementId,
						csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
					},
					success: function (data) {
						if (data.message === 'Success') {
							// Empty the table
							document.getElementById('current_client_table').querySelector('tbody').innerHTML = '';

							document.getElementById('current_project_clients_serialize').textContent = JSON.stringify(
								data.current_project_clients_serialize
							);
							document.getElementById('payments_serialize').textContent = JSON.stringify(
								data.payments_serialize
							);

							populateCurrentProjectTable();
							$('#add_payment_modal').modal('hide');
						}
					},
				});
			});
		});
	}

	connectedCallback() {}

	createTableCell(cellText) {
		let td = document.createElement('td');
		td.textContent = cellText;
		td.style.verticalAlign = 'middle';
		td.style.textAlign = 'center';
		td.style.fontSize = 'small';

		return td;
	}

	createPaymentTableCell(cellText) {
		let td = document.createElement('td');
		td.classList = 'px-0';
		td.style.verticalAlign = 'middle';
		td.style.textAlign = 'center';
		td.style.fontSize = 'small';

		let paymentWithDate = cellText.split('&');
		for (let i = 0; i < paymentWithDate.length; i++) {
			let row = document.createElement('div');
			row.classList = 'row m-0 p-0 w-100 justify-content-center align-items-center';

			let paymentAmount = paymentWithDate[i].split('-')[0];
			let paymentDate = paymentWithDate[i].split('-')[1];

			let span_1 = document.createElement('span');
			span_1.textContent = '$' + paymentAmount;

			let span_2 = document.createElement('span');
			span_2.classList = 'ml-2 lato-light';
			span_2.style.fontSize = 'x-small';
			span_2.textContent = paymentDate;

			row.append(span_1, span_2);
			td.append(row);
		}

		return td;
	}

	createTableCellButtons() {
		let td = document.createElement('td');

		let row = document.createElement('div');
		row.classList = 'row m-0 w-100 justify-content-center align-items-center';

		let col1 = document.createElement('div');
		col1.classList = 'col-5 ml-0 p-0';
		col1.setAttribute('data-toggle', 'tooltip');
		col1.setAttribute('title', 'Mark Project Done');
		let checkButton = document.createElement('button');
		checkButton.classList =
			this.isProjectComplete === 'true' ? 'btn btn-link p-1 text-success' : 'btn btn-link p-1 text-muted';
		checkButton.id = this.elementId + '_markProjectDone';
		let checkIcon = document.createElement('i');
		checkIcon.classList = 'fas fa-check-circle fa-lg';
		checkButton.append(checkIcon);
		col1.append(checkButton);

		let col2 = document.createElement('div');
		col2.classList = 'col-5 ml-0 p-0';
		col2.setAttribute('data-toggle', 'tooltip');
		col2.setAttribute('title', 'Add Payment');
		let addPaymentButton = document.createElement('button');
		addPaymentButton.classList = 'btn btn-link p-1 text-primary';
		addPaymentButton.id = this.elementId + '_addPaymentButton';
		let dollarIcon = document.createElement('i');
		dollarIcon.classList = 'fas fa-dollar-sign fa-lg';
		let addIcon = document.createElement('i');
		addIcon.classList = 'fas fa-plus fa-lg';
		addPaymentButton.append(dollarIcon, addIcon);
		col2.append(addPaymentButton);

		row.append(col1, col2);
		td.append(row);

		return td;
	}
}

customElements.define('current-client-table-row', CurrentClientTableRow, { extends: 'tr' });

function populateCurrentProjectTable() {
	let currentProjectClients = JSON.parse(document.getElementById('current_project_clients_serialize').textContent);
	let currentProjectClientsJson = JSON.parse(currentProjectClients);

	let payments = JSON.parse(document.getElementById('payments_serialize').textContent);
	let paymentsJson = JSON.parse(payments);

	for (const key in currentProjectClientsJson) {
		if (Object.hasOwnProperty.call(currentProjectClientsJson, key)) {
			let fields = currentProjectClientsJson[key].fields;
			let pkCurrentProject = currentProjectClientsJson[key].pk;

			let indexOfPayments = paymentsJson.map((x, i) => (x.fields.project === pkCurrentProject ? i : ''));

			// Create the payment string
			let paymentString = '';
			for (let i = 0; i < indexOfPayments.length; i++) {
				let paymentAmount = paymentsJson[indexOfPayments[i]].fields.amount;
				let paymentDate = paymentsJson[indexOfPayments[i]].fields.payment_date.replaceAll('-', '/');
				paymentString += paymentAmount.toFixed(2);
				paymentString += '-' + paymentDate + '&';
			}
			paymentString = paymentString.slice(0, -1);

			let isProjectComplete = fields.is_project_complete ? 'true' : 'false';

			let currentClientTableRow = new CurrentClientTableRow(
				fields.slug,
				fields.client_name,
				fields.client_company,
				fields.client_email,
				fields.project_name,
				PROJECT_TYPE_CHOICES[fields.project_type],
				fields.project_deadline,
				fields.expected_revenue,
				paymentString,
				isProjectComplete
			);

			document.getElementById('current_client_table').querySelector('tbody').append(currentClientTableRow);
		}
	}
}

populateCurrentProjectTable();
