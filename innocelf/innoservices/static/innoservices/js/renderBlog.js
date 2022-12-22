'use strict';

import { Footer } from './ComponentClasses/Footer.js';
import { Navbar } from './ComponentClasses/Navbar.js';
import { HeadingOrParagraph } from './ComponentClasses/HeadingOrParagraph.js'
import { AnchorLinks } from './ComponentClasses/AnchorLinks.js'
import { createHeadingWithBlueBackground } from './utils.js';
import { _importSVG, _parseSVG } from './utils.js';
import { BLOG_CATEGORIES } from './render_blog_home.js'

/**
    * Function parses the blog that is saved in the database into HTML and adds
    * pretty classes to it.
    *
    * @returns HTMLDivElement The container with the parsed blog.
    */
function parseBlog() {
    var converter = new showdown.Converter({
        noHeaderId: true,
        simpleLineBreaks: true,
        requireSpaceBeforeHeadingText: true,
        openLinksInNewWindow: true,
        headerLevelStart: 5
    }),
        html = converter.makeHtml(content_in_md);

    let classDefs = new HeadingOrParagraph('p', '').headingClassDefs;

    let parsedHTML = new DOMParser().parseFromString(html, 'text/html');
    let container = document.createElement('div');
    container.classList.add('flex', 'flex-col', 'w-full');

    let allElements = parsedHTML.body.children;
    allElements = [...allElements];
    allElements.map(item => container.append(item));

    allElements = container.getElementsByTagName('*');
    [...allElements].map(item => {
        let itemLower = item.tagName.toLowerCase();

        if (itemLower === 'ul') {
            item.classList.add('list-disc', 'ml-12', 'my-3');
        } else if (itemLower === 'li') {
            item.classList.add(...classDefs['p'].class)
        } else if (itemLower === 'p' || itemLower.includes('h')) {
            item.classList.add(...classDefs[itemLower].class)
            let lol = itemLower.includes('h')
                ? item.classList.add('mb-0.5', 'mt-3')
                : item.classList.add('my-2');
        } else if (itemLower === 'a') {
            item.classList.add(
                'underline',
                'uppercase',
                'text-xs',
                'md:text-sm'
            );
        }
    })

    return container;
}

/**
    * Function creates a container with all the blog material that will be 
    * rendered on the blog page
    */
function renderBlogMaterial() {
    let container = document.createElement('div');
    container.classList.add(
        'flex',
        'flex-col',
        'relative',
        'w-11/12',
        'mx-auto',
        'my-24',
        'pt-12',
        'lg:w-1/2',
    )

    let heading = new HeadingOrParagraph('h4', title)
        .renderWithClass(['uppercase', 'text-center'])
        .result;

    let goBack = new AnchorLinks('Go Back')
        .renderWithTextAndUnderline()
        .result;
    goBack.classList.add('absolute', 'top-0', 'right-0');
    goBack.href = '/knowledge-home';
    goBack.target = '';

    let categoryRen = document.createElement('span');
    categoryRen.classList.add(
        'text-sm',
        'lato-regular',
        'sm:text-base',
        'lg:text-base',
        '2xl:text-base',
        'uppercase',
        'underline',
        'mt-12',
        'mb-2',
    );
    categoryRen.textContent = BLOG_CATEGORIES[category];

    let authorRen = document.createElement('span');
    authorRen.classList.add(
        'text-sm',
        'lato-thin',
        'sm:text-base',
        'lg:text-base',
        '2xl:text-base',
        'tracking-wide'
    );
    authorRen.textContent = 'By: ' + author;

    let highlight = new HeadingOrParagraph('p', highlight_para)
        .renderWithClass(['text-justify', 'mt-8', 'mb-3'])
        .result;
    // highlight.classList.remove('lg:text-lg', '2xl:text-lg')
    let parsedBlog = parseBlog();

    container.append(
        heading,
        goBack,
        categoryRen,
        authorRen,
        highlight,
        parsedBlog
    );
    return container;
}

/**
    * Function will render all the elements of the Blog page onto the HTML
    */
function renderBlog() {
    let mainHeading = createHeadingWithBlueBackground('The Innocelf Blog');
    let navbar = new Navbar().render().result;
    let footer = new Footer().render().result;
    let blogMaterial = renderBlogMaterial();

    console.log(title);
    let app = document.getElementById('app');
    app.append(navbar, mainHeading, blogMaterial, footer)
}

renderBlog();
