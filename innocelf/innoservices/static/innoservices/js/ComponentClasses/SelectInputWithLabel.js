'use strict';

import { TextInputWithLabel } from './TextInputWithLabel.js';

/**
 * The Select Input with Label extends the Text Input with Label element and
 * can also be used on a Form element. This however, is a select input element
 */
export class SelectInputWithLabel extends TextInputWithLabel {
    constructor(labelText, inputElement) {
        super(labelText, inputElement);
    }
    render() {
        this._createSpan();
        this._createSelectInput();
        this.result.append(this.labelTextSpan, this.inputElement);
        return this;
    }
    _createSelectInput() {
        let inputClasses = [
            'mt-0',
            'block',
            'lato-regular',
            'bg-transparent',
            'w-full',
            'text-sm',
            'p-2',
            'border-0',
            'border-b',
            // 'border-gray-200',
            'border-gray-700',
            'focus:ring-0',
            'focus:border-black',
        ];
        inputClasses.map((item) => {
            this.inputElement.classList.add(item);
        });
    }
}
