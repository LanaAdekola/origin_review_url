'use strict';

import { _obtainForm } from './render_ts.js';

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
    'Our Process': {
        link: '/our-process',
    },
    Blog: {
        link: '/innocelf-blog',
    },
    'Contact Us': {
        link: '/contact-us',
    },
};
/**
 * The function fetches the SVG file designated in the path and returns a promise
 * with the SVG file contents as text
 * @param pathToSVGFile The path to the SVG file (from the static folder)
 * @returns Promise to resolve the SVG file contents as text
 */
export function _importSVG(pathToSVGFile) {
    return new Promise((resolve) => {
        fetch(pathToSVGFile).then((response) => {
            resolve(response.text());
        });
    });
}
/**
 * The function takes the SVG file contents as text and returns a document type
 * component which can be traversed through queryselectors and such
 * @param svgText The file contents of the SVG file as text
 * @returns A Document element with the svg contents as a DOM element
 */
export function _parseSVG(svgText) {
    let svgElement = new DOMParser().parseFromString(
        svgText,
        'text/xml'
        // 'image/svg+xml'
    );
    let svgTag = svgElement.querySelector('svg');
    return svgTag;
}
function _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
/**
 * The class is a Heading or Paragraph Component to render the text in a heading
 * or paragraph tag with the desired class
 */
export class HeadingOrParagraph {
    constructor(tag, textContent) {
        this.tag = tag;
        this.textContent = textContent;
        this.headingClassDefs = {
            h1: {
                class: [
                    'text-3xl',
                    'font-bold',
                    'lato-bold',
                    'sm:text-4xl',
                    'lg:text-5xl',
                    '2xl:text-6xl',
                ],
            },
            h2: {
                class: [
                    'text-2xl',
                    'font-bold',
                    'lato-bold',
                    'sm:text-3xl',
                    'lg:text-4xl',
                    '2xl:text-5xl',
                ],
            },
            h3: {
                class: [
                    'text-xl',
                    'font-bold',
                    'lato-bold',
                    'sm:text-xl',
                    'lg:text-2xl',
                    '2xl:text-3xl',
                ],
            },
            h4: {
                class: [
                    'text-lg',
                    'font-bold',
                    'lato-bold',
                    'sm:text-xl',
                    'lg:text-2xl',
                    '2xl:text-3xl',
                ],
            },
            h5: {
                class: [
                    'text-base',
                    'font-semibold',
                    'lato-semibold',
                    'sm:text-lg',
                    'lg:text-xl',
                    '2xl:text-2xl',
                ],
            },
            h6: {
                class: [
                    'text-sm',
                    'font-semibold',
                    'lato-semibold',
                    'sm:text-base',
                    'lg:text-lg',
                    '2xl:text-xl',
                ],
            },
            p: {
                class: [
                    'text-sm',
                    'font-medium',
                    'lato-regular',
                    'sm:text-base',
                    'lg:text-lg',
                    '2xl:text-lg',
                ],
            },
        };
        if (this.tag == 'p') {
            this.result = document.createElement(this.tag);
        } else {
            this.result = document.createElement(this.tag);
        }
        // Add base classes for the heading to behave appropriately
        this.headingClassDefs[this.tag].class.map((item) => {
            this.result.classList.add(item);
        });
        this.result.textContent = this.textContent;
    }
    renderWithClass(desiredClassList) {
        desiredClassList.map((item) => {
            this.result.classList.add(item);
        });
        return this;
    }
    renderGradientText() {
        // Remove default classes
        this.result.className = '';
        let headingClassList = [
            'mt-12',
            'mb-6',
            'h-16',
            'lato-bold',
            'text-center',
            'text-transparent',
            'text-2xl',
            'bg-clip-text',
            'bg-gradient-to-r',
            'from-black',
            'to-gray-400',
            'sm:text-2xl',
            'md:text-2xl',
            'lg:text-3xl',
            'xl:text-4xl',
            // '2xl:my-24',
            '2xl:text-5xl',
        ];
        headingClassList.map((item) => {
            this.result.classList.add(item);
        });
        return this;
    }
}
/**
 * The class is an Anchor Link Component to render a button or a link using the
 * Anchor tag. The class has many method to create various different type of
 * clickable elements
 */
export class AnchorLinks {
    constructor(textContent) {
        this.textContent = textContent;
        this.result = document.createElement('a');
    }
    renderWithText() {
        this.result.textContent = this.textContent;
        return this;
    }
    renderWithTextAndUnderline() {
        this.result.textContent = this.textContent;
        this.result.classList.add(
            'underline',
            'uppercase',
            'text-xs',
            'md:text-sm'
        );
        return this;
    }
    renderWithIcon(iconClass) {
        let i = document.createElement('i');
        iconClass.map((item) => {
            i.classList.add(item);
        });
        this.result.append(i);
        return this;
    }
    renderNavLink() {
        let desiredClassList = [
            'block',
            'my-1',
            // 'mt-4',
            // 'mr-12',
            // 'ml-5',
            'cursor-pointer',
            'hover:text-gray-500',
            'sm:text-center',
            'sm:ml-2',
            'sm:mr-8',
            'sm:text-lg',
            'lg:ml-5',
            'lg:mr-12',
            '2xl:text-xl',
            '2xl:mt-0',
            '2xl:inline-block',
        ];
        desiredClassList.map((item) => {
            this.result.classList.add(item);
        });
        return this;
    }
    renderNavDropdownLink() {
        let desiredClassList = [
            'flex',
            'py-1',
            'px-2',
            'rounded',
            'cursor-pointer',
            'hover:bg-gray-100',
            'sm:text-base',
            'sm:ml-0',
            'sm:mt-0',
            'sm:flex',
        ];
        desiredClassList.map((item) => {
            this.result.classList.add(item);
        });
        return this;
    }
    renderLargeInnocelfButton() {
        this.result.textContent = this.textContent;
        this.result.target = '_blank';
        let desiredClassList = [
            'lato-regular',
            'block',
            'text-center',
            'mx-auto',
            // 'w-1/2',
            // 'mt-4',
            'py-2',
            'px-5',
            'rounded-xl',
            'shadow',
            'cursor-pointer',
            'border-2',
            'border-innoblack',
            'bg-innoblack',
            'text-white',
            'focus:ring',
            'focus:ring-innoblack',
            'focus:ring-offset-4',
            'hover:bg-gray-800',
            'text-sm',
            'md:text-lg',
            'md:py-3',
            'md:px-8',
        ];
        desiredClassList.map((item) => {
            this.result.classList.add(item);
        });
        return this;
    }
    renderLargeInnocelfButtonFullRound() {
        this.result.textContent = this.textContent;
        this.result.target = '_blank';
        let desiredClassList = [
            'lato-regular',
            'block',
            'text-center',
            'w-1/3',
            // 'w-1/2',
            // 'mt-4',
            'py-2',
            'px-5',
            'rounded-full',
            'shadow',
            'cursor-pointer',
            'border-2',
            'border-innoblack',
            'bg-innoblack',
            'text-white',
            'focus:ring',
            'focus:ring-innoblack',
            'focus:ring-offset-4',
            'hover:bg-gray-800',
            'text-sm',
            'md:text-2xl',
            'md:py-3',
            'md:px-8',
        ];
        desiredClassList.map((item) => {
            this.result.classList.add(item);
        });
        return this;
    }
    renderLargeInnocelfGradientButtonFullRound() {
        this.result.textContent = this.textContent;
        this.result.target = '_blank';
        let desiredClassList = [
            'lato-bold',
            'block',
            'text-center',
            'w-1/3',
            'py-2',
            'px-5',
            'rounded-full',
            'bg-gradient-to-r',
            'from-gray-300',
            'to-gray-200',
            'shadow',
            'cursor-pointer',
            'text-black',
            'focus:ring',
            'focus:ring-innoblack',
            'focus:ring-offset-4',
            'hover:bg-gray-800',
            'text-sm',
            'md:text-3xl',
            'md:py-4',
            'md:px-8',
        ];
        desiredClassList.map((item) => {
            this.result.classList.add(item);
        });
        return this;
    }
    renderMediumInnocelfButtonFullRound() {
        this.result.textContent = this.textContent;
        this.result.target = '_blank';
        let desiredClassList = [
            'lato-regular',
            'block',
            'text-center',
            'w-4/12',
            // 'w-1/2',
            // 'mt-4',
            'py-2',
            'px-5',
            'rounded-full',
            'shadow',
            'cursor-pointer',
            'border-2',
            'border-innoblack',
            'bg-innoblack',
            'text-white',
            'focus:ring',
            'focus:ring-innoblack',
            'focus:ring-offset-4',
            'hover:bg-gray-800',
            'text-sm',
            'md:text-xl',
            'md:py-2',
            'md:px-5',
        ];
        desiredClassList.map((item) => {
            this.result.classList.add(item);
        });
        return this;
    }
    renderLargeHollowInnocelfButton() {
        this.result.textContent = this.textContent;
        this.result.target = '_blank';
        let desiredClassList = [
            'lato-regular',
            'block',
            'text-center',
            'mx-auto',
            // 'w-1/2',
            // 'mt-4',
            'py-2',
            'px-5',
            'rounded-xl',
            'shadow',
            'cursor-pointer',
            'border-2',
            'border-innoblack',
            'focus:ring',
            'focus:ring-innoblack',
            'focus:ring-offset-4',
            'hover:bg-gray-300',
            'text-sm',
            'md:text-lg',
            'md:py-3',
            'md:px-8',
        ];
        desiredClassList.map((item) => {
            this.result.classList.add(item);
        });
        return this;
    }
    renderFooterButton() {
        this.result.textContent = this.textContent;
        this.result.target = '_blank';
        this.result.type = 'button';
        let desiredClassList = [
            'bg-white',
            'text-center',
            'text-black',
            'p-2',
            'block',
            'rounded',
            'mt-3',
            'lato-regular',
        ];
        desiredClassList.map((item) => {
            this.result.classList.add(item);
        });
        return this;
    }
    renderLinkButton() {
        this.result.textContent = this.textContent;
        this.result.type = 'button';
        let desiredClassList = [
            'lato-regular',
            'bg-white',
            'text-gray-500',
            'p-2',
            'block',
            'rounded',
            'border',
            'border-gray-500',
            'hover:text-blue-500',
            'hover:border-blue-500',
            'focus:text-blue-700',
            'focus:border-blue-700',
        ];
        desiredClassList.map((item) => {
            this.result.classList.add(item);
        });
        return this;
    }
}
/**
 * The class is a Dropdown Menu Component to render a button that gets transformed
 * into a dropdown menu when clicked and reverts to a button when clicked outside
 * on the document
 */
export class DropdownMenu {
    constructor(buttonText, linksTextAndDestObject) {
        this.buttonText = buttonText;
        this.linksTextAndDestObject = linksTextAndDestObject;
        this.result = document.createElement('div');
        this.mainButton = document.createElement('button');
        this.mainMenu = document.createElement('div');
    }
    render() {
        // Add classes to the main element
        let desiredClassList = ['relative', 'my-1', 'sm:mr-12'];
        desiredClassList.map((item) => {
            this.result.classList.add(item);
        });
        // Add sub-elements to the main element
        this.initializeButton();
        this.initializeMenu();
        this.createLinks();
        // Listen to event listeners
        let mainMenu = this.mainMenu;
        let mainButton = this.mainButton;
        let buttonClick = this._buttonClick;
        let globalDocumentClick = this._globalDocumentClick;
        this.mainButton.addEventListener('click', function () {
            buttonClick(mainMenu);
        });
        document.addEventListener('click', function (event) {
            globalDocumentClick(event, mainMenu, mainButton);
        });
        return this;
    }
    initializeButton() {
        let desiredButtonClass = [
            // 'p-2',
            'hover:border-gray-500',
            'focus:border-gray-500',
            'sm:text-lg',
            '2xl:text-xl',
        ];
        let desiredIconClass = ['fas', 'fa-chevron-down', 'text-xs', 'ml-2'];
        this.mainButton.type = 'button';
        this.mainButton.textContent = this.buttonText;
        desiredButtonClass.map((item) => {
            this.mainButton.classList.add(item);
        });
        let icon = document.createElement('i');
        desiredIconClass.map((item) => {
            icon.classList.add(item);
        });
        this.mainButton.append(icon);
        this.result.append(this.mainButton);
    }
    initializeMenu() {
        let desiredMenuClass = [
            'absolute',
            'bg-white',
            'rounded',
            'border',
            'border-black-100',
            'shadow-md',
            'p-3',
            'right-0',
            'origin-top-right',
            'w-60',
            'hidden',
        ];
        desiredMenuClass.map((item) => {
            this.mainMenu.classList.add(item);
        });
        this.result.append(this.mainMenu);
    }
    createLinks() {
        Object.keys(this.linksTextAndDestObject).map((item) => {
            let newLink = new AnchorLinks(item)
                .renderWithText()
                .renderNavDropdownLink().result;
            newLink.setAttribute(
                'href',
                this.linksTextAndDestObject[item].link
            );
            this.mainMenu.append(newLink);
        });
    }
    _buttonClick(mainMenu) {
        if (mainMenu.classList.contains('hidden')) {
            mainMenu.classList.remove('hidden');
        } else {
            mainMenu.classList.add('hidden');
        }
    }
    _globalDocumentClick(event, mainMenu, mainButton) {
        if (
            event.target !== mainButton &&
            !mainMenu.classList.contains('hidden')
        ) {
            mainMenu.classList.add('hidden');
        }
    }
}
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
            'md:w-4/6',
            '2xl:flex-row',
            '2xl:flex',
            '2xl:w-9/12',
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
            'sm:pr-0',
            '2xl:justify-end',
            '2xl:w-auto',
            '2xl:items-center',
            '2xl:mx-auto',
            '2xl:mt-0',
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
            '2xl:w-auto',
            '2xl:justify-start',
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
            'About Us',
            NAVBAR_ABOUT_US_DROPDOWN_LINKS
        ).render().result;
        this.collapsibleContent.append(dropdownMenu);
    }
    createNavbarLinks() {
        Object.keys(NAVBAR_LINKS).map((item) => {
            let navLink = new AnchorLinks(item)
                .renderWithText()
                .renderNavLink().result;
            navLink.href = NAVBAR_LINKS[item].link;
            this.collapsibleContent.append(navLink);
        });
    }
    createSocialLinks() {
        let linkedin = new AnchorLinks().renderWithIcon([
            'fab',
            'fa-linkedin-in',
            'fa-lg',
        ]).result;
        linkedin.classList.add(
            'my-auto',
            'py-1.5',
            'px-2',
            'bg-innoblack',
            'text-white',
            'rounded-full'
        );
        this.result.append(linkedin);
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
}
/**
 * The class is a Dynamic Typed Heading to render the dynamic typed feature of the
 * first page
 */
export class DynamicTypedHeading {
    constructor() {
        this.stringsArray = [
            'filing a Patent Application?',
            'commercializing your product?',
            'researching a new business name or logo?',
            'doing technology analysis?',
        ];
        this.dynamicTypedContent = document.createElement('span');
        this.dynamicTypedCursor = document.createElement('span');
        this.result = document.createElement('h1');
    }
    render() {
        let desiredClasses = [
            'mt-12',
            'mb-6',
            'h-16',
            'text-white',
            'lato-bold',
            // 'text-center',
            // 'text-transparent',
            // 'text-xl',
            // 'bg-clip-text',
            // 'bg-gradient-to-r',
            // 'from-black',
            'to-gray-400',
            'sm:text-2xl',
            'md:text-2xl',
            'lg:text-3xl',
            'xl:text-4xl',
            '2xl:mt-12',
            '2xl:mb-6',
            '2xl:text-5xl',
        ];
        desiredClasses.map((item) => {
            this.result.classList.add(item);
        });
        let text = document.createTextNode('Are you ');
        this.result.append(text);
        this.initializeDynamicTypedContent();
        this.initializeDynamicTypedCursor();
        return this;
    }
    initializeDynamicTypedContent() {
        this.result.append(this.dynamicTypedContent);
        this.startDynamicTyping();
    }
    initializeDynamicTypedCursor() {
        this.dynamicTypedCursor.textContent = '|';
        this.result.append(this.dynamicTypedCursor);
    }
    async startDynamicTyping() {
        while (true) {
            for (let i = 0; i < this.stringsArray.length; i++) {
                let string = this.stringsArray[i];
                let dynamicString = '';
                for (let j = 0; j < string.length; j++) {
                    dynamicString += string[j];
                    window.requestAnimationFrame(() => {
                        this.dynamicTypedContent.textContent = dynamicString;
                    });
                    await _sleep(100);
                }
                this.dynamicTypedCursor.classList.add('hidden');
                await _sleep(2000);
                this.dynamicTypedCursor.classList.remove('hidden');
                for (let j = string.length; j > 0; j--) {
                    dynamicString = dynamicString.slice(0, -1);
                    window.requestAnimationFrame(() => {
                        this.dynamicTypedContent.textContent = dynamicString;
                    });
                    await _sleep(100);
                }
            }
        }
    }
}
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
        let listTextTag = new HeadingOrParagraph('h4', this.listText).result;
        listTextTag.classList.replace('lato-bold', 'lato-semibold');
        listTextTag.classList.remove('font-bold');
        this.result.append(listTextTag);
    }
}
/**
 * The class is a Testimonial object that can be rendered for the homepage, the
 * about us page and eventually the testimonial page
 */
export class Testimonial {
    constructor(personName, review) {
        this.review = review;
        this.personName = personName;
        this.paragraph = new HeadingOrParagraph('p', '').result;
        this.personNameHeading = new HeadingOrParagraph(
            'h5',
            personName
        ).result;
        this.result = document.createElement('div');
    }
    renderHomepageReview() {
        this.personNameHeading.classList.add('text-center');
        let additionalParagraphClasses = ['text-justify', 'xl:text-left'];
        additionalParagraphClasses.map((item) => {
            this.paragraph.classList.add(item);
        });
        this.paragraph.append(
            this._createQuotes('left'),
            this._createSpan(this.review),
            this._createQuotes('right')
        );
        this.result.append(
            this.paragraph,
            this._createHr(),
            this.personNameHeading
        );
        return this;
    }
    renderTestimonialPageReview(dateString) {
        this.personNameHeading.classList.add('text-center');
        let additionalParagraphClasses = ['text-justify', 'xl:text-left'];
        additionalParagraphClasses.map((item) => {
            this.paragraph.classList.add(item);
        });
        this.paragraph.append(
            this._createQuotes('left'),
            this._createSpan(this.review),
            this._createQuotes('right')
        );
        this.result.append(
            this.paragraph,
            this._createHr(),
            this.personNameHeading,
            this._createDateString(dateString)
        );
        this.result.classList.add(
            'transition-opacity',
            'duration-2000',
            'delay-200',
            'ease-in-out',
            'opacity-0'
        );
        this.result.setAttribute('animate-testimonials', 'true');
        return this;
    }
    renderAboutUsReview() {
        this.personNameHeading.classList.add('text-center');
        let additionalParagraphClasses = [
            'text-justify',
            'lato-light',
            'xl:text-left',
        ];
        additionalParagraphClasses.map((item) => {
            this.paragraph.classList.add(item);
        });
        this.paragraph.classList.remove('lato-regular');
        let span = this._createSpan(this.review);
        span.className = '';
        this.paragraph.append(
            this._createQuotes('left'),
            span,
            this._createQuotes('right')
        );
        this.result.append(
            this.paragraph,
            this._createHr(),
            this.personNameHeading
        );
        this.result.classList.add('my-auto');
        return this;
    }
    _createQuotes(quoteSide) {
        let icon = document.createElement('i');
        if (quoteSide === 'left') {
            let desiredClassList = ['fas', 'fa-quote-left', 'fa-sm', 'mr-3'];
            desiredClassList.map((item) => {
                icon.classList.add(item);
            });
        } else if (quoteSide === 'right') {
            let desiredClassList = ['fas', 'fa-quote-right', 'fa-sm', 'ml-3'];
            desiredClassList.map((item) => {
                icon.classList.add(item);
            });
        }
        return icon;
    }
    _createSpan(reviewString) {
        let span = Object.assign(document.createElement('span'), {
            classList: 'text-xs sm:text-sm lg:text-base 2xl:text-base',
        });
        span.textContent = reviewString;
        return span;
    }
    _createHr() {
        let hr = Object.assign(document.createElement('hr'), {
            classList: 'mt-4 mb-2 w-1/2 hr-bold hr-light mx-auto',
        });
        return hr;
    }
    _createDateString(dateString) {
        let spanContainer = document.createElement('div');
        let spanContainerClasses = ['justify-center', 'text-center', '-mt-2'];
        spanContainerClasses.map((item) => {
            spanContainer.classList.add(item);
        });
        let span = document.createElement('span');
        let spanClassList = ['text-xs', 'lato-light'];
        spanClassList.map((item) => {
            span.classList.add(item);
        });
        span.textContent = dateString;
        spanContainer.append(span);
        return spanContainer;
    }
}
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
            Blog: '/',
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
            'mt-80',
        ];
        footerClasslist.map((item) => {
            this.result.classList.add(item);
        });

        let contactUsForm = this.contactUsForm();
        let scheduleConsultation = this.createScheduleConsultationButton();
        let container = this.createMainContainer();
        this.result.append(contactUsForm, scheduleConsultation, container);
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
            'opacity-95',
            'md:w-full',
            'lg:w-11/12',
            '2xl:w-3/4',
            'justify-end',
            'items-end'
        );

        let logoLinksPrivacyColumnContainer = this.createColumnsContainer();
        let copyRightSection = this.createCopyRightInfo();

        container.append(logoLinksPrivacyColumnContainer, copyRightSection);
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
        let quickLinksColumn = this.createListColumn(
            'Links',
            this._quickLinksObject
        );
        let privacyPolicyColumn = this.createPrivacyPolicySection();
        container.append(firstColumn, quickLinksColumn, privacyPolicyColumn);

        return container;
    }

    contactUsForm() {
        let formContainer = document.createElement('form');
        formContainer.method = 'POST';
        formContainer.enctype = 'application/x-www-form-urlencoded';
        formContainer.classList.add(
            'flex',
            'flex-col',
            'w-1/3',
            'p-16',
            'bg-gradient-to-br',
            'from-gray-300',
            'to-gray-200',
            'drop-shadow-md',
            'absolute',
            'left-48',
            '-top-48'
        );
        formContainer.style.borderRadius = '35px';

        let heading = new HeadingOrParagraph(
            'h3',
            'Contact Us'
        ).renderWithClass(['mb-4', 'text-black', 'text-center']).result;
        let paragraph = new HeadingOrParagraph(
            'p',
            `Get started by providing your contact below.`
        ).renderWithClass(['mb-8', 'text-black', 'text-center']).result;

        _obtainForm('/obtain-contact-us-form').then((data) => {
            let form = new DOMParser().parseFromString(data, 'text/html');

            let fullName = new TextInputWithLabel(
                'Name*',
                form.querySelector('[name="full_name"]')
            ).render().result;
            fullName = this.__changeClassListFormInput(fullName);
            let email = new TextInputWithLabel(
                'Email Address*',
                form.querySelector('[name="email"]')
            ).render().result;
            email = this.__changeClassListFormInput(email);
            let reason = new SelectInputWithLabel(
                `Today's Inquiry Topic*`,
                form.querySelector('[name="inquiry_reason"]')
            ).render().result;
            reason = this.__changeClassListFormInput(reason);
            reason
                .querySelector('select')
                .setAttribute('style', '-webkit-appearance: none;');

            let submitButton = new TypicalFormSubmitButton('Submit').result;
            submitButton.classList.replace('rounded-xl', 'rounded-full');
            submitButton.classList.add('mt-3');

            formContainer.append(
                heading,
                paragraph,
                fullName,
                email,
                reason,
                submitButton
            );

            submitButton.onclick = function (event) {
                if (contactUsForm.checkValidity()) {
                    event.preventDefault();
                    _submitForm(
                        contactUsForm,
                        mainContainer,
                        '/receive-contact-us-form/',
                        'contact-us'
                    );
                }
            };
        });

        return formContainer;
    }

    createScheduleConsultationButton() {
        let scheduleConsultationButton = new AnchorLinks(
            'Schedule Consultation'
        ).renderLargeInnocelfGradientButtonFullRound().result;
        scheduleConsultationButton.classList.replace('w-1/3', 'w-1/4');
        scheduleConsultationButton.classList.add(
            'absolute',
            '-top-32',
            'right-96'
        );

        scheduleConsultationButton.href =
            'https://calendly.com/innocelf/virtual-appointment';

        return scheduleConsultationButton;
    }

    createFirstColumn() {
        let column = this.__createFooterColumn();

        _importSVG(
            '/static/innoservices/img/Innocelf-Logo-WhiteFont-TransparentBack.svg'
        ).then((response) => {
            let svgElement = _parseSVG(response);
            column.append(svgElement);
        });
        return column;
    }

    createListColumn(columnName, quickLinksObject) {
        let column = this.__createFooterColumn();

        let listContainer = document.createElement('ul');
        Object.keys(quickLinksObject).map((item) => {
            let li = document.createElement('li');
            let link = new AnchorLinks(item).renderWithText().result;
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

        row.append(paragraph);

        return row;
    }

    _createContactColumn() {
        let column = this.__createFooterColumn();
        let columnName = new HeadingOrParagraph(
            'h5',
            'Contact'
        ).renderWithClass(['uppercase']).result;
        let hr = this.__createFooterHR();
        let scheduleConsultationButton = new AnchorLinks(
            'Schedule Consultation'
        ).renderFooterButton().result;
        scheduleConsultationButton.href =
            'https://calendly.com/innocelf/virtual-appointment';
        let blankSpace = new HeadingOrParagraph('p', '').result;
        let contactUsButton = new AnchorLinks('Contact Us').renderFooterButton()
            .result;
        contactUsButton.href = '/contact-us';
        let socialMedia = this.__createSocialMedia();
        column.append(
            columnName,
            hr,
            scheduleConsultationButton,
            blankSpace,
            contactUsButton,
            socialMedia
        );
        return column;
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
        column.classList.add('p-4', 'w-1/3', 'text-center');
        return column;
    }

    __changeClassListFormInput(inputElement, inputClassList) {
        let inputElementIn = inputElement.querySelector('input');
        if (!inputElementIn) {
            inputElementIn = inputElement.querySelector('select');
        }

        inputElement.querySelector('span').remove();

        inputElementIn.className = '';
        inputElementIn.classList.add(
            'mt-0',
            'block',
            'lato-regular',
            'w-full',
            'px-5',
            'py-4',
            'text-sm',
            'focus:ring-0',
            'focus:border-black',
            'rounded-full',
            'text-black',
            'bg-white',
            'my-5'
        );
        return inputElement;
    }
}
/**
 * The class is a Service Description object that can be rendered on the Services
 * page
 */
export class ServiceDescription {
    constructor(desiredHeading, itemsList, paragraphContent, imageSrc) {
        this.desiredHeading = desiredHeading;
        this.itemsList = itemsList;
        this.paragraphContent = paragraphContent;
        this.imageSrc = imageSrc;
        this.result = document.createElement('div');
    }
    render() {
        let grid = document.createElement('div');
        let gridClassList = [
            'grid',
            'gap-2',
            'grid-cols-1',
            'mx-auto',
            'w-full',
            'px-6',
            'sm:grid-cols-2',
            'sm:my-16',
            'md:w-5/6',
            'md:px-0',
            'lg:w-3/4',
            'xl:w-3/5',
            '2xl:w-1/2',
        ];
        gridClassList.map((item) => {
            grid.classList.add(item);
        });
        // Add Heading with Picture
        let headingWithPicture = this._addHeadingWithPicture();
        // Add Unordered List
        let unorderedList = this._addUnorderedList();
        // Add paragraph content
        let paragraph = this._addParagraph();
        grid.append(unorderedList, paragraph);
        // Add action button
        let actionButton = this._addActionButton();
        // Add separator container
        let separatorContainer = this._addDivSeparator();
        let resultClassList = ['mx-auto'];
        resultClassList.map((item) => {
            this.result.classList.add(item);
        });
        this.result.append(
            headingWithPicture,
            grid,
            actionButton,
            separatorContainer
        );
        return this;
    }
    _addHeadingWithPicture() {
        let container = Object.assign(document.createElement('div'), {
            classList:
                'flex w-full md:w-3/4 p-4 justify-center mx-auto lg:w-4/6',
        });
        let image = Object.assign(document.createElement('img'), {
            src: this.imageSrc,
            classList: 'hidden sm:inline-flex sm:w-2/5',
        });
        let heading = new HeadingOrParagraph(
            'h3',
            this.desiredHeading
        ).renderWithClass([
            'text-center',
            'my-6',
            'w-full',
            'sm:w-1/2',
            'sm:self-center',
            'sm:ml-6',
        ]).result;
        container.append(image, heading);
        return container;
    }
    _addActionButton() {
        let row = document.createElement('div');
        let rowClassList = [
            'flex-row',
            'w-1/2',
            'sm:w-1/4',
            'lg:w-1/6',
            'mx-auto',
            'mt-10',
        ];
        rowClassList.map((item) => {
            row.classList.add(item);
        });
        let actionButton = new AnchorLinks(
            `Get Started`
        ).renderLargeInnocelfButton().result;
        actionButton.href = 'https://calendly.com/innocelf/virtual-appointment';
        row.append(actionButton);
        return row;
    }
    _addUnorderedList() {
        let unorderedList = document.createElement('ul');
        let unorderedListClass = [
            'flex',
            'flex-col',
            'h-full',
            'leading-6',
            'lato-bold',
            'border-b-4',
            'border-black',
            'text-base',
            'list-disc',
            'list-inside',
            'pb-6',
            'sm:pb-0',
            'sm:text-lg',
            'sm:border-r-4',
            'sm:border-b-0',
            'sm:border-black',
            'sm:leading-10',
            'sm:text-center',
            'sm:self-center',
            'sm:list-none',
            'sm:items-center',
            'sm:justify-center',
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
    _addParagraph() {
        let paragraph = new HeadingOrParagraph(
            'p',
            this.paragraphContent
        ).renderWithClass([
            'm-auto',
            'leading-8',
            'text-justify',
            'mt-6',
            'sm:pl-7',
            'sm:mt-0',
        ]).result;
        return paragraph;
    }
    _addDivSeparator() {
        let container = Object.assign(document.createElement('div'), {
            classList: 'w-full bg-gray-100 h-40 mt-5',
        });
        return container;
    }
}
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
        let resultClasses = ['grid', 'grid-cols-1'];
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
            'bg-gray-100',
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
        let containerClasses = ['container', 'p-4', 'hidden', 'shadow-md'];
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
/**
 * The Checkbox Input with Label extends the Text Input with Label element and
 * can also be used on a Form element. This however, is a checkbox input element
 */
export class CheckboxWithLabel extends TextInputWithLabel {
    constructor(labelText, inputElement) {
        super(labelText, inputElement);

        this.result.className = '';
        this.labelClasses = [
            'flex',
            'items-center',
            'lato-regular',
            'cursor-pointer',
        ];
        this.labelClasses.map((item) => {
            this.result.classList.add(item);
        });

        this.labelTextSpan.classList.add('ml-4');
    }
    render() {
        this._createCheckbox();
        this._createSpan();
        this.result.append(this.inputElement, this.labelTextSpan);
        return this;
    }
    _createCheckbox() {
        let inputClasses = [
            'h-5',
            'w-5',
            'cursor-pointer',
            'rounded',
            'bg-gray-200',
            'border-transparent',
            'focus:border-transparent',
            'focus:bg-gray-200',
            'text-gray-700',
            'focus:ring-1',
            'focus:ring-offset-2',
            'focus:ring-gray-500',
            'active:bg-black',
        ];
        inputClasses.map((item) => {
            this.inputElement.classList.add(item);
        });
    }
}
/**
 * The Two Column Container is a container with two columns. The left column
 * has a picture and the right column has text or other material. This is used
 * on the Testimonials and Contact Us Page
 */
export class TwoColumnContainer {
    constructor(idPrepend) {
        this.idPrepend = idPrepend;
        this.result = document.createElement('div');
        this.result.id = idPrepend + '-main-container';
        let firstColumn = this._firstColumn();
        let secondColumn = this._secondColumn();
        this.result.append(firstColumn, secondColumn);
        let containerClasses = [
            'flex',
            'w-11/12',
            'mx-auto',
            'mb-24',
            'lg:flex-row',
            'lg:gap-12',
            'xl:w-3/4',
        ];
        containerClasses.map((item) => {
            this.result.classList.add(item);
        });
    }
    _firstColumn() {
        let container = document.createElement('div');
        let containerClasses = [
            'hidden',
            'items-center',
            'lg:flex',
            'lg:w-2/5',
        ];
        containerClasses.map((item) => {
            container.classList.add(item);
        });
        container.id = this.idPrepend + '-left-container';
        return container;
    }
    _secondColumn() {
        let container = document.createElement('div');
        let containerClasses = [
            'flex',
            'flex-col',
            'w-full',
            'gap-6',
            'mx-auto',
            'lg:w-3/5',
        ];
        containerClasses.map((item) => {
            container.classList.add(item);
        });
        container.id = this.idPrepend + '-right-container';
        return container;
    }
}
/**
 * The class renders a typical post form where elements can be added as inputs
 */
export class TypicalPostForm {
    constructor(formId) {
        this.formId = formId;
        this.result = document.createElement('form');
        // Set attributes and properties of the form
        this.result.method = 'POST';
        this.result.enctype = 'application/x-www-form-urlencoded';
        this.result.id = this.formId;
        this.result.classList.add(
            'flex',
            'flex-col',
            'gap-6',
            'w-11/12',
            'm-auto',
            'transition',
            'duration-150',
            'ease-in-out',
            'md:w-3/4'
        );
    }
}
/**
 * The class renders a `Submit` button with the provided text content
 */
export class TypicalFormSubmitButton {
    constructor(textContent) {
        this.textContent = textContent;
        this.result = document.createElement('button');
        this.result.type = 'submit';
        this.result.classList.add(
            'lato-regular',
            'block',
            'text-center',
            'mx-auto',
            'py-2',
            'px-5',
            'rounded-xl',
            'shadow',
            'cursor-pointer',
            'border-2',
            'border-innoblack',
            'bg-innoblack',
            'text-white',
            'focus:ring',
            'focus:ring-innoblack',
            'focus:ring-offset-4',
            'hover:bg-gray-800',
            'text-sm',
            'md:text-lg',
            'md:py-3',
            'md:px-8'
        );
        this.result.textContent = this.textContent;
    }
}
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
export class TextInputCharacterCount {
    constructor(labelWithInput) {
        this.labelWithInput = labelWithInput;
        this.counterSpan = document.createElement('span');
        this.counterSpan.classList.add('text-xs', 'lato-light', 'text-right');
        this.labelWithInput.append(this.counterSpan);

        let input =
            this.labelWithInput.querySelector('input') ||
            this.labelWithInput.querySelector('textarea');

        if (input.hasAttribute('maxlength')) {
            let inputValuesLength = input.value.length.toFixed(0);
            let maxLength = input.getAttribute('maxlength');
            let maxLengthInt = parseInt(maxLength);

            // Initial text
            this.counterSpan.textContent =
                inputValuesLength + ' / ' + maxLength;

            input.onkeyup = (e) => {
                let characterLength = e.target.value.length;
                this.counterSpan.textContent =
                    characterLength.toFixed(0) + ' / ' + maxLength;
            };
        }
    }
}
