'use strict';

import { Footer } from './ComponentClasses/Footer.js';
import { Navbar } from './ComponentClasses/Navbar.js';
import { TwoColumnContainer } from './ComponentClasses/TwoColumnContainer.js'
import { HeadingOrParagraph } from './ComponentClasses/HeadingOrParagraph.js'
import { AnchorLinks } from './ComponentClasses/AnchorLinks.js'
import { createHeadingWithBlueBackground } from './utils.js';
import { _importSVG, _parseSVG } from './utils.js';

const BLOG_CATEGORIES = {
    'PAT': 'Patents',
    'TMK': 'Trademarks',
    'GRE': 'General Research',
    'CAS': 'Case Studies',
    'IPR': 'Intellectual Property'
};

/**
    * Function renders one blog post on the knowledge home page by taking in the
    * blog post object from the backend.
    *
    * @param blogObject - Object: The blog object with all its information from
    * the backend
    *
    * @returns HTMLDivElement as a container with the information rendered
    */
function oneBlogOnHomePage(blogObject) {
    let container = document.createElement('div');
    container.classList.add(
        'w-full',
        'flex',
        'flex-col',
        'px-3',
        'py-24',
        'border-0',
        'border-b-4',
        'border-black'
    );

    let heading = new HeadingOrParagraph('h5', blogObject.fields.title)
        .renderWithClass(['text-center', 'uppercase'])
        .result;

    let category = document.createElement('span');
    category.classList.add(
        'text-sm',
        'lato-regular',
        'sm:text-base',
        'lg:text-base',
        '2xl:text-base',
        'uppercase',
        'underline',
        'mt-6',
        'mb-12',
    );
    category.textContent = BLOG_CATEGORIES[blogObject.fields.category];

    let highlight = new HeadingOrParagraph('p', blogObject.fields.highlight_para)
        .renderWithClass(['text-justify', 'mb-16'])
        .result;
    highlight.classList.remove('lg:text-lg', '2xl:text-lg')

    let readMore = new AnchorLinks('Read More')
        .renderLargeInnocelfButton()
        .result;
    readMore.classList.replace('mx-auto', 'mr-auto');

    let author = document.createElement('span');
    author.classList.add(
        'text-sm',
        'lato-thin',
        'sm:text-base',
        'lg:text-base',
        '2xl:text-base',
        'mt-3',
        'tracking-wide'
    );
    author.textContent = 'By: ' + blogObject.fields.author;


    container.append(heading, category, highlight, readMore, author);
    return container;
}

/**
    * Function renders all the blog posts on the knowledge home page by taking
    * a list of all blog post objects from the backend
    *
    * @param blogObjectArr - Array: Blog objects into an array
    *
    * @returns HTMLDivElement as a container with the filtering mechanism and 
    * the blogs
    */
function allBlogsHomePage(blogObjectArr) {
    let twoColContainer = new TwoColumnContainer('blog-home-page').result;
    twoColContainer.classList.replace('mb-24', 'my-24');
    twoColContainer.children[0].classList.remove('hidden');

    blogObjectArr.map((item) => {
        let oneBlog = oneBlogOnHomePage(item);

        twoColContainer.children[1].append(oneBlog);
    })

    return twoColContainer;
}

/**
    * Function renders the Blog Page Home which lists all the blogs that are 
    * written by staff and are posted.
    */
export async function renderBlogHome() {
    let mainHeading = createHeadingWithBlueBackground('Innocelf Knowledge');
    let navbar = new Navbar().render().result;
    let footer = new Footer().render().result;

    let allBlogs = await fetch('/get-all-blog-posts')
        .then(response => response.json())
        .then(response => {
            let responseJson = JSON.parse(response);
            return responseJson;
            // let text = responseJson[0].fields.content_in_md;
            // var converter = new showdown.Converter({
            //     noHeaderId: true,
            //     simpleLineBreaks: true,
            //     requireSpaceBeforeHeadingText: true,
            //     openLinksInNewWindow: true,
            // }),
            //     html      = converter.makeHtml(text);
            // console.log(html);
        });

    let allBlogContainer = allBlogsHomePage(allBlogs);
    let app = document.getElementById('app');
    app.append(navbar, mainHeading, allBlogContainer, footer)
}
