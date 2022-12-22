'use strict';

import { Footer } from './ComponentClasses/Footer.js';
import { Navbar } from './ComponentClasses/Navbar.js';
import { FAQ } from './ComponentClasses/FAQ.js';
import { AnchorLinks } from './ComponentClasses/AnchorLinks.js';
import { _importSVG, _parseSVG } from './utils.js';
import { PageHeadElements } from './render_ts.js';
import { STATE, createHeadingWithBlueBackground } from './utils.js';

/**
 * Function toggles the hidden class for the questions
 */
function __expandCollapseAnswers() {
    let allDataExpands = document.querySelectorAll('[data-expand="true"]');
    allDataExpands.forEach((value) => {
        let element = value;
        element.classList.toggle('hidden');
    });
}

/**
 * Creates a container / row for the expand all and collapse all buttons
 * @returns Container with the two buttons
 */
function createExpandCollapseButtons() {
    let row = document.createElement('div');
    row.classList.add(
        'flex',
        'w-11/12',
        'mx-auto',
        'mb-6',
        'justify-end',
        'items-center'
    );

    let expandButton = new AnchorLinks('Expand All').renderLinkButton().result;
    expandButton.classList.add('mr-4');
    expandButton.id = 'expand-all-answers-button';
    expandButton.onclick = __expandCollapseAnswers;

    let collapseButton = new AnchorLinks('Collapse All').renderLinkButton()
        .result;
    collapseButton.id = 'collapse-all-answers-button';
    collapseButton.onclick = __expandCollapseAnswers;

    row.append(expandButton, collapseButton);
    return row;
}

/**
 * Creates a container with the FAQ container that includes the buttons and
 * the various questions
 * @returns Container with all the questions and two buttons
 */
function createFAQContainer() {
    let container = document.createElement('div');
    container.classList.add(
        'flex',
        'flex-col',
        'w-11/12',
        'mx-auto',
        'my-24',
        'max-w-7xl',
        'bg-no-repeat',
        'bg-center'
    );
    container.style.backgroundImage = `url('/static/innoservices/img/innocelfGrayCNoGradient.svg')`;
    container.style.backgroundSize = '500px 500px';

    let expandCollapseButtons = createExpandCollapseButtons();
    container.append(expandCollapseButtons);

    let subContainer = document.createElement('div');
    subContainer.classList.add('flex', 'flex-col', 'gap-8');

    let faqObject = STATE.faqPage.faqs;
    Object.keys(faqObject).map((item) => {
        let faq = new FAQ(
            faqObject[item].question,
            faqObject[item].answer
        ).render().result;
        subContainer.append(faq);
    });

    container.append(expandCollapseButtons, subContainer);
    return container;
}

/**
 * Main driver to render the FAQ page
 */
export function renderFAQ() {
    // new PageHeadElements(STATE.faqPage.meta, STATE.faqPage.title);
    let faqHeading = createHeadingWithBlueBackground(
        'Frequently Asked Questions'
    );
    let faqContainer = createFAQContainer();
    let navbar = new Navbar().render().result;
    let footer = new Footer().render().result;

    let app = document.getElementById('app');
    app.append(navbar, faqHeading, faqContainer, footer);
}
