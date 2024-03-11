'use strict';

import { HeadingOrParagraph } from './HeadingOrParagraph.js';

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
        let additionalParagraphClasses = ['text-justify'];
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
