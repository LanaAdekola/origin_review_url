'use strict';

import { Footer } from './ComponentClasses/Footer.js';
import { Navbar } from './ComponentClasses/Navbar.js';
import { TwoColumnContainer } from './ComponentClasses/TwoColumnContainer.js'
import { HeadingOrParagraph } from './ComponentClasses/HeadingOrParagraph.js'
import { AnchorLinks } from './ComponentClasses/AnchorLinks.js'
import { createHeadingWithBlueBackground } from './utils.js';
import { _importSVG, _parseSVG } from './utils.js';

export const BLOG_CATEGORIES = {
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
        .renderWithClass(['uppercase'])
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
    readMore.href = '/knowledge-home/' + blogObject.pk.toFixed(0);
    readMore.target = ''

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
    * Function is an event listener for click events that will be triggered when
    * the filter links are clicked
    *
    * @param item - Event: The click event
    */
function filterBlogs(item) {
    let allFilters = document.querySelectorAll('[id$="-filter"]');
    allFilters = [...allFilters];
    allFilters.map((item) => item.classList.add('text-gray-300'));

    item.target.classList.remove('text-gray-300');
    document.getElementById('clear-filter-button').classList.remove('text-white');

    let filterId = item.target.id;
    let requestedFilter = filterId.split('-')[0];

    let allBlogs = document
        .getElementById('blog-home-page-right-container')
        .childNodes;
    allBlogs = [...allBlogs];
    allBlogs.map((item) => item.classList.remove('hidden'));


    let blogsNotInRequestedFilter = document
        .getElementById('blog-home-page-right-container')
        .querySelectorAll('div:not([id^=' + requestedFilter + '])')
    blogsNotInRequestedFilter = [...blogsNotInRequestedFilter];
    blogsNotInRequestedFilter.map((item) => item.classList.add('hidden'));
}

/**
    * Function is an event listener for click events of the clear filter button
    * It will clear the filters and restore
    *
    */
function clearFilter() {
    document.getElementById('clear-filter-button').classList.add('text-white');

    let allBlogs = document
        .getElementById('blog-home-page-right-container')
        .childNodes;
    allBlogs = [...allBlogs];
    allBlogs.map((item) => item.classList.remove('hidden'));

    let allFilters = document.querySelectorAll('[id$="-filter"]');
    allFilters = [...allFilters];
    allFilters.map((item) => item.classList.add('text-gray-300'));
}

/**
    * Function renders the filter elements that will be used to click on nad
    * filter blogs based on the clicked item
    *
    * @returns HTMLDivElement which is the container with the elements in it
    */
function filterOnBlogHome() {
    let container = document.createElement('div');
    container.classList.add(
        'flex',
        'flex-col',
        'w-full',
        'px-5',
        'py-20',
        'mb-auto'
    )

    let searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.classList.add(
        'lato-regular',
        'rounded',
        'border',
        'border-black',
        'p-3',
    )
    searchInput.placeholder = 'Search';

    let searchByCategory = new HeadingOrParagraph('p', 'Search By Category')
        .renderWithClass(['uppercase', 'mt-5'])
        .result;
    let clearFilterSpan = document.createElement('p');
    clearFilterSpan.classList.add(
        'lato-light',
        'text-xs',
        'underline',
        'uppercase',
        'mb-8',
        'cursor-pointer',
        'text-white',
    );
    clearFilterSpan.textContent = 'Clear Filter';
    clearFilterSpan.id = 'clear-filter-button';
    clearFilterSpan.addEventListener('click', clearFilter);

    container.append(searchByCategory, clearFilterSpan);

    Object.keys(BLOG_CATEGORIES).map(item => {
        let category = new AnchorLinks(BLOG_CATEGORIES[item])
            .renderWithTextAndUnderline()
            .result;
        category.classList.add('cursor-pointer', 'text-gray-300');
        category.id = item + '-filter';
        category.addEventListener('click', filterBlogs);
        container.append(category)
    });

    let aboutInnocelf = new AnchorLinks('About Innocelf')
        .renderLargeHollowInnocelfButton()
        .result;
    aboutInnocelf.classList.add('my-8');
    aboutInnocelf.href = '/about-us';
    aboutInnocelf.target = '';
    // container.append(aboutInnocelf);

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
    twoColContainer.children[0].classList.replace('lg:w-2/5', 'lg:w-1/5');
    twoColContainer.children[1].classList.replace('lg:w-3/5', 'lg:w-4/5');

    twoColContainer.children[0].append(filterOnBlogHome());

    blogObjectArr.map((item, index) => {
        let oneBlog = oneBlogOnHomePage(item);
        oneBlog.id = item.fields.category + '-' + index.toFixed(0);
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
        });

    let allBlogContainer = allBlogsHomePage(allBlogs);
    let app = document.getElementById('app');
    app.append(navbar, mainHeading, allBlogContainer, footer)
}
