'use strict';

/**
 * The class renders a `Submit` button with the provided text content
 */
export class TypicalFormSubmitButton {
    constructor(textContent) {
        this.textContent = textContent;
        this.result = document.createElement('button');
        this.result.type = 'submit';
        this.result.classList.add(
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
            'bg-innoblack',
            'text-white',
            'focus:ring',
            'focus:ring-innoblack',
            'focus:ring-offset-4',
            'hover:bg-gray-800',
            'text-sm',
            'md:text-lg',
            'md:py-3',
            'md:px-8'
        );
        this.result.textContent = this.textContent;
    }
}
