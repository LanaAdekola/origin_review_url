'use strict';

import { HeadingOrParagraph } from './HeadingOrParagraph.js';
import { AnchorLinks } from './AnchorLinks.js';
import { SelectInputWithLabel } from './SelectInputWithLabel.js';
import { TextInputWithLabel } from './TextInputWithLabel.js';
import { TypicalFormSubmitButton } from './TypicalFormSubmitButton.js';
import { _importSVG, _parseSVG, _submitForm, _obtainForm } from '../utils.js';

/**
 * Class is a contact us form that will be used in several places for
 * creating a contact us form
 */
export class ContactUsForm {
    constructor(isModal = false, modal = null) {
        this.isModal = isModal;
        this.modal = modal;

        this.result = document.createElement('div');
        this.result.classList.add(
            'flex',
            'flex-col',
            'w-full',
            'px-4',
            'py-5',
            'mx-auto',
            'bg-gradient-to-r',
            'from-gray-50',
            'to-gray-100',
            'drop-shadow-md',
            'sm:px-16',
            'sm:py-8',
            'md:w-2/3',
            'lg:px-8',
            'lg:w-1/2',
            'xl:px-16',
            'xl:py-8',
            'xl:max-w-xl'
        );
        this.result.style.borderRadius = '35px';

        this.form = document.createElement('form');
        this.form.method = 'POST';
        this.form.enctype = 'application/x-www-form-urlencoded';

        this.heading = new HeadingOrParagraph(
            'h3',
            'Contact us'
        ).renderWithClass(['mb-4', 'text-black', 'text-center']).result;
        this.paragraph = new HeadingOrParagraph(
            'p',
            `Get started by providing your contact below.`
        ).renderWithClass(['mb-8', 'text-black', 'text-center']).result;

        this.orHeading = new HeadingOrParagraph('h4', 'OR').renderWithClass([
            'text-black',
            'text-center',
            'my-5',
        ]).result;
        this.calendlyButton = new AnchorLinks(
            'Schedule via Calendly'
        ).renderLargeHollowInnocelfButton().result;
        this.calendlyButton.classList.add('text-innoblack');
        this.calendlyButton.href =
            'https://calendly.com/innocelf/virtual-appointment';

        this.result.append(this.form, this.orHeading, this.calendlyButton);

        this.csrfToken = this.obtainCSRF();
        this.obtainForm();
    }

    obtainCSRF() {
        return new Promise((resolve) => {
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    resolve(this.response);
                }
            };
            xhttp.open('GET', '/obtain-contact-us-form-csrf');
            xhttp.send();
        });
    }

    submitForm() {
        let formData = new FormData(this.form);
        let xhttp = new XMLHttpRequest();
        xhttp.open('POST', '/receive-contact-us-form/');
        xhttp.send(formData);

        xhttp.onload = () => {
            let response = xhttp.response;
            let responseJson = JSON.parse(response);

            let message;
            if (responseJson.hasOwnProperty('Success')) {
                message = new HeadingOrParagraph(
                    'h3',
                    responseJson['Success']
                ).renderWithClass([
                    'm-auto',
                    'text-black',
                    'transition-opacity',
                    'duration-500',
                    'ease-in-out',
                    'opacity-0',
                ]).result;
            } else if (responseJson.hasOwnProperty('Failure')) {
                message = new HeadingOrParagraph(
                    'h3',
                    responseJson['Success']
                ).renderWithClass([
                    'm-auto',
                    'text-red-500',
                    'transition-opacity',
                    'duration-500',
                    'ease-in-out',
                    'opacity-0',
                ]).result;
            }

            this.form.innerHTML = '';
            this.form.append(message);

            setTimeout(() => {
                message.classList.replace('opacity-0', 'opacity-100');
            }, 800);
            setTimeout(() => {
                if (this.isModal) {
                    this.modal._closeModal();
                } else {
                    this.form.innerHTML = '';
                    this.obtainForm();
                }
            }, 6000);
        };
    }

    obtainForm() {
        _obtainForm('/obtain-contact-us-form').then((data) => {
            let form = new DOMParser().parseFromString(data, 'text/html');

            let fullName = new TextInputWithLabel(
                'Name*',
                form.querySelector('[name="full_name"]')
            ).render().result;
            fullName = this.__changeClassListFormInput(fullName);
            let email = new TextInputWithLabel(
                'Email Address*',
                form.querySelector('[name="email"]')
            ).render().result;
            email = this.__changeClassListFormInput(email);
            let reason = new SelectInputWithLabel(
                `Today's Inquiry Topic*`,
                form.querySelector('[name="inquiry_reason"]')
            ).render().result;
            reason = this.__changeClassListFormInput(reason);
            reason
                .querySelector('select')
                .setAttribute('style', '-webkit-appearance: none;');

            let submitButton = new TypicalFormSubmitButton('Submit').result;
            submitButton.classList.replace('rounded-xl', 'rounded-full');
            submitButton.classList.add('mt-3');

            this.obtainCSRF().then((csrfResponse) => {
                let csrfResponseDom = new DOMParser().parseFromString(
                    csrfResponse,
                    'text/html'
                );
                let csrfResponseInput = csrfResponseDom.querySelector(
                    'input[type="hidden"]'
                );

                this.form.append(
                    this.heading,
                    this.paragraph,
                    csrfResponseInput,
                    fullName,
                    email,
                    reason,
                    submitButton
                );
            });

            submitButton.onclick = (event) => {
                if (this.form.checkValidity()) {
                    event.preventDefault();
                    this.submitForm();
                }
            };
        });
    }

    __changeClassListFormInput(inputElement, inputClassList) {
        let inputElementIn = inputElement.querySelector('input');
        if (!inputElementIn) {
            inputElementIn = inputElement.querySelector('select');
        }

        inputElement.querySelector('span').remove();

        inputElementIn.className = '';
        inputElementIn.classList.add(
            'mt-0',
            'block',
            'lato-regular',
            'w-full',
            'px-5',
            'py-4',
            'text-sm',
            'focus:ring-0',
            'focus:border-black',
            'rounded-full',
            'text-black',
            'bg-white',
            'my-5'
        );
        return inputElement;
    }
}
