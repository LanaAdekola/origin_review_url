'use strict';
import * as ComponentServices from '/static/innoservices/js/components_ts.js';
import * as RenderServices from '/static/innoservices/js/render_ts.js';

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

/**
 * The class creates a navbar for the client administration
 */
export class ClientAdminNavbar extends ComponentServices.Navbar {
    constructor() {
        super();
        this.collapsibleContent.classList.add('gap-12');
    }
    render() {
        this.addBrand();

        this.result.append(this.collapsibleContent);
        this.createNavBarLinks('navbar-home-view', 'Home View', [
            'fas',
            'fa-home',
        ]);
        this.createNavBarLinks('navbar-all-projects', 'All Projects', [
            'fas',
            'fa-project-diagram',
        ]);
        this.createNavBarLinks('navbar-on-going-projects', 'Ongoing Projects', [
            'fas',
            'fa-drum',
        ]);
        this.createNavBarLinks('navbar-revenue', 'Revenue', [
            'fas',
            'fa-money-bill',
        ]);
        this.createNavBarLinks('navbar-generate-invoice', 'Generate Invoice', [
            'fas',
            'fa-file-invoice',
        ]);
        this.createAddProjectButton();

        // Add the counter
        this.result
            .querySelector('#navbar-on-going-projects')
            .append(this._createOngoingProjectsCounter());
        return this;
    }
    createAddProjectButton() {
        let button = Object.assign(document.createElement('button'), {
            type: 'button',
        });
        button.classList.add(
            'lato-regular',
            'block',
            'text-center',
            'mx-auto',
            'py-2',
            'px-5',
            'rounded-xl',
            'shadow',
            'cursor-pointer',
            'border-2',
            'border-innoblack',
            'bg-green-400',
            'text-black',
            'focus:ring',
            'focus:ring-green-800',
            'focus:ring-offset-4',
            'hover:bg-green-800',
            'text-sm',
            'md:text-lg',
            'md:py-3',
            'md:px-8',
            'disabled:bg-gray-200',
            'disabled:cursor-not-allowed'
        );
        button.id = 'navbar-add-blogpost';
        button.disabled = true;

        let plusIcon = document.createElement('i');
        plusIcon.classList.add('fas', 'fa-plus', 'text-black', 'mr-3');

        let span = document.createElement('span');
        span.textContent = 'Add Blog Post';

        button.append(plusIcon, span);
        this.collapsibleContent.append(button);
    }
    createNavBarLinks(id, textContent, iconClassList) {
        let button = Object.assign(document.createElement('button'), {
            type: 'button',
        });
        button.classList.add(
            'block',
            'relative',
            'overflow-visible',
            'my-1',
            'cursor-pointer',
            'hover:text-gray-500',
            'sm:text-center',
            // 'sm:ml-2',
            // 'sm:mr-8',
            // 'lg:ml-5',
            // 'lg:mr-12',
            '2xl:text-lg',
            '2xl:mt-0',
            '2xl:inline-block'
        );
        button.id = id;

        let icon = document.createElement('i');
        icon.classList.add('text-black', 'mr-3');
        iconClassList.map((item) => {
            icon.classList.add(item);
        });

        let span = document.createElement('span');
        span.textContent = textContent;

        button.append(icon, span);
        this.collapsibleContent.append(button);
    }
    _createOngoingProjectsCounter() {
        let div = document.createElement('div');
        div.classList.add(
            'absolute',
            'flex',
            'top-0',
            'right-0',
            '-mt-4',
            '-mr-4',
            'px-2',
            'bg-red-500',
            'rounded-full'
        );
        div.id = 'navbar-on-going-projects-counter';

        let span = document.createElement('span');
        span.classList.add('text-xs', 'lato-regular');
        span.textContent = '3000';

        div.append(span);

        return div;
    }
}

/**
 * The class creates a typical table for all the tables in the Client Admin
 */
export class TypicalTable {
    constructor(columnNameList, tableId) {
        this.columnNameList = columnNameList;
        this.tableId = tableId;

        // Create the table
        this.result = document.createElement('table');
        this.result.id = this.tableId;
        this.result.classList.add('table', 'mx-auto');

        this.createTableHead();
        this.createTableBody();
    }

    createTableHead() {
        let head = document.createElement('thead');
        head.id = this.tableId + '-head';
        head.classList.add('flex', 'w-full');

        let tr = document.createElement('tr');
        tr.classList.add('table-row', 'flex', 'w-full');
        tr.id = this.tableId + '-head-row';

        this.columnNameList.map((item, index) => {
            let th = document.createElement('th');
            th.classList.add(
                'group',
                'table-cell',
                'border',
                'border-black',
                'py-5',
                'relative'
            );

            let span = document.createElement('span');
            span.textContent = item;
            // th.textContent = item;

            let button = this._createSortButton(
                this.tableId + '-sort-button-col-' + index.toFixed(0)
            );
            th.append(span, button);

            tr.append(th);
        });

        head.append(tr);
        this.result.append(head);
    }

    createTableBody() {
        let body = document.createElement('tbody');
        body.id = this.tableId + '-body';
        body.classList.add('flex', 'flex-col', 'w-full');
        this.result.append(body);
    }

    _createSortButton(desiredButtonId) {
        let button = document.createElement('button');
        button.type = 'button';
        button.classList.add(
            'opacity-0',
            'absolute',
            'my-auto',
            'right-2',
            'text-gray-500',
            'group-hover:opacity-100'
        );
        button.id = desiredButtonId;

        let icon = document.createElement('icon');
        icon.classList.add('fas', 'fa-exchange-alt', 'transform', 'rotate-90');

        button.append(icon);
        return button;
    }
}

/**
 * The class creates a Revenue table row with 13 columns. The first column has the
 * year and the others have the revenue for the 12 months
 */
export class RevenueTableRow {
    constructor(year, yearData) {
        this.year = year;
        this.yearData = yearData;
        this.result = document.createElement('tr');

        let yearMapping = {
            1: 'January',
            2: 'February',
            3: 'March',
            4: 'April',
            5: 'May',
            6: 'June',
            7: 'July',
            8: 'August',
            9: 'September',
            10: 'October',
            11: 'November',
            12: 'December',
        };

        this.result.append(this.createYearCell(this.year));
        Object.keys(this.yearData).map((item, index) => {
            let tableCell = this.createTableCell(this.yearData[item]);
            tableCell.setAttribute('table-body-col', index.toFixed(0));
            this.result.append(tableCell);
        });
    }

    createTableCell(cellText) {
        let td = document.createElement('td');
        td.textContent = '$' + cellText;
        td.classList.add(
            // 'block',
            // 'flex',
            // 'w-32',
            'w-32',
            'table-cell',
            'text-center',
            'text-base',
            'align-center',
            'py-5',
            'border',
            'border-black'
        );

        return td;
    }

    createYearCell(cellText) {
        let td = document.createElement('td');
        td.textContent = cellText;
        td.classList.add(
            // 'block',
            // 'flex',
            'w-92p',
            'table-cell',
            'lato-bold',
            'text-center',
            'align-center',
            'py-5',
            'border',
            'border-black',
            'bg-gray-300'
        );

        return td;
    }
}

/**
 * The function makes a HTTP request to the backend to obtain the monthly revenue
 * dict and returns a promise with the Revenue Table Row for each year of data
 * available
 * @returns Promise with the table Revenue Rows
 */
export function _obtainRevenueDict(needRaw = false) {
    return new Promise((resolve) => {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let response = this.response;
                let responseJson = JSON.parse(response);

                if (needRaw) {
                    resolve(responseJson);
                } else {
                    let tableRevenueRow = {};
                    Object.keys(responseJson).map((item) => {
                        tableRevenueRow[item] = new RevenueTableRow(
                            item,
                            responseJson[item]
                        ).result;
                    });
                    resolve(tableRevenueRow);
                }
            }
        };
        xhttp.open('GET', '/client-admin/obtain-revenue-dict');
        xhttp.send();
    });
}

/**
 * The function creates a revenue table utilizing the TypicalTable class and makes
 * changes to some classes associated with it. It also populates the revenue data
 * obtain from the backend and returns a table revenue HTML element
 * @returns Revenue Table i.e. HTMLTableElement
 */
export function createRevenueTable() {
    function sortTable() {
        let tableBody = revenueTable.querySelector('tbody');
        if (tableBody.classList.contains('flex-col')) {
            tableBody.classList.replace('flex-col', 'flex-col-reverse');
        } else if (tableBody.classList.contains('flex-col-reverse')) {
            tableBody.classList.replace('flex-col-reverse', 'flex-col');
        }
    }

    // Revenue Table
    let monthsList = [
        'Year',
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
        'Total'
    ];
    let revenueTable = new TypicalTable(monthsList, 'revenue-table').result;
    revenueTable.classList.add('w-11/12', 'mx-auto', 'mb-16', 'table-fixed');

    // All Table Head Cells
    let tableHeadCells = revenueTable
        .querySelector('#revenue-table-head')
        .querySelectorAll('th');
    tableHeadCells.forEach(function (item, number) {
        item.classList.add('lato-bold');
        if (number === 0) {
            item.classList.add('bg-gray-300', 'w-92p');
        } else {
            item.classList.add('w-125p');
        }
    });

    _obtainRevenueDict().then((data) => {
        let tableBody = revenueTable.querySelector('#revenue-table-body');
        Object.keys(data).map((item) => {
            tableBody.append(data[item]);
        });
    });

    // Remove all the table sort buttons except for the year
    let columnSortButtons = revenueTable
        .querySelector('#revenue-table-head')
        .querySelectorAll('[id^="revenue-table-sort-button-col-"]');
    columnSortButtons.forEach((item, key) => {
        if (key !== 0) {
            item.remove();
        } else {
            item.addEventListener('click', sortTable);
        }
    });

    return revenueTable;
}

/**
 * The function calls the backend for obtaining all the projects that are stored
 * in the database
 * @returns A Promise with the responseJson with all the projects obtained
 */
export function _obtainProjects() {
    return new Promise((resolve) => {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let response = this.response;
                let responseJson = JSON.parse(response);

                // Add Posix time to the fields structure
                Object.keys(responseJson).map((item) => {
                    // Un null any fields
                    Object.keys(responseJson[item].fields).map((field) => {
                        if (responseJson[item].fields[field] === null) {
                            responseJson[item].fields[field] = '';
                        }
                    });

                    responseJson[item].fields['project_deadline_posix'] =
                        Date.parse(responseJson[item].fields.project_deadline);

                    responseJson[item].fields['project_deadline_full'] =
                        new Date(
                            responseJson[item].fields.project_deadline_posix
                        )
                            .toDateString()
                            .substring(4);
                    responseJson[item].fields['paymentsObject'] = JSON.parse(
                        responseJson[item].fields.payments
                    );

                    // Get sum of all payments
                    let sum = 0;
                    Object.keys(responseJson[item].fields.paymentsObject).map(
                        (payment) => {
                            sum +=
                                responseJson[item].fields.paymentsObject[
                                    payment
                                ].fields.amount;
                        }
                    );
                    responseJson[item].fields['paymentSum'] = sum;
                });
                resolve(responseJson);
            }
        };
        xhttp.open('GET', '/client-admin/obtain-projects');
        xhttp.send();
    });
}

// export function _obtainPaymentsForProject(slug) {
//     return new Promise((resolve) => {
//         let xhttp = new XMLHttpRequest();
//         xhttp.onreadystatechange = () => {
//             if (xhttp.readyState === 4 && xhttp.status === 200) {
//                 let responseText = xhttp.responseText;
//                 let responseTextJson = JSON.parse(responseText);

//                 resolve(responseTextJson);
//             }
//         };

//         xhttp.open('GET', '/client-admin/obtain-payments-for-project');
//         xhttp.setRequestHeader('slug', slug);
//         xhttp.send();
//     });
// }

/**
 * The class represents a Project Table Row that is part of the Project Table
 */
export class ProjectTableRow {
    constructor(projectRowObject) {
        this.projectRowObject = projectRowObject;
        this.result = document.createElement('tr');
        this.result.classList.add(
            'flex',
            'flex-row',
            'lato-regular',
            'border-b',
            'border-black'
        );
        this.result.id = this.projectRowObject.slug;

        this.markProjectCompleteButton = this._createActionButtons(
            this.projectRowObject.slug + '-project-status',
            ['fas', 'fa-check-circle', 'fa-lg']
        );
        this.markProjectCompleteButton.onclick = () => {
            this.markProjectCompleteOrInvoiceSent('mark-project-complete');
        };

        this.editRowButton = this._createActionButtons(
            this.projectRowObject.slug + '-edit-row',
            ['far', 'fa-edit', 'fa-lg']
        );
        this.editRowButton.onclick = () => {
            let projectDetailsObject = {
                slug: this.projectRowObject.slug,
                client_name: this.projectRowObject.client_name,
                client_company: this.projectRowObject.client_company,
                client_email: this.projectRowObject.client_email,
                project_name: this.projectRowObject.project_name,
                project_type: this.projectRowObject.project_type,
                project_deadline: this.projectRowObject.project_deadline,
                project_assigned_to: this.projectRowObject.project_assigned_to,
                expected_revenue: this.projectRowObject.expected_revenue,
            };

            let editProjectModal = new EditProjectModal(projectDetailsObject);
            let editProjectModalResult = editProjectModal.result;
            editProjectModalResult.id = this.result.id + '-edit-project-modal';

            document.getElementById('app').append(editProjectModalResult);
            editProjectModal._showModal();

            editProjectModal.submitButton.onclick = () => {
                let form = editProjectModalResult.querySelector(
                    'form[id="edit-project-form"]'
                );
                let formData = new FormData(form);

                let csrftoken = document.getElementsByName(
                    'csrfmiddlewaretoken'
                )[0].value;

                let xhttp = new XMLHttpRequest();
                xhttp.onload = () => {
                    this.updateProject(xhttp.response);
                    editProjectModal._closeModal();
                };
                xhttp.open('POST', '/client-admin/save-edit-project-form');
                xhttp.setRequestHeader('X-CSRFToken', csrftoken);
                xhttp.send(formData);
            };
        };

        this.addPaymentButton = this._createActionButtons(
            this.projectRowObject.slug + '-add-payment',
            ['far', 'fa-money-bill-alt', 'fa-lg']
        );
        this.addPaymentButton.onclick = () => {
            let paymentModal = new AddPaymentModal();
            let paymentModalResult = paymentModal.result;
            paymentModalResult.id = this.result.id + '-payment-modal';

            document.getElementById('app').append(paymentModalResult);
            paymentModal._showModal();

            paymentModal.submitButton.onclick = () => {
                let input = paymentModalResult.querySelector(
                    'input[type="number"]'
                );
                let csrftoken = document.getElementsByName(
                    'csrfmiddlewaretoken'
                )[0].value;
                let packetToBeSent = {
                    _elementId: this.result.id,
                    dollarValue: input.value,
                };

                let xhttp = new XMLHttpRequest();
                xhttp.onload = () => {
                    this.updatePaymentCell(xhttp.response);
                    paymentModal._closeModal();
                };
                xhttp.open('POST', '/client-admin/add-payment-modal');
                xhttp.setRequestHeader('X-CSRFToken', csrftoken);
                xhttp.setRequestHeader(
                    'Content-Type',
                    'application/json; charset=UTF-8'
                );
                xhttp.send(JSON.stringify(packetToBeSent));
            };
        };

        this.markInvoiceSentButton = this._createActionButtons(
            this.projectRowObject.slug + '-invoice-status',
            ['fas', 'fa-scroll', 'fa-lg']
        );
        this.markInvoiceSentButton.onclick = () => {
            this.markProjectCompleteOrInvoiceSent('mark-invoice-sent');
        };

        this.paymentsArray = this.projectRowObject.paymentsObject;

        // Create Cells
        this.createClientInfoCell();
        // this.createTableCell(this.projectRowObject.client_name);
        // this.createTableCell(this.projectRowObject.client_company);
        // this.createTableCell(this.projectRowObject.client_email, 'text-xs');
        this.createTableCell(this.projectRowObject.project_name);
        this.createTableCell(
            PROJECT_TYPE_CHOICES[this.projectRowObject.project_type]
        );
        this.createTableCell(this.projectRowObject.project_deadline_full);
        this.createTableCell(this.projectRowObject.project_assigned_to);
        this.createTableCell('$' + this.projectRowObject.expected_revenue);

        // this.createTableCell('Payments');
        this.createPaymentsCell();
        this.createActionsCell();
    }

    createTableCell(cellText, textClass = 'text-sm', last = false) {
        let td = document.createElement('td');
        // td.textContent = cellText;
        td.classList.add(
            'flex',
            'w-44',
            'table-cell',
            'text-center',
            // 'self-center',
            'py-5',
            'border-l',
            'border-black'
        );
        td.classList.add(textClass);

        if (last) {
            td.classList.add('border-r');
        }

        let span = document.createElement('span');
        span.textContent = cellText;
        span.classList.add('flex', 'justify-center', 'items-center', 'h-full');

        td.append(span);

        this.result.append(td);
    }

    createClientInfoCell() {
        let td = document.createElement('td');
        td.classList.add(
            'flex',
            'w-60',
            'table-cell',
            'text-center',
            // 'self-center',
            'py-5',
            'border-l',
            'border-black',
            'relative',
            'group'
        );

        let container = this._createClientInfoInnerContainer();
        let sumContainer = this._createClientInfoMask();
        td.append(container, sumContainer);
        this.result.append(td);
    }

    _createClientInfoInnerContainer() {
        let container = document.createElement('div');
        container.classList.add(
            'flex',
            'flex-col',
            'h-full',
            'my-auto',
            'gap-2',
            'justify-center'
        );
        let span = document.createElement('span');
        span.textContent = this.projectRowObject.client_name;
        span.classList.add('flex', 'justify-center', 'items-center', 'h-full');

        container.append(span);
        return container;
    }

    _createClientInfoMask(sumValue) {
        let container = document.createElement('div');
        container.classList.add(
            'flex',
            'flex-col',
            'h-full',
            'w-full',
            'justify-center',
            'items-center',
            'lato-bold',
            'text-xs',
            'top-0',
            'left-0',
            'absolute',
            'bg-black',
            'text-white',
            'opacity-0',
            'group-hover:opacity-90'
        );

        let clientCoSpan = document.createElement('span');
        clientCoSpan.textContent = this.projectRowObject.client_company;

        let clientEmailSpan = document.createElement('span');
        clientEmailSpan.textContent = this.projectRowObject.client_email;

        container.append(clientCoSpan, clientEmailSpan);
        return container;
    }

    createPaymentsCell() {
        let td = document.createElement('td');
        td.classList.add(
            'flex',
            'w-44',
            'table-cell',
            'text-center',
            // 'self-center',
            'py-5',
            'border-l',
            'border-black',
            'relative',
            'group'
        );

        let container = this._createPaymentCellInnerContainer(
            this.paymentsArray
        );

        let sumContainer = this._createPaymentCellSumContainer(
            this.projectRowObject.paymentSum
        );

        td.append(container, sumContainer);
        this.result.append(td);
    }

    createActionsCell() {
        let td = document.createElement('td');
        td.classList.add(
            'flex',
            'w-44',
            'table-cell',
            'text-center',
            // 'self-center',
            // 'py-5',
            'border-l',
            'border-r',
            'border-black'
        );

        let container = document.createElement('div');
        container.classList.add(
            'flex',
            'flex-row',
            'h-full',
            'my-auto',
            'gap-3',
            'justify-center'
        );

        this.editRowButton.append(this._createTooltip('Edit Row'));

        this.markProjectCompleteButton.append(
            this._createTooltip('Mark Project Complete')
        );
        let a = this.projectRowObject.is_project_complete
            ? this.markProjectCompleteButton.classList.add('text-green-500')
            : this.markProjectCompleteButton.classList.add('text-gray-500');

        this.addPaymentButton.append(this._createTooltip('Add Payment'));
        this.addPaymentButton.classList.add('text-blue-600');

        this.markInvoiceSentButton.append(
            this._createTooltip('Mark Invoice Sent')
        );
        let b = this.projectRowObject.is_invoice_sent
            ? this.markInvoiceSentButton.classList.add('text-pink-600')
            : this.markInvoiceSentButton.classList.add('text-gray-500');

        container.append(
            this.editRowButton,
            this.markProjectCompleteButton,
            this.addPaymentButton,
            this.markInvoiceSentButton
        );

        td.append(container);
        this.result.append(td);
    }

    _createPaymentCellInnerContainer(paymentsArray) {
        let container = document.createElement('div');
        container.classList.add(
            'flex',
            'flex-col',
            'h-full',
            'my-auto',
            'gap-2',
            'justify-center'
        );

        paymentsArray.map((item, index) => {
            let dollarAndDateCont = document.createElement('div');
            dollarAndDateCont.classList.add('flex', 'flex-col');

            let dollarSpan = document.createElement('span');
            dollarSpan.classList.add('lato-regular', 'text-sm');
            dollarSpan.textContent = '$' + item.fields.amount.toFixed(0);

            let dateSpan = document.createElement('span');
            dateSpan.classList.add('lato-light', 'text-xs');
            dateSpan.textContent = item.fields.payment_date;

            dollarAndDateCont.append(dollarSpan, dateSpan);

            container.append(dollarAndDateCont);
        });

        return container;
    }

    _createPaymentCellSumContainer(sumValue) {
        let sumContainer = document.createElement('div');
        sumContainer.classList.add(
            'flex',
            'h-full',
            'w-full',
            'justify-center',
            'items-center',
            'lato-bold',
            'text-xl',
            'top-0',
            'left-0',
            'absolute',
            'bg-black',
            'text-white',
            'opacity-0',
            'group-hover:opacity-90'
        );
        sumContainer.textContent = '$' + sumValue.toFixed(2);

        return sumContainer;
    }

    _createActionButtons(desiredId, iconClasses) {
        let button = document.createElement('button');
        button.id = desiredId;
        button.classList.add('relative', 'group');
        let icon = document.createElement('i');

        iconClasses.map((item) => {
            icon.classList.add(item);
        });
        button.append(icon);

        return button;
    }

    _createTooltip(desiredText) {
        let container = document.createElement('div');
        container.classList.add(
            'flex',
            'w-max',
            'px-3',
            'absolute',
            // '-top-6',
            '-right-6',
            'bg-innoblack',
            'text-white',
            'text-center',
            'lato-regular',
            'opacity-0',
            'group-hover:opacity-80'
        );
        let span = document.createElement('span');
        // span.classList.add('flex-nowrap');
        span.textContent = desiredText;

        container.append(span);
        return container;
    }

    markProjectCompleteOrInvoiceSent(link) {
        let csrftoken = document.getElementsByName('csrfmiddlewaretoken')[0]
            .value;
        let packetToBeSent = {
            _elementId: this.result.id,
        };

        let xhttp = new XMLHttpRequest();
        xhttp.onload = (data) => {
            if (xhttp.responseText === 'Success') {
                if (link === 'mark-project-complete') {
                    this.markProjectCompleteButton.classList.replace(
                        'text-gray-500',
                        'text-green-500'
                    );
                }

                if (link === 'mark-invoice-sent') {
                    this.markInvoiceSentButton.classList.replace(
                        'text-gray-500',
                        'text-pink-600'
                    );
                }
            }
        };
        xhttp.open('POST', '/client-admin/' + link);
        xhttp.setRequestHeader('X-CSRFToken', csrftoken);
        xhttp.setRequestHeader(
            'Content-Type',
            'application/json; charset=UTF-8'
        );
        xhttp.send(JSON.stringify(packetToBeSent));
    }

    updatePaymentCell(xhttpResponse) {
        let paymentCell = this.result.querySelectorAll('td')[7];
        paymentCell.innerHTML = '';

        let responseJson = JSON.parse(xhttpResponse);
        let paymentJson = JSON.parse(responseJson.payments_serialize);

        let sumValue = 0;
        Object.keys(paymentJson).map((item) => {
            sumValue += paymentJson[item].fields.amount;
        });

        let container = this._createPaymentCellInnerContainer(paymentJson);
        let sumContainer = this._createPaymentCellSumContainer(sumValue);

        paymentCell.append(container, sumContainer);
    }

    updateProject(xhttpResponse) {
        let responseJson = JSON.parse(xhttpResponse);
        let projectJson = JSON.parse(responseJson.project_qs_serialized);

        let clientNameCell = this.result.querySelectorAll('td')[0];
        let clientCompanyCell = this.result.querySelectorAll('td')[1];
        let clientEmailCell = this.result.querySelectorAll('td')[2];
        let projectNameCell = this.result.querySelectorAll('td')[3];
        let projectTypeCell = this.result.querySelectorAll('td')[4];
        let projectDeadlineCell = this.result.querySelectorAll('td')[5];
        let expectedRevenueCell = this.result.querySelectorAll('td')[6];

        clientNameCell.querySelector('span').textContent =
            projectJson[0].fields.client_name;
        clientCompanyCell.querySelector('span').textContent =
            projectJson[0].fields.client_company;
        clientEmailCell.querySelector('span').textContent =
            projectJson[0].fields.client_email;
        projectNameCell.querySelector('span').textContent =
            projectJson[0].fields.project_name;
        projectTypeCell.querySelector('span').textContent =
            PROJECT_TYPE_CHOICES[projectJson[0].fields.project_type];
        projectDeadlineCell.querySelector('span').textContent = new Date(
            projectJson[0].fields.project_deadline
        )
            .toDateString()
            .substring(4);
        expectedRevenueCell.querySelector('span').textContent =
            '$' + projectJson[0].fields.expected_revenue.toFixed(0);
    }
}

/**
 * The class represents a Project Table that will be displayed for all projects
 * and on-going projects
 */
export class ProjectTable extends TypicalTable {
    constructor(columnHeads, tableIdPrepend) {
        super(columnHeads, tableIdPrepend);

        this.projectsObject = {};
        this.projectsObjectColumnSorted = {};

        this.pageNumber = 1;
        this.totalPages = 1;
        this.recordsPerPage = 10;
        this.columnSorted = false;

        // Search input element
        this.searchInputElement = Object.assign(
            document.createElement('input'),
            {
                type: 'text',
                name: this.tableId + '-search',
                id: this.tableId + '-search',
            }
        );
        this.searchInputElement.onkeyup = (event) => {
            this._searchInstances(event);
        };

        // Table counter (bottom of the table)
        this.counter = new ComponentServices.HeadingOrParagraph(
            'h6',
            '1 - 10 of 0'
        ).renderWithClass(['mr-auto']).result;
        this.counter.id = this.tableId + '-counter-info';

        // Table pagination buttons (previous button)
        this.prevButton = this._createPrevNextButtons('left');
        this.prevButton.id = this.tableId + '-prev-page';
        this.prevButton.onclick = () => {
            this._prevPage();
        };

        // Table pagination buttons (next button)
        this.nextButton = this._createPrevNextButtons('right');
        this.nextButton.id = this.tableId + '-next-page';
        this.nextButton.onclick = () => {
            this._nextPage();
        };

        // Modifying the table container to fit needs
        this.tableContainer = document.createElement('div');
        this.tableContainer.classList.add('w-11/12', 'mx-auto', 'my-12');

        this.createSearch();
        this._modifyTableHeadClasses();
        this._removeSortButtonsFromTableHead();
        this.tableContainer.append(this.result);
        this.createCounterAndButtonsRow();
        this.obtainProjectsObject();

        // Sorting buttons click
        this._arrangeWithColumnSortButtons();
    }

    createSearch() {
        let searchTextInput = new ComponentServices.TextInputWithLabel(
            'Search',
            this.searchInputElement
        ).render().result;
        searchTextInput.className = '';
        searchTextInput.classList.add(
            'flex',
            'flex-row',
            'gap-2',
            'lato-regular',
            'w-60',
            'ml-auto',
            'mb-6'
        );
        searchTextInput.querySelector('span').classList.add('my-auto');

        this.tableContainer.append(searchTextInput);
    }

    createCounterAndButtonsRow() {
        let row = document.createElement('div');
        row.classList.add('flex', 'flex-row', 'mt-6');

        let prevNextButtonContainer = document.createElement('div');
        prevNextButtonContainer.classList.add('ml-auto');
        prevNextButtonContainer.append(this.prevButton, this.nextButton);

        row.append(this.counter, prevNextButtonContainer);

        this.tableContainer.append(row);
    }

    obtainProjectsObject() {
        _obtainProjects().then((response) => {
            this.projectsObject = response;

            // Initial populate of the table
            this.populateProjects(this.projectsObject);
        });
    }

    populateProjects(projectsObject) {
        let tableBody = this.result.querySelector('#' + this.tableId + '-body');
        tableBody.innerHTML = '';

        let lowNumber = this.recordsPerPage * (this.pageNumber - 1);
        let highNumber = this.recordsPerPage * this.pageNumber;

        let responseLength = Object.keys(projectsObject).length;
        this.counter.textContent =
            (lowNumber + 1).toFixed(0) +
            ' - ' +
            highNumber.toFixed(0) +
            ' of ' +
            responseLength.toFixed(0);
        this.totalPages = Math.ceil(responseLength / this.recordsPerPage);

        Object.keys(projectsObject).map((item, index) => {
            let projectRowObject = projectsObject[item].fields;
            let projectRow = new ProjectTableRow(projectRowObject).result;
            // projectRow.querySelector('td').textContent = (index + 1).toFixed(0);

            if (
                index >= this.recordsPerPage * this.pageNumber ||
                index < this.recordsPerPage * (this.pageNumber - 1)
            ) {
                projectRow.classList.add('hidden');
            }

            let tableBody = this.result.querySelector(
                '#' + this.tableId + '-body'
            );
            tableBody.append(projectRow);
        });

        this._disablePrevButton();
        this._disableNextButton();
    }

    _createPrevNextButtons(direction) {
        let button = document.createElement('button');
        button.type = 'button';
        button.classList.add('group', 'p-3', 'disabled:text-gray-300');
        let icon = document.createElement('i');
        button.append(icon);

        if (direction === 'left') {
            button.classList.add('mr-3');
            icon.classList.add('fas', 'fa-chevron-left');
        } else if (direction === 'right') {
            button.classList.add('ml-3');
            icon.classList.add('fas', 'fa-chevron-right');
        }

        return button;
    }

    _modifyTableHeadClasses() {
        let allTableHeads = this.result
            .querySelector('#' + this.tableId + '-head')
            .querySelectorAll('th');
        allTableHeads.forEach((item, index) => {
            if (index === 0) {
                item.classList.add('w-60', 'lato-bold', 'bg-gray-300');
            } else {
                item.classList.add('w-44', 'lato-bold', 'bg-gray-300');
            }
        });
    }

    _removeSortButtonsFromTableHead() {
        let allSortButtons = this.result
            .querySelector('#' + this.tableId + '-head')
            .querySelectorAll('[id^="' + this.tableId + '-sort-button-col-"]');
        allSortButtons.forEach((item, index) => {
            // let indexToRemove = [0, 1, 2, 3, 4, 8];
            let indexToRemove = [0, 1, 2, 6];
            if (indexToRemove.includes(index)) {
                item.remove();
            }
        });
    }

    _disablePrevButton() {
        if (this.pageNumber === 1) {
            this.prevButton.disabled = true;
        } else {
            this.prevButton.disabled = false;
        }
    }
    _disableNextButton() {
        if (this.pageNumber === this.totalPages) {
            this.nextButton.disabled = true;
        } else {
            this.nextButton.disabled = false;
        }
    }

    _prevPage() {
        if (this.pageNumber > 1) {
            this.pageNumber -= 1;
            if (this.columnSorted) {
                this.populateProjects(this.projectsObjectColumnSorted);
            } else {
                this.populateProjects(this.projectsObject);
            }
        }
    }
    _nextPage() {
        if (this.pageNumber < this.totalPages) {
            this.pageNumber += 1;
            if (this.columnSorted) {
                this.populateProjects(this.projectsObjectColumnSorted);
            } else {
                this.populateProjects(this.projectsObject);
            }
        }
    }

    _arrangeWithColumnSortButtons() {
        let sortButtons = this.result.querySelectorAll(
            '[id^="' + this.tableId + '-sort-button-col-"]'
        );
        sortButtons.forEach((element, key) => {
            let click = 0;
            element.onclick = () => {
                let field;
                if (element.id.includes('4')) {
                    field = 'expected_revenue';
                } else if (element.id.includes('3')) {
                    field = 'project_deadline_posix';
                } else if (element.id.includes('5')) {
                    field = 'paymentSum';
                }

                this.projectsObjectColumnSorted = this.projectsObject.slice(0);
                if (click === 0) {
                    this.columnSorted = true;

                    this.projectsObjectColumnSorted.sort((a, b) => {
                        return a.fields[field] - b.fields[field];
                    });
                    this.populateProjects(this.projectsObjectColumnSorted);
                    click += 1;
                } else if (click === 1) {
                    this.columnSorted = true;

                    this.projectsObjectColumnSorted.sort((a, b) => {
                        return b.fields[field] - a.fields[field];
                    });
                    this.populateProjects(this.projectsObjectColumnSorted);
                    click += 1;
                } else if (click === 2) {
                    this.columnSorted = false;
                    click = 0;

                    this.populateProjects(this.projectsObject);
                }
            };
        });
    }

    _searchInstances(event) {
        let searchString = event.target.value;

        let lowerSearchString = searchString.toLowerCase();
        if (lowerSearchString.trim() !== '') {
            let filteredProjectsObject = this.projectsObject.filter((value) => {
                return (
                    value.fields.client_name
                        .toLowerCase()
                        .includes(lowerSearchString) ||
                    value.fields.client_company
                        .toLowerCase()
                        .includes(lowerSearchString) ||
                    value.fields.client_email
                        .toLowerCase()
                        .includes(lowerSearchString) ||
                    value.fields.project_name
                        .toLowerCase()
                        .includes(lowerSearchString) ||
                    value.fields.project_assigned_to
                        .toLowerCase()
                        .includes(lowerSearchString)
                );
            });

            this.populateProjects(filteredProjectsObject);
        } else {
            this.populateProjects(this.projectsObject);
        }
    }
}

/**
 * The class inherits from the project table class to filter out only those
 * projects that have not been completed
 */
export class OngoingProjectTable extends ProjectTable {
    constructor(columnHeads, tableIdPrepend) {
        super(columnHeads, tableIdPrepend);
    }

    updateOnGoingProjectsCounter(numberOfProjects) {
        let ongoingProjectsCounter = document.getElementById(
            'navbar-on-going-projects-counter'
        );
        ongoingProjectsCounter.querySelector('span').textContent =
            numberOfProjects.toFixed(0);
    }

    obtainProjectsObject() {
        _obtainProjects().then((response) => {
            let filteredResposne = response.filter((value) => {
                return value.fields.is_project_complete === false;
            });
            this.projectsObject = filteredResposne;

            // Initial populate of the table
            this.populateProjects(this.projectsObject);
            this.updateOnGoingProjectsCounter(
                Object.keys(this.projectsObject).length
            );
        });
    }
}

/**
 * The class represents a typical modal structure without the content of the modal
 * Subsequent classes will be created for the content
 */
export class TypicalModal {
    constructor() {
        this.result = document.createElement('div');
        let resultAttributes = {
            'aria-labelledby': 'modal-title',
            role: 'dialog',
            'aria-modal': 'true',
        };

        Object.keys(resultAttributes).map((item) => {
            this.result.setAttribute(item, resultAttributes[item]);
        });
        this.result.classList.add(
            'fixed',
            'z-10',
            'inset-0',
            'overflow-y-auto',
            'hidden'
        );
        this.mainDiv = document.createElement('div');
        this.backgroundOverlayDiv = document.createElement('div');
        this.mainContentDiv = document.createElement('div');
        this.modalContentDiv = document.createElement('div');
        this.createMainDiv();

        // Hide the modal when escape is pressed
        document.onkeyup = (event) => {
            if (event.key === 'Escape' || event.keyCocde === 27) {
                this._closeModal();
            }
        };
    }

    createMainDiv() {
        this.mainDiv.classList.add(
            'flex',
            'items-end',
            'justify-center',
            'min-h-screen',
            'pt-4',
            'px-4',
            'pb-20',
            'text-center',
            'sm:block',
            'sm:p-0'
        );

        this.createBackgroundOverlay();
        this.createContentDiv();
        this.mainDiv.append(
            this.backgroundOverlayDiv,
            this.createSpanToTrickBrowser(),
            this.mainContentDiv
        );
        this.result.append(this.mainDiv);
    }

    createBackgroundOverlay() {
        this.backgroundOverlayDiv.classList.add(
            'fixed',
            'inset-0',
            'bg-gray-500',
            'bg-opacity-75',
            'transition-opacity',
            'ease-out',
            'duration-300',
            'opacity-0'
        );
        this.backgroundOverlayDiv.setAttribute('aria-hidden', 'true');
    }

    createSpanToTrickBrowser() {
        let span = document.createElement('span');
        span.classList.add(
            'hidden',
            'sm:inline-block',
            'sm:align-middle',
            'sm:h-screen'
        );
        span.setAttribute('aria-hidden', 'true');
        span.innerHTML = '&#8203;';
        return span;
    }

    createContentDiv() {
        this.mainContentDiv.classList.add(
            'inline-block',
            'align-bottom',
            'bg-white',
            'rounded-lg',
            'text-left',
            'overflow-hidden',
            'shadow-xl',
            'transform',
            'transition-all',
            'sm:my-8',
            'sm:align-middle',
            'sm:max-w-lg',
            'sm:w-full',
            'ease-out',
            'duration-300',
            'opacity-0',
            'translate-y-4',
            'sm:translate-y-0',
            'sm:scale-95'
        );

        this.createModalContent();
        this.mainContentDiv.append(this.modalContentDiv);
    }

    createModalContent() {
        this.modalContentDiv.classList.add(
            'bg-white',
            'px-4',
            'pt-5',
            'pb-4',
            'sm:p-6',
            'sm:pb-4'
        );
    }

    _showModal() {
        this.__replaceEaseAndDurationClasses(this.backgroundOverlayDiv, 'show');
        this.__replaceEaseAndDurationClasses(this.mainContentDiv, 'show');

        this.result.classList.toggle('hidden');
        setTimeout(() => {
            this.backgroundOverlayDiv.classList.replace(
                'opacity-0',
                'opacity-100'
            );

            this.mainContentDiv.classList.remove(
                'opacity-0',
                'translate-y-4',
                'sm:translate-y-0',
                'sm:scale-95'
            );
            this.mainContentDiv.classList.add(
                'opacity-100',
                'translate-y-0',
                'sm:scale-100'
            );
        }, 100);
    }

    _closeModal() {
        this.__replaceEaseAndDurationClasses(
            this.backgroundOverlayDiv,
            'close'
        );
        this.__replaceEaseAndDurationClasses(this.mainContentDiv, 'close');

        setTimeout(() => {
            this.backgroundOverlayDiv.classList.replace(
                'opacity-100',
                'opacity-0'
            );

            this.mainContentDiv.classList.remove(
                'opacity-100',
                'translate-y-0',
                'sm:scale-100'
            );
            this.mainContentDiv.classList.add(
                'opacity-0',
                'translate-y-4',
                'sm:translate-y-0',
                'sm:scale-95'
            );
        }, 100);

        setTimeout(() => {
            this.result.classList.toggle('hidden');
        }, 800);
        setTimeout(() => {
            this.result.remove();
        }, 1000);
    }

    __replaceEaseAndDurationClasses(element, state) {
        if (state === 'close') {
            element.classList.replace('ease-out', 'ease-in');
            element.classList.replace('duration-300', 'duration-200');
        } else if (state === 'show') {
            element.classList.replace('ease-in', 'ease-out');
            element.classList.replace('duration-200', 'duration-300');
        }
    }
}

/**
 * The class represents a modal for adding payments for a particular project.
 * This inherits from the Typical Modal
 */
export class AddPaymentModal extends TypicalModal {
    constructor() {
        super();
        this.submitButton = new ComponentServices.TypicalFormSubmitButton(
            'Submit'
        ).result;
        this.createPaymentModalContent();
    }

    createPaymentModalContent() {
        let flex = document.createElement('div');
        flex.classList.add('sm:flex', 'sm:items-start', 'sm:flex-col');

        let heading = new ComponentServices.HeadingOrParagraph(
            'h6',
            'Add Payment'
        ).renderWithClass(['mx-auto', 'text-center']).result;
        let hr = Object.assign(document.createElement('hr'), {
            classList: 'mt-4 mb-4 w-full hr-bold hr-light mx-auto',
        });
        let paymentInputWithLabel = this._createPaymentInputWithLabel();
        this._createSubmitButton();

        flex.append(heading, hr, paymentInputWithLabel, this.submitButton);
        this.modalContentDiv.append(flex);
    }

    _createPaymentInputWithLabel() {
        let paymentInput = Object.assign(document.createElement('input'), {
            type: 'number',
            min: '0',
            max: '1000000',
            value: '0',
        });
        let paymentInputWithLabel = new ComponentServices.TextInputWithLabel(
            'Payment Amount:',
            paymentInput
        ).render().result;
        paymentInputWithLabel.classList.add('w-full');

        return paymentInputWithLabel;
    }

    _createSubmitButton() {
        this.submitButton.type = 'button';
        this.submitButton.classList.replace('md:text-lg', 'md:text-base');
        this.submitButton.classList.replace('md:py-3', 'md:py-2');
        this.submitButton.classList.add('mt-5');
    }
}

/**
 * The class represents the edit project modal that inherits from Typical Modal
 * and contains a form that can be filled out to update the project
 */
export class EditProjectModal extends TypicalModal {
    constructor(projectDetailsObject) {
        super();

        this.projectDetailsObject = projectDetailsObject;
        this.submitButton = new ComponentServices.TypicalFormSubmitButton(
            'Submit'
        ).result;
        this.submitButton.type = 'button';

        this.createEditProjectModalContent();
    }

    addExistingValueToField(form, fieldName) {
        let field = form.querySelector('[name="' + fieldName + '"]');
        field.value = this.projectDetailsObject[fieldName];

        return field;
    }

    createEditProjectModalContent() {
        let flex = document.createElement('div');
        flex.classList.add('sm:flex', 'sm:items-start', 'sm:flex-col');

        let heading = new ComponentServices.HeadingOrParagraph(
            'h6',
            'Edit Project'
        ).renderWithClass(['mx-auto', 'text-center', 'mb-8']).result;

        let editProjectForm = new ComponentServices.TypicalPostForm(
            'edit-project-form'
        ).result;
        editProjectForm.classList.replace('md:w-3/4', 'md:w-10/12');

        let slugInput = Object.assign(document.createElement('input'), {
            name: 'project_slug',
            id: 'edit_project_row_slug',
            value: this.projectDetailsObject.slug,
            type: 'hidden',
        });

        // Obtain form
        RenderServices._obtainForm(
            '/client-admin/obtain-edit-project-form'
        ).then((data) => {
            let form = new DOMParser().parseFromString(data, 'text/html');
            let csrfToken = document.querySelector(
                '[name="csrfmiddlewaretoken"]'
            );
            let name = new ComponentServices.TextInputWithLabel(
                'Client Name*',
                this.addExistingValueToField(form, 'client_name')
            ).render().result;
            let company = new ComponentServices.TextInputWithLabel(
                'Client Company (Optional)',
                this.addExistingValueToField(form, 'client_company')
            ).render().result;
            let email = new ComponentServices.TextInputWithLabel(
                'Client Email (Optional)',
                this.addExistingValueToField(form, 'client_email')
            ).render().result;
            let projectName = new ComponentServices.TextInputWithLabel(
                'Project Name*',
                this.addExistingValueToField(form, 'project_name')
            ).render().result;
            let projectType = new ComponentServices.SelectInputWithLabel(
                'Project Type*',
                this.addExistingValueToField(form, 'project_type')
            ).render().result;
            let projectDeadline = new ComponentServices.TextInputWithLabel(
                'Project Deadline*',
                this.addExistingValueToField(form, 'project_deadline')
            ).render().result;
            let expectedRevenue = new ComponentServices.TextInputWithLabel(
                'Expected Revenue*',
                this.addExistingValueToField(form, 'expected_revenue')
            ).render().result;

            editProjectForm.append(
                slugInput,
                name,
                company,
                email,
                projectName,
                projectType,
                projectDeadline,
                expectedRevenue,
                this.submitButton
            );

            flex.append(heading, editProjectForm);
            this.modalContentDiv.append(flex);
        });
    }
}
