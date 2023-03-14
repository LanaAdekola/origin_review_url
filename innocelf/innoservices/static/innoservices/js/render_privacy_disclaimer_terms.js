'use strict';
import * as ComponentsTS from './components_ts.js';
import { Navbar } from './ComponentClasses/Navbar.js';
import { Footer } from './ComponentClasses/Footer.js';
import { HeadingOrParagraph } from './ComponentClasses/HeadingOrParagraph.js';
import { createHeadingWithBlueBackground } from './utils.js';
import { PageHeadElements, STATE } from './render_ts.js';
/**
 * The function returns a paragraph element for the Terms, Disclaimer and Privacy
 * Policy pages. It has certain classes predefined
 * @param textContent String of the text content that will be present in the element
 * @returns A paragraph element with predefined classes and provided text content
 */
function __typicalParagraph(textContent) {
    let para = new HeadingOrParagraph('p', textContent).renderWithClass([
        'mt-5',
        'text-justify',
    ]).result;
    return para;
}

/**
 * The function returns a heading element for the Terms, Disclaimer and Privacy
 * Policy pages. It has certain classes predefined
 * @param textContent String of the text content that will be present in the element
 * @returns A heading element with predefined classes and provided text content
 */
function __typicalHeading(textContent) {
    let heading = new HeadingOrParagraph('h6', textContent).renderWithClass([
        'mt-10',
    ]).result;
    return heading;
}

/**
 * The function renders the Privacy Policy Page /privacy-policy
 */
export function renderPrivacyPolicy() {
    // new PageHeadElements(STATE.privacyPolicy.meta, STATE.privacyPolicy.title);
    let navbar = new Navbar().render().result;
	document.getElementById('navbar-div').append(navbar)
}

/**
 * The function renders the Disclaimer Page /disclaimer
 */
export function renderDisclaimerPage() {
    // new PageHeadElements(STATE.disclaimer.meta, STATE.disclaimer.title);
    let navbar = new Navbar().render().result;
	document.getElementById('navbar-div').append(navbar)
}

/**
 * The function renders the Privacy Policy Page /privacy-policy
 */
export function renderTermsOfUsePage() {
    let navbar = new Navbar().render().result;
	document.getElementById('navbar-div').append(navbar)
}
