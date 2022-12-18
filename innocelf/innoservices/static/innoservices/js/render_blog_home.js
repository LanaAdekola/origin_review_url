'use strict';

import { Footer } from './ComponentClasses/Footer.js';
import { Navbar } from './ComponentClasses/Navbar.js';
import { createHeadingWithBlueBackground } from './utils.js';
import { _importSVG, _parseSVG } from './utils.js';

/**
    * Function renders the Blog Page Home which lists all the blogs that are 
    * written by staff and are posted.
    */
export function renderBlogHome() {
    let testHeading = createHeadingWithBlueBackground('Innocelf Knowledge');
    let navbar = new Navbar().render().result;
    let footer = new Footer().render().result;

    let app = document.getElementById('app');
    app.append(navbar, testHeading, footer)
}
