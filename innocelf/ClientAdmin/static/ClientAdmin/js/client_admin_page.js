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
		// 'table_current_client_container',
	];

	for (let i = 0; i < CONTAINER_ID_LIST.length; i++) {
		document.getElementById(CONTAINER_ID_LIST[i]).classList.add('d-none');
	}
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

		let dateString = document.getElementById('add_potentialProject_initialContactDate').value;
		let dateStringTimeStamp = Date.parse(dateString);
		let dateStringTimeStampString = dateStringTimeStamp.toString();
		document.getElementById('add_potentialProject_initialContactDate_TimeStamp').value = dateStringTimeStampString;

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

		return td;
	}

	createTableCellButtons() {
		let td = document.createElement('td');

		let row = document.createElement('div');
		row.classList = 'row m-0 w-100';

		let col1 = document.createElement('div');
		col1.classList = 'col-5 ml-0 p-0';
		col1.setAttribute('data-toggle', 'tooltip');
		col1.setAttribute('title', 'Make Client Current');
		let checkButton = document.createElement('button');
		checkButton.classList = 'btn btn-link p-1';
		let checkIcon = document.createElement('i');
		checkIcon.classList = 'fas fa-check-circle fa-2x text-success';
		checkButton.append(checkIcon);
		col1.append(checkButton);

		let col2 = document.createElement('div');
		col2.classList = 'col-5 ml-0 p-0';
		col2.setAttribute('data-toggle', 'tooltip');
		col2.setAttribute('title', 'Abandon Client');
		let banButton = document.createElement('button');
		banButton.classList = 'btn btn-link p-1';
		let banIcon = document.createElement('i');
		banIcon.classList = 'fas fa-ban fa-2x text-danger';
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
			// potentialClientTableRow.elementId = 'this-id-' + key;
			// potentialClientTableRow.clientName = fields.client_name;
			// potentialClientTableRow.clientCompany = fields.client_company;
			// potentialClientTableRow.clientEmail = fields.client_email;
			// potentialClientTableRow.projectName = fields.project_name;
			// potentialClientTableRow.projectType = PROJECT_TYPE_CHOICES[fields.project_type];
			// potentialClientTableRow.initialContactDate = fields.initial_contact_date;

			document.getElementById('potential_client_table').querySelector('tbody').append(potentialClientTableRow);
		}
	}
}

populatePotentialProjectTable();
