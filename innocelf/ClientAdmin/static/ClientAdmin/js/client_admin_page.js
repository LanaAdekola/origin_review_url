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

const LONG_TERM_CLIENTS = {
	sagacityLegal: {
		personName: 'Randi Karpinia',
		companyName: 'Sagacity Legal',
		personEmail: 'randi.karpinia@sagacitylegal.com',
	},
	katherineKoenig: {
		personName: 'Katherine Koenig',
		companyName: 'Katherine Law Firm',
		personEmail: 'randi.karpinia@sagacitylegal.com',
	},
	anilaRasul: {
		personName: 'Anila Rasul',
		companyName: 'Anila Rasul Law Firm',
		personEmail: 'randi.karpinia@sagacitylegal.com',
	},
	mesandco: {
		personName: 'Maria Lizi Stroud',
		companyName: 'MES and CO',
		personEmail: 'randi.karpinia@sagacitylegal.com',
	},
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
	$('#abandoned_client_table').DataTable();
	$('#monthly_revenue_table').DataTable();
});

//////////////////////////////////////// Hide all Containers ////////////////////////////////////////

/**
 * The function hides all containers that are added to the page.
 */
function hideAllContainers() {
	let CONTAINER_ID_LIST = [
		'long_term_client_details',
		'add_new_client_container',
		'current_client_details',
		'potential_client_details',
		'table_potential_client_container',
		'table_current_client_container',
		'table_abandoned_client_container',
		'table_monthly_revenue_container',
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
		document.getElementById('add_project_clientName').value = '';
		document.getElementById('add_project_clientCompany').value = '';
		document.getElementById('add_project_clientEmail').value = '';
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
				if (data.message === 'Success') {
					hideAllContainers();
					document.getElementById('potential_client_details_form').reset();

					document.getElementById('potential_client_table').querySelector('tbody').innerHTML = '';

					document.getElementById('potential_project_clients_serialize').textContent = JSON.stringify(
						data.potential_project_clients_serialize
					);
					populatePotentialProjectTable();

					document.getElementById('show_potential_client_table').click();
				} else if (data.message === 'Fail') {
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

		let makeCurrentButton = this.querySelector('button[id$="_makeCurrentButton"]');
		makeCurrentButton.addEventListener('click', function (e) {
			if (confirm('Are you sure you want to make this client current?')) {
				let tableRow = document.querySelector('tr[id="' + _elementId + '"]');

				document.getElementById('add_project_clientName').value = tableRow.getAttribute('client-name');
				document.getElementById('add_project_clientCompany').value = tableRow.getAttribute('client-company');
				document.getElementById('add_project_clientEmail').value = tableRow.getAttribute('client-email');
				document.getElementById('add_project_projectName').value = tableRow.getAttribute('project-name');
				document.getElementById('add_project_projectType').value = Object.keys(PROJECT_TYPE_CHOICES).find(
					(key) => PROJECT_TYPE_CHOICES[key] === tableRow.getAttribute('project-type')
				);

				document.getElementById('add_new_client_sidebar').click();
				document.getElementById('choose_current_client').click();

				$.ajax({
					type: 'POST',
					data: {
						_elementId,
						csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
					},
					url: '/client-admin/make-client-current',
					success: function (data) {
						if (data.message === 'Success') {
							// Empty the table
							document.getElementById('potential_client_table').querySelector('tbody').innerHTML = '';

							document.getElementById('potential_project_clients_serialize').textContent = JSON.stringify(
								data.potential_project_clients_serialize
							);
							populatePotentialProjectTable();

							$('#potential_client_table').DataTable();
						}
					},
				});
			} else {
				return;
			}
		});

		let abandonButton = this.querySelector('button[id$="_abandonClientButton');
		abandonButton.addEventListener('click', function (e) {
			if (confirm('Are you sure you want to abandon this client? This process cannot be undone (easily)')) {
				$.ajax({
					type: 'POST',
					data: {
						_elementId,
						csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
					},
					url: '/client-admin/abandon-client',
					success: function (data) {
						if (data.message === 'Success') {
							// Empty the table
							document.getElementById('potential_client_table').querySelector('tbody').innerHTML = '';
							document.getElementById('abandoned_client_table').querySelector('tbody').innerHTML = '';

							document.getElementById('potential_project_clients_serialize').textContent = JSON.stringify(
								data.potential_project_clients_serialize
							);
							populatePotentialProjectTable();
							populateAbandonedProjectTable();

							$('#potential_client_table').DataTable();
							$('#abandoned_client_table').DataTable();
						}
					},
				});
			} else {
				return;
			}
		});
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
		checkButton.id = this.elementId + '_makeCurrentButton';
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
		banButton.id = this.elementId + '_abandonClientButton';
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

			if (fields.is_client_current === false && fields.is_client_abandoned === false) {
				let potentialClientTableRow = new PotentialClientTableRow(
					fields.slug,
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

		this.classList = 'form-group';
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
		input.classList = 'form-control form-control-sm lato-regular';
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
				if (data.message === 'Success') {
					hideAllContainers();
					projectForm.reset();

					document.getElementById('current_client_table').querySelector('tbody').innerHTML = '';

					document.getElementById('current_project_clients_serialize').textContent = JSON.stringify(
						data.current_project_clients_serialize
					);
					document.getElementById('payments_serialize').textContent = JSON.stringify(data.payments_serialize);
					populateCurrentProjectTable();

					document.getElementById('show_current_client_table').click();
				} else if (data.message === 'Fail') {
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
		addPaymentButton.addEventListener('click', function (e) {
			document.getElementById('add_payment_modal_body').innerHTML = '';
			let addPaymentInput = new PaymentTextInput(_elementId + '_addPaymentModal');
			addPaymentInput.classList.add('my-0');
			document.getElementById('add_payment_modal_body').append(addPaymentInput);
			document.getElementById('add_payment_project_slug').value = _elementId;

			$('#add_payment_modal').modal('show');
		});

		let editRowButton = this.querySelector('button[id$="_editRowButton"]');
		editRowButton.addEventListener('click', function () {
			document.getElementById('edit_row_project_slug').value = _elementId;

			// Input the already ready fields in the form
			document.getElementById('edit_project_row_clientName').value = _clientName;
			document.getElementById('edit_project_row_clientCompany').value = _clientCompany;
			document.getElementById('edit_project_row_clientEmail').value = _clientEmail;
			document.getElementById('edit_project_row_projectName').value = _projectName;
			document.getElementById('edit_project_row_projectType').value = Object.keys(PROJECT_TYPE_CHOICES).find(
				(x) => PROJECT_TYPE_CHOICES[x] === _projectType
			);
			document.getElementById('edit_project_row_projectDeadline').value = _projectDeadline;
			document.getElementById('edit_project_row_expectedRevenue').value = _expectedRevenue;

			$('#edit_row_modal').modal('show');
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
		td.classList = 'px-0';
		td.style.textAlign = 'center';
		td.style.verticalAlign = 'middle';

		let row = document.createElement('div');
		row.classList = 'row m-0 w-100 justify-content-center align-items-center';

		let col1 = document.createElement('div');
		col1.classList = 'col-4 m-0 p-0';
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
		col2.classList = 'col-4 m-0 p-0';
		col2.setAttribute('data-toggle', 'tooltip');
		col2.setAttribute('title', 'Add Payment');
		let addPaymentButton = document.createElement('button');
		addPaymentButton.classList = 'btn btn-link p-1 d-inline-flex text-primary';
		addPaymentButton.id = this.elementId + '_addPaymentButton';
		let dollarIcon = document.createElement('i');
		dollarIcon.classList = 'fas fa-dollar-sign fa-lg';
		let addIcon = document.createElement('i');
		addIcon.classList = 'fas fa-plus fa-lg';
		addPaymentButton.append(dollarIcon, addIcon);
		col2.append(addPaymentButton);

		let col3 = document.createElement('div');
		col3.classList = 'col-4 m-0 p-0';
		col3.setAttribute('data-toggle', 'tooltip');
		col3.setAttribute('title', 'Edit Row');
		let editRowButton = document.createElement('button');
		editRowButton.classList = 'btn btn-link p-1 d-inline-flex text-dark';
		editRowButton.id = this.elementId + '_editRowButton';
		let editIcon = document.createElement('i');
		editIcon.classList = 'far fa-edit fa-lg';
		// let addIcon = document.createElement('i');
		// addIcon.classList = 'fas fa-plus fa-lg';
		editRowButton.append(editIcon);
		col3.append(editRowButton);

		row.append(col3, col1, col2);
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

			let indexOfPayments = paymentsJson.map((x, i) => {
				if (x.fields.project === pkCurrentProject) {
					return i;
				} else {
				}
			});
			indexOfPayments = indexOfPayments.filter((x) => x !== undefined);

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

//////////////////////////////////////// Add Payments Modal ////////////////////////////////////////

document.getElementById('add_payment_modal_footer_submit').addEventListener('click', function () {
	let _elementId = document.getElementById('add_payment_project_slug').value;
	let dollarValue = document.getElementById('add_payment_modal_body').querySelector('input').value;

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
				document.getElementById('payments_serialize').textContent = JSON.stringify(data.payments_serialize);

				populateCurrentProjectTable();
				$('#add_payment_modal').modal('hide');
				$('#current_client_table').DataTable();
			}
		},
	});
});

////////////////////////////////////// Edit Project Row Submit //////////////////////////////////////

document.getElementById('edit_row_modal_footer_submit').addEventListener('click', function (e) {
	let editProjectRowForm = document.getElementById('edit_project_row_form');

	if (editProjectRowForm.checkValidity()) {
		e.preventDefault();

		let projectDeadlineTimestamp = Date.parse(document.getElementById('edit_project_row_projectDeadline').value);
		document.getElementById('edit_project_row_projectDeadline_timestamp').value = projectDeadlineTimestamp;

		let formData = new FormData(editProjectRowForm);
		$.ajax({
			type: 'POST',
			url: '/client-admin/edit-project-row',
			data: formData,
			cache: false,
			processData: false,
			contentType: false,
			success: function (data) {
				if (data.message === 'Success') {
					// Empty the table
					document.getElementById('current_client_table').querySelector('tbody').innerHTML = '';

					document.getElementById('current_project_clients_serialize').textContent = JSON.stringify(
						data.current_project_clients_serialize
					);
					document.getElementById('payments_serialize').textContent = JSON.stringify(data.payments_serialize);

					populateCurrentProjectTable();

					$('#edit_row_modal').modal('hide');
					$('#current_client_table').DataTable();
				} else if (data.message === 'Fail') {
					alert(
						'A similar client with the same project exists in the DB. Please rename the project to something specific.'
					);
				}
			},
		});
	}
});

////////////////////////////////////// Abandoned Clients Table //////////////////////////////////////

// Show abandoned clients table
document.getElementById('show_abandoned_client_table').addEventListener('click', function () {
	hideAllContainers();
	document.getElementById('table_abandoned_client_container').classList.remove('d-none');
});

/**
 * Creates an instance of the Potential Client / Potential Project Table Row. The row will be appended to
 * the potential_client_table
 * @property {string} elementId - The id the row should have
 * @property {string} clientName - The client name that will be displayed on the row
 * @property {string} clientCompany - The client's company that will be displayed on the row
 * @property {string} clientEmail - The client's email that will be displayed on the row
 * @property {string} initialContactDate - The initial contact date that will be displayed on the row.
 */
class AbandonedClientTableRow extends HTMLTableRowElement {
	static get observedAttributes() {
		return [
			'id',
			'client-name',
			'client-company',
			'client-email',
			// 'project-name',
			// 'project-type',
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

	set initialContactDate(newName) {
		this.setAttribute('initial-contact-date', newName);
	}

	constructor(_elementId, _clientName, _clientCompany, _clientEmail, _initialContactDate) {
		super();

		this.elementId = _elementId;
		this.clientName = _clientName;
		this.clientCompany = _clientCompany;
		this.clientEmail = _clientEmail;
		this.initialContactDate = _initialContactDate;

		let clientNameCell = this.createTableCell(_clientName);
		let clientCompanyCell = this.createTableCell(_clientCompany);
		let clientEmailCell = this.createTableCell(_clientEmail);
		let initialContactDateCell = this.createTableCell(_initialContactDate);

		this.append(clientNameCell, clientCompanyCell, clientEmailCell, initialContactDateCell);
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
}

customElements.define('abandoned-client-table-row', AbandonedClientTableRow, { extends: 'tr' });

/**
 * Populates the Abandoned Project / Client Table by using the Json outputs from the backend
 */
function populateAbandonedProjectTable() {
	let potentialProjectClients = JSON.parse(document.getElementById('potential_project_clients_serialize').textContent);
	let potentialProjectClientsJson = JSON.parse(potentialProjectClients);

	for (const key in potentialProjectClientsJson) {
		if (Object.hasOwnProperty.call(potentialProjectClientsJson, key)) {
			let fields = potentialProjectClientsJson[key].fields;

			if (fields.is_client_abandoned === true) {
				let abandonedClientTableRow = new AbandonedClientTableRow(
					fields.slug,
					fields.client_name,
					fields.client_company,
					fields.client_email,
					fields.initial_contact_date
				);

				document.getElementById('abandoned_client_table').querySelector('tbody').append(abandonedClientTableRow);
			}
		}
	}
}

populateAbandonedProjectTable();

/////////////////////////////////////// Monthly Revenue Table ///////////////////////////////////////

document.getElementById('show_monthly_revenue_table').addEventListener('click', function () {
	hideAllContainers();
	document.getElementById('table_monthly_revenue_container').classList.remove('d-none');
});

/**
 * Creates an instance of the Potential Client / Potential Project Table Row. The row will be appended to
 * the potential_client_table
 * @property {string} elementId - The id the row should have
 * @property {string} clientName - The client name that will be displayed on the row
 * @property {string} clientCompany - The client's company that will be displayed on the row
 * @property {string} clientEmail - The client's email that will be displayed on the row
 * @property {string} initialContactDate - The initial contact date that will be displayed on the row.
 */
class MonthlyRevenueTableRow extends HTMLTableRowElement {
	static get observedAttributes() {
		return [
			'year',
			'january',
			'february',
			'march',
			'april',
			'may',
			'june',
			'july',
			'august',
			'september',
			'october',
			'november',
			'december',
		];
	}

	get year() {
		return this.getAttribute('year');
	}

	get january() {
		return this.getAttribute('january');
	}

	get february() {
		return this.getAttribute('february');
	}

	get march() {
		return this.getAttribute('march');
	}

	get april() {
		return this.getAttribute('april');
	}

	get may() {
		return this.getAttribute('may');
	}

	get june() {
		return this.getAttribute('june');
	}

	get july() {
		return this.getAttribute('july');
	}

	get august() {
		return this.getAttribute('august');
	}

	get september() {
		return this.getAttribute('september');
	}

	get october() {
		return this.getAttribute('october');
	}

	get november() {
		return this.getAttribute('november');
	}

	get december() {
		return this.getAttribute('december');
	}

	set year(newValue) {
		this.setAttribute('year', newValue);
	}

	set january(newValue) {
		this.setAttribute('january', newValue);
	}

	set february(newValue) {
		this.setAttribute('february', newValue);
	}

	set march(newValue) {
		this.setAttribute('march', newValue);
	}

	set april(newValue) {
		this.setAttribute('april', newValue);
	}

	set may(newValue) {
		this.setAttribute('may', newValue);
	}

	set june(newValue) {
		this.setAttribute('june', newValue);
	}

	set july(newValue) {
		this.setAttribute('july', newValue);
	}

	set august(newValue) {
		this.setAttribute('august', newValue);
	}

	set september(newValue) {
		this.setAttribute('september', newValue);
	}

	set october(newValue) {
		this.setAttribute('october', newValue);
	}

	set november(newValue) {
		this.setAttribute('november', newValue);
	}

	set december(newValue) {
		this.setAttribute('december', newValue);
	}

	constructor(
		_year,
		_january,
		_february,
		_march,
		_april,
		_may,
		_june,
		_july,
		_august,
		_september,
		_october,
		_november,
		_december
	) {
		super();

		this.year = _year;
		this.january = _january;
		this.february = _february;
		this.march = _march;
		this.april = _april;
		this.may = _may;
		this.june = _june;
		this.july = _july;
		this.august = _august;
		this.september = _september;
		this.october = _october;
		this.november = _november;
		this.december = _december;

		let yearCell = this.createYearCell(_year);
		let januaryCell = _january ? this.createTableCell(_january.toFixed(2)) : this.createTableCell('0');
		let februaryCell = _february ? this.createTableCell(_february.toFixed(2)) : this.createTableCell('0');
		let marchCell = _march ? this.createTableCell(_march.toFixed(2)) : this.createTableCell('0');
		let aprilCell = _april ? this.createTableCell(_april.toFixed(2)) : this.createTableCell('0');
		let mayCell = _may ? this.createTableCell(_may.toFixed(2)) : this.createTableCell('0');
		let juneCell = _june ? this.createTableCell(_june.toFixed(2)) : this.createTableCell('0');
		let julyCell = _july ? this.createTableCell(_july.toFixed(2)) : this.createTableCell('0');
		let augustCell = _august ? this.createTableCell(_august.toFixed(2)) : this.createTableCell('0');
		let septemberCell = _september ? this.createTableCell(_september.toFixed(2)) : this.createTableCell('0');
		let octoberCell = _october ? this.createTableCell(_october.toFixed(2)) : this.createTableCell('0');
		let novemberCell = _november ? this.createTableCell(_november.toFixed(2)) : this.createTableCell('0');
		let decemberCell = _december ? this.createTableCell(_december.toFixed(2)) : this.createTableCell('0');

		this.append(
			yearCell,
			januaryCell,
			februaryCell,
			marchCell,
			aprilCell,
			mayCell,
			juneCell,
			julyCell,
			augustCell,
			septemberCell,
			octoberCell,
			novemberCell,
			decemberCell
		);
	}

	connectedCallback() {
		//
	}

	createTableCell(cellText) {
		let td = document.createElement('td');
		td.textContent = '$' + cellText;
		td.style.verticalAlign = 'middle';
		td.style.textAlign = 'center';
		td.style.fontSize = 'small';

		return td;
	}

	createYearCell(cellText) {
		let td = document.createElement('td');
		td.textContent = cellText;
		td.style.verticalAlign = 'middle';
		td.style.textAlign = 'center';
		td.classList = 'lato-bold';

		return td;
	}
}

customElements.define('monthly-revenue-table-row', MonthlyRevenueTableRow, { extends: 'tr' });

/**
 * Populates the Monthly Revenue Table by using the JSON outputs from the backend
 */
function populateMonthlyRevenueTable() {
	let monthlyRevenueJson = JSON.parse(document.getElementById('monthly_revenue_dict').textContent);

	for (const year in monthlyRevenueJson) {
		if (Object.hasOwnProperty.call(monthlyRevenueJson, year)) {
			let monthlyRevenueTableRow = new MonthlyRevenueTableRow(
				year,
				monthlyRevenueJson[year]['1'],
				monthlyRevenueJson[year]['2'],
				monthlyRevenueJson[year]['3'],
				monthlyRevenueJson[year]['4'],
				monthlyRevenueJson[year]['5'],
				monthlyRevenueJson[year]['6'],
				monthlyRevenueJson[year]['7'],
				monthlyRevenueJson[year]['8'],
				monthlyRevenueJson[year]['9'],
				monthlyRevenueJson[year]['10'],
				monthlyRevenueJson[year]['11'],
				monthlyRevenueJson[year]['12']
			);
			document.getElementById('monthly_revenue_table').querySelector('tbody').append(monthlyRevenueTableRow);
		}
	}
}

populateMonthlyRevenueTable();

///////////////////////////////////////// Long Term Clients /////////////////////////////////////////

/**
 * Populates the select for long term clients in the current client form
 */
function populateLongTermClients() {
	let longTermClients = JSON.parse(document.getElementById('long_term_clients_serialize').textContent);
	let longTermClientsJson = JSON.parse(longTermClients);

	let longTermClientSelect = document.getElementById('add_project_longTermClientList');

	let option = document.createElement('option');
	option.value = '';
	option.textContent = '';
	option.selected = true;
	longTermClientSelect.append(option);

	for (const key in longTermClientsJson) {
		if (Object.hasOwnProperty.call(longTermClientsJson, key)) {
			let fields = longTermClientsJson[key].fields;

			let option = document.createElement('option');
			option.value = fields.client_name + '_' + fields.client_company + '_' + fields.client_email;
			option.textContent = fields.client_company;
			option.classList = 'lato-regular';

			longTermClientSelect.append(option);
		}
	}
}
populateLongTermClients();

document.getElementById('add_long_term_client_sidebar').addEventListener('click', function () {
	hideAllContainers();
	document.getElementById('long_term_client_details').classList.remove('d-none');
});

document.getElementById('add_long_term_client_form_save').addEventListener('click', function (e) {
	let longTermClientForm = document.getElementById('long_term_client_details_form');

	if (longTermClientForm.checkValidity()) {
		e.preventDefault();

		let formData = new FormData(longTermClientForm);
		longTermClientForm.reset();

		$.ajax({
			type: 'POST',
			url: '/client-admin/save-long-term-client',
			data: formData,
			cache: false,
			processData: false,
			contentType: false,
			success: function (data) {
				if (data.message === 'Success') {
					window.location.reload();
				} else if (data.message === 'Fail') {
					alert(
						'A similar client with the same project exists in the DB. Please rename the project to something specific.'
					);
				}
			},
		});
	}
});

document.getElementById('add_project_longTermClientList').addEventListener('change', function (e) {
	let chosenValue = e.target.value;

	let clientName = chosenValue.split('_')[0];
	let clientCompany = chosenValue.split('_')[1];
	let clientEmail = chosenValue.split('_')[2];

	document.getElementById('add_project_clientName').value = clientName;
	document.getElementById('add_project_clientCompany').value = clientCompany;
	document.getElementById('add_project_clientEmail').value = clientEmail;
});
