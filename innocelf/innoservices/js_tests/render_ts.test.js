'use strict';
import {
    TextInputWithLabel,
    TwoColumnContainer,
    TypicalPostForm,
} from '../static/innoservices/js/components_ts.js';
import * as RenderTS from '../static/innoservices/js/render_ts.js';

const allReviews = {
    1: {
        model: 'test.model',
        pk: 1,
        fields: {
            accepted: true,
            first_name: 'TestFirst_1',
            last_name: 'TestLast_1',
            review: 'TestReview_1',
            month_year: 'Test_1 2021',
            upwork_review: true,
        },
    },
    2: {
        model: 'test.model',
        pk: 1,
        fields: {
            accepted: true,
            first_name: 'TestFirst_2',
            last_name: 'TestLast_2',
            review: 'TestReview_2',
            month_year: 'Test_2 2021',
            upwork_review: true,
        },
    },
    3: {
        model: 'test.model',
        pk: 1,
        fields: {
            accepted: true,
            first_name: 'Jason',
            last_name: 'TestLast_3',
            review: 'TestReview_3',
            month_year: 'Test_3 2021',
            upwork_review: true,
        },
    },
    4: {
        model: 'test.model',
        pk: 1,
        fields: {
            accepted: true,
            first_name: 'TestFirst_4',
            last_name: 'TestLast_4',
            review: 'TestReview_4',
            month_year: 'Test_4 2021',
            upwork_review: true,
        },
    },
    5: {
        model: 'test.model',
        pk: 1,
        fields: {
            accepted: true,
            first_name: 'Robin',
            last_name: 'TestLast_5',
            review: 'TestReview_5',
            month_year: 'Test_5 2021',
            upwork_review: true,
        },
    },
    6: {
        model: 'test.model',
        pk: 1,
        fields: {
            accepted: true,
            first_name: 'TestFirst_6',
            last_name: 'TestLast_6',
            review: 'TestReview_6',
            month_year: 'Test_6 2021',
            upwork_review: true,
        },
    },
};

describe('Tests function _obtainAllReviews', function () {
    let xhrMockClass = {
        open: jest.fn(),
        send: jest.fn(),
        onreadystatechange: jest.fn(),
        readyState: 4,
        status: 200,
        response: JSON.stringify({
            all_reviews_json: JSON.stringify(allReviews),
        }),
    };

    it('Function returns not null promise', function () {
        let testOutput = RenderTS._obtainAllReviews();
        expect(testOutput).not.toBeNull();
    });

    it('Function returns a promise with the right values', function () {
        jest.spyOn(window, 'XMLHttpRequest').mockImplementation(
            () => xhrMockClass
        );

        RenderTS._obtainAllReviews().then((response) => {
            expect(xhrMockClass.open).toBeCalledWith('GET', '/testimonials');
            expect(xhrMockClass.send).toBeCalledTimes(1);
            expect(response).toStrictEqual(allReviews);
        });
        xhrMockClass.onreadystatechange(new Event(''));
    });
});

describe('Tests function homepageReviews', function () {
    let xhrMockClass = {
        open: jest.fn(),
        send: jest.fn(),
        onreadystatechange: jest.fn(),
        readyState: 4,
        status: 200,
        response: JSON.stringify({
            all_reviews_json: JSON.stringify(allReviews),
        }),
    };

    it('Function returns not null promise', function () {
        let testOutput = RenderTS.homepageReviews();
        expect(testOutput).not.toBeNull();
    });

    it('Function returns a promise with the right values', function () {
        jest.spyOn(window, 'XMLHttpRequest').mockImplementation(
            () => xhrMockClass
        );

        let homepageReviewsResponse = {
            0: {
                name: 'TestFirst_2 T.',
                review: 'TestReview_2',
            },
            1: {
                name: 'TestFirst_4 T.',
                review: 'TestReview_4',
            },
            2: {
                name: 'TestFirst_1 T.',
                review: 'TestReview_1',
            },
            3: {
                name: 'TestFirst_6 T.',
                review: 'TestReview_6',
            },
        };

        RenderTS.homepageReviews().then((response) => {
            expect(xhrMockClass.open).toBeCalledWith('GET', '/testimonials');
            expect(xhrMockClass.send).toBeCalled();
            expect(response).toStrictEqual(homepageReviewsResponse);
        });
        xhrMockClass.onreadystatechange(new Event(''));
    });
});

describe('Tests function aboutUsReviews', function () {
    let xhrMockClass = {
        open: jest.fn(),
        send: jest.fn(),
        onreadystatechange: jest.fn(),
        readyState: 4,
        status: 200,
        response: JSON.stringify({
            all_reviews_json: JSON.stringify(allReviews),
        }),
    };

    it('Function returns not null promise', function () {
        let testOutput = RenderTS.aboutUsReviews();
        expect(testOutput).not.toBeNull();
    });

    it('Function returns a promise with the right values', function () {
        jest.spyOn(window, 'XMLHttpRequest').mockImplementation(
            () => xhrMockClass
        );

        let aboutUsReviewsResponse = {
            1: {
                name: 'Jason T.',
                review: 'TestReview_3',
            },
            2: {
                name: 'Robin T.',
                review: 'TestReview_5',
            },
        };

        RenderTS.aboutUsReviews().then((response) => {
            expect(xhrMockClass.open).toBeCalledWith('GET', '/testimonials');
            expect(xhrMockClass.send).toBeCalled();
            expect(response).toStrictEqual(aboutUsReviewsResponse);
        });
        xhrMockClass.onreadystatechange(new Event(''));
    });
});

describe('Tests the expanding and collapsing of all questions', function () {
    beforeEach(function () {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                text: () => Promise.resolve('Sample svg text'),
            })
        );

        let app = document.createElement('div');
        app.id = 'app';

        document.body.append(app);
    });

    it('Test the expand all button functionality', function () {
        RenderTS.renderFAQPage();

        // All data-expands
        let allDataExpands = document.querySelectorAll('[data-expand="true"]');
        allDataExpands.forEach((value) => {
            let element = value;
            expect(element.classList.contains('hidden')).toBeTruthy();
        });

        // Expand button on the document
        let expandButton = document.getElementById('expand-all-answers-button');
        expandButton.click();

        allDataExpands.forEach((value) => {
            let element = value;
            expect(element.classList.contains('hidden')).toBeFalsy();
        });
    });

    it('Test the collapse all button functionality', function () {
        RenderTS.renderFAQPage();

        // All data-expands
        let allDataExpands = document.querySelectorAll('[data-expand="true"]');
        allDataExpands.forEach((value) => {
            let element = value;
            expect(element.classList.contains('hidden')).toBeTruthy();
        });

        // Expand button on the document
        let expandButton = document.getElementById('expand-all-answers-button');
        expandButton.click();

        allDataExpands.forEach((value) => {
            let element = value;
            expect(element.classList.contains('hidden')).toBeFalsy();
        });

        // Collapse button on the document
        let collapseButton = document.getElementById(
            'collapse-all-answers-button'
        );
        collapseButton.click();
        allDataExpands.forEach((value) => {
            let element = value;
            expect(element.classList.contains('hidden')).toBeTruthy();
        });
    });

    afterEach(function () {
        jest.clearAllMocks();
        document.getElementById('app').remove();
    });
});

describe('Tests function _obtainForm', function () {
    let xhrMockClass = {
        open: jest.fn(),
        send: jest.fn(),
        onreadystatechange: jest.fn(),
        setRequestHeader: jest.fn(),
        readyState: 4,
        status: 200,
        response: `Test Form Contents Here`,
    };

    it('Function returns not null promise', function () {
        let testOutput = RenderTS._obtainForm('/obtain-contact-us-form');
        expect(testOutput).not.toBeNull();
    });

    it('Function returns a promise with the right values', function () {
        jest.spyOn(window, 'XMLHttpRequest').mockImplementation(
            () => xhrMockClass
        );

        RenderTS._obtainForm('/obtain-contact-us-form').then((response) => {
            expect(xhrMockClass.open).toBeCalledWith(
                'GET',
                '/obtain-contact-us-form'
            );
            expect(xhrMockClass.send).toBeCalledTimes(1);
            expect(response).toStrictEqual(`Test Form Contents Here`);
        });
        xhrMockClass.onreadystatechange(new Event(''));
    });

    it('Function returns a promise with the right values with additionalHeaders', function () {
        jest.spyOn(window, 'XMLHttpRequest').mockImplementation(
            () => xhrMockClass
        );

        let additionalHeaders = {
            TestHeader1: 'TestHeaderValue1',
            TestHeader2: 'TestHeaderValue2',
        };
        RenderTS._obtainForm('/obtain-contact-us-form', additionalHeaders).then(
            (response) => {
                expect(xhrMockClass.open).toBeCalledWith(
                    'GET',
                    '/obtain-contact-us-form'
                );
                expect(xhrMockClass.send).toBeCalledTimes(1);
                expect(response).toStrictEqual(`Test Form Contents Here`);
                expect(xhrMockClass.setRequestHeader).toBeCalledTimes(2);
                expect(xhrMockClass.setRequestHeader).toBeCalledWith(
                    'TestHeader1',
                    'TestHeaderValue1'
                );
                expect(xhrMockClass.setRequestHeader).toBeCalledWith(
                    'TestHeader2',
                    'TestHeaderValue2'
                );
            }
        );
        xhrMockClass.onreadystatechange(new Event(''));
    });

    afterEach(function () {
        jest.clearAllMocks();
    });
});

describe('Test function _submitForm', function () {
    beforeEach(function () {
        let mainContainer = new TwoColumnContainer('test-case').result;
        document.body.append(mainContainer);

        let formElement = new TypicalPostForm('test-case-form-id').result;
        let rightContainer = document.getElementById(
            'test-case-right-container'
        );
        rightContainer.append(formElement);

        let renderedForm = document.getElementById('test-case-form-id');
        for (let i = 0; i < 3; i++) {
            let inputElement = document.createElement('input');
            inputElement.type = 'text';
            inputElement.name = 'test-input-' + (i + 1).toFixed(0);
            inputElement.id = 'test-input-' + (i + 1).toFixed(0);
            inputElement.setAttribute(
                'value',
                'Test Input ' + (i + 1).toFixed(0)
            );

            let inputElementWithLabel = new TextInputWithLabel(
                'Text Input ' + (i + 1).toFixed(0),
                inputElement
            ).render().result;

            renderedForm.append(inputElementWithLabel);
        }
    });

    it('Function sends a XMLHTTPRequest to post', function () {
        let successResponse = {
            Success: 'This is a text success message',
        };
        let xhrMockClass = {
            open: jest.fn(),
            send: jest.fn(),
            onreadystatechange: jest.fn(),
            onload: jest.fn(),
            setRequestHeader: jest.fn(),
            readyState: 4,
            status: 200,
            response: JSON.stringify(successResponse),
        };
        jest.spyOn(window, 'XMLHttpRequest').mockImplementation(
            () => xhrMockClass
        );

        let formElement = document.getElementById('test-case-form-id');
        let mainContainer = document.getElementById('test-case-main-container');
        let linkToSendFormData = '/test-send-form-data';
        let mainContainerIdPrepend = 'test-case';

        RenderTS._submitForm(
            formElement,
            mainContainer,
            linkToSendFormData,
            mainContainerIdPrepend
        );
        expect(xhrMockClass.open).toBeCalledTimes(1);
        expect(xhrMockClass.open).toBeCalledWith('POST', linkToSendFormData);
        expect(xhrMockClass.send).toBeCalledTimes(1);
        expect(xhrMockClass.send).toBeCalledWith(new FormData(formElement));

        // (xhrMockClass.onload )(new Event(''));
    });

    it('Function modifies the required HTML Elements Success', function () {
        let successResponse = {
            Success: 'This is a text success message',
        };
        let xhrMockClass = {
            open: jest.fn(),
            send: jest.fn(),
            onreadystatechange: jest.fn(),
            onload: jest.fn(),
            setRequestHeader: jest.fn(),
            readyState: 4,
            status: 200,
            response: JSON.stringify(successResponse),
        };
        jest.spyOn(window, 'XMLHttpRequest').mockImplementation(
            () => xhrMockClass
        );

        let formElement = document.getElementById('test-case-form-id');
        let mainContainer = document.getElementById('test-case-main-container');
        let linkToSendFormData = '/test-send-form-data';
        let mainContainerIdPrepend = 'test-case';

        RenderTS._submitForm(
            formElement,
            mainContainer,
            linkToSendFormData,
            mainContainerIdPrepend
        );

        expect(formElement).not.toBeNull();
        xhrMockClass.onload(new Event(''));
        formElement = document.getElementById('test-case-form-id');
        expect(formElement).toBeNull();

        let rightContainer = document.getElementById(
            'test-case-right-container'
        );
        expect(rightContainer.childNodes.length).toBe(1);
        expect(rightContainer.children[0].tagName.toLowerCase()).toBe('h3');
        expect(rightContainer.children[0].textContent).toBe(
            'This is a text success message'
        );
        let expectedClasses = [
            'm-auto',
            'transition-opacity',
            'duration-500',
            'ease-in-out',
            'opacity-0',
        ];
        expectedClasses.map((item) => {
            expect(
                rightContainer.children[0].classList.contains(item)
            ).toBeTruthy();
        });
    });

    it('Function modifies the required HTML Elements Failure', function () {
        let failureResponse = {
            Failure: 'This is a text failure message',
        };
        let xhrMockClass = {
            open: jest.fn(),
            send: jest.fn(),
            onreadystatechange: jest.fn(),
            onload: jest.fn(),
            setRequestHeader: jest.fn(),
            readyState: 4,
            status: 200,
            response: JSON.stringify(failureResponse),
        };
        jest.spyOn(window, 'XMLHttpRequest').mockImplementation(
            () => xhrMockClass
        );

        let formElement = document.getElementById('test-case-form-id');
        let mainContainer = document.getElementById('test-case-main-container');
        let linkToSendFormData = '/test-send-form-data';
        let mainContainerIdPrepend = 'test-case';

        RenderTS._submitForm(
            formElement,
            mainContainer,
            linkToSendFormData,
            mainContainerIdPrepend
        );

        expect(formElement).not.toBeNull();
        xhrMockClass.onload(new Event(''));
        formElement = document.getElementById('test-case-form-id');
        expect(formElement).toBeNull();

        let rightContainer = document.getElementById(
            'test-case-right-container'
        );
        expect(rightContainer.childNodes.length).toBe(1);
        expect(rightContainer.children[0].tagName.toLowerCase()).toBe('h3');
        expect(rightContainer.children[0].textContent).toBe(
            'This is a text failure message'
        );
        let expectedClasses = [
            'm-auto',
            'text-red-500',
            'transition-opacity',
            'duration-500',
            'ease-in-out',
            'opacity-0',
        ];
        expectedClasses.map((item) => {
            expect(
                rightContainer.children[0].classList.contains(item)
            ).toBeTruthy();
        });
    });

    afterEach(function () {
        let mainContainer = document.getElementById('test-case-main-container');
        mainContainer.remove();

        jest.clearAllMocks();
    });
});

describe('Test class PageHeadElements', function () {
    it('Class has the required properties', function () {
        let testOutput = new RenderTS.PageHeadElements(
            { name: 'Test Name', content: 'Test Content' },
            'Test Title'
        );
        expect(testOutput.hasOwnProperty('metaTag')).toBeTruthy();
        expect(testOutput.hasOwnProperty('title')).toBeTruthy();
    });

    it('Class adds the required head elements', function () {
        new RenderTS.PageHeadElements(
            { name: 'Test Name', content: 'Test Content' },
            'Test Title'
        );

        expect(document.head.querySelector('meta')).not.toBeNull();
        expect(document.head.querySelector('meta').getAttribute('name')).toBe(
            'Test Name'
        );
        expect(
            document.head.querySelector('meta').getAttribute('content')
        ).toBe('Test Content');
        expect(document.head.querySelector('title')).not.toBeNull();
        expect(document.head.querySelector('title').textContent).toBe(
            'Test Title'
        );
    });

    afterEach(function () {
        document.head.innerHTML = '';
    });
});
