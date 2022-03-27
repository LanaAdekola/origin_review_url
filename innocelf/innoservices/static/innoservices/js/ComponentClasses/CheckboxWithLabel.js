'use strict';

import { TextInputWithLabel } from './TextInputWithLabel.js';

/**
 * The Checkbox Input with Label extends the Text Input with Label element and
 * can also be used on a Form element. This however, is a checkbox input element
 */
export class CheckboxWithLabel extends TextInputWithLabel {
    constructor(labelText, inputElement) {
        super(labelText, inputElement);

        this.result.className = '';
        this.labelClasses = [
            'flex',
            'items-center',
            'lato-regular',
            'cursor-pointer',
        ];
        this.labelClasses.map((item) => {
            this.result.classList.add(item);
        });

        this.labelTextSpan.classList.add('ml-4');
    }
    render() {
        this._createCheckbox();
        this._createSpan();
        this.result.append(this.inputElement, this.labelTextSpan);
        return this;
    }
    _createCheckbox() {
        let inputClasses = [
            'h-5',
            'w-5',
            'cursor-pointer',
            'rounded',
            'bg-gray-200',
            'border-transparent',
            'focus:border-transparent',
            'focus:bg-gray-200',
            'text-gray-700',
            'focus:ring-1',
            'focus:ring-offset-2',
            'focus:ring-gray-500',
            'active:bg-black',
        ];
        inputClasses.map((item) => {
            this.inputElement.classList.add(item);
        });
    }
}
