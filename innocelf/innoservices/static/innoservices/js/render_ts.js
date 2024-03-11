'use strict';
import * as ComponentsTS from './components_ts.js';
export const STATE = {
    homepage: {
        meta: {
            name: 'description',
            content:
                'Innocelf, LLC is a patent search firm in Michigan, USA, that offers the highest quality patent searches and analytics services to protect your invention at a resonable price. Schedule a free consultation with us today to get started on your patent journey.',
        },
        title: 'Innocelf | Patent Search Firm in USA | USPTO Patent Research',
    },
    services: {
        meta: {
            name: 'description',
            content:
                'At Innocelf, LLC we provide patentability / novelty research, freedom to operate search, validity search, product research and landscape / state of the art search. We excel in the following technologies: healthcare and medical devices, pharmaceutical, chemical and material science, biotechnology and life sciences, food technology and consumer products.',
        },
        title: 'Services | Patent Research Consultant',
        individualServices: {
            'Researching a New Idea': {
                isFirst: true,
                listItems: [
                    'Patentability Search',
                    'Novelty Search',
                    'Prior Art Search',
                ],
                paragraph: `
				Comprehensive research to prove novelty of each element of your 
				invention. We provide a search targeting every possible novel 
				element of your invention rather than just matching keywords with 
				prior arts. Our search report includes all search results explaining 
				why this is the relevant search result and where to read relevant 
				information in a similar patent document. While researching novelty 
				for your invention, we also enlist all possible claims that one 
				should consider while drafting a patent application.
                `,
                imageSrc: `/static/innoservices/img/services/servicePage_ResearchingNewIdea.png`,
            },
            'During Commercialization of Your Product': {
                isFirst: false,
                listItems: [
                    'Freedom to Operate Search',
                    'Clearance Search',
                    'Infringement Analysis',
                ],
                paragraph: `
				Are you developing or planning to launch a new product? For successful 
				product launches without the risk of costly patent infringement, 
				litigation is a goal for every business. We can help you achieve this 
				goal by performing freedom to operate search.
                `,
                imageSrc: `/static/innoservices/img/services/servicePage_DuringCommercialization.png`,
            },
            'During Litigation': {
                isFirst: false,
                listItems: ['Validity / Invalidity Search'],
                paragraph: `
				Do you want to ensure the validity of a patent? Whether you are 
				assessing the strength of your portfolio or are responding to a claim 
				of infringement, a validity/invalidity search with the correct search 
				methodology is necessary.
                `,
                imageSrc: `/static/innoservices/img/services/servicePage_DuringLitigation.svg`,
            },
            'Researching New Business Names or Logos': {
                isFirst: false,
                listItems: ['Trademark Search'],
                paragraph: `
				Do you have a catchy business name? We research your business name and 
				logo designs to identify all the confusingly similar trademarks that 
				are already registered to provide you with the opportunity to select a 
				distinct brand. The right selection can help you save a lot of money 
				on nonrefundable fees for trademark registration applications.
                `,
                imageSrc:
                    '/static/innoservices/img/services/servicePage_BusinessNameLogo.svg',
            },
            // 'Technology Analysis': {},
            // 'Goal or Object Oriented Search': {},
        },
    },
    aboutUs: {
        meta: {
            name: 'description',
            content:
                'Know more about Innocelf, LLC and know our mission. Our values are targeted towards getting the best for our clients. Together we are determined to protect the inventions of our clients and giving them the right analyses to succeed in their patent process.',
        },
        title: 'Innocelf | About Us | Intellectual Property Service Provider',
        ourValues: {
            Collaboration:
                'We collaborate with each client as a team to help them achieve their Intellectual Property goals.',
            'Long Term Support':
                'Our collaboration extends after the completion of a particular project so that our clients can achieve their long term research goals',
            Transparency:
                'We ensure that their is transparent and clear communication with each client which helps us build long term relationships.',
        },
    },
    testimonalsPage: {
        meta: {
            name: 'description',
            content: `Innocelf strives to provide the best Patent Research to our clients.
            This includes using our wide experience and the best possible tools in the marketplace. The testimonials are a product of Innocelf's work, working
            directly with the client or through Upwork`,
        },
        title: 'Testimonials | Client Reviews regarding our Patent Services',
    },
    faqPage: {
        meta: {
            name: 'description',
            content: `Innocelf specializes in Patent Research and is a Patent Research
            Consultant firm based in Michigan. But there could be questions about our
            services. The page helps to identify the questions and answer them.`,
        },
        title: 'Frequenty Asked Questions | Answers regarding our Patent Services',
        faqs: {
            1: {
                question: 'Is my submitted search disclosure secure?',
                answer: `Yes. We sign non-disclosure agreements with all of our 
                clients and the security of your technical and proprietary 
                information is our top priority.`,
            },
            2: {
                question:
                    'Can Innocelf provide me with Non-Patent Literature (NPL) searching?',
                answer: `Yes. We can provide you with NPL searching.`,
            },
            3: {
                question: 'Do you offer high volume discounts?',
                answer: `Absolutely! We offer substantial discounts to our clients 
                for high volume work.`,
            },
            4: {
                question: 'How do I place an order for a search?',
                answer: `Please schedule a free consultation with us here.`,
            },
            5: {
                question: 'Is Innocelf a law firm?',
                answer: `No. Innocelf, LLC only provides cutting edge 
                intellectual property research and does not practice patent law.`,
            },
            6: {
                question:
                    'Will Innocelf write or draft a patent application for me?',
                answer: `Yes. Innocelf may help you in writing a patent application as a technical writer but we do not offer patent filing or prosecution.`,
            },
            7: {
                question: 'Will Innocelf file a patent application for me?',
                answer: `No. Innocelf, LLC only provides cutting edge intellectual property research and does not practice patent law or patent prosecution.`,
            },
        },
    },
    contactUs: {
        meta: {
            name: 'description',
            content: `Contact Innocelf using the following form and get started
            with your Patent Research. We will work with you for the long term and 
            provide volume discounts for multiple projects.`,
        },
        title: 'Contact Us | Get Started with your Patent Research',
    },
    privacyPolicy: {
        meta: {
            name: 'description',
            content: `The privacy policy of Innocelf, LLC. Highlights how we use
            your data, where can we be contacted and your rights as our valued client`,
        },
        title: 'Privacy Policy | Innocelf, LLC',
    },
    termsAndConditions: {
        meta: {
            name: 'description',
            content: `The Terms of Use for Innocelf LLC's website.`,
        },
        title: 'Terms of Use | Innocelf, LLC',
    },
    disclaimer: {
        meta: {
            name: 'description',
            content: `A disclaimer about Innocelf LLC's website`,
        },
        title: 'Dislaimer | Innocelf, LLC',
    },
    sendReviewRequest: {
        meta: {
            name: 'description',
            content: `Send a review request to a client`,
        },
        title: 'Send Review Request | Innocelf, LLC',
    },
    writeReview: {
        meta: {
            name: 'description',
            content: `Write a review for services provided by Innocelf LLC.`,
        },
        title: 'Submit Review | Innocelf, LLC',
    },
    ourProcess: {
        meta: {
            name: 'description',
            content: `At Innocelf LLC we follow a multi-step process to ensure that 
            your invention stays safe but is also straightforward so that you can continue
            with your most important work and leave the research to us.`,
        },
        title: 'Our Process | Process we follow for all Clients',
    },
};
/**
 * The function obtains all reviews after requesting them from the backend via
 * an XML request
 * @returns Promise with all the reviews that are obtained from the backend
 */
export function _obtainAllReviews() {
    return new Promise((resolve) => {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let testimonialsObject = JSON.parse(
                    JSON.parse(this.response)['all_reviews_json']
                );
                resolve(testimonialsObject);
            }
        };
        xhttp.open('GET', '/testimonials');
        xhttp.send();
    });
}
/**
 * The function obtains the a form after requesting them from the backend
 * via an XML request
 * @returns Promise with the form as a string
 */
export function _obtainForm(link, additionalHeaders = {}) {
    return new Promise((resolve) => {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                resolve(this.response);
            }
        };
        xhttp.open('GET', link);
        if (additionalHeaders) {
            Object.keys(additionalHeaders).map((item) => {
                xhttp.setRequestHeader(item, additionalHeaders[item]);
            });
        }
        xhttp.send();
    });
}
/**
 * The function takes in the form element and sends it to the backend. It also
 * prints the message obtained from the backend
 * @param formElement The form which needs to be submitted
 * @param mainContainer The main container where the form is housed
 * @param linkToSendFormData The link to where the form will be sent to the backend
 * @param mainContainerIdPrepend The main container id prepend where the form is housed
 */
export function _submitForm(
    formElement,
    mainContainer,
    linkToSendFormData,
    mainContainerIdPrepend
) {
    function __modifyMainContainer(message) {
        mainContainer
            .querySelector('#' + mainContainerIdPrepend + '-right-container')
            .querySelector('form')
            .remove();
        mainContainer
            .querySelector('#' + mainContainerIdPrepend + '-right-container')
            .append(message);
    }
    let formData = new FormData(formElement);
    let xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        let response = this.response;
        let responseJson = JSON.parse(response);
        if (responseJson.hasOwnProperty('Success')) {
            // Empty the right main container
            let message = new ComponentsTS.HeadingOrParagraph(
                'h3',
                responseJson['Success']
            ).renderWithClass([
                'm-auto',
                'transition-opacity',
                'duration-500',
                'ease-in-out',
                'opacity-0',
            ]).result;
            __modifyMainContainer(message);
            setTimeout(() => {
                message.classList.remove('opacity-0');
                message.classList.add('opacity-100');
            }, 800);
        } else if (responseJson.hasOwnProperty('Failure')) {
            let message = new ComponentsTS.HeadingOrParagraph(
                'h3',
                responseJson['Failure']
            ).renderWithClass([
                'm-auto',
                'text-red-500',
                'transition-opacity',
                'duration-500',
                'ease-in-out',
                'opacity-0',
            ]).result;
            __modifyMainContainer(message);
            setTimeout(() => {
                message.classList.remove('opacity-0');
                message.classList.add('opacity-100');
            }, 800);
        }
    };
    xhttp.open('POST', linkToSendFormData);
    xhttp.send(formData);
}
/**
 * The function distills all the reviews obtained from the backend and returns a
 * Promise with four.
 * @returns Promise with four reviews after distilling them down from all the backend
 * reviews
 */
export function homepageReviews() {
    return new Promise((resolve) => {
        _obtainAllReviews().then(function (testimonialsObject) {
            let homepageTestimonials = {};
            let reviewKeys = [3, 4, 1, 6, 8];
            for (let i = 0; i < reviewKeys.length; i++) {
                let random = reviewKeys[i];
                homepageTestimonials[i] = {
                    name:
                        testimonialsObject[random].fields.first_name +
                        ' ' +
                        testimonialsObject[random].fields.last_name.slice(
                            0,
                            1
                        ) +
                        '.',
                    review: testimonialsObject[random].fields.review,
                };
            }
            resolve(homepageTestimonials);
        });
    });
}
/**
 * The function distills all the reviews obtained from the backend and returns a
 * Promise with two.
 * @returns Promise with two reviews after distilling them down from all the
 * backend reviews
 */
export function aboutUsReviews() {
    return new Promise((resolve) => {
        _obtainAllReviews().then((testimonialsObject) => {
            let jasonReview = Object.keys(testimonialsObject).find(
                (item) => testimonialsObject[item].fields.first_name === 'Jason'
            );
            let robinReview = Object.keys(testimonialsObject).find(
                (item) => testimonialsObject[item].fields.first_name === 'Robin'
            );
            let aboutUsTestimonials = {
                1: {
                    name:
                        testimonialsObject[jasonReview].fields.first_name +
                        ' ' +
                        testimonialsObject[jasonReview].fields.last_name.slice(
                            0,
                            1
                        ) +
                        '.',
                    review: testimonialsObject[jasonReview].fields.review,
                },
                2: {
                    name:
                        testimonialsObject[robinReview].fields.first_name +
                        ' ' +
                        testimonialsObject[robinReview].fields.last_name.slice(
                            0,
                            1
                        ) +
                        '.',
                    review: testimonialsObject[robinReview].fields.review,
                },
            };
            resolve(aboutUsTestimonials);
        });
    });
}
/**
 * The class creates page head elements of the page which include the meta tag
 * description and the title of the page.
 */
export class PageHeadElements {
    constructor(metaTag, title) {
        this.metaTag = metaTag;
        this.title = title;
        let meta = this.createMetaTag();
        let titleTag = this.createTitleTag();
        document.head.insertAdjacentHTML('beforeend', meta.outerHTML);
        document.head.insertAdjacentHTML('beforeend', titleTag.outerHTML);
    }
    createMetaTag() {
        let meta = Object.assign(document.createElement('meta'), {
            name: this.metaTag.name,
            content: this.metaTag.content,
        });
        return meta;
    }
    createTitleTag() {
        let title = document.createElement('title');
        title.textContent = this.title;
        return title;
    }
}
/**
 * The function renders the homepage of the website /home or /
 */
export function renderHomepage() {
    new PageHeadElements(STATE.homepage.meta, STATE.homepage.title);
    let navbar = new ComponentsTS.Navbar().render().result;
    let dynamicTypedHeading = new ComponentsTS.DynamicTypedHeading().render()
        .result;
    let firstCallToAction = function () {
        // Create container
        let container = Object.assign(document.createElement('div'), {
            classList:
                'flex flex-col w-full mx-auto mt-6 h-80 bg-homepage-graphic bg-no-repeat bg-contain bg-center md:flex-row md:bg-none xl:w-9/12',
            id: 'homepage_cta_container',
        });
        let listAndButtonsDiv = Object.assign(document.createElement('div'), {
            classList:
                'inline-flex h-full opacity-95 bg-white flex-col justify-center w-full md:opacity-100 md:w-1/2 xl:w-2/5',
            id: 'homepage_cta_container__list-buttons-div',
        });
        let listDiv = Object.assign(document.createElement('div'), {
            classList:
                'inline-flex flex-col mx-auto w-5/6 md:inline-flex xl:w-full',
            id: 'homepage_cta_container__list-buttons-div__list-div',
        });
        let buttonsDiv = Object.assign(document.createElement('div'), {
            classList: 'inline-flex justify-center items-center mt-8',
            id: 'homepage_cta_container__list-buttons-div__buttons-div',
        });
        let svgGraphicDiv = Object.assign(document.createElement('div'), {
            classList:
                'hidden justify-center items-center md:inline-flex md:w-1/2 xl:w-3/5',
            id: 'homepage_cta_container__svg-graphic',
        });
        // List items
        let listItem1 = new ComponentsTS.FirstPageListItem(
            `Know Your Invention's Novelty`
        ).render().result;
        let listItem2 = new ComponentsTS.FirstPageListItem(
            `Make Informed Market Decisions`
        ).render().result;
        let listItem3 = new ComponentsTS.FirstPageListItem(
            `Simplify Your Patent Process`
        ).render().result;
        listDiv.append(listItem1, listItem2, listItem3);
        // Learn more button
        let learnMoreButton = new ComponentsTS.AnchorLinks(
            'Learn More'
        ).renderLargeHollowInnocelfButton().result;
        learnMoreButton.href = '/services';
        // Get Started button
        let getStartedButton = new ComponentsTS.AnchorLinks(
            'Get Started'
        ).renderLargeInnocelfButton().result;
        getStartedButton.href =
            'https://calendly.com/innocelf/virtual-appointment';
        buttonsDiv.append(learnMoreButton, getStartedButton);
        listAndButtonsDiv.append(listDiv, buttonsDiv);
        // Graphic Later
        let graphicUrl = '/static/innoservices/img/homepage_graphic.svg';
        ComponentsTS._importSVG(graphicUrl).then((svgText) => {
            // Use the text of the SVG to paste the SVG in the svg Container
            let svgComponent = ComponentsTS._parseSVG(svgText);
            svgComponent.removeAttribute('width');
            svgComponent.setAttribute('viewBox', '80, 0, 1500, 1000');
            let desiredSvgClassList = [
                'h-64',
                'sm:h-72',
                'md:h-80',
                'lg:h-96',
                'xl:h-full-120',
            ];
            desiredSvgClassList.map((item) => {
                svgComponent.classList.add(item);
            });
            // svgComponent.setAttribute('height', '500');
            // Append to #first_cta_svg_graphic
            svgGraphicDiv.append(svgComponent);
        });
        container.append(listAndButtonsDiv, svgGraphicDiv);
        return container;
    };
    let homepageTestimonials = function () {
        let container = Object.assign(document.createElement('div'), {
            classList:
                'flex my-12 h-2/3 mx-auto bg-no-repeat bg-center bg-cover bg-fixed',
            style: `background-image: url('/static/img/innoimg/innocelf-homepage-streak-picture.jpg')`,
        });
        let flexContainer = Object.assign(document.createElement('div'), {
            classList:
                'flex flex-col h-full opacity-90 text-white flex-center bg-black w-full',
        });
        let headingContainer = Object.assign(document.createElement('div'), {
            classList: 'flex text-center my-5 mx-auto justify-center my-12',
        });
        let reviewsContainer = Object.assign(document.createElement('div'), {
            classList:
                'grid grid-cols-1 px-6 gap-4 mt-6 mb-16 sm:px-24 lg:grid-cols-2 lg:px-6 lg:gap-16 lg:grid-cols-4 lg:px-12 lg:gap-4 xl:w-9/12 xl:mx-auto',
            id: 'homepage_reviews',
        });
        let heading = new ComponentsTS.HeadingOrParagraph(
            'h2',
            'What Our Clients Say...'
        ).result;
        homepageReviews().then((data) => {
            Object.keys(data).map((key) => {
                var _a;
                let review = new ComponentsTS.Testimonial(
                    data[key].name,
                    data[key].review
                ).renderHomepageReview().result;
                (_a = document.getElementById('homepage_reviews')) === null ||
                _a === void 0
                    ? void 0
                    : _a.append(review);
            });
        });
        headingContainer.append(heading);
        flexContainer.append(headingContainer, reviewsContainer);
        container.append(flexContainer);
        return container;
    };
    let footer = new ComponentsTS.Footer().render().result;
    let app = document.getElementById('app');
    app.append(
        navbar,
        dynamicTypedHeading,
        firstCallToAction(),
        homepageTestimonials(),
        footer
    );
}
/**
 * The function renders the services page of the website /services
 */
export function renderServicesPage() {
    let __paragraph = function (paragraphText) {
        let paragraph = new ComponentsTS.HeadingOrParagraph(
            'p',
            paragraphText
        ).renderWithClass([
            'w-full',
            'mt-10',
            'mx-auto',
            'text-justify',
            'leading-6',
            'sm:leading-7',
            'md:leading-8',
            'lg:leading-9',
            'lg:w-4/6',
        ]).result;
        return paragraph;
    };
    let app = document.getElementById('app');
    new PageHeadElements(STATE.services.meta, STATE.services.title);
    let navbar = new ComponentsTS.Navbar().render().result;
    // First heading
    let firstHeading = new ComponentsTS.HeadingOrParagraph(
        'h3',
        'Are you an Inventor or Patent Practitioner?'
    ).renderWithClass(['text-center', 'my-5']).result;
    // Paragraph Container
    let paragraphContainer = Object.assign(document.createElement('div'), {
        classList:
            'container w-10/12 m-auto justify-center mt-24 mb-6 lg:w-4/6',
    });
    let serviceContainer = paragraphContainer;
    // First paragraph
    let firstParagraph =
        __paragraph(`As an inventor you are constantly trying to add value to this
        world through your inventions. However, there is always this thought at the
        back of your mind whether I am infringing on another's invention. 
        On the other end, as a Patent Practitioner, you are helping an innovator 
        protect their invention by investing long hours in filing all the paper work.`);
    // Second Paragraph
    let secondParagraph =
        __paragraph(`You seldom have the time to divert your energy from your core work to
		research the patent spectrum and provide stakeholders with the relevant 
        answers they need.`);
    // Third Paragraph
    let thirdParagraph =
        __paragraph(`Let Innocelf help you with comprehensive and systematic intellectual
        property research and analysis. Whether you have a new idea,
        drafting claims for a patentable idea, determining clearance 
        for the next market launch, or deciding to license a patent,
        you deserve an analysis to revolutionize your IP strategy.`);
    // Fourth Paragraph
    let fourthParagraph =
        __paragraph(`We combine a modern AI search-based approach with manual expert analysis
		to make your work less time-consuming to read unnecessary search results.`);
    // Services Heading
    let servicesHeading = new ComponentsTS.HeadingOrParagraph(
        'h3',
        'Our Services'
    ).renderGradientText().result;
    paragraphContainer.append(
        firstHeading,
        firstParagraph,
        secondParagraph,
        thirdParagraph,
        fourthParagraph,
        servicesHeading
    );
    app.append(navbar, paragraphContainer);
    let individualServicesObject = STATE.services.individualServices;
    Object.keys(individualServicesObject).map((item) => {
        let service = individualServicesObject[item];
        let serviceDescription = new ComponentsTS.ServiceDescription(
            item,
            service.listItems,
            service.paragraph,
            service.imageSrc
        ).render().result;
        // serviceContainer.append(serviceDescription);
        app.append(serviceDescription);
    });
    let footer = new ComponentsTS.Footer().render().result;
    app.append(footer);
}
/**
 * The function renders the testimonials page of the website /testimonials-page
 */
export async function renderTestimonialsPage() {
    let app = document.getElementById('app');
    new PageHeadElements(
        STATE.testimonalsPage.meta,
        STATE.testimonalsPage.title
    );
    let navbar = new ComponentsTS.Navbar().render().result;
    // Testimonials Heading
    let testimonialsHeading = new ComponentsTS.HeadingOrParagraph(
        'h3',
        'Testimonials'
    ).renderGradientText().result;
    // Paragraph Container
    let paragraphContainer = Object.assign(document.createElement('div'), {
        classList:
            'container w-10/12 m-auto justify-center mt-10 mb-6 lg:w-4/6',
    });
    let firstParagraph = new ComponentsTS.HeadingOrParagraph(
        'p',
        `At Innocelf, we are dedicated to provide the best possible research to 
        our clients, using our wide experience and the best possible tools
        available in the marketplace. This has helped our clients in the short
        and long term.`
    ).renderWithClass([
        'w-full',
        'mx-auto',
        'text-justify',
        'leading-6',
        'sm:leading-7',
        'md:leading-8',
        'lg:leading-9',
        'lg:w-4/6',
    ]).result;
    let secondParagraph = new ComponentsTS.HeadingOrParagraph(
        'p',
        `How can Innocelf help you ...?`
    ).renderWithClass([
        'w-full',
        'mx-auto',
        'mt-5',
        'text-justify',
        'leading-6',
        'sm:leading-7',
        'md:leading-8',
        'lg:leading-9',
        'lg:w-4/6',
    ]).result;
    paragraphContainer.append(firstParagraph, secondParagraph);
    let callToActionSection = function () {
        let row = document.createElement('div');
        let rowClassList = ['flex', 'w-full', 'mb-12'];
        rowClassList.map((item) => {
            row.classList.add(item);
        });
        let getStartedButton = new ComponentsTS.AnchorLinks(
            'Schedule Consultation'
        ).renderLargeInnocelfButton().result;
        getStartedButton.href =
            'https://calendly.com/innocelf/virtual-appointment';
        row.append(getStartedButton);
        return row;
    };
    app.append(
        navbar,
        testimonialsHeading,
        paragraphContainer,
        callToActionSection()
    );
    let reviewGrid = await _obtainAllReviews().then((data) => {
        let container = document.createElement('div');
        let containerClassList = [
            'grid',
            'grid-cols-1',
            'gap-6',
            'w-10/12',
            'mx-auto',
            'mt-24',
            'md:w-2/3',
            'lg:w-10/12',
            'lg:grid-cols-2',
            'lg:gap-12',
            'xl:w-3/4',
            '2xl:w-2/3',
        ];
        containerClassList.map((item) => {
            container.classList.add(item);
        });
        Object.keys(data).map((item) => {
            let reviewObject = data[item];
            let firstName = reviewObject.fields.first_name;
            let lastInitial = reviewObject.fields.last_name.slice(0, 1);
            let dateString = reviewObject.fields.month_year;
            let upWorkReview = reviewObject.fields.upwork_review;
            let personName = firstName + ' ' + lastInitial + '.';
            personName = upWorkReview ? personName + '*' : personName;
            let review = reviewObject.fields.review;
            let testimonial = new ComponentsTS.Testimonial(
                personName,
                review
            ).renderTestimonialPageReview(dateString).result;
            container.append(testimonial);
        });
        return container;
    });
    let legendForUpwork = function () {
        let row = document.createElement('div');
        let rowClassList = [
            'grid',
            'grid-cols-2',
            'w-full',
            'my-24',
            'mx-auto',
            'items-center',
            'justify-center',
            'text-center',
            'sm:w-3/4',
            'md:w-2/3',
            'lg:w-1/2',
            '2xl:w-2/5',
        ];
        rowClassList.map((item) => {
            row.classList.add(item);
        });
        let legendExp = new ComponentsTS.HeadingOrParagraph(
            'p',
            '* Review on Upwork'
        ).result;
        let visitUpworkButton = new ComponentsTS.AnchorLinks(
            'Visit Upwork Profile'
        ).renderLargeHollowInnocelfButton().result;
        visitUpworkButton.href =
            'https://www.upwork.com/freelancers/~01bd2e53ac8cd5653b/';
        row.append(legendExp, visitUpworkButton);
        return row;
    };
    let footer = new ComponentsTS.Footer().render().result;
    app.append(reviewGrid, legendForUpwork(), footer);
    // Animate testimonials
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
 * The function renders the FAQ page of the website /frequently-asked-questions
 */
export function renderFAQPage() {
    function __expandCollapseAnswers() {
        let allDataExpands = document.querySelectorAll('[data-expand="true"]');
        allDataExpands.forEach((value) => {
            let element = value;
            element.classList.toggle('hidden');
        });
    }
    new PageHeadElements(STATE.faqPage.meta, STATE.faqPage.title);
    let navbar = new ComponentsTS.Navbar().render().result;
    // FAQ Heading
    let faqsHeading = new ComponentsTS.HeadingOrParagraph(
        'h3',
        'Frequently Asked Questions'
    ).renderGradientText().result;
    // FAQ Expand and Collapse buttons
    let expCollapButtons = function () {
        let row = document.createElement('div');
        let rowClasses = [
            'flex',
            'w-11/12',
            'mx-auto',
            'mb-6',
            'justify-end',
            'items-center',
            'xl:w-3/4',
        ];
        rowClasses.map((item) => {
            row.classList.add(item);
        });
        let expandButton = new ComponentsTS.AnchorLinks(
            'Expand All'
        ).renderLinkButton().result;
        expandButton.classList.add('mr-4');
        expandButton.id = 'expand-all-answers-button';
        expandButton.onclick = __expandCollapseAnswers;
        let collapseButton = new ComponentsTS.AnchorLinks(
            'Collapse All'
        ).renderLinkButton().result;
        collapseButton.id = 'collapse-all-answers-button';
        collapseButton.onclick = __expandCollapseAnswers;
        row.append(expandButton, collapseButton);
        return row;
    };
    // FAQ Content
    let faqsContent = function () {
        let container = new ComponentsTS.TwoColumnContainer('faq').result;
        let imageContainer = container.querySelector('#faq-left-container');
        let faqsContainer = container.querySelector('#faq-right-container');
        let image = Object.assign(document.createElement('img'), {
            classList: 'hidden object-contain md:flex md:h-3/4 xl:h-full',
            src: '/static/innoservices/img/innocelf-faq-page-picture-cropped.jpg',
        });
        imageContainer.append(image);
        let faqObject = STATE.faqPage.faqs;
        Object.keys(faqObject).map((item) => {
            let faq = new ComponentsTS.FAQ(
                faqObject[item].question,
                faqObject[item].answer
            ).render().result;
            faqsContainer.append(faq);
        });
        // container.append(imageContainer, faqsContainer);
        return container;
    };
    let footer = new ComponentsTS.Footer().render().result;
    let app = document.getElementById('app');
    app.append(navbar, faqsHeading, expCollapButtons(), faqsContent(), footer);
}
/**
 * The function renders the Contact Us Page of the website /contact-us
 */
export function renderContactUsPage() {
    new PageHeadElements(STATE.contactUs.meta, STATE.contactUs.title);
    let navbar = new ComponentsTS.Navbar().render().result;

    let contactUsHeading = new ComponentsTS.HeadingOrParagraph(
        'h3',
        'Contact Us'
    ).renderGradientText().result;
    contactUsHeading.classList.replace('mb-6', 'mb-2');

    // Paragraph Container
    let paragraphContainer = Object.assign(document.createElement('div'), {
        classList: 'flex w-10/12 m-auto justify-center mt-2 mb-16 lg:w-4/6',
    });
    let processContainer = document.createElement('div');
    processContainer.classList.add(
        'flex',
        'flex-col',
        'w-10/12',
        'm-auto',
        'justify-center',
        'my-48',
        'md:w-10/12',
        'lg:w-10/12',
        'xl:w-3/4',
        '2xl:w-2/3'
    );
    let openingPara = new ComponentsTS.HeadingOrParagraph(
        'p',
        `Talk to us by either filling out the form below or scheduling a virtual meet.`
    ).renderWithClass(['text-justify', 'leading-6', 'lg:leading-9']).result;
    paragraphContainer.append(openingPara);

    let mainContainer = new ComponentsTS.TwoColumnContainer('contact-us')
        .result;
    // Append the required image
    let image = Object.assign(document.createElement('img'), {
        classList: 'hidden object-contain md:flex md:h-3/4 xl:h-full',
        src: '/static/innoservices/img/innocelf-contact-us-picture.jpg',
    });
    mainContainer.querySelector('#contact-us-left-container').append(image);

    let virtualConsultButton = new ComponentsTS.AnchorLinks(
        'Schedule Consultation'
    ).renderLargeHollowInnocelfButton().result;
    virtualConsultButton.href =
        'https://calendly.com/innocelf/virtual-appointment';

    // Create the contact us form
    let contactUsForm = new ComponentsTS.TypicalPostForm('contact-us-form')
        .result;
    mainContainer
        .querySelector('#contact-us-right-container')
        .append(virtualConsultButton, contactUsForm);
    _obtainForm('/obtain-contact-us-form').then((data) => {
        let form = new DOMParser().parseFromString(data, 'text/html');
        let csrfToken = document.querySelector('[name="csrfmiddlewaretoken"]');
        let fullName = new ComponentsTS.TextInputWithLabel(
            'Name*',
            form.querySelector('[name="full_name"]')
        ).render().result;
        let email = new ComponentsTS.TextInputWithLabel(
            'Email Address*',
            form.querySelector('[name="email"]')
        ).render().result;
        let reason = new ComponentsTS.SelectInputWithLabel(
            `Today's Inquiry Topic*`,
            form.querySelector('[name="inquiry_reason"]')
        ).render().result;
        let explanation = new ComponentsTS.TextInputWithLabel(
            `Details (Optional)`,
            form.querySelector('[name="explanation"]')
        ).render().result;
        let submitButton = new ComponentsTS.TypicalFormSubmitButton('Submit')
            .result;
        contactUsForm.append(
            csrfToken,
            fullName,
            email,
            reason,
            // explanation,
            submitButton
        );
        // Handle how the submit button click is handled
        submitButton.onclick = function (event) {
            if (contactUsForm.checkValidity()) {
                event.preventDefault();
                _submitForm(
                    contactUsForm,
                    mainContainer,
                    '/receive-contact-us-form/',
                    'contact-us'
                );
            }
        };
    });
    let footer = new ComponentsTS.Footer().render().result;
    let app = document.getElementById('app');
    app.append(
        navbar,
        contactUsHeading,
        paragraphContainer,
        mainContainer,
        footer
    );
}
/**
 * The function renders the About Us Page /about-us
 */
export async function renderAboutUsPage() {
    function __typicalMissionOrValue(heading, paragraph) {
        let grid = document.createElement('div');
        let gridClasses = ['grid', 'grid-rows', 'w-full', 'gap-2'];
        gridClasses.map((item) => {
            grid.classList.add(item);
        });
        let empowerHeading = new ComponentsTS.HeadingOrParagraph(
            'h5',
            heading
        ).renderWithClass(['lato-italic']).result;
        empowerHeading.classList.remove('font-semibold', 'lato-semibold');
        let empowerPara = new ComponentsTS.HeadingOrParagraph(
            'h6',
            paragraph
        ).renderWithClass(['lato-light', 'text-justify']).result;
        empowerPara.classList.remove('lato-semibold', 'font-semibold');
        grid.append(empowerHeading, empowerPara);
        return grid;
    }
    function __typicalMissonOrValueHeading(heading) {
        let headingContainer = document.createElement('div');
        headingContainer.classList.add(
            'flex',
            'pb-6',
            'border-b-2',
            'border-black',
            'lg:border-b-0',
            'lg:border-r-2',
            'lg:pb-0',
            'lg:pr-6',
            'lg:self-center',
            'lg:h-full'
        );
        let ourMissionHeading = new ComponentsTS.HeadingOrParagraph(
            'h3',
            heading
        ).renderWithClass(['text-center', 'm-auto']).result;
        headingContainer.append(ourMissionHeading);
        return headingContainer;
    }
    function __typicalMissionOrValueContainer() {
        let container = document.createElement('div');
        let containerClasses = [
            'grid',
            'grid-rows',
            'gap-6',
            'w-11/12',
            'mx-auto',
            'mb-12',
            'lg:grid-cols-4',
            'xl:w-3/4',
            '2xl:w-2/3',
        ];
        containerClasses.map((item) => {
            container.classList.add(item);
        });
        return container;
    }
    function __typicalAboutUsParagraph(textContent) {
        let para = new ComponentsTS.HeadingOrParagraph(
            'p',
            textContent
        ).renderWithClass(['mb-5', 'text-justify', 'lato-light']).result;
        para.classList.remove('lato-regular');
        return para;
    }
    new PageHeadElements(STATE.aboutUs.meta, STATE.aboutUs.title);
    let navbar = new ComponentsTS.Navbar().render().result;
    let firstContainer = function () {
        let container = document.createElement('div');
        let containerClasses = [
            'mt-20',
            'mb-40',
            'mx-auto',
            'block',
            'w-5/6',
            'h-40',
            'bg-gray-100',
            'rounded-3xl',
            'sm:h-44',
            'md:h-48',
            'md:w-2/3',
            'lg:w-1/2',
            'xl:w-2/5',
        ];
        containerClasses.map((item) => {
            container.classList.add(item);
        });
        // Add Brand
        let desiredBrandClass = [
            'flex',
            'justify-start',
            'flex-shrink-0',
            'items-center',
            'w-full',
            'transition-opacity',
            'duration-2000',
            'ease-in-out',
            'opacity-0',
        ];
        let logoPath =
            '/static/innoservices/img/Innocelf-Logo-BlackFont-WhiteBack.svg';
        let brand = document.createElement('a');
        desiredBrandClass.map((item) => {
            brand.classList.add(item);
        });
        brand.href = '/';
        ComponentsTS._importSVG(logoPath).then((data) => {
            var _a;
            let svgLogo = ComponentsTS._parseSVG(data);
            if (svgLogo) {
                svgLogo.setAttribute('width', '350');
                (_a = svgLogo.querySelector('rect.cls-1')) === null ||
                _a === void 0
                    ? void 0
                    : _a.setAttribute('style', 'fill:transparent');
            }
            brand.append(svgLogo);
            return svgLogo;
        });
        let standsForHead = new ComponentsTS.HeadingOrParagraph(
            'p',
            'stands for ...'
        ).renderWithClass([
            'text-center',
            'text-gray-600',
            'transition-opacity',
            'duration-1000',
            'ease-in-out',
            'opacity-0',
            // 'lg:-mt-10',
        ]).result;
        let innoAnArtHead = new ComponentsTS.HeadingOrParagraph(
            'h2',
            'Innovation is an Art'
        ).renderWithClass([
            'text-right',
            'lato-bold-italic',
            'px-6',
            'transition-opacity',
            'duration-1000',
            'ease-in-out',
            'opacity-0',
            'md:mt-3',
            'lg:mt-3',
            '2xl:mt-1',
        ]).result;
        container.append(brand, standsForHead, innoAnArtHead);
        // Increase opacity after some delay
        setTimeout(() => {
            var _a;
            brand.classList.remove('opacity-0');
            brand.classList.add('opacity-100');
            let navbarBrand =
                (_a = document.querySelector('nav')) === null || _a === void 0
                    ? void 0
                    : _a.querySelector('svg');
            navbarBrand === null || navbarBrand === void 0
                ? void 0
                : navbarBrand.classList.remove('opacity-100');
            navbarBrand === null || navbarBrand === void 0
                ? void 0
                : navbarBrand.classList.add('opacity-0');
        }, 1000);
        setTimeout(() => {
            standsForHead.classList.remove('opacity-0');
            standsForHead.classList.add('opacity-100');
        }, 2500);
        setTimeout(() => {
            innoAnArtHead.classList.remove('opacity-0');
            innoAnArtHead.classList.add('opacity-100');
        }, 5000);
        setTimeout(() => {
            var _a;
            let navbarBrand =
                (_a = document.querySelector('nav')) === null || _a === void 0
                    ? void 0
                    : _a.querySelector('svg');
            navbarBrand === null || navbarBrand === void 0
                ? void 0
                : navbarBrand.classList.remove('opacity-0');
            navbarBrand === null || navbarBrand === void 0
                ? void 0
                : navbarBrand.classList.add('opacity-100');
        }, 7000);
        return container;
    };
    let ourMission = function () {
        let container = __typicalMissionOrValueContainer();
        let headingContainer = __typicalMissonOrValueHeading('Our Mission');
        let grid = __typicalMissionOrValue(
            'Empower',
            `We empower inventors with relevant patent / market
            information to pursue patenting inventions.`
        );
        grid.classList.add('lg:col-span-3');
        container.append(headingContainer, grid);
        return container;
    };
    let ourValues = function () {
        var _a, _b;
        let container = __typicalMissionOrValueContainer();
        let headingContainer = __typicalMissonOrValueHeading('Our Values');
        let subGrid = document.createElement('div');
        subGrid.classList.add(
            'lg:col-span-3',
            'grid',
            'grid-flow-rows',
            'gap-10',
            'lg:gap-7'
        );
        let collaborate = __typicalMissionOrValue(
            'Collaboration',
            `We partner with each client to personalize our services to their needs.`
        );
        collaborate.classList.add(
            'lg:border-b-2',
            'lg:border-gray-400'
            // 'lg:mb-7'
        );
        (_a = collaborate.querySelector('h6')) === null || _a === void 0
            ? void 0
            : _a.classList.add('lg:mb-7');
        let longTermSupport = __typicalMissionOrValue(
            'Commitment',
            `We ensure collaboration with our clients for their long term IP goals.`
        );
        longTermSupport.classList.add(
            'lg:border-b-2',
            'lg:border-gray-400'
            // 'lg:mb-7'
        );
        (_b = longTermSupport.querySelector('h6')) === null || _b === void 0
            ? void 0
            : _b.classList.add('lg:mb-7');
        let transparency = __typicalMissionOrValue(
            'Transparency',
            `We are transparent with our communications and in our reports.`
        );
        subGrid.append(collaborate, longTermSupport, transparency);
        container.append(headingContainer, subGrid);
        return container;
    };
    let peopleHeading = new ComponentsTS.HeadingOrParagraph(
        'h3',
        'Team'
    ).renderGradientText().result;
    let aboutPantu = function () {
        let container = document.createElement('div');
        container.classList.add(
            'grid',
            'grid-rows',
            'w-11/12',
            'mt-16',
            'mb-30',
            'mx-auto',
            'md:grid-rows-1',
            'md:grid-cols-2',
            'md:mt-24',
            'lg:w-3/4',
            'xl:w-2/3',
            'xl:mt-40',
            '2xl:w-3/5'
        );
        let imageContainer = document.createElement('div');
        imageContainer.classList.add('md:flex', 'md:items-center');
        let textContainer = document.createElement('div');
        textContainer.classList.add(
            'justify-center',
            'p-6',
            'md:flex',
            'md:flex-col'
        );
        let buttonContainer = document.createElement('div');
        buttonContainer.classList.add(
            'inline-flex',
            'w-full',
            'mx-auto',
            'md:mt-8'
        );
        let para1 = new ComponentsTS.HeadingOrParagraph(
            'h4',
            `Hello, I am Pranita ...`
        ).renderWithClass(['mb-5', 'md:mb-0', 'md:hidden']).result;
        let image = Object.assign(document.createElement('img'), {
            src: '/static/img/innoimg/innocelf-pranita-photo.jpg',
            classList: 'rounded-3xl h-40 mx-auto md:h-72 lg:h-96',
        });
        imageContainer.append(para1, image);
        let para11 = new ComponentsTS.HeadingOrParagraph(
            'h4',
            `Hello, I am Pranita.`
        ).renderWithClass(['hidden', 'mb-5', 'md:block']).result;
        let para2 =
            __typicalAboutUsParagraph(`I help my clients secure their invention and business idea(s) by
            providing evidence based analysis using various renowned sources.`);
        let para3 =
            __typicalAboutUsParagraph(`Our analyses are detailed and reports intelligible to
            help you make strategic business decisions in a timely manner.`);
        let para4 = __typicalAboutUsParagraph(`Learn more about our services:`);
        textContainer.append(para11, para2, para3, para4);
        let learnMore = new ComponentsTS.AnchorLinks(
            'Learn More'
        ).renderLargeInnocelfButton().result;
        learnMore.href = '/services';
        learnMore.target = '';
        buttonContainer.append(learnMore);
        textContainer.append(buttonContainer);
        container.append(imageContainer, textContainer);
        return container;
    };
    let reviews = async function () {
        let container = document.createElement('div');
        container.classList.add(
            'grid',
            'grid-rows-2',
            'gap-4',
            'w-11/12',
            'mx-auto',
            'mt-10',
            'sm:w-10/12',
            'md:grid-rows-1',
            'md:grid-cols-2',
            'md:gap-12',
            'lg:w-3/4',
            'lg:mt-20',
            'xl:w-2/3',
            '2xl:w-3/5'
        );
        let twoReviews = await aboutUsReviews();
        Object.keys(twoReviews).map((item) => {
            let review = new ComponentsTS.Testimonial(
                twoReviews[item].name,
                twoReviews[item].review
            ).renderAboutUsReview().result;
            container.append(review);
        });
        return container;
    };
    let readMoreReviews = function () {
        let buttonContainer = document.createElement('div');
        buttonContainer.classList.add(
            'inline-flex',
            'w-full',
            'mx-auto',
            'mt-8'
        );
        let readMore = new ComponentsTS.AnchorLinks(
            'Read More'
        ).renderLargeInnocelfButton().result;
        readMore.href = '/testimonials-page';
        readMore.target = '';
        buttonContainer.append(readMore);
        return buttonContainer;
    };
    let ourJourney = function () {
        let container = document.createElement('div');
        container.classList.add(
            'w-11/12',
            'mx-auto',
            'my-24',
            'md:w-3/4',
            'lg:w-2/3',
            'xl:w-3/5',
            'xl:mt-40',
            '2xl:w-1/2'
        );
        let heading = new ComponentsTS.HeadingOrParagraph(
            'h3',
            'Our Journey'
        ).renderGradientText().result;
        heading.classList.remove('mb-6', '2xl:my-24');
        heading.classList.add('mb-2', '2xl:my-6');
        let para1 =
            __typicalAboutUsParagraph(`I started Innocelf, LLC with a mission to help inventors with
            intellectual property rights (IPR or IP) protection and propel them
            forward on their patent journey. Patent law can be convoluted with
            pioneer technologies or around an improvement on an existing
            technology. My mission for Innocelf, is therefore, to provide
            extensive and concentrated search results that will not only be
            useful in the grander patent process but will also help you
            understand the nuances of the patent process.`);
        let para2 =
            __typicalAboutUsParagraph(`I am committed to providing high quality patent research and
            opinions that will make it clear whether your idea is patentable or
            not. I will untangle some of those intricacies through the detailed
            and efficient reports you will receive. All inventions are unique
            and Innocelf with me will cater to those inventions at a personal
            level, yet encompass analysis from existing patents, licenses and
            products out there. I will make sure your idea does not infringe on
            others'. At Innocelf we use international patent and non-patent
            literature databases as well as some exclusive databases that help
            us in finding products that are not patented but are in production.`);
        let para3 =
            __typicalAboutUsParagraph(`Before Innocelf, I have worked in a combination of pharmaceutical
            companies, law firms, research analytics firms and law clinics for
            ~7 years in different capacities related to patent research,
            drafting and prosecution. However, Innocelf targets only one aspect
            of these three avenues: patent research. Here, I have met amazing
            mentors who have and continue to better me in this profession.`);
        let para4 =
            __typicalAboutUsParagraph(`What led me into this profession was an invention I had developed
            in my sophomore year. I believed it had great value but did not know
            how to protect it back then. It would have been a help to the
            community if I had pursued patenting it and brought it into the
            public domain. Alas, the knowledge of such protections was not
            mentioned in my school. With Innocelf I want to provide this
            guidance to all inventors so they can achieve cost efficiency,
            transparency and make their inventions useful to the public while
            earning monetary or other benefits.`);
        container.append(heading, para1, para2, para3, para4);
        return container;
    };
    let footer = new ComponentsTS.Footer().render().result;
    let app = document.getElementById('app');
    app.append(
        navbar,
        firstContainer(),
        ourMission(),
        ourValues(),
        // peopleHeading,
        aboutPantu(),
        await reviews(),
        readMoreReviews(),
        ourJourney(),
        footer
    );
}
/**
 * The function renders the sendReviewRequest page /adminstrative/send-review-request
 */
export function renderSendReviewRequest() {
    new PageHeadElements(
        STATE.sendReviewRequest.meta,
        STATE.sendReviewRequest.title
    );
    let navbar = new ComponentsTS.Navbar().render().result;
    let sendReviewRequestHeading = new ComponentsTS.HeadingOrParagraph(
        'h3',
        'Send Review Request'
    ).renderGradientText().result;
    let mainContainer = new ComponentsTS.TwoColumnContainer(
        'send-review-request'
    ).result;
    // Append the required image
    let image = Object.assign(document.createElement('img'), {
        classList: 'hidden object-contain md:flex md:h-3/4 xl:h-full',
        src: '/static/innoservices/img/innocelf-send-review-picture.jpg',
    });
    mainContainer
        .querySelector('#send-review-request-left-container')
        .append(image);
    // Create the contact us form
    let sendReviewRequestForm = new ComponentsTS.TypicalPostForm(
        'send-review-request-form'
    ).result;
    mainContainer
        .querySelector('#send-review-request-right-container')
        .append(sendReviewRequestForm);
    _obtainForm('/obtain-send-review-request-form').then((data) => {
        let formFromBackend = new DOMParser().parseFromString(
            data,
            'text/html'
        );
        let csrfToken = document.querySelector('[name="csrfmiddlewaretoken"]');
        let firstName = new ComponentsTS.TextInputWithLabel(
            'First Name*',
            formFromBackend.querySelector('[name="first_name"]')
        ).render().result;
        let lastName = new ComponentsTS.TextInputWithLabel(
            'Last Name*',
            formFromBackend.querySelector('[name="last_name"]')
        ).render().result;
        let email = new ComponentsTS.TextInputWithLabel(
            'Email Address*',
            formFromBackend.querySelector('[name="email"]')
        ).render().result;
        let submitButton = new ComponentsTS.TypicalFormSubmitButton('Submit')
            .result;
        sendReviewRequestForm.append(
            csrfToken,
            firstName,
            lastName,
            email,
            submitButton
        );
        submitButton.onclick = function (event) {
            if (sendReviewRequestForm.checkValidity()) {
                event.preventDefault();
                _submitForm(
                    sendReviewRequestForm,
                    mainContainer,
                    '/receive-send-review-request-form/',
                    'send-review-request'
                );
            }
        };
    });
    let footer = new ComponentsTS.Footer().render().result;
    let app = document.getElementById('app');
    app.append(navbar, sendReviewRequestHeading, mainContainer, footer);
}
/**
 * The function renders the write review page /write-review/<uuid_token>
 */
export function renderWriteReviewPage() {
    let firstName = JSON.parse(
        document.getElementById('first_name').textContent
    );
    let lastName = JSON.parse(document.getElementById('last_name').textContent);
    new PageHeadElements(STATE.writeReview.meta, STATE.writeReview.title);
    let navbar = new ComponentsTS.Navbar().render().result;
    let sendReviewRequestHeading = new ComponentsTS.HeadingOrParagraph(
        'h3',
        'Write Review'
    ).renderGradientText().result;
    let mainContainer = new ComponentsTS.TwoColumnContainer('write-review')
        .result;
    // Append the required image
    let image = Object.assign(document.createElement('img'), {
        classList: 'hidden object-contain md:flex md:h-3/4 xl:h-full',
        src: '/static/innoservices/img/innocelf-write-review-picture.jpg',
    });
    mainContainer.querySelector('#write-review-left-container').append(image);
    // Create the contact us form
    let writeReviewForm = new ComponentsTS.TypicalPostForm('write-review-form')
        .result;
    mainContainer
        .querySelector('#write-review-right-container')
        .append(writeReviewForm);
    let uuid = window.location.pathname
        .split('/write-review/')[1]
        .split('/')[0];
    let additionalHeaders = {
        firstname: firstName,
        lastname: lastName,
    };
    _obtainForm('/obtain-write-review-form', additionalHeaders).then((data) => {
        let formFromBackend = new DOMParser().parseFromString(
            data,
            'text/html'
        );
        let csrfToken = document.querySelector('[name="csrfmiddlewaretoken"]');
        let uuidInput = Object.assign(document.createElement('input'), {
            value: uuid,
            type: 'hidden',
            name: 'uuid_token',
        });
        let firstName = new ComponentsTS.TextInputWithLabel(
            'First Name*',
            formFromBackend.querySelector('[name="first_name"]')
        ).render().result;
        let lastName = new ComponentsTS.TextInputWithLabel(
            'Last Name*',
            formFromBackend.querySelector('[name="last_name"]')
        ).render().result;
        let review = new ComponentsTS.TextInputWithLabel(
            'Your Review*',
            formFromBackend.querySelector('[name="review"]')
        ).render().result;
        new ComponentsTS.TextInputCharacterCount(review);
        let submitButton = new ComponentsTS.TypicalFormSubmitButton('Submit')
            .result;
        writeReviewForm.append(
            csrfToken,
            uuidInput,
            firstName,
            lastName,
            review,
            submitButton
        );
        submitButton.onclick = function (event) {
            if (writeReviewForm.checkValidity()) {
                event.preventDefault();
                _submitForm(
                    writeReviewForm,
                    mainContainer,
                    '/receive-write-review-form/',
                    'write-review'
                );
            }
        };
    });
    let footer = new ComponentsTS.Footer().render().result;
    let app = document.getElementById('app');
    app.append(navbar, sendReviewRequestHeading, mainContainer, footer);
}
export function renderOurProcessPage() {
    new PageHeadElements(STATE.ourProcess.meta, STATE.ourProcess.title);
    let navbar = new ComponentsTS.Navbar().render().result;
    let app = document.getElementById('app');
    let ourProcessHeading = new ComponentsTS.HeadingOrParagraph(
        'h3',
        'Our Process'
    ).renderGradientText().result;
    // Paragraph Container
    let paragraphContainer = Object.assign(document.createElement('div'), {
        classList: 'container w-10/12 m-auto justify-center mt-5 mb-6 lg:w-4/6',
    });
    let processContainer = document.createElement('div');
    processContainer.classList.add(
        'flex',
        'flex-col',
        'w-10/12',
        'm-auto',
        'justify-center',
        'my-48',
        'md:w-10/12',
        'lg:w-10/12',
        'xl:w-3/4',
        '2xl:w-2/3'
    );
    let openingPara = new ComponentsTS.HeadingOrParagraph(
        'p',
        `We strive to make our process time efficient and straightforward for
        our clients, while still maintaining the necessary confidentiality. 
        We always take suggestions from our clients to make our process tailored
        to their needs.`
    ).renderWithClass(['text-justify', 'leading-6', 'lg:leading-9']).result;
    paragraphContainer.append(openingPara);
    let processes = {
        'Request Received': {
            content: `Through the "Contact Us" form or a Calendly schedule.`,
            image: `/static/innoservices/img/our-process/request-received.jpg`,
            timeReq: ``,
        },
        'Initial Communication': {
            content: `An introduction is in order. This call / video conference
            will also be used to understand your needs from Innocelf`,
            image: `/static/innoservices/img/our-process/initial-communication.jpg`,
            timeReq: `~ 24 hours`,
        },
        'Prepare Quote': {
            content: `After our initial call, we will prepare a free, no obligation quote for
            the services you need. Complexity of your project is considered.`,
            image: `/static/innoservices/img/our-process/prepare-quote.jpg`,
            timeReq: `~ 24 hours`,
        },
        'Authorize to Begin': {
            content: `We understand sometimes you need to get approval from the
            financial department. Once you agree to the quote, you authorize us
            to begin.`,
            image: `/static/innoservices/img/our-process/authorize-to-begin.jpg`,
            timeReq: ``,
        },
        'Engagement Letter and NDA': {
            content: `No project is started without an engagement letter and a
            Non-Disclosure Agreement. It may seem like an extra step, but it
            protects your idea.`,
            image: `/static/innoservices/img/our-process/engagement-letter-and-nda.jpg`,
            timeReq: `~ 24 hours`,
        },
        'Additional Information': {
            content: `This is where you would share the details of your
            invention / idea / project. We recommend not sharing anything
            confidential before the NDA is signed and authorized by both
            parties.`,
            image: `/static/innoservices/img/our-process/additional-information.jpg`,
            timeReq: ``,
        },
        'Complete the Project': {
            content: `We complete the project
            and prepare a report. We may contact you for additional information
            as we progress so that we don't miss anything.`,
            image: `/static/innoservices/img/our-process/finish-project.jpg`,
            timeReq: `~ 2 weeks`,
        },
        'Deliver Report': {
            content: `The delivery method is of your choice. We recommend
            scheduling a call with us once you have perused through the report
            to get a better understanding.`,
            image: `/static/innoservices/img/our-process/deliver-report.jpg`,
            timeReq: `~ 24 hours`,
        },
        Invoice: {
            content: `Once you are content with the report, we send you an
            invoice for the services.`,
            image: `/static/innoservices/img/our-process/invoice.jpg`,
            timeReq: `~ 48 hours`,
        },
    };
    Object.keys(processes).map((item) => {
        let heading = new ComponentsTS.HeadingOrParagraph(
            'p',
            processes[item].content
        ).renderWithClass(['my-auto', 'text-center']).result;
        let processContentString = heading.outerHTML;
        if (item === 'Request Received') {
            let processContentContainer = document.createElement('div');
            processContentContainer.classList.add('flex', 'flex-col', 'm-auto');
            let beginNowButton = new ComponentsTS.AnchorLinks(
                'Begin Now'
            ).renderFooterButton().result;
            beginNowButton.classList.add('mx-auto', 'w-1/2');
            beginNowButton.href =
                'https://calendly.com/innocelf/virtual-appointment';
            heading.classList.remove('my-auto');
            processContentContainer.append(heading, beginNowButton);
            processContentString = processContentContainer.outerHTML;
        }
        let container = new ComponentsTS.OneProcess(
            item,
            processContentString,
            processes[item].image
        ).result;
        let largeContainer = new ComponentsTS.OneProcessGapContainer(
            processes[item].timeReq
        ).result;
        if (item === 'Invoice') {
            processContainer.append(container);
        } else {
            processContainer.append(container, largeContainer);
        }
    });
    let footer = new ComponentsTS.Footer().render().result;
    app.append(
        navbar,
        ourProcessHeading,
        paragraphContainer,
        processContainer,
        footer
    );
    // Animate testimonials
    let allProcessesDiv = document.querySelectorAll(
        'div[animate-one-process="true"]'
    );
    let allProcessesGapDiv = document.querySelectorAll(
        'div[animate-one-process-gap="true"]'
    );
    let initiateAnimateProcesses = function (entries) {
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
    let observerProcesses = new IntersectionObserver(initiateAnimateProcesses);
    allProcessesDiv.forEach(function (target) {
        let targetNode = target;
        observerProcesses.observe(targetNode);
    });
    let observerProcessesGap = new IntersectionObserver(
        initiateAnimateProcesses
    );
    allProcessesGapDiv.forEach(function (target) {
        let targetNode = target;
        observerProcessesGap.observe(targetNode);
    });
}
