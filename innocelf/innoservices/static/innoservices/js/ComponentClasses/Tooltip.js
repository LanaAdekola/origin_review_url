'use strict';

import { HeadingOrParagraph } from './HeadingOrParagraph.js';

/**
 * The class creates a tooltip for the element that is supplied in the hoverElement
 * input. It takes the direction provided to determine where the tooltip will be
 */
export class Tooltip {
    constructor(hoverElement, tooltipText, tooltipPosition) {
        this.hoverElement = hoverElement;
        this.tooltipText = tooltipText;
        this.tooltipPosition = tooltipPosition;

        this.hoverElement.classList.add('relative', 'group');

        this.result = document.createElement('div');
        this.result.classList.add(
            'opacity-0',
            'absolute',
            'bg-black',
            'text-white',
            'p-2',
            'rounded',
            'group-hover:opacity-90'
        );
        this._adjustTooltipPosition();
        this.paragraph = new HeadingOrParagraph('p', tooltipText).result;
        this.paragraph.classList.remove(
            'sm:text-base',
            'lg:text-lg',
            '2xl:text-lg'
        );

        this.result.append(this.paragraph);
        this.hoverElement.append(this.result);
    }

    _adjustTooltipPosition() {
        if (
            this.tooltipPosition.toLowerCase() === 'right' ||
            this.tooltipPosition.toLowerCase() === 'r'
        ) {
            this.result.classList.add(
                'transform',
                'translate-x-full',
                'top-6',
                'right-0'
            );
        } else if (
            this.tooltipPosition.toLowerCase() === 'left' ||
            this.tooltipPosition.toLowerCase() === 'l'
        ) {
            this.result.classList.add(
                'transform',
                '-translate-x-full',
                'top-6',
                'left-0'
            );
        } else if (
            this.tooltipPosition.toLowerCase() === 'bottom' ||
            this.tooltipPosition.toLowerCase() === 'b'
        ) {
            this.result.classList.add(
                'transform',
                'translate-y-full',
                // 'translate-x-1/2',
                'bottom-0'
            );
        } else if (
            this.tooltipPosition.toLowerCase() === 'top' ||
            this.tooltipPosition.toLowerCase() === 't'
        ) {
            this.result.classList.add(
                'transform',
                '-translate-y-full',
                // 'translate-x-1/2',
                'top-0'
            );
        }
    }
}
