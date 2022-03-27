'use strict';

import { HeadingOrParagraph } from './HeadingOrParagraph.js';

/**
 * The class is a Frequently Asked Question object that can be rendered on the
 * Frequently Asked Questions page
 */
export class FAQ {
    constructor(question, answer) {
        this.result = document.createElement('div');
        this.button = document.createElement('button');
        this.container = document.createElement('div');
        this.question = question;
        this.answer = answer;
        this._addQuestion();
        this._addAnswer();
    }
    render() {
        let resultClasses = ['grid', 'grid-cols-1', 'shadow-md'];
        resultClasses.map((item) => {
            this.result.classList.add(item);
        });
        this.result.append(this.button, this.container);
        let buttonClickFunc = this.__buttonClick;
        let container = this.container;
        this.button.addEventListener('click', function () {
            buttonClickFunc(container);
        });
        return this;
    }
    _addQuestion() {
        this.button.type = 'button';
        this.button.textContent = this.question;
        let buttonClasses = [
            'flex',
            'text-left',
            'lato-regular',
            'text-base',
            'px-4',
            'py-6',
            //'bg-gray-100',
            'border',
            'border-gray-100',
            'hover:border-gray-500',
            'focus:border-gray-500',
        ];
        buttonClasses.map((item) => {
            this.button.classList.add(item);
        });
        let icon = document.createElement('i');
        let iconClasses = [
            'fas',
            'fa-chevron-down',
            'text-xs',
            'ml-auto',
            'self-center',
        ];
        iconClasses.map((item) => {
            icon.classList.add(item);
        });
        this.button.append(icon);
    }
    _addAnswer() {
        let containerClasses = ['container', 'p-4', 'hidden'];
        containerClasses.map((item) => {
            this.container.classList.add(item);
        });
        this.container.setAttribute('data-expand', 'true');
        let heading = new HeadingOrParagraph('p', this.answer).result;
        this.container.append(heading);
    }
    __buttonClick(container) {
        container.classList.toggle('hidden');
    }
}
