'use strict';
/**
 * The class is a Text Input with a Label that can be rendered on any form element
 * that needs a text input
 */
export class TextInputWithLabel {
    constructor(labelText, inputElement) {
        this.labelText = labelText;
        this.inputElement = inputElement;
        this.result = document.createElement('label');
        this.labelTextSpan = document.createElement('span');
        this.labelClasses = ['block', 'lato-regular'];
        this.labelClasses.map((item) => {
            this.result.classList.add(item);
        });
    }
    render() {
        this._createSpan();
        this._createInput();
        this.result.append(this.labelTextSpan, this.inputElement);
        return this;
    }
    _createSpan() {
        let spanClasses = ['text-gray-700', 'lato-regular'];
        spanClasses.map((item) => {
            this.labelTextSpan.classList.add(item);
        });
        this.labelTextSpan.id = this.inputElement.name + '-label-span';
        this.labelTextSpan.textContent = this.labelText;
    }
    _createInput() {
        let inputClasses = [
            'mt-0',
            'block',
            'lato-regular',
            'w-full',
            'p-2',
            'text-sm',
            'border-0',
            'border-b',
            // 'border-gray-200',
            'border-gray-500',
            'focus:ring-0',
            'focus:border-black',
        ];
        inputClasses.map((item) => {
            this.inputElement.classList.add(item);
        });
    }
}
