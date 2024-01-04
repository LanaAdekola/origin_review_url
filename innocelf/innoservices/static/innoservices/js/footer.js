'use strict';

import { ContactUsForm } from './ComponentClasses/ContactUsForm.js';

function renderContactUsFormFooter() {
    let formContainer = new ContactUsForm().result;
    formContainer.classList.add('lg:absolute', 'lg:left-0', 'lg:-bottom-6');
    document.getElementById('contact-us-form-div').append(formContainer)
}

renderContactUsFormFooter()