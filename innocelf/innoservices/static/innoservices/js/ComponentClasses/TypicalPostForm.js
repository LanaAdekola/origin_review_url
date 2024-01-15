'use strict';

/**
 * The class renders a typical post form where elements can be added as inputs
 */
export class TypicalPostForm {
    constructor(formId) {
        this.formId = formId;
        this.result = document.createElement('form');
        // Set attributes and properties of the form
        this.result.method = 'POST';
        this.result.enctype = 'application/x-www-form-urlencoded';
        this.result.id = this.formId;
        this.result.classList.add(
            'flex',
            'flex-col',
            'gap-6',
            'w-11/12',
            'm-auto',
            'transition',
            'duration-150',
            'ease-in-out',
            'md:w-3/4'
        );
    }
}
