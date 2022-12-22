'use strict';

import { Footer } from './ComponentClasses/Footer.js';
import { Navbar } from './ComponentClasses/Navbar.js';
import { HeadingOrParagraph } from './ComponentClasses/HeadingOrParagraph.js';
import { AnchorLinks } from './ComponentClasses/AnchorLinks.js';
import { PageHeadElements, homepageReviews } from './render_ts.js';
import {
    STATE,
    _importSVG,
    _parseSVG,
    _fullWidthContainerWithBlueBackground,
    _grayCirclesOfBlueBeltBackground,
} from './utils.js';

/**
 * Creates a container with the Innocelf logo and what it stands for. The
 * function also adds some set timeouts for some visual effects
 * @returns Container with Innocelf stands for Innovation is an art
 */
function createInnocelfStandsForCont() {
    let container = document.createElement('div');
    container.classList.add(
        'mt-20',
        'mb-40',
        'mx-auto',
        'block',
        'w-5/6',
        'h-40',
        'bg-gradient-to-tr',
        'from-gray-50',
        'to-gray-100',
        'rounded-3xl',
        'sm:h-44',
        'md:h-48',
        'md:w-2/3',
        'lg:w-1/2',
        'xl:w-2/5'
    );

    let brand = document.createElement('a');
    brand.classList.add(
        'flex',
        'justify-start',
        'flex-shrink-0',
        'items-center',
        'w-full',
        'transition-opacity',
        'duration-2000',
        'ease-in-out',
        'opacity-0'
    );
    brand.href = '/';

    _importSVG(
        '/static/innoservices/img/Innocelf-Logo-BlackFont-TransparentBack.svg'
    ).then((response) => {
        let svgElement = _parseSVG(response);
        svgElement.setAttribute('width', '350');
        brand.append(svgElement);
    });

    let standsForHead = new HeadingOrParagraph(
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

    let innoAnArtHead = new HeadingOrParagraph(
        'h2',
        'Innovation is an Art'
    ).renderWithClass([
        'text-right',
        'lato-regular',
        'px-6',
        'transition-opacity',
        'duration-1000',
        'ease-in-out',
        'opacity-0',
        'md:mt-3',
        'lg:mt-3',
        '2xl:mt-1',
        'text-black',
    ]).result;
    container.append(brand, standsForHead, innoAnArtHead);

    setTimeout(() => {
        brand.classList.replace('opacity-0', 'opacity-100');
    }, 1000);
    setTimeout(() => {
        standsForHead.classList.replace('opacity-0', 'opacity-100');
    }, 2500);
    setTimeout(() => {
        innoAnArtHead.classList.remove('opacity-0', 'opacity-100');
    }, 5000);

    return container;
}

/**
 * Creates a container and populates it with the missions of Innocelf
 * @returns Container with the missions of Innocelf
 */
function createMissionContainer() {
    let container = _fullWidthContainerWithBlueBackground();
    _grayCirclesOfBlueBeltBackground().then((response) => {
        container.append(response);
    });

    let subContainer = document.createElement('div');
    subContainer.classList.add(
        'flex',
        'flex-col',
        'w-full',
        'max-w-7xl',
        'mx-auto',
        'self-center',
        'my-6',
        'gap-8'
    );
    let ourMission = new HeadingOrParagraph(
        'h6',
        'Our Mission'
    ).renderWithClass(['text-center', 'text-white']).result;
    let missionStatement = new HeadingOrParagraph(
        'h1',
        'To Support Inventors in a Data-Driven World.'
    ).renderWithClass(['text-center', 'text-white', 'h-1/2']).result;
    subContainer.append(ourMission, missionStatement);

    container.append(subContainer);
    return container;
}

/**
 * Creates a container that includes the photo of the CEO of the company
 * @returns Container with the photo and their designation in the company
 */
function __createCEOPhotoContainer() {
    let photoContainer = document.createElement('div');
    photoContainer.classList.add('flex', 'flex-col', 'lg:w-2/5', 'lg:p-12');

    let photo = document.createElement('img');
    photo.classList.add('rounded-3xl', 'h-72', 'mx-auto', 'md:h-72', 'xl:h-96');
    photo.src = '/static/img/innoimg/innocelf-pranita-photo.jpg';

    let name = new HeadingOrParagraph(
        'h5',
        'Pranita Dharmadhikari'
    ).renderWithClass([
        'text-black',
        'text-center',
        'mt-6',
        'ml-6',
        'lg:text-left',
    ]).result;
    let title = new HeadingOrParagraph('p', 'CEO').renderWithClass([
        'text-gray-300',
        'text-center',
        'ml-6',
        'lg:text-left',
    ]).result;

    photoContainer.append(photo, name, title);
    return photoContainer;
}

/**
 * Creats a container for the education background of the the CEO
 * @returns Container with the education background of the CEO
 */
function __createEducationContainer() {
    let container = document.createElement('div');
    container.id = 'about-us-pranita-education-container';
    container.classList.add('flex', 'flex-col', 'w-full', 'mt-8', 'hidden');

    let educationArray = [
        `B.S Pharmaceuticals Sciences, Mumbai University`,
        `M.S Pharmacology, Pune University`,
        `M.A Patent Practice, Case Western Reserve University School of Law`,
    ];
    let profActArray = [
        `Mentoring Committee Relationship Manager at AIPLA`,
        `Mentor for Pitch for $K (Business Idea Pitch Competition) at 100K IDEAS`,
    ];
    let expertiseArray = [
        `Intellectual Property Research and Analysis`,
        `Patent applications drafting`,
        `Competitor Analysis`,
        `Due Diligence`,
        `Technology Landscape`,
    ];

    let renderHeadingWithArrayList = (headingContent, array, container) => {
        let heading = new HeadingOrParagraph(
            'h6',
            headingContent
        ).renderWithClass(['text-black', 'mt-8', 'mb-3']).result;
        heading.classList.remove('font-semibold');
        heading.classList.replace('lato-semibold', 'lato-regular');

        container.append(heading);
        array.map((item) => {
            let para = new HeadingOrParagraph('p', item)
                .renderMissionOrValueText()
                .renderWithClass(['text-black']).result;
            //para.classList.remove('font-medium');
            //para.classList.replace('lato-regular', 'lato-light');
            container.append(para);
        });
    };

    renderHeadingWithArrayList('EDUCATION', educationArray, container);
    renderHeadingWithArrayList(
        'PROFESSIONAL ACTIVITIES',
        profActArray,
        container
    );
    renderHeadingWithArrayList('EXPERTISE', expertiseArray, container);

    return container;
}

/**
 * Creates a container with the CEO information i.e. image of the CEO, info
 * about them and the education that they received
 * @returns Container with the CEO information
 */
function _createCEOContainer() {
    let container = document.createElement('div');
    container.classList.add(
        'flex',
        'flex-col',
        'w-full',
        'max-w-7xl',
        'gap-6',
        'sm:gap-8',
        'lg:gap-0',
        'lg:flex-row'
    );

    let photoContainer = __createCEOPhotoContainer();

    let paraContainer = document.createElement('div');
    paraContainer.classList.add(
        'flex',
        'flex-col',
        'text-justify',
        'sm:px-6',
        'md:px-16',
        'lg:w-3/5',
        'lg:p-12'
    );
    let paraArray = [
        `Pranita is the founder and CEO of Innocelf. Her work focuses on Patent
		analytics and IP strategies for technology based businesses.`,
        `Pranita has worked with pharmaceutical companies, law firms, research
		analytics firms and law clinics in different capacities related to
		patent research, drafting and prosecution. She enjoys collaborating
		with clients to problem-solve and form cost-effective strategies in
		achieving clients’ business goals.`,
        `Pranita has extensive experience working with pharmaceutical, medical
		device technology businesses, including counseling individual business
		owners on market decisions based on IP strategies.`,
        `Fun Fact - During her undergraduate years, Pranita developed and
		designed “Pharmaceutical Metal Detector and Separator with Deduster”.
		The device was designed to separate and detect metal contaminants from
		solid dosage formulations.`,
    ];

    paraArray.map((item) => {
        let para = new HeadingOrParagraph('p', item).renderMissionOrValueText()
            .result;
        //para.classList.remove('font-medium');
        //para.classList.replace('lato-regular', 'lato-light');

        let br = document.createElement('br');
        paraContainer.append(para, br);
    });
    let readMoreButton = new AnchorLinks(
        'Read More'
    ).renderMediumHollowInnocelfButtonFullRound().result;
    readMoreButton.classList.add('mx-auto', 'lg:ml-0');
    //readMoreButton.href = '#about-us-pranita-education-container';
    readMoreButton.onclick = () => {
        let eduCont = document.getElementById(
            'about-us-pranita-education-container'
        );
        eduCont.classList.toggle('hidden');
    };

    readMoreButton.removeAttribute('target');
    paraContainer.append(readMoreButton);

    let educationContainer = __createEducationContainer();
    paraContainer.append(educationContainer);

    container.append(photoContainer, paraContainer);
    return container;
}

/**
 * Creates, populates and returns a container with the missions and values of
 * Innocelf
 * @returns Container with both missions and values of Innocelf
 */
function createMissionAndValuesContainer() {
    let container = document.createElement('div');
    container.classList.add(
        'flex',
        'flex-col',
        'w-full',
        'my-12',
        'bg-contain',
        'bg-no-repeat',
        'bg-center',
        'lg:my-24'
        // 'h-96'
    );

    let missionContainer = createMissionContainer();

    container.append(missionContainer);
    return container;
}

/**
 * Creates and returns a container with the leadership team for all the people
 * that are important personnel of the company
 * @returns Container with the important personnel of the company
 */
function createLeadershipContainer() {
    let container = document.createElement('div');
    container.classList.add(
        'flex',
        'flex-col',
        'w-11/12',
        'gap-6',
        'max-w-7xl',
        'mx-auto'
    );

    let heading = new HeadingOrParagraph('h2', 'Our Leadership').result;
    let ceoContainer = _createCEOContainer();

    container.append(heading, ceoContainer);
    return container;
}

/**
 * Creates a container with a value. Includes an image, a heading for the value
 * and a small paragraph about the value
 * @param imageFilename The filename for the image
 * @param headingText The text that should be the heading of the value
 * @param paraText The text that should be the paragraph of the value
 * @returns Container with the image, heading and paragraph for the value
 */
function __createOneValue(imageFilename, headingText, paraText) {
    let container = document.createElement('div');
    container.classList.add(
        'flex',
        'flex-col',
        'gap-6',
        'w-full',
        'lg:gap-0',
        'lg:flex-row'
    );

    let imageContainer = document.createElement('div');
    imageContainer.classList.add(
        'flex',
        'w-1/3',
        'justify-center',
        'self-center'
    );
    _importSVG(imageFilename).then((response) => {
        let svgElement = _parseSVG(response);
        imageContainer.append(svgElement);
    });

    let paraContainer = document.createElement('div');
    paraContainer.classList.add(
        'flex',
        'flex-col',
        'w-10/12',
        'lg:w-2/3',
        'self-center'
    );
    let heading = new HeadingOrParagraph('h3', headingText).renderWithClass([
        'text-black',
        'text-center',
        'mb-5',
        'lg:text-left',
    ]).result;
    heading.classList.replace('lato-bold', 'lato-regular');
    heading.classList.remove('font-bold');
    let para = new HeadingOrParagraph('p', paraText)
        .renderMissionOrValueText()
        .renderWithClass(['text-black']).result;
    paraContainer.append(heading, para);

    container.append(imageContainer, paraContainer);

    return container;
}

/**
 * Creates a container with the values of Innocelf.
 * @returns Container with all the values listed in it
 */
function createValuesContainer() {
    let container = document.createElement('div');
    container.classList.add(
        'flex',
        'bg-gradient-to-tr',
        'from-gray-50',
        'to-gray-100',
        'my-12',
        'lg:my-24'
    );

    let subContainer = document.createElement('div');
    subContainer.classList.add(
        'flex',
        'flex-col',
        'w-full',
        'mx-auto',
        'max-w-7xl',
        'gap-12',
        'my-12',
        'lg:gap-24',
        'lg:my-24'
    );

    let headingContainer = document.createElement('div');
    headingContainer.classList.add(
        'flex',
        'flex-col',
        'w-10/12',
        'mx-auto',
        'lg:w-full'
    );

    let smallHeading = new HeadingOrParagraph(
        'p',
        'Our Values'
    ).renderWithClass(['text-black', 'mb-4']).result;
    smallHeading.classList.remove('font-medium');
    smallHeading.classList.replace('lato-regular', 'lato-light');

    let heading = new HeadingOrParagraph(
        'h2',
        'Things We Believe In'
    ).renderWithClass(['text-black']).result;
    heading.classList.remove('font-bold');
    heading.classList.replace('lato-bold', 'lato-regular');

    headingContainer.append(smallHeading, heading);
    subContainer.append(headingContainer);

    let imageFilesArray = [
        `/static/innoservices/img/about-us/aboutUsCommitment1.svg`,
        `/static/innoservices/img/about-us/aboutUsTransparent1.svg`,
        `/static/innoservices/img/about-us/aboutUsProgress1.svg`,
    ];
    let headingsArray = [
        'We are committed',
        'We are transparent',
        'We aim for progress',
    ];
    let paraArray = [
        `We are committed to act in our clients best interest to achieve their
		IP goals.`,
        `We believe in transparent communication with our clients for long term
		collaboration.`,
        `We invest in continuous improvement and education to improve our
		services.`,
    ];

    for (let i = 0; i < imageFilesArray.length; i++) {
        let value = __createOneValue(
            imageFilesArray[i],
            headingsArray[i],
            paraArray[i]
        );
        subContainer.append(value);
    }

    container.append(subContainer);
    return container;
}

function __createToolsAndExpertiseSmallLargeHeading(
    smallHeadingText,
    largeHeadingText
) {
    let container = document.createElement('div');
    container.classList.add('flex', 'flex-col', 'w-full');

    let smallHeading = new HeadingOrParagraph(
        'p',
        smallHeadingText
    ).renderWithClass(['text-black', 'mb-4']).result;
    smallHeading.classList.remove('font-medium');
    smallHeading.classList.replace('lato-regular', 'lato-light');

    let heading = new HeadingOrParagraph(
        'h2',
        largeHeadingText
    ).renderWithClass(['text-black']).result;
    heading.classList.remove('font-bold');
    heading.classList.replace('lato-bold', 'lato-regular');

    container.append(smallHeading, heading);

    return container;
}

/**
 * Creates tool information advantages for the tools Innocelf uses
 * @returns Unordered list with all the advantages
 */
function __createToolInfoAdvantagesList() {
    let advantagesArray = [
        `100+ patent-issuing authorities`,
        `80+ million records`,
        `Patent classification codes: IPC, CPC, ECLA, USPCL and Japanese FI & F-Term`,
        `Patent and non-patent citation reports with relevancy indicators`,
        `Updated daily`,
    ];

    let ul = document.createElement('ul');
    ul.classList.add('list-disc', 'list-inside', 'mt-5', 'mb-8');

    advantagesArray.map((item) => {
        let li = document.createElement('li');
        li.textContent = item;

        li.classList.add('text-base', 'lato-light', 'sm:text-lg', 'lg:text-xl');
        ul.append(li);
    });

    return ul;
}

/**
 * Creates a paragraph tag with a link concerning Questel info
 * @returns Paragraph element
 */
function __createQuestelInfo() {
    let para = document.createElement('p');
    para.classList.add('text-base', 'lato-light', 'sm:text-lg', 'lg:text-xl');

    let span = document.createElement('span');
    let a = document.createElement('a');

    span.textContent = `For details on specific
		country coverage, please visit `;

    a.textContent = 'Questel.';
    a.classList.add('underline', 'lato-regular');
    a.target = '_blank';
    a.href =
        'https://static.orbit.com/imagination/orbit_welcome/prd/coverage/coverage.htm';

    para.append(span, a);
    return para;
}

/**
 * Creates the tools description container that goes into the tools container
 * @returns Container with an image and tools description
 */
function _createToolsDescription() {
    let container = document.createElement('div');
    container.classList.add('flex', 'flex-col', 'lg:flex-row', 'w-full');

    let imageContainer = document.createElement('div');
    imageContainer.classList.add(
        'flex',
        'justify-center',
        'self-center',
        'lg:w-1/3'
    );
    _importSVG(
        '/static/innoservices/img/about-us/aboutUsResearchTools.svg'
    ).then((response) => {
        let svgElement = _parseSVG(response);
        imageContainer.append(svgElement);
    });

    let paraContainer = document.createElement('div');
    paraContainer.classList.add(
        'flex',
        'flex-col',
        'w-full',
        'lg:w-2/3',
        'self-center'
    );

    let para = new HeadingOrParagraph(
        'p',
        `We continuously implement efficient search strategies and test various
		new databases.  Along with well known free search tools we
		use the Questel Orbit database that has the following
		important features:`
    )
        .renderMissionOrValueText()
        .renderWithClass(['text-black', 'text-justify']).result;

    let ul = __createToolInfoAdvantagesList();
    let questelInfo = __createQuestelInfo();
    paraContainer.append(para, ul, questelInfo);

    container.append(imageContainer, paraContainer);
    return container;
}

function _createExpertiseContainer() {
    let container = document.createElement('div');
    container.classList.add(
        'flex',
        'flex-col',
        'gap-10',
        'lg:gap-0',
        'lg:flex-row',
        'w-full'
    );

    let imageContainer = document.createElement('div');
    imageContainer.classList.add(
        'flex',
        'lg:w-1/3',
        'justify-center',
        'self-center'
    );
    _importSVG('/static/innoservices/img/about-us/aboutUsExpertise.svg').then(
        (response) => {
            let svgElement = _parseSVG(response);
            imageContainer.append(svgElement);
        }
    );

    let expertiseArray = [
        'Medical Devices',
        'Pharmaceuticals and Nutraceuticals',
        'Chemistry',
        'Artificial Intelligence (AI)',
        'Software',
        'Consumer Electronics',
        'Food Technology',
    ];

    let paraContainer = document.createElement('div');
    paraContainer.classList.add('flex', 'flex-col', 'lg:w-2/3', 'self-center');

    let para = new HeadingOrParagraph(
        'p',
        `We are constantly expanding our expertise by learning new things and
		by including subject matter experts to provide the best possible service
		for your needs. The technologies we have worked on extensively are:`
    )
        .renderMissionOrValueText()
        .renderWithClass(['text-black', 'text-justify']).result;

    let ul = document.createElement('ul');
    ul.classList.add('list-disc', 'list-inside', 'mt-5', 'mb-8');

    expertiseArray.map((item) => {
        let li = document.createElement('li');
        li.textContent = item;

        li.classList.add('text-base', 'lato-light', 'sm:text-lg', 'lg:text-xl');
        ul.append(li);
    });
    paraContainer.append(para, ul);

    container.append(imageContainer, paraContainer);
    return container;
}

/**
 * Creates a container with the tools information of Innocelf
 * @returns Container with the tools information for Innocelf
 */
function createToolsContainer() {
    let container = document.createElement('div');
    container.classList.add(
        'flex',
        'bg-contain',
        'bg-no-repeat',
        'bg-center',
        'mb-24'
    );
    container.style.backgroundImage = `url('/static/innoservices/img/innocelfGrayCNoGradient.svg')`;

    let subContainer = document.createElement('div');
    subContainer.classList.add(
        'flex',
        'flex-col',
        'w-10/12',
        'mx-auto',
        'my-12',
        'gap-12',
        'max-w-7xl',
        'lg:gap-24',
        'lg:my-24'
    );

    let toolsHeadingContainer = __createToolsAndExpertiseSmallLargeHeading(
        'What we use',
        'Our Research Tools'
    );
    let toolDescContainer = _createToolsDescription();
    subContainer.append(toolsHeadingContainer, toolDescContainer);

    let expertiseHeadingContainer = __createToolsAndExpertiseSmallLargeHeading(
        'Our Expertise',
        'Technologies'
    );
    let expertiseContaner = _createExpertiseContainer();
    subContainer.append(expertiseHeadingContainer, expertiseContaner);

    container.append(subContainer);
    return container;
}

/**
 * Function is main driver for rendering the About Us Page
 */
export function renderAboutUs() {
    // new PageHeadElements(STATE.aboutUs.meta, STATE.aboutUs.title);
    let navbar = new Navbar().render().result;
    let innocelfStandsForCont = createInnocelfStandsForCont();
    let missionValuesCont = createMissionAndValuesContainer();
    let leadershipContainer = createLeadershipContainer();
    let valuesContainer = createValuesContainer();
    let toolsContainer = createToolsContainer();
    let footer = new Footer().render().result;

    let app = document.getElementById('app');
    app.append(
        navbar,
        //innocelfStandsForCont,
        missionValuesCont,
        leadershipContainer,
        valuesContainer,
        toolsContainer,
        footer
    );
}
