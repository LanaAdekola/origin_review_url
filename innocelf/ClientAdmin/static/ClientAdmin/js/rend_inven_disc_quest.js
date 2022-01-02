'use strict';
import * as ComponentServices from '/static/innoservices/js/components_ts.js';
import * as RenderServices from '/static/innoservices/js/render_ts.js';

/**
 * The function creates a json object with fields provided from the array and
 * maps them to a value from the dom. These are additional headers
 * @param {array} domJsonArray Array of fields that will be looked up from the dom
 * to create the json object
 * @returns Json object with fields provided in the array and their values
 */
export function __createAddtionalHeaderObject(domJsonArray) {
    function __removeUnderscoreAndJoin(underscoredText) {
        let split = underscoredText.split('_');
        let outputString = '';
        split.map((item) => {
            outputString += item;
        });

        return outputString;
    }

    let additionalHeaders = {};
    domJsonArray.map((item) => {
        let textContent = JSON.parse(document.getElementById(item).textContent);
        additionalHeaders[__removeUnderscoreAndJoin(item)] = textContent;
    });

    return additionalHeaders;
}

let FORM_OBJECT_LABELS = {
    client_name: 'Name*',
    client_company: 'Company*',
    client_email: 'Email*',
    title: 'Proposed Title of the Invention*',
    category: 'Category of the Invention*',
    summary: 'Summary of the Invention*',
    problem_solved: 'Technical Problem Addressed*',
    closest_art: 'Closest Related Art*',
    competing_products: 'Any Competing Products?*',
    advantages: 'Advantages of the Invention*',
    future_improvements: 'Any Planned Future Improvements?',
    drawings: 'Drawings or Pictures',
};

let FORM_OBJECT_SUBLABELS = {
    title: ` (Short descriptive title which conveys the nature of the invention) `,
    summary: ` (Identify what you consider to be important aspects of the invention
    and / or improvements over the existing state of the art) `,
    closest_art: ` (Include existing patents, publications, magazine articles or 
    website links that are similar to your invention) `,
    competing_products: ` (Products in the marketplace or products you believe will 
    be entering the market and compete with your invention) `,
    future_improvements: ` (Describe any improvements or modifications planned for
    your invention. Provide an estimate on when these will be completed.) `,
    problem_solved: ` (Technical problem addressed by your invention) `,
    advantages: ` (Advantages presented by your invention) `,
};

/**
 * The function renders the invention disclosure questionnaire page. This is
 * based on an unique link and displays the form
 */
export function renderInventionDiscQuestPage() {
    let uuidUsed = JSON.parse(document.getElementById('uuid_used').textContent);
    new RenderServices.PageHeadElements(
        {},
        'Innocelf Invention Disclosure Questionnaire'
    );
    let navbar = new ComponentServices.Navbar().render().result;
    let footer = new ComponentServices.Footer().render().result;
    let app = document.getElementById('app');

    if (uuidUsed === false) {
        let heading = new ComponentServices.HeadingOrParagraph(
            'h3',
            'Invention Disclosure Questionnaire'
        )
            .renderGradientText()
            .renderWithClass(['mx-auto']).result;
        heading.id = 'main-heading';

        let paragraph1 = new ComponentServices.HeadingOrParagraph(
            'p',
            `Please complete this questionnaire to the best of your knowledge with
        regards to each invention that you are interested in researching. Your
        responses will assist us to prepare key words as well as
        to compare your invention with other known patents / applications in the
        domain. After completing the questionnaire, please upload any details,
        images, flowcharts, block diagrams etc, relating to the invention. We
        will let you know if any more details are required.`
        ).renderWithClass([
            'w-11/12',
            'sm:w-10/12',
            'md:w-3/4',
            '2xl:w-2/3',
            'mx-auto',
            'mb-12',
            'text-justify',
            'leading-6',
        ]).result;
        paragraph1.id = 'paragraph-1';

        let paragraph2 = new ComponentServices.HeadingOrParagraph(
            'p',
            `For confidentiality and security purposes, once submitted, the link 
        will expire. Please make sure to answer all questions to the best of your
        knowledge before submitting. Updates could be provided via email if needed.`
        ).renderWithClass([
            'w-11/12',
            'sm:w-10/12',
            'md:w-3/4',
            '2xl:w-2/3',
            'mx-auto',
            'mb-12',
            'text-red-600',
            'text-justify',
            'leading-6',
        ]).result;
        paragraph2.id = 'paragraph-2';

        let mainContainer = new ComponentServices.TwoColumnContainer(
            'invention-disc-quest'
        ).result;
        // Append the required image
        let image = Object.assign(document.createElement('img'), {
            classList: 'hidden object-contain md:flex md:h-3/4 xl:h-full',
            src: '/static/ClientAdmin/img/innocelf-invention-discl-quest-picture.jpg',
        });
        mainContainer
            .querySelector('#invention-disc-quest-left-container')
            .append(image);
        mainContainer.querySelector(
            '#invention-disc-quest-left-container'
        ).className = 'hidden';

        // Create the contact us form
        let inventionDiscQuestForm = new ComponentServices.TypicalPostForm(
            'invention-disc-quest-form'
        ).result;
        mainContainer
            .querySelector('#invention-disc-quest-right-container')
            .append(inventionDiscQuestForm);
        let uuid = window.location.pathname
            .split('/complete-invention-disclosure-questionnaire/')[1]
            .split('/')[0];

        let domJsonArray = ['client_name', 'client_company', 'client_email'];
        let additionalHeaders = __createAddtionalHeaderObject(domJsonArray);

        RenderServices._obtainForm(
            '/client-admin/obtain-invention-disclosure-quest-form',
            additionalHeaders
        ).then((data) => {
            let formFromBackend = new DOMParser().parseFromString(
                data,
                'text/html'
            );
            let csrfToken = document.querySelector(
                '[name="csrfmiddlewaretoken"]'
            );
            let uuidInput = Object.assign(document.createElement('input'), {
                value: uuid,
                type: 'hidden',
                name: 'uuid_token',
            });
            inventionDiscQuestForm.append(csrfToken, uuidInput);

            Object.keys(FORM_OBJECT_LABELS).map((item) => {
                let inputWithLabel;
                if (item === 'category') {
                    inputWithLabel = new ComponentServices.SelectInputWithLabel(
                        FORM_OBJECT_LABELS[item],
                        formFromBackend.querySelector('[name="' + item + '"]')
                    ).render().result;
                } else {
                    inputWithLabel = new ComponentServices.TextInputWithLabel(
                        FORM_OBJECT_LABELS[item],
                        formFromBackend.querySelector('[name="' + item + '"]')
                    ).render().result;

                    new ComponentServices.TextInputCharacterCount(
                        inputWithLabel
                    );
                }

                if (FORM_OBJECT_SUBLABELS.hasOwnProperty(item)) {
                    let subspan = document.createElement('span');
                    subspan.classList.add('text-xs', 'lato-light');
                    subspan.textContent = FORM_OBJECT_SUBLABELS[item];

                    inputWithLabel.insertBefore(
                        subspan,
                        inputWithLabel.querySelector('#' + item + '-label-span')
                            .nextSibling
                    );
                }

                inventionDiscQuestForm.append(inputWithLabel);
            });

            // let clientName = new ComponentServices.TextInputWithLabel(
            //     'Name*',
            //     formFromBackend.querySelector('[name="client_name"]')
            // ).render().result;
            // let companyName = new ComponentServices.TextInputWithLabel(
            //     'Company Name',
            //     formFromBackend.querySelector('[name="client_company"]')
            // ).render().result;
            // let clientEmail = new ComponentServices.TextInputWithLabel(
            //     'Email*',
            //     formFromBackend.querySelector('[name="client_email"]')
            // ).render().result;
            // let title = new ComponentServices.TextInputWithLabel(
            //     'Proposed Title of the Invention*',
            //     formFromBackend.querySelector('[name="title"]')
            // ).render().result;

            // let category = new ComponentServices.SelectInputWithLabel(
            //     'Category of the Invention*',
            //     formFromBackend.querySelector('[name="category"]')
            // ).render().result;

            // let summary = new ComponentServices.TextInputWithLabel(
            //     'Summary of the Invention*',
            //     formFromBackend.querySelector('[name="summary"]')
            // ).render().result;

            // let problemSolved = new ComponentServices.TextInputWithLabel(
            //     'Technical Problem Addressed*',
            //     formFromBackend.querySelector('[name="problem_solved"]')
            // ).render().result;

            // let closestArt = new ComponentServices.TextInputWithLabel(
            //     'Closest Related Art*',
            //     formFromBackend.querySelector('[name="closest_art"]')
            // ).render().result;

            // let competingProducts = new ComponentServices.TextInputWithLabel(
            //     'Any Competing Products?*',
            //     formFromBackend.querySelector('[name="competing_products"]')
            // ).render().result;

            // let advantages = new ComponentServices.TextInputWithLabel(
            //     'Advantages of the Invention*',
            //     formFromBackend.querySelector('[name="advantages"]')
            // ).render().result;

            // let futureImprovements = new ComponentServices.TextInputWithLabel(
            //     'Any Planned Future Improvements?',
            //     formFromBackend.querySelector('[name="future_improvements"]')
            // ).render().result;

            // let drawings = new ComponentServices.TextInputWithLabel(
            //     'Drawings or Pictures (if any)?',
            //     formFromBackend.querySelector('[name="drawings"]')
            // ).render().result;
            // drawings.classList.add('mt-10');

            let submitButton = new ComponentServices.TypicalFormSubmitButton(
                'Submit'
            ).result;
            inventionDiscQuestForm.append(
                // csrfToken,
                // uuidInput,
                // clientName,
                // companyName,
                // clientEmail,
                // title,
                // category,
                // summary,
                // problemSolved,
                // closestArt,
                // competingProducts,
                // advantages,
                // futureImprovements,
                // drawings,
                submitButton
            );
            submitButton.onclick = function (event) {
                if (inventionDiscQuestForm.checkValidity()) {
                    event.preventDefault();
                    RenderServices._submitForm(
                        inventionDiscQuestForm,
                        mainContainer,
                        '/client-admin/recieve-invention-disclosure-quest-form',
                        'invention-disc-quest'
                    );
                    document
                        .getElementById('app')
                        .querySelector('#main-heading')
                        .remove();
                    document
                        .getElementById('app')
                        .querySelector('#paragraph-1')
                        .remove();
                    document
                        .getElementById('app')
                        .querySelector('#paragraph-2')
                        .remove();
                    document
                        .getElementById('app')
                        .querySelector('footer')
                        .remove();
                }
            };
        });
        app.append(
            navbar,
            heading,
            paragraph1,
            paragraph2,
            mainContainer,
            footer
        );
    } else if (uuidUsed === true) {
        let container = document.createElement('div');
        container.classList.add(
            'flex',
            'w-11/12',
            'sm:w-10/12',
            'md:w-3/4',
            'xl:w-2/3',
            'p-4',
            'justify-center',
            'align-center',
            'mx-auto',
            'mt-12'
        );
        let para = new ComponentServices.HeadingOrParagraph(
            'h3',
            `Your questionnaire entries were recorded successfully. Thank you for taking
        the time to fill your responses. We will contact you if we need more details.`
        ).result;
        container.append(para);

        app.append(navbar, container);
    }
}
