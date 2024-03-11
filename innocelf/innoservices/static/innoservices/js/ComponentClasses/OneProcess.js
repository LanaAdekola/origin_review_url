'use strict';

import { HeadingOrParagraph } from './HeadingOrParagraph.js';

/**
 * The class renders one process in the Our Process page
 */
export class OneProcess {
    constructor(processHeading, contentHTML, imageSrc) {
        this.processHeading = processHeading;
        this.contentHTML = contentHTML;
        this.imageSrc = imageSrc;
        this.result = document.createElement('div');
        this.result.classList.add(
            'flex',
            'flex-col',
            'gap-6',
            'sm:flex-row',
            'sm:gap-6',
            'md:gap-12',
            'items-center',
            'transition-opacity',
            'delay-500',
            'duration-2000',
            'ease-in-out',
            'opacity-0'
        );
        this.result.append(
            this._createCircleIcon(),
            this._createProcessHeading(),
            this._createImageContainer()
        );
        this.result.setAttribute('animate-one-process', 'true');
    }
    _createCircleIcon() {
        let icon = document.createElement('i');
        icon.classList.add(
            'far',
            'fa-circle',
            'text-gray-200',
            '-ml-1.5',
            'hidden',
            'sm:block'
        );
        return icon;
    }
    _createProcessHeading() {
        let container = document.createElement('div');
        container.classList.add('flex-grow');
        let heading = new HeadingOrParagraph(
            'h4',
            this.processHeading
        ).renderWithClass(['my-auto']).result;
        container.append(heading);
        return container;
    }
    _createImageContainer() {
        let container = document.createElement('div');
        container.classList.add('relative');
        let image = document.createElement('img');
        image.src = this.imageSrc;
        image.classList.add(
            'object-contain',
            'rounded-3xl',
            'ml-auto',
            'sm:h-48',
            'md:flex',
            'md:h-60',
            'lg:h-72',
            'xl:h-96'
        );
        let overlayContainer = this.__createOverlayContainer();
        container.append(image, overlayContainer);
        return container;
    }
    __createOverlayContainer() {
        let container = document.createElement('div');
        container.classList.add(
            'flex',
            'w-full',
            'h-full',
            'text-white',
            'bg-black',
            'rounded-3xl',
            'opacity-80',
            'p-5',
            'absolute',
            'top-0',
            'left-0'
        );
        container.innerHTML = this.contentHTML;
        return container;
    }
}
