'use strict';

import * as Components from '../static/ClientAdmin/js/components.js';
import * as RenderServices from '../../innoservices/static/innoservices/js/render_ts.js';

describe('Test class ClientAdminNavbar', function () {
    beforeEach(function () {
        // Creating the svg element
        let svgElement = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'svg'
        );
        svgElement.setAttribute('height', '100');
        svgElement.setAttribute('width', '100');
        let rectElement = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'rect'
        );
        rectElement.setAttribute('x', '-0.66');
        rectElement.setAttribute('y', '-0.36');
        rectElement.setAttribute('width', '1025.32');
        rectElement.setAttribute('height', '288.72');
        svgElement.append(rectElement);

        let svgText = svgElement.outerHTML;

        global.fetch = jest.fn(() =>
            Promise.resolve({
                text: () => Promise.resolve(svgText),
            })
        );
    });

    it('Class has the appropriate properties', function () {
        let testOutput = new Components.ClientAdminNavbar();

        expect(testOutput).not.toBeNull();
        let expectedProperties = [
            'result',
            'collapsibleContent',
            'navbarToggle',
            'desiredMainClasses',
            'collapsibleContentClasses',
        ];
        expectedProperties.map((item) => {
            expect(testOutput.hasOwnProperty(item)).toBeTruthy();
        });
    });

    it('Verify that the Navbar main is accurate', async function () {
        let testOutput = new Components.ClientAdminNavbar().render().result;
        expect(testOutput).not.toBeNull();
        expect(testOutput.tagName.toLowerCase()).toBe('nav');

        let expectedClassList = [
            'flex',
            'flex-col',
            'py-6',
            'w-full',
            'm-auto',
            'justify-center',
            'flex-wrap',
            'lato-regular',
            'md:w-4/6',
            '2xl:flex-row',
            '2xl:flex',
            '2xl:w-9/12',
        ];
        expectedClassList.map((item) => {
            expect(testOutput.classList.contains(item)).toBeTruthy();
        });

        // Expect 3 children from the navbar
        expect(testOutput.childNodes.length).toBe(2);
    });

    it('Verify that the first child (the brand) is accurate', function () {
        let testOutput = new Components.ClientAdminNavbar().render().result;
        let brand = testOutput.children[0];

        let expectedBrandClass = [
            'flex',
            'justify-center',
            'flex-shrink-0',
            'items-center',
            'w-4/6',
            'sm:w-full',
            '2xl:w-auto',
            '2xl:justify-start',
        ];
        expectedBrandClass.map((item) => {
            expect(brand.classList.contains(item)).toBeTruthy();
        });
        expect(brand.getAttribute('href')).toBe('/');
    });

    it('Verify that the second child (collapsible content) is accurate', function () {
        let testOutput = new Components.ClientAdminNavbar().render().result;
        let collapsibleContent = testOutput.children[1];

        let expectedClasses = [
            'flex',
            'flex-col',
            'text-right',
            'pr-5',
            'hidden',
            'gap-12',
            'bg-gray-200',
            'sm:flex',
            'sm:flex-row',
            'sm:justify-center',
            'sm:mt-5',
            'sm:bg-white',
            'sm:pr-0',
            '2xl:justify-end',
            '2xl:w-auto',
            '2xl:items-center',
            '2xl:ml-auto',
            '2xl:mt-0',
        ];
        expectedClasses.map((item) => {
            expect(collapsibleContent.classList.contains(item)).toBeTruthy();
        });

        expect(collapsibleContent.childNodes.length).toBe(6);
    });

    it('Verify that the first link in collapsible content is accurate', function () {
        let testOutput = new Components.ClientAdminNavbar().render().result;
        let collapsibleContent = testOutput.children[1];
        let link = collapsibleContent.children[0];

        expect(link).not.toBeNull();
        expect(link.tagName.toLowerCase()).toBe('button');
        expect(link.id).toBe('navbar-home-view');
        expect(link.type).toBe('button');
        let linkClasses = [
            'block',
            'relative',
            'overflow-visible',
            'my-1',
            'cursor-pointer',
            'hover:text-gray-500',
            'sm:text-center',
            '2xl:text-lg',
            '2xl:mt-0',
            '2xl:inline-block',
        ];
        linkClasses.map((item) => {
            expect(link.classList.contains(item)).toBeTruthy();
        });
        expect(link.childNodes.length).toBe(2);
        let icon = link.children[0];
        let span = link.children[1];

        expect(icon.tagName.toLowerCase()).toBe('i');
        let iconClasses = ['fas', 'fa-home', 'text-black', 'mr-3'];
        iconClasses.map((item) => {
            expect(icon.classList.contains(item)).toBeTruthy();
        });

        expect(span.tagName.toLowerCase()).toBe('span');
        expect(span.textContent).toBe('Home View');
    });

    it('Verify that the second link in collapsible content is accurate', function () {
        let testOutput = new Components.ClientAdminNavbar().render().result;
        let collapsibleContent = testOutput.children[1];
        let link = collapsibleContent.children[1];

        expect(link).not.toBeNull();
        expect(link.tagName.toLowerCase()).toBe('button');
        expect(link.id).toBe('navbar-all-projects');
        expect(link.type).toBe('button');
        let linkClasses = [
            'block',
            'relative',
            'overflow-visible',
            'my-1',
            'cursor-pointer',
            'hover:text-gray-500',
            'sm:text-center',
            '2xl:text-lg',
            '2xl:mt-0',
            '2xl:inline-block',
        ];
        linkClasses.map((item) => {
            expect(link.classList.contains(item)).toBeTruthy();
        });
        expect(link.childNodes.length).toBe(2);
        let icon = link.children[0];
        let span = link.children[1];

        expect(icon.tagName.toLowerCase()).toBe('i');
        let iconClasses = ['fas', 'fa-project-diagram', 'text-black', 'mr-3'];
        iconClasses.map((item) => {
            expect(icon.classList.contains(item)).toBeTruthy();
        });

        expect(span.tagName.toLowerCase()).toBe('span');
        expect(span.textContent).toBe('All Projects');
    });

    it('Verify that the third link in collapsible content is accurate', function () {
        let testOutput = new Components.ClientAdminNavbar().render().result;
        let collapsibleContent = testOutput.children[1];
        let link = collapsibleContent.children[2];

        expect(link).not.toBeNull();
        expect(link.tagName.toLowerCase()).toBe('button');
        expect(link.id).toBe('navbar-on-going-projects');
        expect(link.type).toBe('button');
        let linkClasses = [
            'block',
            'relative',
            'overflow-visible',
            'my-1',
            'cursor-pointer',
            'hover:text-gray-500',
            'sm:text-center',
            '2xl:text-lg',
            '2xl:mt-0',
            '2xl:inline-block',
        ];
        linkClasses.map((item) => {
            expect(link.classList.contains(item)).toBeTruthy();
        });
        expect(link.childNodes.length).toBe(3);
        let icon = link.children[0];
        let span = link.children[1];
        let counter = link.children[2];

        expect(icon.tagName.toLowerCase()).toBe('i');
        let iconClasses = ['fas', 'fa-drum', 'text-black', 'mr-3'];
        iconClasses.map((item) => {
            expect(icon.classList.contains(item)).toBeTruthy();
        });

        expect(span.tagName.toLowerCase()).toBe('span');
        expect(span.textContent).toBe('Ongoing Projects');

        expect(counter.tagName.toLowerCase()).toBe('div');
        let counterClasses = [
            'absolute',
            'flex',
            'top-0',
            'right-0',
            '-mt-4',
            '-mr-4',
            'px-2',
            'bg-red-500',
            'rounded-full',
        ];
        counterClasses.map((item) => {
            expect(counter.classList.contains(item)).toBeTruthy();
        });
        expect(counter.id).toBe('navbar-on-going-projects-counter');
        expect(counter.childNodes.length).toBe(1);
        expect(counter.children[0].tagName.toLowerCase()).toBe('span');
        expect(counter.children[0].classList.contains('text-xs')).toBeTruthy();
        expect(
            counter.children[0].classList.contains('lato-regular')
        ).toBeTruthy();
    });

    it('Verify that the fourth link in collapsible content is accurate', function () {
        let testOutput = new Components.ClientAdminNavbar().render().result;
        let collapsibleContent = testOutput.children[1];
        let link = collapsibleContent.children[3];

        expect(link).not.toBeNull();
        expect(link.tagName.toLowerCase()).toBe('button');
        expect(link.id).toBe('navbar-revenue');
        expect(link.type).toBe('button');
        let linkClasses = [
            'block',
            'relative',
            'overflow-visible',
            'my-1',
            'cursor-pointer',
            'hover:text-gray-500',
            'sm:text-center',
            '2xl:text-lg',
            '2xl:mt-0',
            '2xl:inline-block',
        ];
        linkClasses.map((item) => {
            expect(link.classList.contains(item)).toBeTruthy();
        });
        expect(link.childNodes.length).toBe(2);
        let icon = link.children[0];
        let span = link.children[1];

        expect(icon.tagName.toLowerCase()).toBe('i');
        let iconClasses = ['fas', 'fa-money-bill', 'text-black', 'mr-3'];
        iconClasses.map((item) => {
            expect(icon.classList.contains(item)).toBeTruthy();
        });

        expect(span.tagName.toLowerCase()).toBe('span');
        expect(span.textContent).toBe('Revenue');
    });

    it('Verify that the sixth link in collapsible content is accurate', function () {
        let testOutput = new Components.ClientAdminNavbar().render().result;
        let collapsibleContent = testOutput.children[1];
        let link = collapsibleContent.children[5];

        expect(link).not.toBeNull();
        expect(link.tagName.toLowerCase()).toBe('button');
        expect(link.id).toBe('navbar-add-blogpost');
        expect(link.type).toBe('button');
        let linkClasses = [
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
        ];
        linkClasses.map((item) => {
            expect(link.classList.contains(item)).toBeTruthy();
        });
        expect(link.childNodes.length).toBe(2);
        let icon = link.children[0];
        let span = link.children[1];

        expect(icon.tagName.toLowerCase()).toBe('i');
        let iconClasses = ['fas', 'fa-plus', 'text-black', 'mr-3'];
        iconClasses.map((item) => {
            expect(icon.classList.contains(item)).toBeTruthy();
        });

        expect(span.tagName.toLowerCase()).toBe('span');
        expect(span.textContent).toBe('Add Blog Post');
    });

    afterEach(function () {
        jest.clearAllMocks();
    });
});

describe('Test class TypicalTable', function () {
    let columnNameList = ['Test Column 1', 'Test Column 2', 'Test Column 3'];
    let tableId = 'test-table-id';

    it('Class has the appropriate properties', function () {
        let testOutput = new Components.TypicalTable(columnNameList, tableId);

        expect(testOutput).not.toBeNull();
        expect(testOutput.hasOwnProperty('columnNameList')).toBeTruthy();
        expect(testOutput.hasOwnProperty('tableId')).toBeTruthy();
        expect(testOutput.hasOwnProperty('result')).toBeTruthy();
    });

    it('Class produces accurate result', function () {
        let testOutput = new Components.TypicalTable(columnNameList, tableId)
            .result;

        expect(testOutput).not.toBeNull();
        expect(testOutput.tagName.toLowerCase()).toBe('table');
        expect(testOutput.classList.contains('table')).toBeTruthy();
        expect(testOutput.childNodes.length).toBe(2);
    });

    it('Class produces an accurate first child', function () {
        let testOutput = new Components.TypicalTable(columnNameList, tableId)
            .result;
        let child = testOutput.children[0];

        expect(child).not.toBeNull();
        expect(child.tagName.toLowerCase()).toBe('thead');
        let childClasses = ['flex', 'w-full'];
        childClasses.map((item) => {
            expect(child.classList.contains(item)).toBeTruthy();
        });
        expect(child.id).toBe('test-table-id-head');
        expect(child.childNodes.length).toBe(1);
    });

    it('Class produces an accurate first child (row)', function () {
        let testOutput = new Components.TypicalTable(columnNameList, tableId)
            .result;
        let head = testOutput.children[0];
        let row = head.children[0];

        expect(row).not.toBeNull();
        expect(row.tagName.toLowerCase()).toBe('tr');
        let rowClasses = ['table-row', 'flex', 'w-full'];
        rowClasses.map((item) => {
            expect(row.classList.contains(item)).toBeTruthy();
        });
        expect(row.id).toBe('test-table-id-head-row');
        expect(row.childNodes.length).toBe(3);

        let columns = row.childNodes;
        for (let i = 0; i < columns.length; i++) {
            expect(columns[i].tagName.toLowerCase()).toBe('th');
            let colClasses = [
                'group',
                'table-cell',
                'border',
                'border-black',
                'py-5',
                'relative',
            ];
            colClasses.map((item) => {
                expect(columns[i].classList.contains(item)).toBeTruthy();
            });
            expect(columns[i].childNodes.length).toBe(2);

            // Span
            let span = columns[i].children[0];
            expect(span.tagName.toLowerCase()).toBe('span');
            expect(span.textContent).toBe('Test Column ' + (i + 1).toFixed(0));

            let button = columns[i].children[1];
            expect(button.tagName.toLowerCase()).toBe('button');
            expect(button.id).toBe(
                'test-table-id-sort-button-col-' + i.toFixed(0)
            );
            expect(button.type).toBe('button');
            let buttonClasses = [
                'opacity-0',
                'absolute',
                'my-auto',
                'right-2',
                'text-gray-500',
                'group-hover:opacity-100',
            ];
            buttonClasses.map((item) => {
                expect(button.classList.contains(item)).toBeTruthy();
            });
        }
    });

    it('Class produces an accurate second child', function () {
        let testOutput = new Components.TypicalTable(columnNameList, tableId)
            .result;
        let child = testOutput.children[1];

        expect(child).not.toBeNull();
        expect(child.tagName.toLowerCase()).toBe('tbody');
        let childClasses = ['flex', 'flex-col', 'w-full'];
        childClasses.map((item) => {
            expect(child.classList.contains(item)).toBeTruthy();
        });
        expect(child.id).toBe('test-table-id-body');
    });
});

describe('Test class RevenueTableRow', function () {
    let year = '2021';
    let yearData = {
        1: '1000',
        2: '2000',
        3: '3000',
        4: '4000',
    };

    it('Class has the required properties', function () {
        let testOutput = new Components.RevenueTableRow(year, yearData);

        expect(testOutput).not.toBeNull();
        expect(testOutput.hasOwnProperty('year')).toBeTruthy();
        expect(testOutput.hasOwnProperty('yearData')).toBeTruthy();
        expect(testOutput.hasOwnProperty('result')).toBeTruthy();
    });

    it('Class produces accurate results', function () {
        let testOutput = new Components.RevenueTableRow(year, yearData).result;

        expect(testOutput).not.toBeNull();
        expect(testOutput.tagName.toLowerCase()).toBe('tr');
        expect(testOutput.childNodes.length).toBe(5);
    });

    it('Class produces accurate first child', function () {
        let testOutput = new Components.RevenueTableRow(year, yearData).result;
        let child = testOutput.childNodes[0];

        expect(child).not.toBeNull();
        expect(child.tagName.toLowerCase()).toBe('td');
        expect(child.textContent).toBe('2021');
        let classes = [
            'block',
            'w-32',
            'table-cell',
            'lato-bold',
            'text-center',
            'align-center',
            'py-5',
            'border',
            'border-black',
            'bg-gray-300',
        ];
        classes.map((item) => {
            expect(child.classList.contains(item)).toBeTruthy();
        });
    });

    it('Class produces accurate rest of the children', function () {
        let testOutput = new Components.RevenueTableRow(year, yearData).result;
        let children = testOutput.childNodes;

        for (let i = 1; i < children.length; i++) {
            expect(children[i]).not.toBeNull();
            expect(children[i].tagName.toLowerCase()).toBe('td');
            expect(children[i].textContent).toBe('$' + yearData[i]);
            let classes = [
                'block',
                'w-32',
                'table-cell',
                'text-center',
                'text-base',
                'align-center',
                'py-5',
                'border',
                'border-black',
            ];
            classes.map((item) => {
                expect(children[i].classList.contains(item)).toBeTruthy();
            });
            expect(children[i].hasAttribute('table-body-col')).toBeTruthy();
            expect(children[i].getAttribute('table-body-col')).toBe(
                (i - 1).toFixed(0)
            );
        }
    });
});

describe('Test function _obtainReviewDict', function () {
    let monthlyRevenueDict = {
        2021: {
            1: '1000',
            2: '2000',
            3: '3000',
            4: '4000',
        },
        2022: {
            1: '5000',
            2: '6000',
            3: '7000',
            4: '8000',
        },
    };
    let xhrMockClass = {
        open: jest.fn(),
        send: jest.fn(),
        onreadystatechange: jest.fn(),
        onload: jest.fn(),
        readyState: 4,
        status: 200,
        response: JSON.stringify(monthlyRevenueDict),
    };
    let revenueTableRowMock = {
        createTableCell: jest.fn((string) => {
            return Object.assign(document.createElement('td'), {
                textContent: string,
            });
        }),
        createYearCell: jest.fn((string) => {
            return Object.assign(document.createElement('td'), {
                textContent: string,
            });
        }),
    };

    beforeEach(function () {
        jest.spyOn(window, 'XMLHttpRequest').mockImplementation(
            () => xhrMockClass
        );
        jest.spyOn(
            Components.RevenueTableRow.prototype,
            'createTableCell'
        ).mockImplementation(() =>
            revenueTableRowMock.createTableCell('test-table-cell-string')
        );
        jest.spyOn(
            Components.RevenueTableRow.prototype,
            'createYearCell'
        ).mockImplementation(() =>
            revenueTableRowMock.createYearCell('test-table-year-string')
        );
    });

    it('Appropriate functions are called from XMLHTTPRequest', function () {
        let testOutput = Components._obtainRevenueDict();
        expect(testOutput).not.toBeNull();

        expect(xhrMockClass.open).toBeCalledTimes(1);
        expect(xhrMockClass.open).toBeCalledWith(
            'GET',
            '/client-admin/obtain-revenue-dict'
        );
        expect(xhrMockClass.send).toBeCalledTimes(1);
    });

    it('The result of the promise is accurate', function () {
        Components._obtainRevenueDict().then((response) => {
            expect(response.hasOwnProperty('2021')).toBeTruthy();
            expect(response.hasOwnProperty('2022')).toBeTruthy();

            expect(response['2021'].tagName.toLowerCase()).toBe('tr');
            expect(response['2022'].tagName.toLowerCase()).toBe('tr');

            expect(revenueTableRowMock.createTableCell).toBeCalledTimes(8);
            expect(revenueTableRowMock.createYearCell).toBeCalledTimes(2);
        });
        xhrMockClass.onreadystatechange(new Event(''));
    });

    afterEach(function () {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });
});

describe('Test function createRevenueTable', function () {
    let revenueDictOutput = {
        2021: `<tr><td>2021</td><td table-body-col="0">$1000</td><td table-body-col="1">$2000</td><td table-body-col="2">$3000</td><td table-body-col="3">$4000</td></tr>`,
    };
    let _obtainRevenueDict;
    beforeEach(function () {
        _obtainRevenueDict = jest.fn().mockImplementation(() => {
            return new Promise((resolve) => {
                resolve(revenueDictOutput);
            });
        });
    });

    it('The output from the function is accurate', function () {
        let testOutput = Components.createRevenueTable();

        expect(testOutput).not.toBeNull();
        expect(testOutput.tagName.toLowerCase()).toBe('table');
        let classes = ['w-11/12', 'mx-auto', 'mb-16'];
        classes.map((item) => {
            expect(testOutput.classList.contains(item)).toBeTruthy();
        });
        expect(testOutput.id).toBe('revenue-table');
        expect(testOutput.childNodes.length).toBe(2);

        // Expect children to be accurate
        expect(testOutput.childNodes[0].tagName.toLowerCase()).toBe('thead');
        expect(testOutput.childNodes[0].id).toBe('revenue-table-head');
        expect(testOutput.childNodes[1].tagName.toLowerCase()).toBe('tbody');
        expect(testOutput.childNodes[1].id).toBe('revenue-table-body');
    });

    it('The table head cells from the function are accurate', function () {
        let testOutput = Components.createRevenueTable();
        let tableHeadCells = testOutput
            .querySelector('#revenue-table-head')
            .querySelectorAll('th');
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
        ];

        tableHeadCells.forEach((item, index) => {
            expect(item.textContent).toBe(monthsList[index]);
            expect(item.classList.contains('w-32')).toBeTruthy();
            expect(item.classList.contains('lato-bold')).toBeTruthy();

            if (index === 0) {
                expect(item.classList.contains('bg-gray-300')).toBeTruthy();
                expect(
                    item.querySelector(
                        '#revenue-table-sort-button-col-' + index.toFixed(0)
                    )
                ).not.toBeNull();
            } else {
                expect(
                    item.querySelector(
                        '#revenue-table-sort-button-col-' + index.toFixed(0)
                    )
                ).toBeNull();
            }
        });
    });

    it('The sort button of the first column emits the right response', function () {
        let testOutput = Components.createRevenueTable();
        let sortButton = testOutput.querySelector(
            '#revenue-table-sort-button-col-0'
        );

        let tableBody = testOutput.querySelector('#revenue-table-body');
        expect(tableBody.classList.contains('flex-col')).toBeTruthy();
        expect(tableBody.classList.contains('flex-col-reverse')).toBeFalsy();

        sortButton.click();
        expect(tableBody.classList.contains('flex-col')).toBeFalsy();
        expect(tableBody.classList.contains('flex-col-reverse')).toBeTruthy();

        sortButton.click();
        expect(tableBody.classList.contains('flex-col')).toBeTruthy();
        expect(tableBody.classList.contains('flex-col-reverse')).toBeFalsy();
    });

    afterEach(function () {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });
});

describe('Test function _obtainProjects', function () {
    let projectsResponse = {};
    for (let i = 0; i < 5; i++) {
        projectsResponse[i] = {};
        projectsResponse[i]['fields'] = {};
        projectsResponse[i].fields.client_name = 'Test Name ' + i.toFixed(0);
        projectsResponse[i].fields.client_company =
            'Test Company ' + i.toFixed(0);
        projectsResponse[i].fields.client_email =
            'test_email_' + i.toFixed(0) + '@test.com';
        projectsResponse[i].fields.project_name =
            'Test Project ' + i.toFixed(0);
        projectsResponse[i].fields.project_type = 'PRR';
        projectsResponse[i].fields.project_deadline = '2021-11-21';
        projectsResponse[i].fields.project_estimated_days = 15;
        projectsResponse[i].fields.start_date = '2021-11-21';
        projectsResponse[i].fields.end_date = '2021-11-21';

        let paymentsReponse = {};
        for (let j = 0; j < 3; j++) {
            paymentsReponse[j] = {};
            paymentsReponse[j]['fields'] = {};
            paymentsReponse[j].fields = {
                amount: 1000,
                payment_date: '2021-11-21',
            };
        }
        projectsResponse[i].fields.payments = JSON.stringify(paymentsReponse);
    }

    let xhrMockClass = {
        open: jest.fn(),
        send: jest.fn(),
        onreadystatechange: jest.fn(),
        onload: jest.fn(),
        readyState: 4,
        status: 200,
        response: JSON.stringify(projectsResponse),
    };

    beforeEach(function () {
        jest.spyOn(window, 'XMLHttpRequest').mockImplementation(
            () => xhrMockClass
        );
    });

    it('Test function _obtainProjects calls the right functions', function () {
        let testOutput = Components._obtainProjects();

        expect(testOutput).not.toBeNull();
        expect(xhrMockClass.open).toBeCalledTimes(1);
        expect(xhrMockClass.open).toBeCalledWith(
            'GET',
            '/client-admin/obtain-projects'
        );
        expect(xhrMockClass.send).toBeCalledTimes(1);
    });

    it('Test function _obtainProjects produces the right result', function () {
        Components._obtainProjects().then((response) => {
            expect(response).not.toBeNull();

            let paymentsObject = {};
            for (let i = 0; i < 3; i++) {
                paymentsObject[i] = {};
                paymentsObject[i]['fields'] = {
                    amount: 1000,
                    payment_date: '2021-11-21',
                };
            }

            for (let i = 0; i < 5; i++) {
                expect(response[i].fields.client_name).toBe(
                    'Test Name ' + i.toFixed(0)
                );
                expect(response[i].fields.client_company).toBe(
                    'Test Company ' + i.toFixed(0)
                );
                expect(response[i].fields.client_email).toBe(
                    'test_email_' + i.toFixed(0) + '@test.com'
                );
                expect(response[i].fields.project_name).toBe(
                    'Test Project ' + i.toFixed(0)
                );
                expect(response[i].fields.project_type).toBe('PRR');
                expect(response[i].fields.project_estimated_days).toBe(15);
                expect(response[i].fields.project_deadline).toBe('2021-11-21');
                expect(response[i].fields.start_date).toBe('2021-11-21');
                expect(response[i].fields.end_date).toBe('2021-11-21');

                expect(response[i].fields.project_deadline_posix).toBe(
                    Date.parse('2021-11-21')
                );
                expect(response[i].fields.project_deadline_full).toBe(
                    'Nov 20 2021'
                );
                expect(response[i].fields.paymentSum).toBe(3000);
                expect(response[i].fields.paymentsObject).toStrictEqual(
                    paymentsObject
                );
            }
        });
        xhrMockClass.onreadystatechange(new Event(''));
    });

    afterEach(function () {
        jest.clearAllMocks();
    });
});

describe('Test class ProjectTableRow', function () {
    let paymentsObject = [];
    for (let i = 0; i < 3; i++) {
        paymentsObject[i] = {};
        paymentsObject[i]['fields'] = {
            amount: 1000,
            payment_date: '2021-11-21',
        };
    }

    let projectsResponse = {};
    for (let i = 0; i < 1; i++) {
        projectsResponse[i] = {};
        projectsResponse[i]['fields'] = {};
        projectsResponse[i].fields.client_name = 'Test Name ' + i.toFixed(0);
        projectsResponse[i].fields.client_company =
            'Test Company ' + i.toFixed(0);
        projectsResponse[i].fields.client_email =
            'test_email_' + i.toFixed(0) + '@test.com';
        projectsResponse[i].fields.project_name =
            'Test Project ' + i.toFixed(0);
        projectsResponse[i].fields.project_type = 'PRR';
        projectsResponse[i].fields.project_deadline = '2021-11-21';
        projectsResponse[i].fields.project_estimated_days = 15;
        projectsResponse[i].fields.expected_revenue = 1000;
        projectsResponse[i].fields.start_date = '2021-11-21';
        projectsResponse[i].fields.end_date = '2021-11-21';
        projectsResponse[i].fields.slug = 'Test Slug ' + i.toFixed(0);
        projectsResponse[i].fields.project_deadline_full = 'Nov 20 2021';
        projectsResponse[i].fields.is_project_complete = false;
        projectsResponse[i].fields.is_invoice_sent = false;
        projectsResponse[i].fields.paymentsObject = paymentsObject;
        projectsResponse[i].fields.paymentSum = 3000;
    }

    beforeEach(function () {
        let csrftoken = Object.assign(document.createElement('input'), {
            name: 'csrfmiddlewaretoken',
            type: 'hidden',
            value: 'test-csrf-token',
        });
        document.body.append(csrftoken);
    });

    it('Class has the appropriate properties', function () {
        let testOutput = new Components.ProjectTableRow(
            projectsResponse[0].fields
        );

        expect(testOutput).not.toBeNull();
        expect(testOutput.hasOwnProperty('projectRowObject')).toBeTruthy();
        expect(testOutput.hasOwnProperty('result')).toBeTruthy();
    });

    it('Class produces accurate results', function () {
        let testOutput = new Components.ProjectTableRow(
            projectsResponse[0].fields
        ).result;

        expect(testOutput).not.toBeNull();
        expect(testOutput.tagName.toLowerCase()).toBe('tr');
        let classes = [
            'flex',
            'flex-row',
            'lato-regular',
            'border-b',
            'border-black',
        ];
        classes.map((item) => {
            expect(testOutput.classList.contains(item)).toBeTruthy();
        });
        expect(testOutput.id).toBe('Test Slug 0');
        expect(testOutput.childNodes.length).toBe(9);
        [...testOutput.childNodes].map((item) => {
            expect(item.tagName.toLowerCase()).toBe('td');
        });
    });

    it('Class produces table cells with text are accurate', function () {
        let mappingTextContent = {
            0: 'Test Name 0',
            1: 'Test Company 0',
            2: 'test_email_0@test.com',
            3: 'Test Project 0',
            4: 'Product Research',
            5: 'Nov 20 2021',
            6: '$1000',
        };

        let testOutput = new Components.ProjectTableRow(
            projectsResponse[0].fields
        ).result;
        Object.keys(mappingTextContent).map((item) => {
            expect(testOutput.childNodes[item].textContent).toBe(
                mappingTextContent[item]
            );

            let classes = [
                'flex',
                'w-44',
                'table-cell',
                'text-center',
                // 'self-center',
                'py-5',
                'border-l',
                'border-black',
            ];
            classes.map((thisClass) => {
                expect(
                    testOutput.childNodes[item].classList.contains(thisClass)
                ).toBeTruthy();
                if (item === '2') {
                    expect(
                        testOutput.childNodes[item].classList.contains(
                            'text-xs'
                        )
                    ).toBeTruthy();
                }
            });
        });
    });

    it('Class produces accurate payments cell', function () {
        let testOutput = new Components.ProjectTableRow(
            projectsResponse[0].fields
        ).result;
        let paymentsCell = testOutput.childNodes[7];

        let classes = [
            'flex',
            'w-44',
            'table-cell',
            'text-center',
            // 'self-center',
            'py-5',
            'border-l',
            'border-black',
            'relative',
            'group',
        ];
        classes.map((item) => {
            expect(paymentsCell.classList.contains(item)).toBeTruthy();
        });
        expect(paymentsCell.childNodes.length).toBe(2);

        let container = paymentsCell.childNodes[0];
        let containerClasses = [
            'flex',
            'flex-col',
            'h-full',
            'my-auto',
            'gap-2',
            'justify-center',
        ];
        containerClasses.map((item) => {
            expect(container.classList.contains(item)).toBeTruthy();
        });
        expect(container.childNodes.length).toBe(3);

        let sumContainer = paymentsCell.childNodes[1];
        let sumContainerClasses = [
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
            'group-hover:opacity-90',
        ];
        sumContainerClasses.map((item) => {
            expect(sumContainer.classList.contains(item)).toBeTruthy();
        });
        expect(sumContainer.textContent).toBe('$3000.00');
    });

    it('Class produces accurate payments cell first container contents', function () {
        let testOutput = new Components.ProjectTableRow(
            projectsResponse[0].fields
        ).result;
        let paymentsCell = testOutput.childNodes[7];
        let container = paymentsCell.childNodes[0];

        expect(container.childNodes.length).toBe(3);

        [...container.childNodes].map((item) => {
            expect(item.classList.contains('flex')).toBeTruthy();
            expect(item.classList.contains('flex-col')).toBeTruthy();
            expect(item.childNodes.length).toBe(2);

            expect(item.childNodes[0].textContent).toBe('$1000');
            expect(
                item.childNodes[0].classList.contains('lato-regular')
            ).toBeTruthy();
            expect(
                item.childNodes[0].classList.contains('text-sm')
            ).toBeTruthy();

            expect(item.childNodes[1].textContent).toBe('2021-11-21');
            expect(
                item.childNodes[1].classList.contains('lato-light')
            ).toBeTruthy();
            expect(
                item.childNodes[1].classList.contains('text-xs')
            ).toBeTruthy();
        });
    });

    it('Class produces accurate last cell', function () {
        let testOutput = new Components.ProjectTableRow(
            projectsResponse[0].fields
        ).result;
        let lastCell = [...testOutput.childNodes].pop();

        let classes = [
            'flex',
            'w-44',
            'table-cell',
            'text-center',
            // 'self-center',
            // 'py-5',
            'border-l',
            'border-r',
            'border-black',
        ];
        classes.map((item) => {
            expect(lastCell.classList.contains(item)).toBeTruthy();
        });
        expect(lastCell.childNodes.length).toBe(1);

        let container = lastCell.childNodes[0];
        let containerClasses = ['flex', 'flex-row', 'gap-3', 'justify-center'];
        containerClasses.map((item) => {
            expect(container.classList.contains(item)).toBeTruthy();
        });
    });

    it('Class produces accurate last cell container contents', function () {
        function assertButtonIconAndToolTip(
            button,
            iconClassList,
            idPortion,
            toolTipText
        ) {
            iconClassList.map((item) => {
                expect(
                    button.querySelector('i').classList.contains(item)
                ).toBeTruthy();
            });
            expect(button.id).toBe('Test Slug 0' + idPortion);
            expect(button.querySelector('div').textContent).toBe(toolTipText);
            let tooltipClasses = [
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
                'group-hover:opacity-80',
            ];
            tooltipClasses.map((item) => {
                expect(
                    button.querySelector('div').classList.contains(item)
                ).toBeTruthy();
            });
        }

        let testOutput = new Components.ProjectTableRow(
            projectsResponse[0].fields
        ).result;
        let lastCell = [...testOutput.childNodes].pop();
        let container = lastCell.childNodes[0];

        for (let i = 0; i < container.childNodes.length; i++) {
            expect(
                container.childNodes[i].classList.contains('relative')
            ).toBeTruthy();
            expect(
                container.childNodes[i].classList.contains('group')
            ).toBeTruthy();
        }

        assertButtonIconAndToolTip(
            container.childNodes[0],
            ['far', 'fa-edit', 'fa-lg'],
            '-edit-row',
            'Edit Row'
        );
        assertButtonIconAndToolTip(
            container.childNodes[1],
            ['fas', 'fa-check-circle', 'fa-lg'],
            '-project-status',
            'Mark Project Complete'
        );
        assertButtonIconAndToolTip(
            container.childNodes[2],
            ['far', 'fa-money-bill-alt', 'fa-lg'],
            '-add-payment',
            'Add Payment'
        );
        expect(
            container.childNodes[2].classList.contains('text-blue-600')
        ).toBeTruthy();
        assertButtonIconAndToolTip(
            container.childNodes[3],
            ['fas', 'fa-scroll', 'fa-lg'],
            '-invoice-status',
            'Mark Invoice Sent'
        );
    });

    it('Clicking mark project complete produces the right response', function () {
        let xhrMockClass = {
            open: jest.fn(),
            send: jest.fn(),
            onreadystatechange: jest.fn(),
            onload: jest.fn(),
            setRequestHeader: jest.fn(),
            readyState: 4,
            status: 200,
            response: ``,
            responseText: 'Success',
        };
        jest.spyOn(window, 'XMLHttpRequest').mockImplementation(
            () => xhrMockClass
        );

        let testOutput = new Components.ProjectTableRow(
            projectsResponse[0].fields
        ).result;

        // Mark project complete button
        let button = testOutput.querySelector(
            '[id="Test Slug 0-project-status"]'
        );
        expect(button).not.toBeNull();
        button.click();

        expect(xhrMockClass.open).toBeCalledTimes(1);
        expect(xhrMockClass.open).toBeCalledWith(
            'POST',
            '/client-admin/mark-project-complete'
        );
        expect(xhrMockClass.send).toBeCalledTimes(1);
        expect(xhrMockClass.send).toBeCalledWith(
            JSON.stringify({ _elementId: 'Test Slug 0' })
        );
        expect(xhrMockClass.setRequestHeader).toBeCalledTimes(2);
        expect(xhrMockClass.setRequestHeader).toBeCalledWith(
            'X-CSRFToken',
            'test-csrf-token'
        );
        expect(xhrMockClass.setRequestHeader).toBeCalledWith(
            'Content-Type',
            'application/json; charset=UTF-8'
        );

        expect(button.classList.contains('text-gray-500')).toBeTruthy();

        // On Load event listener
        xhrMockClass.onload(new Event(''));
        expect(button.classList.contains('text-green-500')).toBeTruthy();
    });

    it('Clicking mark invoice sent produces the right response', function () {
        let xhrMockClass = {
            open: jest.fn(),
            send: jest.fn(),
            onreadystatechange: jest.fn(),
            onload: jest.fn(),
            setRequestHeader: jest.fn(),
            readyState: 4,
            status: 200,
            response: ``,
            responseText: 'Success',
        };
        jest.spyOn(window, 'XMLHttpRequest').mockImplementation(
            () => xhrMockClass
        );

        let testOutput = new Components.ProjectTableRow(
            projectsResponse[0].fields
        ).result;

        // Mark project complete button
        let button = testOutput.querySelector(
            '[id="Test Slug 0-invoice-status"]'
        );
        expect(button).not.toBeNull();
        button.click();

        expect(xhrMockClass.open).toBeCalledTimes(1);
        expect(xhrMockClass.open).toBeCalledWith(
            'POST',
            '/client-admin/mark-invoice-sent'
        );
        expect(xhrMockClass.send).toBeCalledTimes(1);
        expect(xhrMockClass.send).toBeCalledWith(
            JSON.stringify({ _elementId: 'Test Slug 0' })
        );
        expect(xhrMockClass.setRequestHeader).toBeCalledTimes(2);
        expect(xhrMockClass.setRequestHeader).toBeCalledWith(
            'X-CSRFToken',
            'test-csrf-token'
        );
        expect(xhrMockClass.setRequestHeader).toBeCalledWith(
            'Content-Type',
            'application/json; charset=UTF-8'
        );

        expect(button.classList.contains('text-gray-500')).toBeTruthy();

        // On Load event listener
        xhrMockClass.onload(new Event(''));
        expect(button.classList.contains('text-pink-600')).toBeTruthy();
    });

    describe('Clicking the add payment button produces the right response', function () {
        let showModalSpy, closeModalSpy, xhrMockClass, testOutput;
        beforeEach(function () {
            // Add a table row
            testOutput = new Components.ProjectTableRow(
                projectsResponse[0].fields
            ).result;

            // Create app for the document
            let app = Object.assign(document.createElement('div'), {
                id: 'app',
            });
            let csrftoken = Object.assign(document.createElement('input'), {
                name: 'csrfmiddlewaretoken',
                value: 'test-csrf-token',
            });
            document.body.append(csrftoken, app);

            // Spy on the _showModal() method of the add payment modal class
            showModalSpy = jest
                .spyOn(Components.AddPaymentModal.prototype, '_showModal')
                .mockImplementation(jest.fn());
            closeModalSpy = jest
                .spyOn(Components.AddPaymentModal.prototype, '_closeModal')
                .mockImplementation(jest.fn());

            // Mock XHTTP
            paymentsObject[3] = {};
            paymentsObject[3]['fields'] = {
                amount: 500,
                payment_date: '2021-11-27',
            };
            xhrMockClass = {
                open: jest.fn(),
                send: jest.fn(),
                onreadystatechange: jest.fn(),
                onload: jest.fn(),
                setRequestHeader: jest.fn(),
                readyState: 4,
                status: 200,
                response: JSON.stringify({
                    payments_serialize: JSON.stringify(paymentsObject),
                }),
            };
            jest.spyOn(window, 'XMLHttpRequest').mockImplementation(
                () => xhrMockClass
            );
        });

        it('Verify that the modal is created', function () {
            // Mark project complete button
            let button = testOutput.querySelector(
                '[id="Test Slug 0-add-payment"]'
            );
            expect(button).not.toBeNull();
            button.click();

            let modal = document.querySelector(
                '[id="Test Slug 0-payment-modal"]'
            );
            let input = modal.querySelector('input[type="number"]');
            let submitButton = modal.querySelector('button[type="button"]');

            // Start expecting that the modal is present
            expect(modal).not.toBeNull();
            expect(modal).not.toBeUndefined();
            expect(input).not.toBeNull();
            expect(input).not.toBeUndefined();
            expect(submitButton).not.toBeNull();
            expect(submitButton).not.toBeUndefined();
            expect(showModalSpy).toHaveBeenCalled();
        });

        it('Verify that the xhttp mock methods were called', function () {
            let button = testOutput.querySelector(
                '[id="Test Slug 0-add-payment"]'
            );
            expect(button).not.toBeNull();
            button.click();

            // Change the input value in the modal and submit the form
            let modal = document.querySelector(
                '[id="Test Slug 0-payment-modal"]'
            );
            let input = modal.querySelector('input[type="number"]');
            let submitButton = modal.querySelector('button[type="button"]');
            input.value = 500;
            submitButton.click();

            // Verify all xhttp things were called
            expect(xhrMockClass.open).toHaveBeenCalledTimes(1);
            expect(xhrMockClass.open).toHaveBeenCalledWith(
                'POST',
                '/client-admin/add-payment-modal'
            );
            expect(xhrMockClass.setRequestHeader).toHaveBeenCalledTimes(2);
            expect(xhrMockClass.setRequestHeader).toHaveBeenCalledWith(
                'X-CSRFToken',
                'test-csrf-token'
            );
            expect(xhrMockClass.setRequestHeader).toHaveBeenCalledWith(
                'Content-Type',
                'application/json; charset=UTF-8'
            );
            expect(xhrMockClass.send).toHaveBeenCalledTimes(1);
            expect(xhrMockClass.send).toBeCalledWith(
                JSON.stringify({
                    _elementId: 'Test Slug 0',
                    dollarValue: '500',
                })
            );
        });

        it('Verify that the cell contents are updated after response', function () {
            let button = testOutput.querySelector(
                '[id="Test Slug 0-add-payment"]'
            );
            expect(button).not.toBeNull();
            button.click();

            // Change the input value in the modal and submit the form
            let modal = document.querySelector(
                '[id="Test Slug 0-payment-modal"]'
            );
            let input = modal.querySelector('input[type="number"]');
            let submitButton = modal.querySelector('button[type="button"]');
            input.value = 500;
            submitButton.click();

            xhrMockClass.onload(new Event(''));

            let paymentsCell = testOutput.childNodes[7];
            let container = paymentsCell.childNodes[0];

            expect(container.childNodes.length).toBe(4);
            [...container.childNodes].map((item, index) => {
                if (index < 3) {
                    expect(item.childNodes[0].textContent).toBe('$1000');
                    expect(item.childNodes[1].textContent).toBe('2021-11-21');
                } else {
                    expect(item.childNodes[0].textContent).toBe('$500');
                    expect(item.childNodes[1].textContent).toBe('2021-11-27');
                }
                expect(item.classList.contains('flex')).toBeTruthy();
                expect(item.classList.contains('flex-col')).toBeTruthy();
                expect(item.childNodes.length).toBe(2);

                expect(
                    item.childNodes[0].classList.contains('lato-regular')
                ).toBeTruthy();
                expect(
                    item.childNodes[0].classList.contains('text-sm')
                ).toBeTruthy();

                expect(
                    item.childNodes[1].classList.contains('lato-light')
                ).toBeTruthy();
                expect(
                    item.childNodes[1].classList.contains('text-xs')
                ).toBeTruthy();
            });

            let sumContainer = paymentsCell.childNodes[1];
            let sumContainerClasses = [
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
                'group-hover:opacity-90',
            ];
            sumContainerClasses.map((item) => {
                expect(sumContainer.classList.contains(item)).toBeTruthy();
            });
            expect(sumContainer.textContent).toBe('$3500.00');
        });

        afterEach(function () {
            document.body.innerHTML = '';
            jest.clearAllMocks();
        });
    });

    describe('Clicking the edit project button produces the right response', function () {
        let showModalSpy,
            closeModalSpy,
            xhrMockClass,
            testOutput,
            response,
            obtainFormSpy;

        beforeEach(async function () {
            response = `<input type="text" name="client_name"
            id="edit_project_row_clientName" maxlength="250" required><input
            type="text" name="client_company" id="edit_project_row_clientCompany"
            maxlength="250"><input type="email" name="client_email"
            id="edit_project_row_clientEmail" maxlength="254" required><input
            type="text" name="project_name" id="edit_project_row_projectName"
            maxlength="250" required><select name="project_type"
            id="edit_project_row_projectType" required><option value=""
            selected>---------</option><option value="PAR">Patent
            Research</option><option value="VS">Validity and Invalidity
            Search</option><option value="FTO">Freedom to Operate
            Search</option><option value="PRR">Product Research</option><option
            value="LAN">Landscape / State of the Art</option><option
            value="TS">Trademark Search</option><option value="PD">Provisional
            Draft</option><option value="FPD">Full Patent
            Draft</option></select><input type="date" name="project_deadline"
            id="edit_project_row_projectDeadline" required><input type="number"
            name="expected_revenue" value="0" id="edit_project_row_expectedRevenue"
            min="0" max="1000000" value="0" required>`;
            xhrMockClass = {
                open: jest.fn(),
                send: jest.fn(),
                onreadystatechange: jest.fn(),
                onload: jest.fn(),
                setRequestHeader: jest.fn(),
                readyState: 4,
                status: 200,
                response: response,
            };
            jest.spyOn(window, 'XMLHttpRequest').mockImplementation(
                () => xhrMockClass
            );
            xhrMockClass.onreadystatechange(new Event(''));

            // Add a table row
            testOutput = new Components.ProjectTableRow(
                projectsResponse[0].fields
            ).result;

            // Create app for the document
            let app = Object.assign(document.createElement('div'), {
                id: 'app',
            });
            let csrftoken = Object.assign(document.createElement('input'), {
                name: 'csrfmiddlewaretoken',
                value: 'test-csrf-token',
            });
            document.body.append(csrftoken, app);

            // Clear all mocks before mocking more
            jest.clearAllMocks();

            // Mock XHTTP
            let projectJson = [];
            projectJson[0] = {
                fields: {
                    client_name: 'Test New Client Name',
                    client_company: 'Test New Client Company',
                    client_email: 'Test New Client Email',
                    project_name: 'Test New Project Name',
                    project_type: 'FPD',
                    project_deadline: '2021-11-30',
                    expected_revenue: 10000,
                },
            };
            xhrMockClass = {
                open: jest.fn(),
                send: jest.fn(),
                onreadystatechange: jest.fn(),
                onload: jest.fn(),
                setRequestHeader: jest.fn(),
                readyState: 4,
                status: 200,
                response: JSON.stringify({
                    project_qs_serialized: JSON.stringify(projectJson),
                }),
            };
            jest.spyOn(window, 'XMLHttpRequest').mockImplementation(
                () => xhrMockClass
            );

            // Spy on the _showModal() method of the add payment modal class
            showModalSpy = jest
                .spyOn(Components.EditProjectModal.prototype, '_showModal')
                .mockImplementation(jest.fn());
            closeModalSpy = jest
                .spyOn(Components.EditProjectModal.prototype, '_closeModal')
                .mockImplementation(jest.fn());
            obtainFormSpy = jest
                .spyOn(RenderServices, '_obtainForm')
                .mockImplementation((string) => {
                    return Promise.resolve(response);
                });
        });

        it('Verify that the modal is created', async function () {
            // Mark project complete button
            let button = testOutput.querySelector(
                '[id="Test Slug 0-edit-row"]'
            );
            expect(button).not.toBeNull();
            button.click();

            let result = await expect(
                obtainFormSpy('/client-admin/obtain-edit-project-form')
            );

            let modal = document.querySelector(
                '[id="Test Slug 0-edit-project-modal"]'
            );

            let form = modal.querySelector('form[id="edit-project-form"]');
            let submitButton = modal.querySelector('button[type="button"]');

            // Start expecting that the modal is present
            expect(modal).not.toBeNull();
            expect(modal).not.toBeUndefined();
            expect(form).not.toBeNull();
            expect(form).not.toBeUndefined();
            expect(submitButton).not.toBeNull();
            expect(submitButton).not.toBeUndefined();
            expect(showModalSpy).toHaveBeenCalled();
        });

        it('Verify that the xhttp mock methods were called', async function () {
            let button = testOutput.querySelector(
                '[id="Test Slug 0-edit-row"]'
            );
            expect(button).not.toBeNull();
            button.click();

            let result = await expect(
                obtainFormSpy('/client-admin/obtain-edit-project-form')
            );

            // Change the input value in the modal and submit the form
            let modal = document.querySelector(
                '[id="Test Slug 0-edit-project-modal"]'
            );
            let submitButton = modal.querySelector('button[type="button"]');
            let form = modal.querySelector('form[id="edit-project-form"]');
            submitButton.click();

            // Verify all xhttp things were called
            expect(xhrMockClass.open).toHaveBeenCalledTimes(1);
            expect(xhrMockClass.open).toHaveBeenCalledWith(
                'POST',
                '/client-admin/save-edit-project-form'
            );
            expect(xhrMockClass.setRequestHeader).toHaveBeenCalledTimes(1);
            expect(xhrMockClass.setRequestHeader).toHaveBeenCalledWith(
                'X-CSRFToken',
                'test-csrf-token'
            );
            expect(xhrMockClass.send).toHaveBeenCalledTimes(1);
            expect(xhrMockClass.send).toBeCalledWith(new FormData(form));
        });

        it('Verify that the cell contents are updated after response', async function () {
            let button = testOutput.querySelector(
                '[id="Test Slug 0-edit-row"]'
            );
            expect(button).not.toBeNull();
            button.click();

            let result = await expect(
                obtainFormSpy('/client-admin/obtain-edit-project-form')
            );

            // Change the input value in the modal and submit the form
            let modal = document.querySelector(
                '[id="Test Slug 0-edit-project-modal"]'
            );
            let input = modal.querySelector('input[type="number"]');
            let submitButton = modal.querySelector('button[type="button"]');
            input.value = 500;
            submitButton.click();

            xhrMockClass.onload(new Event(''));

            let clientsNameCell = testOutput.childNodes[0];
            let clientsCompanyCell = testOutput.childNodes[1];
            let clientEmailCell = testOutput.childNodes[2];
            let projectNameCell = testOutput.childNodes[3];
            let projectTypeCell = testOutput.childNodes[4];
            let projectDeadlineCell = testOutput.childNodes[5];
            let expectedRevenueCell = testOutput.childNodes[6];

            expect(clientsNameCell.querySelector('span').textContent).toBe(
                'Test New Client Name'
            );
            expect(clientsCompanyCell.querySelector('span').textContent).toBe(
                'Test New Client Company'
            );
            expect(clientEmailCell.querySelector('span').textContent).toBe(
                'Test New Client Email'
            );
            expect(projectNameCell.querySelector('span').textContent).toBe(
                'Test New Project Name'
            );
            expect(projectTypeCell.querySelector('span').textContent).toBe(
                'Full Patent Draft'
            );
            expect(projectDeadlineCell.querySelector('span').textContent).toBe(
                'Nov 29 2021'
            );
            expect(expectedRevenueCell.querySelector('span').textContent).toBe(
                '$10000'
            );
        });

        afterEach(function () {
            document.body.innerHTML = '';
            jest.clearAllMocks();
        });
    });

    afterEach(function () {
        document.body.innerHTML = '';
        jest.clearAllMocks();
    });
});

describe('Test class ProjectTable', function () {
    let paymentsObject = [];
    for (let i = 0; i < 3; i++) {
        paymentsObject[i] = {};
        paymentsObject[i]['fields'] = {
            amount: 1000,
            payment_date: '2021-11-21',
        };
    }
    let projectsResponse = {};
    for (let i = 0; i < 50; i++) {
        projectsResponse[i] = {};
        projectsResponse[i]['fields'] = {};
        projectsResponse[i].fields.client_name = 'Test Name ' + i.toFixed(0);
        projectsResponse[i].fields.client_company =
            'Test Company ' + i.toFixed(0);
        projectsResponse[i].fields.client_email =
            'test_email_' + i.toFixed(0) + '@test.com';
        projectsResponse[i].fields.project_name =
            'Test Project ' + i.toFixed(0);
        projectsResponse[i].fields.project_type = 'PRR';
        projectsResponse[i].fields.project_deadline = '2021-11-21';
        projectsResponse[i].fields.project_estimated_days = 15;
        projectsResponse[i].fields.expected_revenue = 1000;
        projectsResponse[i].fields.start_date = '2021-11-21';
        projectsResponse[i].fields.end_date = '2021-11-21';
        projectsResponse[i].fields.slug = 'Test Slug ' + i.toFixed(0);
        projectsResponse[i].fields.project_deadline_full = 'Nov 20 2021';
        projectsResponse[i].fields.payments = JSON.stringify(paymentsObject);
    }
    let xhrMockClass = {
        open: jest.fn(),
        send: jest.fn(),
        onreadystatechange: jest.fn(),
        onload: jest.fn(),
        readyState: 4,
        status: 200,
        response: JSON.stringify(projectsResponse),
    };

    let columnHeads = [
        'Client Name',
        'Client Company',
        'Client Email',
        'Project Name',
        'Project Type',
        'Deadline',
        'Expected Revenue',
        'Payments',
        'Actions',
    ];
    let tableIdPrepend = 'project-table';

    beforeEach(function () {
        jest.spyOn(window, 'XMLHttpRequest').mockImplementation(
            () => xhrMockClass
        );
        xhrMockClass.onreadystatechange(new Event(''));
    });

    it('Class has the appropriate properties', async function () {
        let testOutput = await new Components.ProjectTable(
            columnHeads,
            tableIdPrepend
        );

        expect(testOutput).not.toBeNull();
        let properties = [
            'projectsObject',
            'projectsObjectColumnSorted',
            'pageNumber',
            'totalPages',
            'recordsPerPage',
            'columnSorted',
            'counter',
            'prevButton',
            'nextButton',
            'tableContainer',
            'result',
        ];
        properties.map((item) => {
            expect(testOutput.hasOwnProperty(item)).toBeTruthy();
        });
        expect(testOutput.recordsPerPage).toBe(10);
        expect(testOutput.pageNumber).toBe(1);
        expect(testOutput.totalPages).toBe(1);
        expect(testOutput.columnSorted).toBeFalsy();
    });

    it('Class produces an accurate result with prelim children', function () {
        let testOutput = new Components.ProjectTable(
            columnHeads,
            tableIdPrepend
        ).tableContainer;

        expect(testOutput).not.toBeNull();
        expect(testOutput.tagName.toLowerCase()).toBe('div');
        expect(testOutput.childNodes.length).toBe(3);

        let classes = ['w-11/12', 'mx-auto', 'my-12'];
        classes.map((item) => {
            expect(testOutput.classList.contains(item)).toBeTruthy();
        });

        let search = testOutput.childNodes[0];
        let table = testOutput.childNodes[1];
        let row = testOutput.childNodes[2];
        expect(search.nodeName.toLowerCase()).toBe('label');
        expect(table.nodeName.toLowerCase()).toBe('table');
        expect(row.nodeName.toLowerCase()).toBe('div');
    });

    it('Class produces an accurate first child', function () {
        let testOutput = new Components.ProjectTable(
            columnHeads,
            tableIdPrepend
        ).tableContainer;
        let search = testOutput.childNodes[0];

        expect(search).not.toBeNull();
        expect(search.nodeName.toLowerCase()).toBe('label');

        let classes = [
            'flex',
            'flex-row',
            'gap-2',
            'lato-regular',
            'w-60',
            'ml-auto',
            'mb-6',
        ];
        classes.map((item) => {
            expect(search.classList.contains(item)).toBeTruthy();
        });

        expect(search.childNodes[0].nodeName.toLowerCase()).toBe('span');
        expect(search.childNodes[0].textContent).toBe('Search');
        expect(search.childNodes[0].classList.contains('my-auto')).toBeTruthy();

        expect(search.childNodes[1].nodeName.toLowerCase()).toBe('input');
        expect(search.childNodes[1].type).toBe('text');
        expect(search.childNodes[1].name).toBe('project-table-search');
        expect(search.childNodes[1].id).toBe('project-table-search');
    });

    it('Class produces an accurate second child', function () {
        let testOutput = new Components.ProjectTable(
            columnHeads,
            tableIdPrepend
        ).tableContainer;
        let table = testOutput.childNodes[1];

        expect(table).not.toBeNull();
        expect(table.nodeName.toLowerCase()).toBe('table');
        expect(table.id).toBe('project-table');

        // Modifications to the table heads was successful
        let allTableHeads = table
            .querySelector('#project-table-head')
            .querySelectorAll('th');

        allTableHeads.forEach((element, index) => {
            let classes = ['w-44', 'lato-bold', 'bg-gray-300'];
            classes.map((thisClass) => {
                expect(element.classList.contains(thisClass)).toBeTruthy();
            });
            expect(element.textContent).toBe(columnHeads[index]);

            let buttonColumns = [5, 6, 7];
            if (buttonColumns.includes(index)) {
                expect(
                    element.querySelector(
                        '#project-table-sort-button-col-' + index
                    )
                ).not.toBeNull();
            } else {
                expect(
                    element.querySelector(
                        '#project-table-sort-button-col-' + index
                    )
                ).toBeNull();
            }
        });
    });

    it('Class produces an accurate third child', function () {
        let testOutput = new Components.ProjectTable(
            columnHeads,
            tableIdPrepend
        ).tableContainer;
        let row = testOutput.childNodes[2];

        expect(row).not.toBeNull();
        expect(row.nodeName.toLowerCase()).toBe('div');

        let classes = ['flex', 'flex-row', 'mt-6'];
        classes.map((item) => {
            expect(row.classList.contains(item)).toBeTruthy();
        });

        expect(row.childNodes[0].nodeName.toLowerCase()).toBe('h6');
        expect(row.childNodes[0].textContent).toBe('1 - 10 of 0');
        expect(row.childNodes[0].classList.contains('mr-auto')).toBeTruthy();
        expect(row.childNodes[0].id).toBe('project-table-counter-info');

        expect(row.childNodes[1].nodeName.toLowerCase()).toBe('div');
        expect(row.childNodes[1].classList.contains('ml-auto')).toBeTruthy();
        expect(row.childNodes[1].childNodes.length).toBe(2);
        for (let i = 0; i < row.childNodes[1].childNodes.length; i++) {
            expect(row.childNodes[1].childNodes[i].nodeName.toLowerCase()).toBe(
                'button'
            );
            expect(row.childNodes[1].childNodes[i].type).toBe('button');
            if (i === 0) {
                expect(
                    row.childNodes[1].childNodes[i].classList.contains('mr-3')
                ).toBeTruthy();
                expect(row.childNodes[1].childNodes[i].id).toBe(
                    'project-table-prev-page'
                );
                expect(
                    row.childNodes[1].childNodes[i]
                        .querySelector('i')
                        .classList.contains('fa-chevron-left')
                ).toBeTruthy();
            } else if (i === 1) {
                expect(
                    row.childNodes[1].childNodes[i].classList.contains('ml-3')
                ).toBeTruthy();
                expect(row.childNodes[1].childNodes[i].id).toBe(
                    'project-table-next-page'
                );
                expect(
                    row.childNodes[1].childNodes[i]
                        .querySelector('i')
                        .classList.contains('fa-chevron-right')
                ).toBeTruthy();
            }
        }
    });

    afterEach(function () {
        jest.clearAllMocks();
    });
});

describe('Test class OngoingProjectTable', function () {
    let paymentsObject = [];
    for (let i = 0; i < 3; i++) {
        paymentsObject[i] = {};
        paymentsObject[i]['fields'] = {
            amount: 1000,
            payment_date: '2021-11-21',
        };
    }
    let projectsResponse = [];
    for (let i = 0; i < 50; i++) {
        projectsResponse[i] = {};
        projectsResponse[i]['fields'] = {};
        projectsResponse[i].fields.client_name = 'Test Name ' + i.toFixed(0);
        projectsResponse[i].fields.client_company =
            'Test Company ' + i.toFixed(0);
        projectsResponse[i].fields.client_email =
            'test_email_' + i.toFixed(0) + '@test.com';
        projectsResponse[i].fields.project_name =
            'Test Project ' + i.toFixed(0);
        projectsResponse[i].fields.project_type = 'PRR';
        projectsResponse[i].fields.project_deadline = '2021-11-21';
        projectsResponse[i].fields.project_estimated_days = 15;
        projectsResponse[i].fields.expected_revenue = 1000;
        projectsResponse[i].fields.start_date = '2021-11-21';
        projectsResponse[i].fields.end_date = '2021-11-21';
        projectsResponse[i].fields.slug = 'Test Slug ' + i.toFixed(0);
        projectsResponse[i].fields.project_deadline_full = 'Nov 20 2021';
        projectsResponse[i].fields.payments = JSON.stringify(paymentsObject);

        if (i % 2 === 0) {
            projectsResponse[i].fields.is_project_complete = false;
        } else {
            projectsResponse[i].fields.is_project_complete = true;
        }
    }
    let xhrMockClass = {
        open: jest.fn(),
        send: jest.fn(),
        onreadystatechange: jest.fn(),
        onload: jest.fn(),
        readyState: 4,
        status: 200,
        response: JSON.stringify(projectsResponse),
    };

    let columnHeads = [
        'Client Name',
        'Client Company',
        'Client Email',
        'Project Name',
        'Project Type',
        'Deadline',
        'Expected Revenue',
        'Payments',
        'Actions',
    ];
    let tableIdPrepend = 'project-table';

    beforeEach(function () {
        jest.spyOn(window, 'XMLHttpRequest').mockImplementation(
            () => xhrMockClass
        );
        xhrMockClass.onreadystatechange(new Event(''));

        let navbarCounter = Object.assign(document.createElement('div'), {
            id: 'navbar-on-going-projects-counter',
        });
        let span = Object.assign(document.createElement('span'), {
            textContent: '3000',
        });
        navbarCounter.append(span);

        document.body.append(navbarCounter);
    });

    it('Class has the appropriate properties', async function () {
        let testOutput = await new Components.OngoingProjectTable(
            columnHeads,
            tableIdPrepend
        );

        expect(testOutput).not.toBeNull();
        let properties = [
            'projectsObject',
            'projectsObjectColumnSorted',
            'pageNumber',
            'totalPages',
            'recordsPerPage',
            'columnSorted',
            'counter',
            'prevButton',
            'nextButton',
            'tableContainer',
            'result',
            'tableId',
            'searchInputElement',
        ];
        properties.map((item) => {
            expect(testOutput.hasOwnProperty(item)).toBeTruthy();
        });
        expect(testOutput.recordsPerPage).toBe(10);
        expect(testOutput.pageNumber).toBe(1);
        expect(testOutput.totalPages).toBe(1);
        expect(testOutput.columnSorted).toBeFalsy();
    });

    it('Class produces an accurate result with prelim children', function () {
        let testOutput = new Components.OngoingProjectTable(
            columnHeads,
            tableIdPrepend
        ).tableContainer;

        expect(testOutput).not.toBeNull();
        expect(testOutput.tagName.toLowerCase()).toBe('div');
        expect(testOutput.childNodes.length).toBe(3);

        let classes = ['w-11/12', 'mx-auto', 'my-12'];
        classes.map((item) => {
            expect(testOutput.classList.contains(item)).toBeTruthy();
        });

        let search = testOutput.childNodes[0];
        let table = testOutput.childNodes[1];
        let row = testOutput.childNodes[2];
        expect(search.nodeName.toLowerCase()).toBe('label');
        expect(table.nodeName.toLowerCase()).toBe('table');
        expect(row.nodeName.toLowerCase()).toBe('div');
    });

    it('Class produces an accurate second child', function () {
        let testOutput = new Components.OngoingProjectTable(
            columnHeads,
            tableIdPrepend
        ).tableContainer;
        let table = testOutput.childNodes[1];

        expect(table).not.toBeNull();
        expect(table.nodeName.toLowerCase()).toBe('table');
        expect(table.id).toBe('project-table');

        // Expect navbar counter to have the appropriate text content
        let navbarCounter = document.getElementById(
            'navbar-on-going-projects-counter'
        );
        expect(navbarCounter.querySelector('span').textContent).toBe('25');
    });

    afterEach(function () {
        jest.clearAllMocks();
    });
});

describe('Test class TypicalModal', function () {
    beforeEach(function () {
        jest.useFakeTimers();
    });

    it('Class has the required properties', function () {
        let testOutput = new Components.TypicalModal();

        expect(testOutput).not.toBeNull();
        let expectedProperties = [
            'result',
            'mainDiv',
            'backgroundOverlayDiv',
            'mainContentDiv',
            'modalContentDiv',
        ];
        expectedProperties.map((item) => {
            expect(testOutput.hasOwnProperty(item)).toBeTruthy();
        });
    });

    it('Class produces the right result', function () {
        let testOutput = new Components.TypicalModal().result;

        expect(testOutput).not.toBeNull();
        let classes = ['fixed', 'z-10', 'inset-0', 'overflow-y-auto', 'hidden'];
        classes.map((item) => {
            expect(testOutput.classList.contains(item)).toBeTruthy();
        });
        expect(testOutput.childNodes.length).toBe(1);
        expect(testOutput.hasAttribute('aria-labelledby')).toBeTruthy();
        expect(testOutput.hasAttribute('role')).toBeTruthy();
        expect(testOutput.hasAttribute('aria-modal')).toBeTruthy();
        expect(testOutput.getAttribute('aria-labelledby')).toBe('modal-title');
        expect(testOutput.getAttribute('role')).toBe('dialog');
        expect(testOutput.getAttribute('aria-modal')).toBe('true');
    });

    it('Class produces an accurate first child', function () {
        let testOutput = new Components.TypicalModal().result;
        let child = testOutput.childNodes[0];

        expect(child).not.toBeNull();
        let childClasses = [
            'flex',
            'items-end',
            'justify-center',
            'min-h-screen',
            'pt-4',
            'px-4',
            'pb-20',
            'text-center',
            'sm:block',
            'sm:p-0',
        ];
        childClasses.map((item) => {
            expect(
                testOutput.childNodes[0].classList.contains(item)
            ).toBeTruthy();
        });
        expect(child.childNodes.length).toBe(3);
    });

    it('Class produces an accurate background overlay', function () {
        let testOutput = new Components.TypicalModal().result;
        let child = testOutput.childNodes[0];
        let backgroundOverlay = child.childNodes[0];

        expect(backgroundOverlay).not.toBeNull();
        let classes = [
            'fixed',
            'inset-0',
            'bg-gray-500',
            'bg-opacity-75',
            'transition-opacity',
            'ease-out',
            'duration-300',
            'opacity-0',
        ];
        classes.map((item) => {
            expect(backgroundOverlay.classList.contains(item)).toBeTruthy();
        });
        expect(backgroundOverlay.hasAttribute('aria-hidden')).toBeTruthy();
        expect(backgroundOverlay.getAttribute('aria-hidden')).toBe('true');
    });

    it('Class produces an accurate span to trick browser', function () {
        let testOutput = new Components.TypicalModal().result;
        let child = testOutput.childNodes[0];
        let span = child.childNodes[1];

        expect(span).not.toBeNull();
        expect(span.nodeName.toLowerCase()).toBe('span');
        let classes = [
            'hidden',
            'sm:inline-block',
            'sm:align-middle',
            'sm:h-screen',
        ];
        classes.map((item) => {
            expect(span.classList.contains(item)).toBeTruthy();
        });
        expect(span.hasAttribute('aria-hidden')).toBeTruthy();
        expect(span.getAttribute('aria-hidden')).toBe('true');
    });

    it('Class produces an accurate main content div', function () {
        let testOutput = new Components.TypicalModal().result;
        let child = testOutput.childNodes[0];
        let mainContentDiv = child.childNodes[2];

        expect(mainContentDiv).not.toBeNull();
        let classes = [
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
            'sm:scale-95',
        ];
        classes.map((item) => {
            expect(mainContentDiv.classList.contains(item)).toBeTruthy();
        });

        expect(mainContentDiv.childNodes.length).toBe(1);
        let childClasses = [
            'bg-white',
            'px-4',
            'pt-5',
            'pb-4',
            'sm:p-6',
            'sm:pb-4',
        ];
        childClasses.map((item) => {
            expect(
                mainContentDiv.childNodes[0].classList.contains(item)
            ).toBeTruthy();
        });
    });

    it('Class produces the right result after showModal/closeModal', function () {
        let testOutput = new Components.TypicalModal();
        let testOutputResult = testOutput.result;

        let easeAndDurationClassesRem = ['ease-in', 'duration-200'];
        let easeAndDurationClassesAdd = ['ease-out', 'duration-300'];

        /////////////////////////////// Show Modal ///////////////////////////////
        testOutput._showModal();
        expect(testOutputResult.classList.contains('hidden')).toBeFalsy();
        easeAndDurationClassesRem.map((item) => {
            expect(
                testOutput.backgroundOverlayDiv.classList.contains(item)
            ).toBeFalsy();
            expect(
                testOutput.mainContentDiv.classList.contains(item)
            ).toBeFalsy();
        });

        easeAndDurationClassesAdd.map((item) => {
            expect(
                testOutput.backgroundOverlayDiv.classList.contains(item)
            ).toBeTruthy();
            expect(
                testOutput.mainContentDiv.classList.contains(item)
            ).toBeTruthy();
        });

        jest.advanceTimersByTime(100);
        expect(
            testOutput.backgroundOverlayDiv.classList.contains('opacity-0')
        ).toBeFalsy();
        expect(
            testOutput.backgroundOverlayDiv.classList.contains('opacity-100')
        ).toBeTruthy();
        let mainContentDivClassesRem = [
            'opacity-0',
            'translate-y-4',
            'sm:translate-y-0',
            'sm:scale-95',
        ];
        let mainContentDivClassesAdd = [
            'opacity-100',
            'translate-y-0',
            'sm:scale-100',
        ];
        mainContentDivClassesRem.map((item) => {
            expect(
                testOutput.mainContentDiv.classList.contains(item)
            ).toBeFalsy();
        });
        mainContentDivClassesAdd.map((item) => {
            expect(
                testOutput.mainContentDiv.classList.contains(item)
            ).toBeTruthy();
        });

        ////////////////////////////// Close Modal //////////////////////////////
        testOutput._closeModal();
        easeAndDurationClassesRem.map((item) => {
            expect(
                testOutput.backgroundOverlayDiv.classList.contains(item)
            ).toBeTruthy();
            expect(
                testOutput.mainContentDiv.classList.contains(item)
            ).toBeTruthy();
        });

        easeAndDurationClassesAdd.map((item) => {
            expect(
                testOutput.backgroundOverlayDiv.classList.contains(item)
            ).toBeFalsy();
            expect(
                testOutput.mainContentDiv.classList.contains(item)
            ).toBeFalsy();
        });
        jest.advanceTimersByTime(100);
        expect(
            testOutput.backgroundOverlayDiv.classList.contains('opacity-100')
        ).toBeFalsy();
        expect(
            testOutput.backgroundOverlayDiv.classList.contains('opacity-0')
        ).toBeTruthy();
        mainContentDivClassesRem.map((item) => {
            expect(
                testOutput.mainContentDiv.classList.contains(item)
            ).toBeTruthy();
        });
        mainContentDivClassesAdd.map((item) => {
            expect(
                testOutput.mainContentDiv.classList.contains(item)
            ).toBeFalsy();
        });
        jest.advanceTimersByTime(800);
        expect(testOutputResult.classList.contains('hidden')).toBeTruthy();
    });

    afterEach(function () {
        jest.clearAllTimers();
    });
});

describe('Test class AddPaymentModal', function () {
    it('Class has the required properties', function () {
        let testOutput = new Components.AddPaymentModal();

        expect(testOutput).not.toBeNull();
        let expectedProperties = [
            'result',
            'mainDiv',
            'backgroundOverlayDiv',
            'mainContentDiv',
            'modalContentDiv',
            'submitButton',
        ];
        expectedProperties.map((item) => {
            expect(testOutput.hasOwnProperty(item)).toBeTruthy();
        });
    });

    it('Class produces the right result', function () {
        let testOutput = new Components.AddPaymentModal();
        let testOutputResult = testOutput.result;
        let modalContentDiv = testOutput.modalContentDiv;

        expect(modalContentDiv).not.toBeNull();
        expect(modalContentDiv.childNodes.length).toBe(1);
        expect(modalContentDiv.childNodes[0].nodeName.toLowerCase()).toBe(
            'div'
        );
        let classes = ['sm:flex', 'sm:items-start', 'sm:flex-col'];
        classes.map((item) => {
            expect(
                modalContentDiv.childNodes[0].classList.contains(item)
            ).toBeTruthy();
        });
        expect(modalContentDiv.childNodes[0].childNodes.length).toBe(4);
    });

    it('Class produces modalContentDiv that is accurate (heading)', function () {
        let testOutput = new Components.AddPaymentModal();
        let testOutputResult = testOutput.result;
        let modalContentDiv = testOutput.modalContentDiv;
        let flex = modalContentDiv.childNodes[0];
        let heading = flex.childNodes[0];

        expect(heading).not.toBeNull();
        expect(heading.nodeName.toLowerCase()).toBe('h6');
        expect(heading.textContent).toBe('Add Payment');
        let classes = ['mx-auto', 'text-center'];
        classes.map((item) => {
            expect(heading.classList.contains(item)).toBeTruthy();
        });
    });

    it('Class produces modalContentDiv that is accurate (hr)', function () {
        let testOutput = new Components.AddPaymentModal();
        let testOutputResult = testOutput.result;
        let modalContentDiv = testOutput.modalContentDiv;
        let flex = modalContentDiv.childNodes[0];
        let hr = flex.childNodes[1];

        expect(hr).not.toBeNull();
        expect(hr.nodeName.toLowerCase()).toBe('hr');
        let classes = [
            'mt-4',
            'mb-4',
            'w-full',
            'hr-bold',
            'hr-light',
            'mx-auto',
        ];
        classes.map((item) => {
            expect(hr.classList.contains(item)).toBeTruthy();
        });
    });

    it('Class produces modalContentDiv that is accurate (number input)', function () {
        let testOutput = new Components.AddPaymentModal();
        let testOutputResult = testOutput.result;
        let modalContentDiv = testOutput.modalContentDiv;
        let flex = modalContentDiv.childNodes[0];
        let inputWithLabel = flex.childNodes[2];
        let input = inputWithLabel.querySelector('input');

        expect(inputWithLabel).not.toBeNull();
        expect(inputWithLabel.nodeName.toLowerCase()).toBe('label');
        expect(inputWithLabel.textContent).toBe('Payment Amount:');
        let classes = ['w-full'];
        classes.map((item) => {
            expect(inputWithLabel.classList.contains(item)).toBeTruthy();
        });
        expect(input.type).toBe('number');
        expect(input.min).toBe('0');
        expect(input.max).toBe('1000000');
        expect(input.value).toBe('0');
    });

    it('Class produces modalContentDiv that is accurate (submit button)', function () {
        let testOutput = new Components.AddPaymentModal();
        let testOutputResult = testOutput.result;
        let modalContentDiv = testOutput.modalContentDiv;
        let flex = modalContentDiv.childNodes[0];
        let submitButton = flex.childNodes[3];

        expect(submitButton).not.toBeNull();
        expect(submitButton.nodeName.toLowerCase()).toBe('button');
        expect(submitButton.textContent).toBe('Submit');
        expect(submitButton.type).toBe('button');

        let classesRem = ['md:text-lg', 'md:py-3'];
        let classesAdd = ['md:text-base', 'md:py-2', 'mt-5'];
        classesRem.map((item) => {
            expect(submitButton.classList.contains(item)).toBeFalsy();
        });
        classesAdd.map((item) => {
            expect(submitButton.classList.contains(item)).toBeTruthy();
        });
    });
});

describe('Test class EditProjectModal', function () {
    let projectDetailsObject = {
        slug: 'Test Slug',
        client_name: 'Test Client Name',
        client_company: 'Test Client Company',
        client_email: 'testemail@test.com',
        project_name: 'Test Project Name',
        project_type: 'FPD',
        project_deadline: '2021-11-21',
        expected_revenue: 5000,
    };

    beforeEach(function () {
        let response = `<input type="text" name="client_name"
        id="edit_project_row_clientName" maxlength="250" required><input
        type="text" name="client_company" id="edit_project_row_clientCompany"
        maxlength="250"><input type="email" name="client_email"
        id="edit_project_row_clientEmail" maxlength="254" required><input
        type="text" name="project_name" id="edit_project_row_projectName"
        maxlength="250" required><select name="project_type"
        id="edit_project_row_projectType" required><option value=""
        selected>---------</option><option value="PAR">Patent
        Research</option><option value="VS">Validity and Invalidity
        Search</option><option value="FTO">Freedom to Operate
        Search</option><option value="PRR">Product Research</option><option
        value="LAN">Landscape / State of the Art</option><option
        value="TS">Trademark Search</option><option value="PD">Provisional
        Draft</option><option value="FPD">Full Patent
        Draft</option></select><input type="date" name="project_deadline"
        id="edit_project_row_projectDeadline" required><input type="number"
        name="expected_revenue" value="0" id="edit_project_row_expectedRevenue"
        min="0" max="1000000" value="0" required>`;

        jest.spyOn(RenderServices, '_obtainForm').mockImplementation(
            (string) => {
                return Promise.resolve(response);
            }
        );
    });

    it('Class has the required properties', function () {
        let testOutput = new Components.EditProjectModal(projectDetailsObject);

        expect(testOutput).not.toBeNull();
        let expectedProperties = [
            'result',
            'mainDiv',
            'backgroundOverlayDiv',
            'mainContentDiv',
            'modalContentDiv',
            'projectDetailsObject',
            'submitButton',
        ];
        expectedProperties.map((item) => {
            expect(testOutput.hasOwnProperty(item)).toBeTruthy();
        });
    });

    it('Class produces the right result', async function () {
        let testOutput = new Components.EditProjectModal(projectDetailsObject);
        let testOutputResult = await testOutput.result;
        let modalContentDiv = testOutput.modalContentDiv;

        expect(modalContentDiv).not.toBeNull();
        expect(modalContentDiv.childNodes.length).toBe(1);
        expect(modalContentDiv.childNodes[0].nodeName.toLowerCase()).toBe(
            'div'
        );
        let classes = ['sm:flex', 'sm:items-start', 'sm:flex-col'];
        classes.map((item) => {
            expect(
                modalContentDiv.childNodes[0].classList.contains(item)
            ).toBeTruthy();
        });
        expect(modalContentDiv.childNodes[0].childNodes.length).toBe(2);
    });

    it('Class produces modalContentDiv that is accurate (heading)', async function () {
        let testOutput = new Components.EditProjectModal(projectDetailsObject);
        let testOutputResult = await testOutput.result;
        let modalContentDiv = testOutput.modalContentDiv;
        let flex = modalContentDiv.childNodes[0];
        let heading = flex.childNodes[0];

        expect(heading).not.toBeNull();
        expect(heading.nodeName.toLowerCase()).toBe('h6');
        expect(heading.textContent).toBe('Edit Project');
        let classes = ['mx-auto', 'text-center', 'mb-8'];
        classes.map((item) => {
            expect(heading.classList.contains(item)).toBeTruthy();
        });
    });

    it('Class produces modalContentDiv that is accurate (form)', async function () {
        let testOutput = new Components.EditProjectModal(projectDetailsObject);
        let testOutputResult = await testOutput.result;
        let modalContentDiv = testOutput.modalContentDiv;
        let flex = modalContentDiv.childNodes[0];
        let form = flex.childNodes[1];

        expect(form).not.toBeNull();
        expect(form.nodeName.toLowerCase()).toBe('form');
        expect(form.classList.contains('md:w-3/4')).toBeFalsy();
        expect(form.classList.contains('md:w-10/12')).toBeTruthy();

        // Slug Input
        let slugInput = form.querySelectorAll('input[type="hidden"]')[0];
        expect(slugInput).not.toBeNull();
        expect(slugInput.name).toBe('project_slug');
        expect(slugInput.id).toBe('edit_project_row_slug');
        expect(slugInput.value).toBe('Test Slug');

        let nameInput = form.querySelectorAll('input[type="text"]')[0];
        expect(nameInput).not.toBeNull();
        expect(nameInput.value).toBe('Test Client Name');
        expect(nameInput.parentNode.textContent).toBe('Client Name*');

        let companyInput = form.querySelectorAll('input[type="text"]')[1];
        expect(companyInput).not.toBeNull();
        expect(companyInput.value).toBe('Test Client Company');
        expect(companyInput.parentNode.textContent).toBe(
            'Client Company (Optional)'
        );

        let emailInput = form.querySelectorAll('input[type="email"]')[0];
        expect(emailInput).not.toBeNull();
        expect(emailInput.value).toBe('testemail@test.com');
        expect(emailInput.parentNode.textContent).toBe(
            'Client Email (Optional)'
        );

        let projectNameInput = form.querySelectorAll('input[type="text"]')[2];
        expect(projectNameInput).not.toBeNull();
        expect(projectNameInput.value).toBe('Test Project Name');
        expect(projectNameInput.parentNode.textContent).toBe('Project Name*');

        let projectTypeSelect = form.querySelectorAll('select')[0];
        expect(projectTypeSelect).not.toBeNull();
        expect(projectTypeSelect.value).toBe('FPD');
        expect(
            projectTypeSelect.parentNode.querySelector('span').textContent
        ).toBe('Project Type*');

        let projectDeadline = form.querySelectorAll('input[type="date"]')[0];
        expect(projectDeadline).not.toBeNull();
        expect(projectDeadline.value).toBe('2021-11-21');
        expect(projectDeadline.parentNode.textContent).toBe(
            'Project Deadline*'
        );

        let expectedRevenue = form.querySelectorAll('input[type="number"]')[0];
        expect(expectedRevenue).not.toBeNull();
        expect(expectedRevenue.value).toBe('5000');
        expect(expectedRevenue.parentNode.textContent).toBe(
            'Expected Revenue*'
        );
    });

    afterEach(function () {
        jest.clearAllMocks();
    });
});
