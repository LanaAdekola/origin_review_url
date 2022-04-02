'use strict';

import { DropdownMenu } from './DropdownMenu.js';
import { AnchorLinks } from './AnchorLinks.js';
import { _importSVG, _parseSVG, launchContactUsModal } from '../utils.js';
import { TypicalModal } from './TypicalModal.js';
import { ContactUsForm } from './ContactUsForm.js';

const NAVBAR_ABOUT_US_DROPDOWN_LINKS = {
    'Our Story': {
        link: '/about-us',
    },
    Testimonials: {
        link: '/testimonials-page',
    },
    'Frequently Asked Questions': {
        link: '/frequently-asked-questions',
    },
};

const NAVBAR_LINKS = {
    Services: {
        link: '/services',
    },
    Knowledge: {
        link: '/innocelf-blog',
    },
    Contact: {
        link: '#',
    },
};

/**
 * The class is a Navbar Main component to render a Navigation Bar on top of many
 * front facing pages.
 */
export class Navbar {
    constructor() {
        this.result = document.createElement('nav');
        this.collapsibleContent = document.createElement('div');
        this.navbarToggle = document.createElement('button');

        this.desiredMainClasses = [
            'flex',
            'flex-col',
            'py-6',
            'w-full',
            'm-auto',
            'justify-center',
            'flex-wrap',
            'lato-regular',
            'lg:flex-row',
            'lg:w-11/12',
            'lg:max-w-7xl',
        ];
        this.desiredMainClasses.map((item) => {
            this.result.classList.add(item);
        });

        this.collapsibleContentClasses = [
            'flex',
            'flex-col',
            'text-right',
            'pr-5',
            'hidden',
            // 'bg-gray-200',
            'sm:flex',
            'sm:flex-row',
            'sm:justify-center',
            'sm:mt-5',
            // 'sm:bg-white',
            'sm:px-8',
            'sm:items-center',
            'lg:justify-end',
            'lg:mt-0',
            'xl:flex-grow',
            'xl:items-center',
            'xl:ml-44',
        ];
        this.collapsibleContentClasses.map((item) => {
            this.collapsibleContent.classList.add(item);
        });
    }

    render() {
        this.addBrand();
        this.createCollapsibleContent();
        this.createAboutUsDropdown();
        this.createNavbarLinks();
        this.createSocialLinks();
        this.createNavbarToggle();
        let collapsibleContent = this.collapsibleContent;
        this.navbarToggle.addEventListener('click', function () {
            collapsibleContent.classList.toggle('hidden');
            // this.classList.toggle('hidden');
        });
        return this;
    }

    addBrand() {
        let desiredBrandClass = [
            'flex',
            'justify-center',
            'flex-shrink-0',
            'items-center',
            'w-4/6',
            'sm:w-full',
            'lg:w-auto',
            'lg:justify-start',
        ];
        let logoPath =
            '/static/innoservices/img/Innocelf-Logo-BlackFont-TransparentBack.svg';
        let brand = document.createElement('a');
        desiredBrandClass.map((item) => {
            brand.classList.add(item);
        });
        brand.href = '/';
        _importSVG(logoPath).then((data) => {
            let svgLogo = _parseSVG(data);
            if (svgLogo) {
                svgLogo.setAttribute('width', '280');
                // Desired classes for the svg... controlling transition
                let svgLogoClasses = [
                    'transition-opacity',
                    'duration-1000',
                    'ease-in-out',
                    'opacity-100',
                ];
                svgLogoClasses.map((item) => {
                    svgLogo.classList.add(item);
                });
            }
            brand.append(svgLogo);
            return svgLogo;
        });
        this.result.append(brand);
    }

    createCollapsibleContent() {
        this.result.append(this.collapsibleContent);
    }

    createAboutUsDropdown() {
        let dropdownMenu = new DropdownMenu(
            'About',
            NAVBAR_ABOUT_US_DROPDOWN_LINKS
        ).render().result;
        this.collapsibleContent.append(dropdownMenu);
    }

    createNavbarLinks() {
        Object.keys(NAVBAR_LINKS).map((item) => {
            let desiredId =
                'navlink_' + item.toLowerCase().replaceAll(' ', '_');

            let navLink = new AnchorLinks(item)
                .renderWithText()
                .renderNavLink().result;

            if (item === 'Knowledge') {
                navLink.style.pointerEvents = 'None';
                navLink.style.cursor = 'default';
                navLink.classList.add('text-gray-300', 'relative');

                let span = document.createElement('span');
                span.textContent = 'Coming Soon';
                span.classList.add(
                    'bg-red-600',
                    'text-white',
                    'rounded-full',
                    'text-xs',
                    'px-2',
                    'ml-3',
                    'sm:absolute',
                    'sm:-top-3',
                    'sm:-right-5'
                );
                navLink.append(span);
            }

            navLink.href = NAVBAR_LINKS[item].link;
            navLink.id = desiredId;
            this.collapsibleContent.append(navLink);
        });
        this._launchContactUsModal();
    }

    createSocialLinks() {
        let linkedin = new AnchorLinks().renderWithIcon([
            'fab',
            'fa-linkedin-in',
        ]).result;
        linkedin.classList.add(
            'flex',
            'h-6',
            'w-6',
            'justify-center',
            'items-center',
            'py-1.5',
            'px-2',
            'bg-innoblack',
            'text-white',
            'rounded-full',
            'sm:h-7',
            'sm:w-7',
            'md:h-8',
            'md:w-8',
            'lg:ml-auto',
            'lg:h-9',
            'lg:w-9',
            'lg:text-xl',
            'xl:h-10',
            'xl:w-10',
            'xl:my-auto',
            'xl:text-2xl'
        );
        linkedin.href = 'https://www.linkedin.com/company/innocelf-llc';
        this.collapsibleContent.append(linkedin);
        //this.result.append(linkedin);
    }

    createNavbarToggle() {
        let icon = document.createElement('i');
        let toggleClass = [
            'px-3',
            'py-1',
            'rounded',
            'border',
            'border-black',
            'cursor-pointer',
            'absolute',
            'self-end',
            'mr-5',
            'top-10',
            'sm:hidden',
        ];
        toggleClass.map((item) => {
            this.navbarToggle.classList.add(item);
        });
        let iconClass = ['fas', 'fa-bars'];
        iconClass.map((item) => {
            icon.classList.add(item);
        });
        this.navbarToggle.append(icon);
        this.result.append(this.navbarToggle);
    }

    _launchContactUsModal() {
        this.result
            .querySelector('[id="navlink_contact"]')
            .addEventListener('click', launchContactUsModal);
    }
}
