'use strict';
import * as ComponentServices from '/static/innoservices/js/components_ts.js';

/**
 * The function returns a container that has a different links to download recent
 * invoices
 * @returns Container with the generate invoice functionality
 */
export function downloadInvoicesContainer() {
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
    container.id = 'download-invoices-container';

    let heading = new ComponentServices.HeadingOrParagraph(
        'h5',
        'Download Recent Invoices'
    ).renderWithClass(['mt-5', 'mb-10', 'text-center']).result;
    container.append(heading);

    getRecentInvoices().then((data) => {
        let response = data;
        let responseJson = JSON.parse(data);

        responseJson.map((item) => {
            let pathnameFilename = item.fields.filename;
            let filename = pathnameFilename.split(
                '/media/GeneratedInvoices/'
            )[1];
            let row = createRowForEachInvoice(filename, pathnameFilename);
            container.append(row);
        });
    });
    return container;
}

/**
 * The function returns a row (div element) that lets the user download the
 * current invoice
 * @param {string} filename The filename of the invoice (no path)
 * @param {string} pathnameFilename The filename with the pathname of the invoice
 * generated for download
 * @returns Div element which is a row that lets the user download the current invoice
 */
export function createRowForEachInvoice(filename, pathnameFilename) {
    let row = document.createElement('div');
    row.classList.add('grid', 'grid-cols-4', 'w-full', 'my-3');

    let filenamePara = new ComponentServices.HeadingOrParagraph(
        'p',
        filename
    ).renderWithClass(['col-span-3']).result;
    let downloadButton = new ComponentServices.AnchorLinks(
        'Download'
    ).renderWithTextAndUnderline().result;
    downloadButton.classList.add('self-center', 'justify-self-center');
    downloadButton.href = pathnameFilename;
    downloadButton.download = true;

    row.append(filenamePara, downloadButton);

    return row;
}

/**
 * The function returns a promise with the 5 latest invoice objects after it queries
 * them from the backend
 * @returns Promise with the 5 latest invoice objects from the backend
 */
export function getRecentInvoices() {
    return new Promise((resolve) => {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                resolve(this.response);
            }
        };
        xhttp.open('GET', '/client-admin/download-invoices');
        xhttp.send();
    });
}
