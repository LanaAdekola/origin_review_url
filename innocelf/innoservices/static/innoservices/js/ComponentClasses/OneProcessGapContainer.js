'use strict';

import { HeadingOrParagraph } from './HeadingOrParagraph.js';
/**
 * The class renders the gap between two processes in the Our Process page
 */
export class OneProcessGapContainer {
    constructor(timeRequired) {
        this.timeRequired = timeRequired;
        this.result = document.createElement('div');
        this.result.classList.add(
            'flex',
            'border-l-2',
            'border-gray-200',
            'h-48',
            'my-6',
            'w-1/2',
            'ml-auto',
            'sm:h-72',
            'sm:-my-20',
            'sm:w-full',
            'md:h-80',
            'md:-my-24',
            'lg:h-96',
            'lg:-my-32',
            'transition-opacity',
            'delay-500',
            'duration-2000',
            'ease-in-out',
            'opacity-0'
        );
        this.result.append(
            this._createChevronIcon(),
            this._createTimeRequired()
        );
        this.result.setAttribute('animate-one-process-gap', 'true');
    }
    _createTimeRequired() {
        let heading = new HeadingOrParagraph(
            'p',
            this.timeRequired
        ).renderWithClass(['my-auto', 'ml-5', 'text-gray-200']).result;
        return heading;
    }
    _createChevronIcon() {
        let icon = document.createElement('i');
        icon.classList.add(
            'fas',
            'fa-chevron-down',
            'text-gray-200',
            'mt-auto',
            '-mb-2',
            '-ml-2'
        );
        return icon;
    }
}
