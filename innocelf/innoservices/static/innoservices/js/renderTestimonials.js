'use strict';

import { Footer } from './ComponentClasses/Footer.js';
import { Navbar } from './ComponentClasses/Navbar.js';
import { HeadingOrParagraph } from './ComponentClasses/HeadingOrParagraph.js';
import { Testimonial } from './ComponentClasses/Testimonial.js';
import { _importSVG, _parseSVG } from './utils.js';
import { PageHeadElements, _obtainAllReviews } from './render_ts.js';
import { STATE, createHeadingWithBlueBackground } from './utils.js';

/**
 * Creates a container with the paragraph that introduces the testimonial
 * page
 * @returns Container with the introducing paragraph for the page
 */
function createParagraphContainer() {
    let container = document.createElement('div');
    container.classList.add(
        'flex',
        'flex-col',
        'w-11/12',
        'mx-auto',
        'my-24',
        'max-w-4xl'
    );

    let firstPara = new HeadingOrParagraph(
        'p',
        `Innocelf has had the great pleasure of working with clients from
		around the world - here are the kind words they had to say about our
		work...`
    ).result;
    let br = document.createElement('br');
    let secondPara = () => {
        let para = document.createElement('p');
        para.classList.add(
            'text-base',
            'lato-light',
            'sm:text-lg',
            'lg:text-xl'
        );

        let span = document.createElement('span');
        let a = document.createElement('a');

        span.textContent = `How can Innocelf help ...? `;

        a.textContent = 'Schedule Consultation via Calendly';
        a.classList.add('underline', 'lato-regular');
        a.target = '_blank';
        a.href = 'https://calendly.com/innocelf/virtual-appointment';

        para.append(span, a);
        return para;
    };
    container.append(firstPara, br, secondPara());

    return container;
}

/**
 * Creates a mutant observer to track when the testimonial is scrolled on to
 * change its opacity from 0 to 100
 */
function animateTestimonialView() {
    let allTestimonials = document.querySelectorAll(
        'div[animate-testimonials="true"]'
    );
    let initiateAnimate = function (entries) {
        entries.forEach((entry) => {
            // Is the element in the viewport?
            if (entry.isIntersecting) {
                // Swap the opacity classes
                entry.target.classList.remove('opacity-0');
                entry.target.classList.add('opacity-100');
            } else {
                // Swap the opacity classes
                entry.target.classList.remove('opacity-100');
                entry.target.classList.add('opacity-0');
            }
        });
    };
    let observer = new IntersectionObserver(initiateAnimate);
    allTestimonials.forEach(function (target) {
        let targetNode = target;
        observer.observe(targetNode);
    });
}

/**
 * Creates the grid to house all of the testimonials from clients
 * @returns Grid with all the customer testimonials
 */
function createReviewGrid() {
    let container = document.createElement('div');
    container.classList.add(
        'grid',
        'grid-cols-1',
        'gap-12',
        'w-11/12',
        'max-w-7xl',
        'mx-auto',
        'my-24',
        'md:w-2/3',
        'lg:w-10/12',
        'lg:grid-cols-2',
        'lg:gap-x-24',
        'lg:gap-y-72',
        'xl:w-3/4',
        '2xl:w-2/3'
    );

    _obtainAllReviews().then((data) => {
        Object.keys(data)
            .reverse()
            .map((item) => {
                let reviewObject = data[item];
                let firstName = reviewObject.fields.first_name;
                let lastInitial = reviewObject.fields.last_name.slice(0, 1);
                let dateString = reviewObject.fields.month_year;
                let upWorkReview = reviewObject.fields.upwork_review;
                let personName = firstName + ' ' + lastInitial + '.';
                personName = upWorkReview ? personName + '*' : personName;
                let review = reviewObject.fields.review;
                let testimonial = new Testimonial(
                    personName,
                    review
                ).renderTestimonialPageReview(dateString).result;
                container.append(testimonial);
            });

        animateTestimonialView();
    });

    return container;
}

export function renderTestimonial() {
    // new PageHeadElements(STATE.faqPage.meta, STATE.faqPage.title);
    let testHeading = createHeadingWithBlueBackground('Client Reviews');
    let navbar = new Navbar().render().result;
    let paraContainer = createParagraphContainer();
    let reviewContainer = createReviewGrid();
    let footer = new Footer().render().result;

    let app = document.getElementById('app');
    app.append(navbar, testHeading, paraContainer, reviewContainer, footer);

    animateTestimonialView();
}
