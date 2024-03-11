'use strict';

import { HeadingOrParagraph } from './HeadingOrParagraph.js';

/**
 * The class is the First Page List Item that lives besides the homepage graphic
 */
export class FirstPageListItem {
    constructor(listText) {
        this.listText = listText;
        this.result = document.createElement('div');
    }
    render() {
        let desiredClasses = ['flex', 'items-center', 'my-2'];
        desiredClasses.map((item) => {
            this.result.classList.add(item);
        });
        this.addCheck();
        this.addListText();
        return this;
    }
    addCheck() {
        let addCheck = document.createElement('i');
        let desiredClassList = [
            'fas',
            'fa-check-circle',
            'mr-5',
            'text-xl',
            'sm:text-xl',
            'lg:text-2xl',
            '2xl:text-3xl',
        ];
        desiredClassList.map((item) => {
            addCheck.classList.add(item);
        });
        this.result.append(addCheck);
    }
    addListText() {
        let listTextTag = new HeadingOrParagraph('h6', this.listText).result;
        listTextTag.classList.replace('lato-semibold', 'lato-regular');
        listTextTag.classList.remove('font-semibold');
        this.result.append(listTextTag);
    }
}
