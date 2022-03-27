'use strict';

import { HeadingOrParagraph } from './HeadingOrParagraph.js';
import { AnchorLinks } from './AnchorLinks.js';
import { _importSVG, _parseSVG } from '../utils.js';

/**
 * Class represents one Service Description for the Services Page
 */
export class ServiceDescription {
    constructor(
        desiredHeading,
        itemsList,
        paragraphContent,
        imageSrc,
        advantages
    ) {
        this.desiredHeading = desiredHeading;
        this.itemsList = itemsList;
        this.paragraphContent = paragraphContent;
        this.imageSrc = imageSrc;
        this.advantages = advantages;

        this.result = document.createElement('div');
    }

    render() {
        this.result.classList.add('w-full', 'mx-auto');
        let headingContainer = this.createHeading();
        let columnsContainer = this.createColumns();
        let advantagesContainer = this.createAdvantagesContainer();
        let separator = this.createSeparator();

        this.result.append(
            headingContainer,
            columnsContainer,
            advantagesContainer,
            separator
        );
        return this;
    }

    createHeading() {
        let heading = new HeadingOrParagraph(
            'h3',
            this.desiredHeading
        ).renderWithClass([
            'my-16',
            'text-black',
            'text-center',
            'max-w-7xl',
            'mx-auto',
        ]).result;
        heading.classList.replace('lato-regular', 'lato-bold');

        return heading;
    }

    createColumns() {
        let container = document.createElement('div');
        container.classList.add(
            'flex',
            'flex-row',
            'w-full',
            'mx-auto',
            'max-w-7xl'
        );

        let listAndParaContainer = this._createListAndParaContainer();

        _importSVG(this.imageSrc).then((response) => {
            let svgElement = _parseSVG(response);
            svgElement.setAttribute('height', '355');
            svgElement.classList.add('w-1/2');
            container.append(svgElement, listAndParaContainer);
        });

        return container;
    }

    createAdvantagesContainer() {
        let container = document.createElement('div');
        container.classList.add(
            'flex',
            'my-12',
            'h-18',
            'mx-auto',
            'w-full',
            'max-w-7xl'
        );
        let para = this.__createOneAdvantage(
            // this.advantages[getRandom(0, lengthOfAdvantages - 1)]
            this.advantages[0]
        );
        container.classList.add('justify-start');
        container.append(para);
        setTimeout(() => {
            para.classList.replace('opacity-0', 'opacity-100');
        }, 1000);

        let lengthOfAdvantages = this.advantages.length;

        setInterval(() => {
            let desClass = '';
            let remClass = '';

            let i = 1;
            if (container.childNodes.length > 0) {
                let firstChild = container.childNodes[0];
                firstChild.classList.replace('opacity-100', 'opacity-0');

                if (container.classList.contains('justify-start')) {
                    remClass = 'justify-start';
                    desClass = 'justify-center';
                }
                if (container.classList.contains('justify-center')) {
                    remClass = 'justify-center';
                    desClass = 'justify-end';
                }
                if (container.classList.contains('justify-end')) {
                    remClass = 'justify-end';
                    desClass = 'justify-start';
                }
            }

            if (container.hasAttribute('advantage')) {
                let num = parseInt(container.getAttribute('advantage'));
                if (num < lengthOfAdvantages - 1) {
                    i = num + 1;
                } else {
                    i = 0;
                }
            }

            setTimeout(
                (desClass, remClass, i) => {
                    container.innerHTML = '';

                    if (desClass === '') {
                        desClass = 'justify-start';
                    }
                    if (remClass !== '') {
                        container.classList.remove(remClass);
                    }

                    let para = this.__createOneAdvantage(
                        // this.advantages[getRandom(0, lengthOfAdvantages - 1)]
                        this.advantages[i]
                    );
                    container.classList.add(desClass);
                    container.append(para);
                    container.setAttribute('advantage', i.toFixed(0));

                    setTimeout(() => {
                        para.classList.replace('opacity-0', 'opacity-100');
                    }, 1000);
                },
                2000,
                desClass,
                remClass,
                i
            );
        }, 6000);

        return container;
    }

    createSeparator() {
        let container = document.createElement('div');
        container.classList.add(
            'w-full',
            'h-40',
            'mt-5',
            'bg-gradient-to-r',
            'from-gray-300',
            'to-gray-200'
        );
        return container;
    }

    _createListAndParaContainer() {
        let container = document.createElement('div');
        container.classList.add(
            'flex',
            'flex-col',
            'w-1/2',
            'h-full',
            'gap-12',
            'my-auto'
        );

        let unorderedList = this.__createUnorderedList();
        let paragraph = this.__createParagraph();

        container.append(unorderedList, paragraph);
        return container;
    }

    __createUnorderedList() {
        let unorderedList = document.createElement('ul');
        let unorderedListClass = [
            'flex',
            'flex-col',
            'w-full',
            'h-1/2',
            'leading-6',
            'lato-regular',
            'text-base',
            'list-disc',
            'list-inside',
            'pb-6',
            'sm:pb-0',
            'sm:text-lg',
            'sm:leading-10',
            'sm:gap-3',
            'lg:text-2xl',
        ];
        unorderedListClass.map((item) => {
            unorderedList.classList.add(item);
        });
        this.itemsList.map((item) => {
            let listItem = document.createElement('li');
            listItem.textContent = item;
            unorderedList.append(listItem);
        });

        return unorderedList;
    }

    __createParagraph() {
        let container = document.createElement('div');
        container.classList.add('h-1/2', 'm-auto');

        this.paragraphContent.map((item) => {
            let paragraph = new HeadingOrParagraph('p', item).renderWithClass([
                'leading-8',
                'text-justify',
                //'mt-6',
                //'sm:pl-7',
                //'sm:mt-0',
            ]).result;
            let br = document.createElement('br');
            container.append(paragraph, br);
        });
        return container;
    }

    __createOneAdvantage(advantageText) {
        let container = document.createElement('div');
        container.classList.add(
            'bg-gradient-to-r',
            'from-gray-50',
            'to-gray-100',
            'rounded-full',
            'p-4',
            'text-black',
            'opacity-0',
            'transition',
            'ease-in-out',
            'duration-1000'
        );

        let icon = document.createElement('i');
        icon.classList.add(
            'fas',
            'fa-star',
            'text-yellow-500',
            'mr-3',
            'inline'
        );
        let heading = new HeadingOrParagraph(
            'h6',
            advantageText
        ).renderWithClass(['mx-auto', 'text-center', 'inline']).result;

        container.append(icon, heading);
        return container;
    }
}
