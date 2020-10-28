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

class ServiceDescription extends HTMLElement {
	constructor() {
		super();
	}

	createServiceTitle() {
		let title = document.createElement('p');
		title.classList = 'font-weight-bold title font-weight-bold text-uppercase spacing mt-4 mx-4 lato-bold';

		let titleIcon = document.createElement('i');
		titleIcon.classList = 'fas fa-square mr-2';
		titleIcon.setAttribute('aria-hidden', 'true');

		let titleText = document.createElement('strong');
		titleText.textContent = this.getAttribute('service-name');

		title.append(titleIcon, titleText);
		return title;
	}

	createServiceDescription() {
		let description = document.createElement('p');
		description.classList = 'grey-text font-small mx-4 text-justify';
		description.textContent = this.getAttribute('first-glimpse');
		description.style.wordSpacing = '0.3rem';
		description.id = this.getAttribute('id') + '_paragraph';

		let dots = document.createElement('span');
		dots.id = this.getAttribute('id') + '_dots';
		dots.textContent = '...';

		let detail = document.createElement('span');
		detail.id = this.getAttribute('id') + '_detail';
		detail.textContent = this.getAttribute('service-detail');
		detail.style.display = 'none';

		description.append(dots, detail);

		return description;
	}

	createReadMoreButton() {
		let pTag = document.createElement('p');
		pTag.classList = 'font-small font-weight-bold orange-text mx-4 mb-0';

		let aTag = document.createElement('a');
		aTag.id = this.getAttribute('id') + '_show_more';
		aTag.textContent = 'read more';
		aTag.setAttribute('onclick', this.getAttribute('function'));

		pTag.append(aTag);

		return pTag;
	}

	createCardWrapper() {
		let card = document.createElement('div');
		card.classList = 'card card-body text-left white hoverable';

		card.append(this.createServiceTitle(), this.createServiceDescription(), this.createReadMoreButton());

		return card;
	}

	connectedCallback() {
		this.append(this.createCardWrapper());
	}
}

customElements.define('service-description', ServiceDescription);
