'use strict';

import { HeadingOrParagraph } from './ComponentClasses/HeadingOrParagraph.js';

/**
 * The object is the state of all the important aspects of the pages in one
 * convinient location
 **/
export const STATE = {
    homepage: {
        meta: {
            name: 'description',
            content: `Innocelf, LLC is a patent search firm in Michigan, USA, that
			offers the highest quality patent searches and analytics services
			to protect your invention at a resonable price. Schedule a free
			consultation with us today to get started on your patent journey.`,
        },
        title: 'Innocelf | Patent Search Firm in USA | USPTO Patent Research',
    },
    services: {
        meta: {
            name: 'description',
            content: `At Innocelf, LLC we provide patentability / novelty research,
			freedom to operate search, validity search, product research and
			landscape / state of the art search. We excel in the following
			technologies: healthcare and medical devices, pharmaceutical,
			chemical and material science, biotechnology and life sciences,
			food technology and consumer products.`,
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
                paragraph: [
                    `We provide a comprehensive research report targeting every
				possible novel element of your invention rather than just
				matching keywords with prior arts to prove novelty of each 
				element of your invention.`,
                    `Our search reports include not only all results but also 
				explains why this is relevant with respect to your invention 
				and where to read specific information in a similar patent 
				document.`,
                    `While researching novelty for your invention, we also enlist
				all possible claimns that one can consider while drafting a
				patent application.`,
                ],
                advantages: [
                    'Quality results based on your timeline',
                    'Custom approach for your specific invention',
                    `Easy to read visual reports with transparent search
					strategy`,
                    `Long term support till patent preparation`,
                ],
                imageSrc: `
				/static/innoservices/img/services/servicePage_ResearchingNewIdea.svg
				`,
                cartoonWidth: '200',
            },
            'During Commercialization of Your Product': {
                isFirst: false,
                listItems: [
                    'Freedom to Operate Search',
                    'Clearance Search',
                    'Infringement Analysis',
                ],
                paragraph: [
                    `Landscape Analysis gives a birds eye view of the patents
					and market trends surrounding an invention. Our Landscape
					search report presents a holistic view on a technology that
					can illuminate the key players in a given patent space,
					patenting trends, and possible unexplored categories where
					innovation can be pursued.`,
                    `Freedom to operate search provides guidance for successful
					commercialization of your product. This search covers
					existing patents and applications that claim a similar
					feature as your product of interest. This search is
					essential to manage risk of your product infringing on
					existing patents.`,
                ],
                advantages: [
                    'Collaborative approach to understand your needs',
                    'Custom search approach',
                    'Reports include feature and claim analysis',
                    'Long term support till product launch',
                ],
                imageSrc: `/static/innoservices/img/services/servicePage_DuringCommercialization.svg`,
                cartoonWidth: '310',
            },
            'During Litigation': {
                isFirst: false,
                listItems: ['Validity / Invalidity Search'],
                paragraph: [
                    `Validity / Invalidity search reports are not one size fits all.
				We understand that each project has its own goals and objectives.
				We design our search strategies, database selection and report
				representation according to your needs. Detailed discussions
				with our clients during the whole process keeps you in the loop
				at all times.`,
                ],
                advantages: [
                    'Collaborative approach to undertand your needs',
                    'Customized and transparent search strategies',
                    'Custom database and library selection',
                ],
                imageSrc: `/static/innoservices/img/services/servicePage_DuringLitigation.svg`,
                cartoonWidth: '310',
            },
            'Researching New Business Names or Logos': {
                isFirst: false,
                listItems: ['Trademark Search'],
                paragraph: [
                    `Our trademark search reports include results from federal and 
				state trademark databases as well as domain name search results.`,
                ],
                advantages: [
                    'Quality results with respect to your timeline and budget',
                    'Easy to read and understand reports',
                    'One-on-one consultation after report delivery',
                ],
                imageSrc:
                    '/static/innoservices/img/services/servicePage_BusinessNameLogo.svg',
                cartoonWidth: '250',
            },
            // 'Technology Analysis': {},
            // 'Goal or Object Oriented Search': {},
        },
    },
    aboutUs: {
        meta: {
            name: 'description',
            content: `Know more about Innocelf, LLC and know our mission. Our values
			are targeted towards getting the best for our clients. Together we
			are determined to protect the inventions of our clients and giving
			them the right analyses to succeed in their patent process.`,
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
 * The function fetches the SVG file designated in the path and returns a promise
 * with the SVG file contents as text
 * @param pathToSVGFile The path to the SVG file (from the static folder)
 * @returns Promise to resolve the SVG file contents as text
 */
export function _importSVG(pathToSVGFile) {
    return new Promise((resolve) => {
        fetch(pathToSVGFile).then((response) => {
            resolve(response.text());
        });
    });
}

/**
 * The function takes the SVG file contents as text and returns a document type
 * component which can be traversed through queryselectors and such
 * @param svgText The file contents of the SVG file as text
 * @returns A Document element with the svg contents as a DOM element
 */
export function _parseSVG(svgText) {
    let svgElement = new DOMParser().parseFromString(
        svgText,
        'text/xml'
        // 'image/svg+xml'
    );
    let svgTag = svgElement.querySelector('svg');
    return svgTag;
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
            let message = new HeadingOrParagraph(
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
            let message = new HeadingOrParagraph(
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
 * Creates and returns a container with the SVG of the blue background set as its
 * backgroun
 * @returns container with the blue background
 */
export function _fullWidthContainerWithBlueBackground() {
    let container = document.createElement('div');
    container.classList.add(
        'flex',
        'w-full',
        'h-56',
        'bg-cover',
        'bg-no-repeat',
        'bg-center',
        'relative'
    );
    container.style.backgroundImage = `url('/static/innoservices/img/firstPage/firstPageMiddleBlueBelt.svg')`;

    return container;
}

/**
 * Obtains and returns the SVG element that are the gray circle which usually
 * go on the blue background rectangle
 * @returns SVG of the gray circles with height, width and classes adjusted
 */
export function _grayCirclesOfBlueBeltBackground() {
    return new Promise((result) => {
        _importSVG(
            '/static/innoservices/img/firstPage/firstPageMiddleBlueBeltCircles.svg'
        ).then((response) => {
            let svgElement = _parseSVG(response);
            // svgElement.setAttribute('height', '225');
            svgElement.setAttribute('viewBox', '0 0 350 220');
            svgElement.classList.add('absolute', 'right-0', 'h-56');

            result(svgElement);
        });
    });
}

/**
 * Creates a container with blue background and silver circle with the heading
 * specified in headingText. Relies on _fullWidthContainerWithBlueBackground and
 * _grayCircleOfBlueBeltBackground
 * @param headingText The text that must be in the heading
 * @returns Container with blue background and silver circles with the heading
 */
export function createHeadingWithBlueBackground(headingText) {
    let container = _fullWidthContainerWithBlueBackground();
    container.classList.add('mt-12');

    let subContainer = document.createElement('div');
    subContainer.classList.add('flex', 'flex-col', 'w-3/5', 'm-auto');
    let heading = new HeadingOrParagraph('h2', headingText).renderWithClass([
        'text-white',
        'my-8',
        'text-center',
    ]).result;
    heading.classList.replace('lato-regular', 'lato-bold');

    subContainer.append(heading);

    _grayCirclesOfBlueBeltBackground().then((response) => {
        container.append(response);
    });

    container.append(subContainer);
    return container;
}
