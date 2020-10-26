'use strict';

///////////////////////////// Defining important components ///////////////////////////////////////

class CarouselItem extends HTMLElement {
	constructor() {
		super();
	}

	createParagraph() {
		let createP = document.createElement('p');
		createP.classList = 'text-justify p-3 mb-0 white-text';
		createP.style.fontSize = 'small';

		let createSpan = document.createElement('span');
		createSpan.classList = 'lato-regular';
		createSpan.textContent = this.getAttribute('actual-testimony');

		let createLeftQuote = document.createElement('i');
		createLeftQuote.classList = 'fas fa-quote-left fa-sm mr-3';

		let createRightQuote = document.createElement('i');
		createRightQuote.classList = 'fas fa-quote-right fa-sm ml-3';

		createP.append(createLeftQuote, createSpan, createRightQuote);

		return createP;
	}

	createTestimony() {
		let createTestimony = document.createElement('div');
		createTestimony.classList = 'testimonial';

		let createHR = document.createElement('hr');
		createHR.classList = 'my-2 w-50 hr-bold hr-light';

		let createName = document.createElement('h5');
		createName.textContent = this.getAttribute('name');
		createName.classList = 'font-weight-bold lato-bold white-text';
		createName.style.fontSize = 'small';

		createTestimony.append(this.createParagraph(), createHR, createName);

		return createTestimony;
	}

	connectedCallback() {
		let carouselItem = document.createElement('div');
		carouselItem.classList = 'carousel-item';

		if (this.getAttribute('is-active') === 'active') {
			carouselItem.classList += ' active';
		}

		carouselItem.append(this.createTestimony());
		this.append(this.createTestimony());
	}
}

customElements.define('carousel-item', CarouselItem);

class TestimonialCard extends HTMLElement {
	constructor() {
		super();
	}

	createTestimonialContent() {
		let testimonialPara = document.createElement('p');
		testimonialPara.classList = 'lead lato-light-italic';
		testimonialPara.textContent = this.getAttribute('testimonial-content');

		return testimonialPara;
	}

	createAvatarDiv() {
		let avatar = document.createElement('div');
		avatar.classList = 'view card-img-64 mx-auto mt-5 mb-4';

		return avatar;
	}

	createTestimonialPerson() {
		let testimonialPerson = document.createElement('p');
		testimonialPerson.classList = 'text-muted lato-regular';
		testimonialPerson.textContent = this.getAttribute('testimonial-name');

		return testimonialPerson;
	}

	connectedCallback() {
		this.append(this.createTestimonialContent(), this.createAvatarDiv(), this.createTestimonialPerson());
	}
}

customElements.define('testimonial-card', TestimonialCard);
