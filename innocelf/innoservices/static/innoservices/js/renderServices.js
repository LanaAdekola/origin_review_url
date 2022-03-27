'use strict';

import { Footer } from './ComponentClasses/Footer.js';
import { Navbar } from './ComponentClasses/Navbar.js';
import { HeadingOrParagraph } from './ComponentClasses/HeadingOrParagraph.js';
import { AnchorLinks } from './ComponentClasses/AnchorLinks.js';
import { ServiceDescription } from './ComponentClasses/ServiceDescription.js';
import { PageHeadElements, homepageReviews } from './render_ts.js';
import { STATE, createHeadingWithBlueBackground } from './utils.js';

/**
 * Creates a container with a paragraph container that houses all the paragraphs
 * of the services page introduction
 * @returns Container with all the paragraphs that introduce the services page
 */
function createParagraphContainer() {
    let paragraphContainer = document.createElement('div');
    paragraphContainer.classList.add(
        'container',
        'w-10/12',
        'm-auto',
        'justify-center',
        'mt-24',
        'mb-6',
        'lg:w-4/6'
    );

    let firstHeading = new HeadingOrParagraph(
        'h3',
        'Our Search Combines Modern AI with Professional Expertise'
    ).renderWithClass(['text-center', 'my-5']).result;

    let __paragraph = (paragraphText) => {
        let paragraph = new HeadingOrParagraph(
            'p',
            paragraphText
        ).renderWithClass([
            'w-full',
            'mt-10',
            'mx-auto',
            'text-justify',
            'leading-6',
            'sm:leading-7',
            'md:leading-8',
            'lg:leading-9',
            'lg:w-4/6',
        ]).result;
        return paragraph;
    };
    let firstParagraph = __paragraph(
        `As an inventor you are constantly trying to add value to this world
            through your inventions. However, there is always this thought at
            the back of your mind whether I am infringing on another's
            invention.  On the other end, as a Patent Practitioner, you are
            helping an innovator protect their invention by investing long hours
            in filing all the paper work.`
    );
    // Second Paragraph
    let secondParagraph = __paragraph(
        `You seldom have the time to divert your energy from your core work
            to research the patent spectrum and provide stakeholders with the
            relevant answers they need.`
    );
    // Third Paragraph
    let thirdParagraph = __paragraph(
        `Let Innocelf help you with comprehensive and systematic
            intellectual property research and analysis. Whether you have a new
            idea, drafting claims for a patentable idea, determining clearance 
            for the next market launch, or deciding to license a patent, you
            deserve an analysis to revolutionize your IP strategy.`
    );
    // Fourth Paragraph
    let fourthParagraph = __paragraph(
        `We combine a modern AI search-based approach with manual expert
            analysis to free you from reading unnecessary search results.`
    );

    paragraphContainer.append(
        firstHeading,
        firstParagraph,
        secondParagraph,
        thirdParagraph,
        fourthParagraph
    );
    return paragraphContainer;
}

/**
 * Creates a contaienr with all the services listed from top to bottom
 * @returns Container with all the services listed
 */
function createServicesContainer() {
    let container = document.createElement('div');
    container.classList.add('flex', 'flex-col', 'w-full');

    let individualServicesObject = STATE.services.individualServices;

    Object.keys(individualServicesObject).map((item) => {
        let idForService = item.toLowerCase().replaceAll(' ', '_');

        let service = individualServicesObject[item];
        let serviceDescription = new ServiceDescription(
            item,
            service.listItems,
            service.paragraph,
            service.imageSrc,
            service.advantages
        ).render().result;

        serviceDescription.id = idForService;

        // serviceContainer.append(serviceDescription);
        container.append(serviceDescription);
    });

    return container;
}

/**
 * Function is the main driver for renderServices which will be called when
 * the services option from the navbar is clicked
 */
export function renderServices() {
    new PageHeadElements(STATE.homepage.meta, STATE.homepage.title);
    let navbar = new Navbar().render().result;
    let paragraphContainer = createParagraphContainer();
    let headingContainer = createHeadingWithBlueBackground('Services');
    let servicesContainer = createServicesContainer();
    let footer = new Footer().render().result;

    let app = document.getElementById('app');
    app.append(
        navbar,
        paragraphContainer,
        headingContainer,
        servicesContainer,
        footer
    );
}
