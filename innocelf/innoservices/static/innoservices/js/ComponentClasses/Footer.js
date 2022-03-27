'use strict';

import { HeadingOrParagraph } from './HeadingOrParagraph.js';
import { AnchorLinks } from './AnchorLinks.js';
import { ContactUsForm } from './ContactUsForm.js';
import { _importSVG, _parseSVG } from '../utils.js';

/**
 * The class is a Footer object that can be rendered on all the pages that are
 * front facing.
 */
export class Footer {
    constructor() {
        this.result = document.createElement('footer');
        this._quickLinksObject = {
            Home: '/',
            Services: '/services',
            About: '/about-us',
            // 'Our Process': '/our-process',
            Testimonials: '/testimonials-page',
            FAQ: '/frequently-asked-questions',
            Knowledge: '/innocelf-blog',
        };
        this._privacyPolicyLinks = {
            'Privacy Policy': '/privacy-policy/',
            'Terms of Use': '/terms-and-conditions/',
            Disclaimer: '/disclaimer/',
        };
    }

    render() {
        let footerClasslist = [
            'flex',
            'flex-col',
            'bg-innoblack',
            'lato-regular',
            'text-white',
            'pt-5',
            'relative',
            'h-96',
            'mt-96',
        ];
        footerClasslist.map((item) => {
            this.result.classList.add(item);
        });

        let container = this.createMainContainer();
        let disclaimers = this.createDisclaimersFooterBottom();
        this.result.append(container, disclaimers);
        return this;
    }

    createMainContainer() {
        let container = document.createElement('div');
        container.classList.add(
            'flex',
            'flex-col',
            'w-2/3',
            'mx-auto',
            'my-5',
            'md:w-full',
            'lg:w-11/12',
            'max-w-7xl',
            'justify-end',
            'items-end',
            'relative'
        );

        let contactUsForm = this.contactUsForm();
        let scheduleConsultation = this.createScheduleConsultationButton();
        let logoLinksPrivacyColumnContainer = this.createColumnsContainer();
        let copyRightSection = this.createCopyRightInfo();

        container.append(
            contactUsForm,
            //scheduleConsultation,
            logoLinksPrivacyColumnContainer,
            copyRightSection
        );
        return container;
    }

    createColumnsContainer() {
        let container = document.createElement('div');
        container.classList.add(
            'flex',
            'flex-row',
            'justify-end',
            'items-center',
            'w-1/2',
            'pb-5',
            'md:gap-2',
            'border-0',
            'border-b',
            'border-white'
        );
        let firstColumn = this.createFirstColumn();
        let quickLinksColumn1 = this.createListColumn(
            'Links',
            this._quickLinksObject,
            'first'
        );
        let quickLinksColumn2 = this.createListColumn(
            'Links',
            this._quickLinksObject,
            'second'
        );
        let privacyPolicyColumn = this.createPrivacyPolicySection();
        container.append(
            firstColumn,
            quickLinksColumn1,
            quickLinksColumn2,
            privacyPolicyColumn
        );

        return container;
    }

    contactUsForm() {
        let formContainer = new ContactUsForm().result;
        formContainer.classList.add('absolute', 'left-0', '-bottom-6');

        return formContainer;
    }

    createScheduleConsultationButton() {
        let scheduleConsultationButton = new AnchorLinks(
            'Schedule Consultation'
        ).renderLargeInnocelfGradientButtonFullRound().result;
        scheduleConsultationButton.classList.replace('w-1/3', 'w-full');
        scheduleConsultationButton.classList.add(
            'max-w-sm',
            'absolute',
            '-top-40',
            'right-64'
        );

        scheduleConsultationButton.href =
            'https://calendly.com/innocelf/virtual-appointment';

        return scheduleConsultationButton;
    }

    createFirstColumn() {
        let column = this.__createFooterColumn();
        column.classList.replace('w-1/3', 'w-2/5');

        _importSVG(
            '/static/innoservices/img/Innocelf-Logo-WhiteFont-TransparentBack.svg'
        ).then((response) => {
            let svgElement = _parseSVG(response);
            column.append(svgElement);
        });
        return column;
    }

    createListColumn(columnName, quickLinksObject, columnState) {
        let column = this.__createFooterColumn();
        column.classList.replace('w-1/3', 'w-1/5');

        let keysToConsider = [];
        if (columnState === 'first') {
            keysToConsider = Object.keys(quickLinksObject).slice(0, 3);
        } else if (columnState === 'second') {
            keysToConsider = Object.keys(quickLinksObject).slice(3, 6);
        }

        let listContainer = document.createElement('ul');
        keysToConsider.map((item) => {
            let li = document.createElement('li');
            let link = new AnchorLinks(item).renderWithText().result;

            if (item === 'Knowledge') {
                link.style.pointerEvents = 'None';
                link.style.cursor = 'default';
                link.classList.add('text-gray-600', 'relative');
            }
            link.href = quickLinksObject[item];

            // link.classList.add(
            //     'text-sm',
            //     'lato-semibold',
            //     'sm:text-base',
            //     'lg:text-lg',
            //     '2xl:text-xl',
            //     'ml-5',
            //     'text-justify',
            //     'mt-6'
            // );

            li.append(link);
            listContainer.append(li);
        });
        column.append(listContainer);
        return column;
    }

    createPrivacyPolicySection() {
        let column = this.__createFooterColumn();
        column.classList.replace('w-1/3', 'w-1/4');

        let listContainer = this._createTermsAndDisclaimerSection();
        column.append(listContainer);
        return column;
    }

    createCopyRightInfo() {
        let row = document.createElement('div');
        row.classList.add(
            'flex',
            'flex-col',
            'justify-end',
            'items-center',
            'w-1/2',
            'py-5',
            'md:gap-2',
            'lg:gap-16',
            'border-0',
            'border-b',
            'border-white'
        );

        let paragraph = new HeadingOrParagraph(
            'p',
            '© 2020-2022 Copyright: Innocelf, LLC. All Rights Reserved'
        ).renderWithClass(['text-white']).result;
        paragraph.className = '';
        paragraph.classList.add(
            'text-xs',
            'font-medium',
            'lato-regular',
            'sm:text-xs',
            'lg:text-xs',
            '2xl:text-sm',
            'text-white'
        );

        row.append(paragraph);

        return row;
    }

    createDisclaimersFooterBottom() {
        let container = document.createElement('div');
        container.classList.add(
            'flex',
            'flex-col',
            'w-3/4',
            'max-w-7xl',
            'absolute',
            'left-1/4',
            'bottom-0',
            'mt-8'
        );

        let p1 = new HeadingOrParagraph(
            'p',
            `* Testimonials found on this website are actual client reviews of
            Innocelf, LLC. Prospective clients may not obtain the same or
            similar results.`
        ).renderFooterDisclaimers().result;
        let p2 = new HeadingOrParagraph(
            'p',
            `** The information contained in this website is intended for
            general informational purposes only, and should not be construed as
            legal advice on any matter.`
        ).renderFooterDisclaimers().result;
        let p3 = () => {
            let p = document.createElement('p');
            p.classList.add('text-white', 'text-sm', 'lato-light');

            let span = document.createElement('span');
            span.textContent = `*** For important disclaimer information please visit `;

            let a = document.createElement('a');
            a.classList.add('underline');
            a.href = '/disclaimer';
            a.textContent = 'this page';

            p.append(span, a);
            return p;
        };

        container.append(p1, p2, p3());
        return container;
    }

    _createTermsAndDisclaimerSection() {
        let unList = document.createElement('ul');

        Object.keys(this._privacyPolicyLinks).map((item) => {
            let list = document.createElement('li');
            let link = new AnchorLinks(item).renderWithText().result;
            link.href = this._privacyPolicyLinks[link];

            list.append(link);
            unList.append(list);
        });

        return unList;
    }

    __createFooterColumn() {
        let column = document.createElement('div');
        column.classList.add('p-4', 'w-1/3', 'text-left');
        return column;
    }
}
