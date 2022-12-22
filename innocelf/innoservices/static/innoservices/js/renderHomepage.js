'use strict';

// import * as from './components_ts.js';
import { Footer } from './ComponentClasses/Footer.js';
import { Navbar } from './ComponentClasses/Navbar.js';
import { HeadingOrParagraph } from './ComponentClasses/HeadingOrParagraph.js';
import { AnchorLinks } from './ComponentClasses/AnchorLinks.js';
import { FirstPageListItem } from './ComponentClasses/FirstPageListItem.js';
import { DynamicTypedHeading } from './ComponentClasses/DynamicTypedHeading.js';
import {
    _importSVG,
    _parseSVG,
    launchContactUsModal,
    _fullWidthContainerWithBlueBackground,
    _grayCirclesOfBlueBeltBackground,
} from './utils.js';

import { STATE, PageHeadElements, homepageReviews } from './render_ts.js';

/**
 * Class defines the grid container that is part of the first call to action.
 * The grid houses the globe image and a list of services the company provides
 */
class GridContainerFirstCTA {
    constructor() {
        this.result = document.createElement('div');
        this.result.classList.add(
            'flex',
            'mx-auto',
            'my-12',
            'flex-col',
            'gap-8',
            'sm:flex-row',
            'lg:max-w-4xl',
            'lg:my-16',
            'xl:my-24',
            'xl:max-w-7xl',
            'xl:gap-0'
        );
        this.populateLeftColumn();
        this.populateRightColumn();
    }

    populateLeftColumn() {
        let leftColumn = document.createElement('div');
        leftColumn.classList.add(
            'flex',
            'flex-col',
            'my-auto',
            'px-8',
            'sm:px-4',
            'sm:w-1/2',
            'xl:px-0'
        );

        let heading = new HeadingOrParagraph(
            'h2',
            'Data-Driven Insights for your Inventions'
        ).renderWithClass(['leading-6', 'text-center', 'sm:text-left']).result;
        heading.classList.replace('2xl:text-5xl', '2xl:text-6xl');
        heading.classList.replace('lato-regular', 'lato-bold');

        let paragraph = new HeadingOrParagraph(
            'h6',
            `Rigorous research to acquire Intellectual Property Rights, curated
            for your needs`
        ).renderWithClass(['my-8']).result;

        let getStartedButton = new AnchorLinks(
            'Get Started'
        ).renderLargeInnocelfButtonFullRound().result;
        getStartedButton.addEventListener('click', launchContactUsModal);
        getStartedButton.classList.add('xl:mt-8');

        leftColumn.append(heading, paragraph, getStartedButton);
        this.result.append(leftColumn);
    }

    populateRightColumn() {
        let rightColumn = document.createElement('div');
        // rightColumn.classList.add('flex', 'flex-col', 'w-1/2', 'items-end');

        // _importSVG(
        //     '/static/innoservices/img/firstPage/firstPageCirclesCartoon.svg'
        // ).then((response) => {
        //     let svgElement = _parseSVG(response);
        //     svgElement.setAttribute('width', '600');
        //     rightColumn.append(svgElement);
        // });
        // this.result.append(rightColumn);

        rightColumn.classList.add(
            'flex',
            'flex-col',
            'pl-8',
            'sm:w-1/2',
            'sm:my-auto',
            'sm:pl-8',
            'xl:pl-24'
        );

        // List items
        let listItem1 = new FirstPageListItem(
            `Know your Invention's Novelty`
        ).render().result;
        let listItem2 = new FirstPageListItem(
            `Make Informed Market Decisions`
        ).render().result;
        listItem2.classList.add('mt-5');
        let listItem3 = new FirstPageListItem(
            `Simplify your Patent Process`
        ).render().result;
        listItem3.classList.add('mt-5');
        let listItem4 = new FirstPageListItem(
            `Gain Competitive Advantage`
        ).render().result;
        listItem4.classList.add('mt-5');

        rightColumn.append(listItem1, listItem2, listItem3, listItem4);

        this.result.append(rightColumn);
    }
}

/**
 * Creates and populates all the items with the first call to action. Relies on
 * GridContainerFirstCTA
 * @returns container with all the first call to action items
 */
function firstCallToActionContainer() {
    let container = document.createElement('div');
    container.classList.add(
        'flex',
        'flex-col',
        'w-full',
        'sm:bg-polkadot-graphic',
        'sm:bg-no-repeat',
        'sm:bg-center',
        'xl:bg-cover'
    );
    let navbar = new Navbar().render().result;
    let gridContainer = new GridContainerFirstCTA().result;

    container.append(navbar, gridContainer);

    return container;
}

/**
 * Creates and populates a container with the dynamic heading feature of the
 * homepage. It also gets some other SVG features for styling
 * Relies on _fullWidthContainerWithBlueBackground and
 * _grayCirclesOfBlueBeltBackgound
 * @returns container with the dynamic heading populated
 */
function dynamicHeadingContainer() {
    let container = _fullWidthContainerWithBlueBackground();

    let subContainer = document.createElement('div');
    subContainer.classList.add(
        'flex',
        'flex-col',
        'w-11/12',
        'mx-auto',
        'lg:max-w-4xl',
        'xl:max-w-7xl',
        'xl:w-3/5'
    );
    let dynamicTypedHeading = new DynamicTypedHeading().render().result;

    let paragraph = new HeadingOrParagraph(
        'h3',
        'Here are a few ways we can help ...'
    ).renderWithClass(['text-white', 'mb-12']).result;
    paragraph.classList.replace('lato-bold', 'lato-regular');
    paragraph.classList.remove('font-bold');
    paragraph.classList.replace('2xl:text-3xl', '2xl:text-4xl');

    subContainer.append(dynamicTypedHeading, paragraph);

    _grayCirclesOfBlueBeltBackground().then((response) => {
        container.append(response);
    });

    _importSVG(
        '/static/innoservices/img/firstPage/firstPageMiddleBlueBeltLogo.svg'
    ).then((response) => {
        let svgElement = _parseSVG(response);
        svgElement.classList.add(
            'w-16',
            'h-16',
            'absolute',
            'left-40',
            '-bottom-8',
            'sm:left-80',
            'md:left-1/2',
            'xl:w-24',
            'xl:h-24',
            'xl:-bottom-16'
        );
        container.append(svgElement);
    });

    container.append(subContainer);
    return container;
}

/**
 * Class defines a grid container that hosts all the services of the homepage
 * and their particular SVG items with explanations
 */
class GridContainerServicesOverview {
    constructor() {
        this.result = document.createElement('div');
        this.result.classList.add(
            'flex',
            'flex-col',
            'max-w-7xl',
            'gap-6',
            'mx-auto',
            'my-24',
            'md:gap-12'
        );

        this.populateImageLeftRow(
            'Researching a New Idea',
            'firstPageServicesGrid_ResearchingNewInvention.svg',
            `Prior art studies can be helpful to evaluate the novelty of an 
            invention for a new product or process. Prepared before a patent 
            application, it answers the following important questions:`,
            [
                'Does a similar invention already exists?',
                'Who has the intellectual property rights on it?',
                'Is that patent still active or expired?',
                'What is the scope of the granted claims?',
            ],
            'researching_a_new_idea'
        );
        this.populateImageRightRow(
            'Commercialization of a Product',
            'firstPageServicesGrid_CommercializingProduct.svg',
            `A successful product launch depends, in conjunction with many
            other factors, on understanding the landscape of inventions
            surrounding the field of invention. During a launch one may have
            the following queries:`,
            [
                'Is the field of invention crowded?',
                `What other opportunities of innovation exist?`,
                `Are there any competitors focused on
                certain inventions?`,
                `Are there opportunities to sharpen the
                current invention to make the product stand out?`,
            ],
            'during_commercialization_of_your_product'
        );
        this.populateImageLeftRow(
            'During Litigation',
            'firstPageServicesGrid_DuringLitigation.svg',
            `Whether you are assessing the strength of your portfolio or
            responding to a claim of infringement, a validity/invalidity search
            with the correct search methodology ensures you get the proper
            results for your needs.`,
            null,
            'during_litigation'
        );
        this.populateImageRightRow(
            'New Business Name or Logo',
            'firstPageServicesGrid_BusinessNameLogo.svg',
            `Research a business name or logo designs to identify all the 
            confusingly similar trademarks that are already registered or in
            the public domain.`,
            [
                `Ensures that you have a unique brand for maximum competitive
                advantage.`,
                `Saves on non-refundable fees for trademark registrations.`,
            ],
            'researching_new_business_names_or_logos'
        );
    }

    populateImageLeftRow(
        textHeading,
        svgImageFilename,
        paragraphContent,
        listItems,
        anchorLinkIdToAddress
    ) {
        let container = this._createMainContainerGridItem();
        let subContainer = this._createSubContainerGridItem(
            textHeading,
            paragraphContent,
            listItems,
            anchorLinkIdToAddress
        );
        this._importSVGElementGridItem(svgImageFilename).then((response) => {
            container.append(response, subContainer);
        });
        this.result.append(container);
    }

    populateImageRightRow(
        textHeading,
        svgImageFilename,
        paragraphContent,
        listItems,
        anchorLinkIdToAddress
    ) {
        let container = this._createMainContainerGridItem('right');
        let subContainer = this._createSubContainerGridItem(
            textHeading,
            paragraphContent,
            listItems,
            anchorLinkIdToAddress
        );
        this._importSVGElementGridItem(svgImageFilename).then((response) => {
            container.append(subContainer, response);
        });
        this.result.append(container);
    }

    _createMainContainerGridItem(imagePosition = 'left') {
        let container = document.createElement('div');
        if (imagePosition === 'left') {
            container.classList.add('flex', 'flex-col');
        } else if (imagePosition === 'right') {
            container.classList.add('flex', 'flex-col-reverse');
        }
        container.classList.add('md:flex-row', 'xl:gap-28');
        return container;
    }

    _createSubContainerGridItem(
        textHeading,
        paragraphContent,
        listItems,
        anchorLinkIdToAddress
    ) {
        let subContainer = document.createElement('div');
        subContainer.classList.add(
            'flex',
            'flex-col',
            'p-4',
            'my-auto',
            'sm:p-12',
            'md:w-1/2',
            'md:p-8'
        );
        let heading = new HeadingOrParagraph('h3', textHeading).renderWithClass(
            ['mb-8']
        ).result;
        let paragraph = new HeadingOrParagraph(
            'h6',
            paragraphContent
        ).renderWithClass(['text-justify', 'leading-8']).result;
        paragraph.classList.replace('lato-regular', 'lato-light');

        subContainer.append(heading, paragraph);
        if (listItems !== null) {
            let ul = this.__createListItems(listItems);
            subContainer.append(ul);
        }

        let learnMoreButton = new AnchorLinks(
            'Learn More'
        ).renderMediumInnocelfButtonFullRound().result;
        learnMoreButton.classList.add('mt-8');
        learnMoreButton.removeAttribute('target');
        learnMoreButton.href = '/services#' + anchorLinkIdToAddress;

        subContainer.append(learnMoreButton);
        return subContainer;
    }

    _importSVGElementGridItem(svgImageFilename) {
        return new Promise((result) => {
            _importSVG(
                '/static/innoservices/img/firstPage/' + svgImageFilename
            ).then((response) => {
                let svgElement = _parseSVG(response);
                svgElement.setAttribute('width', '600');
                svgElement.classList.add(
                    'w-80',
                    'h-64',
                    'm-auto',
                    'lg:w-auto',
                    'lg:h-96',
                    'xl:h-auto'
                );

                result(svgElement);
            });
        });
    }

    __createListItems(listItems) {
        let ul = document.createElement('ul');
        ul.classList.add('list-disc', 'mt-4', 'ml-8', 'leading-10');

        listItems.map((item) => {
            let li = document.createElement('li');
            let para = new HeadingOrParagraph('h6', item).result;
            para.classList.replace('lato-regular', 'lato-light');

            li.append(para);
            ul.append(li);
        });

        return ul;
    }
}

/**
 * Creates and populates a container with the mission reminder. It also gets
 * some other SVG features for styling.
 * Relies on _fullWidthContainerWithBlueBackground and
 * _grayCirclesOfBlueBeltBackgound
 * @returns container with the short mission reminder
 */
function firstPageShortMissionReminder() {
    let container = _fullWidthContainerWithBlueBackground();

    let subContainer = document.createElement('div');
    subContainer.classList.add(
        'flex',
        'flex-col',
        'w-11/12',
        'mx-auto',
        'gap-4',
        'my-5',
        'sm:my-auto',
        'lg:max-w-4xl',
        'xl:max-w-7xl',
        'xl:w-3/5'
    );
    let dynamicTypedHeading = new HeadingOrParagraph(
        'h2',
        `Innocelf is on a mission to EMPOWER inventors.`
    ).renderWithClass(['text-white']).result;
    let paragraph = new HeadingOrParagraph(
        'h3',
        'We promise, our quality will exceed your expectations ...'
    ).renderWithClass(['text-white']).result;
    paragraph.classList.replace('lato-bold', 'lato-regular');
    paragraph.classList.remove('font-bold');
    paragraph.classList.replace('2xl:text-3xl', '2xl:text-4xl');

    subContainer.append(dynamicTypedHeading, paragraph);

    _grayCirclesOfBlueBeltBackground().then((response) => {
        container.append(response);
    });

    container.append(subContainer);
    return container;
}

/**
 * Class defines the section of the homepage dedciated to testimonials from
 * prior clients. The class also has methods that populate five testimonials
 * from the backend
 */
class FirstPageTestimonials {
    constructor() {
        this.result = document.createElement('div');
        this.result.classList.add(
            'flex',
            'flex-col',
            'max-w-7xl',
            'mx-auto',
            'mb-24'
        );

        this.counter = 0;
        this.reviewCount = 4;
        this.leftButton = this._createButton('left');
        this.flexGrid = document.createElement('div');
        this.rightButton = this._createButton('right');
        this.paginationDotsList = document.createElement('ul');

        this.createContainerHeading();
        this.createTestimonialSVG();

        this.leftButton.onclick = () => {
            this.browseBackward();
        };
        this.rightButton.onclick = () => {
            this.browseForward();
        };
    }

    obtainTestimonials() {
        homepageReviews().then((data) => {
            this.createTestimonialGrid(data);
            this.createPaginationDots(data);

            if (this.counter === 0) {
                let firstIcon =
                    this.paginationDotsList.childNodes[0].firstChild;
                this._expandPaginationIcon(firstIcon);
            }
        });
    }

    createContainerHeading() {
        let heading = new HeadingOrParagraph(
            'h3',
            'What Our Clients Say ...'
        ).renderWithClass(['mx-auto', 'my-10', 'lg:my-16', 'xl:my-24']).result;

        this.result.append(heading);
    }

    createTestimonialSVG() {
        _importSVG(
            '/static/innoservices/img/firstPage/testimonialCircle.svg'
        ).then((response) => {
            let svgElement = _parseSVG(response);
            svgElement.setAttribute('width', '100');
            svgElement.classList.add(
                'h-16',
                'w-16',
                'mx-auto',
                'mb-8',
                'lg:h-20',
                'lg:w-20'
            );
            this.result.append(svgElement);

            // Create testimonial grid and populate here
            this.obtainTestimonials();
        });
    }

    createTestimonialGrid(data) {
        this.flexGrid.classList.add(
            'flex',
            'flex-row',
            'mx-auto',
            'gap-6',
            'h-60',
            'w-11/12',
            'lg:w-10/12',
            'xl:w-3/4'
        );

        this.flexGrid.append(this.leftButton);

        Object.keys(data).map((key) => {
            let reviewMaterial = this._createTestimonialCard(
                data[key].review,
                data[key].name
            );
            if (key === '0') {
                reviewMaterial.classList.remove('hidden');
                reviewMaterial.classList.replace('opacity-0', 'opacity-100');
            }
            this.flexGrid.append(reviewMaterial);
        });

        this.flexGrid.append(this.rightButton);

        this.result.append(this.flexGrid);
    }

    createPaginationDots(data) {
        this.paginationDotsList.classList.add(
            'mx-auto',
            'flex',
            'gap-4',
            'items-center',
            'mt-12'
        );

        for (let i = 0; i < Object.keys(data).length; i++) {
            let listItem = document.createElement('li');
            listItem.classList.add('inline-block');

            let icon = document.createElement('i');
            icon.classList.add('fas', 'fa-circle', 'fa-xs', 'text-gray-300');

            listItem.append(icon);
            this.paginationDotsList.append(listItem);
        }

        this.result.append(this.paginationDotsList);
    }

    browseForward() {
        let iconToExpand, iconToShrink, currentCounter;
        if (this.counter === 4) {
            currentCounter = 4;
            this.counter = 0;
        } else {
            currentCounter = this.counter;
            this.counter += 1;
        }

        iconToExpand =
            this.paginationDotsList.childNodes[this.counter].firstChild;
        iconToShrink =
            this.paginationDotsList.childNodes[currentCounter].firstChild;

        this._expandPaginationIcon(iconToExpand);
        this._shrinkPaginationIcon(iconToShrink);
        this._hideShowReview(currentCounter);
    }

    browseBackward() {
        let iconToExpand, iconToShrink, currentCounter;
        if (this.counter === 0) {
            currentCounter = 0;
            this.counter = 4;
        } else {
            currentCounter = this.counter;
            this.counter -= 1;
        }

        iconToExpand =
            this.paginationDotsList.childNodes[this.counter].firstChild;
        iconToShrink =
            this.paginationDotsList.childNodes[currentCounter].firstChild;

        this._expandPaginationIcon(iconToExpand);
        this._shrinkPaginationIcon(iconToShrink);
        this._hideShowReview(currentCounter);
    }

    _expandPaginationIcon(icon) {
        icon.classList.remove('fa-xs');
        icon.classList.replace('text-gray-300', 'text-innoblack');
    }

    _shrinkPaginationIcon(icon) {
        icon.classList.add('fa-xs');
        icon.classList.replace('text-innoblack', 'text-gray-300');
    }

    _hideShowReview(currentCounter) {
        let reviewToHide =
            this.flexGrid.getElementsByTagName('div')[currentCounter];
        let reviewToShow =
            this.flexGrid.getElementsByTagName('div')[this.counter];

        reviewToHide.classList.replace('opacity-100', 'opacity-0');
        setTimeout(() => {
            reviewToHide.classList.add('hidden');
            reviewToShow.classList.remove('hidden');
        }, 500);
        setTimeout(() => {
            reviewToShow.classList.replace('opacity-0', 'opacity-100');
        }, 800);
    }

    _createTestimonialCard(content, name) {
        let container = document.createElement('div');
        container.classList.add(
            'flex',
            'flex-col',
            'text-center',
            'hidden',
            'transition-all',
            'ease-in-out',
            'duration-700',
            'opacity-0',
            'p-1',
            'md:px-16',
            'xl:px-36'
        );

        let contentText = new HeadingOrParagraph('p', content).renderWithClass([
            'text-justify',
        ]).result;
        let nameText = new HeadingOrParagraph('h5', name).renderWithClass([
            'mt-8',
        ]).result;

        container.append(contentText, nameText);

        return container;
    }

    _createButton(right_or_left) {
        let button;
        if (right_or_left === 'left') {
            button = new AnchorLinks('').renderWithIcon([
                'fas',
                'fa-chevron-left',
            ]).result;
        } else if (right_or_left === 'right') {
            button = new AnchorLinks('').renderWithIcon([
                'fas',
                'fa-chevron-right',
            ]).result;
        }
        button.classList.add(
            'my-auto',
            'py-2',
            'px-3',
            'bg-innoblack',
            'rounded-xl',
            'text-white',
            'cursor-pointer'
        );

        return button;
    }
}

/**
 * Function that renders the homepage. It populates everything in the "app" id
 * tag
 */
export function renderHomepage() {
    // new PageHeadElements(STATE.homepage.meta, STATE.homepage.title);
    let topContainer = firstCallToActionContainer();
    let dynamicContainer = dynamicHeadingContainer();
    let servicesOverview = new GridContainerServicesOverview().result;
    let firstPageShortMissionReminderCont = firstPageShortMissionReminder();
    let firstPageTestimonials = new FirstPageTestimonials().result;
    let footer = new Footer().render().result;

    let app = document.getElementById('app');
    app.append(
        topContainer,
        dynamicContainer,
        servicesOverview,
        firstPageShortMissionReminderCont,
        firstPageTestimonials,
        footer
    );
}
