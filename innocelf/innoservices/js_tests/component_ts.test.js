'use strict';
import * as ComponentsTS from '../static/innoservices/js/components_ts.js';

describe('Test class HeadingOrParagraph', function () {
    it('Class has required properties', function () {
        expect(typeof ComponentsTS.HeadingOrParagraph).toBe('function');
        let testOutput = new ComponentsTS.HeadingOrParagraph('h1', 'Test Text');
        expect(testOutput.hasOwnProperty('tag')).toBeTruthy();
        expect(testOutput.hasOwnProperty('textContent')).toBeTruthy();
        expect(testOutput.hasOwnProperty('headingClassDefs')).toBeTruthy();
        expect(testOutput.hasOwnProperty('result')).toBeTruthy();
    });

    it('Class returns result that is a HTML element', function () {
        let testOutput = new ComponentsTS.HeadingOrParagraph('h1', 'Test Text')
            .result;
        expect(testOutput).not.toBeNull();
        expect(testOutput.tagName.toLowerCase()).toBe('h1');
        expect(testOutput.textContent).toBe('Test Text');
    });

    it('Class returns result with the appropriate HTML classes', function () {
        let headingClassDefs = {
            h1: {
                class: [
                    'text-3xl',
                    'font-bold',
                    'lato-bold',
                    'sm:text-4xl',
                    'lg:text-5xl',
                    '2xl:text-6xl',
                ],
            },
            h2: {
                class: [
                    'text-2xl',
                    'font-bold',
                    'lato-bold',
                    'sm:text-3xl',
                    'lg:text-4xl',
                    '2xl:text-5xl',
                ],
            },
            h3: {
                class: [
                    'text-xl',
                    'font-bold',
                    'lato-bold',
                    'sm:text-xl',
                    'lg:text-2xl',
                    '2xl:text-3xl',
                ],
            },
            h4: {
                class: [
                    'text-lg',
                    'font-bold',
                    'lato-bold',
                    'sm:text-xl',
                    'lg:text-2xl',
                    '2xl:text-3xl',
                ],
            },
            h5: {
                class: [
                    'text-base',
                    'font-semibold',
                    'lato-semibold',
                    'sm:text-lg',
                    'lg:text-xl',
                    '2xl:text-2xl',
                ],
            },
            h6: {
                class: [
                    'text-sm',
                    'font-semibold',
                    'lato-semibold',
                    'sm:text-base',
                    'lg:text-lg',
                    '2xl:text-xl',
                ],
            },
            p: {
                class: [
                    'text-sm',
                    'font-medium',
                    'lato-regular',
                    'sm:text-base',
                    'lg:text-lg',
                    '2xl:text-lg',
                ],
            },
        };

        Object.keys(headingClassDefs).map((item) => {
            let testOutput = new ComponentsTS.HeadingOrParagraph(
                item,
                'Test Text'
            ).result;
            expect([...testOutput.classList]).toStrictEqual(
                headingClassDefs[item]['class']
            );
        });
    });

    it('The method renderWithClass returns the right output', function () {
        let testOutput = new ComponentsTS.HeadingOrParagraph(
            'h1',
            'Test Text'
        ).renderWithClass(['text-center', 'text-black']).result;

        expect(testOutput.classList.contains('text-center')).toBeTruthy();
        expect(testOutput.classList.contains('text-black')).toBeTruthy();
    });

    it('The method renderGradientText returns the right output', function () {
        let testOutput = new ComponentsTS.HeadingOrParagraph(
            'h1',
            'Test Text'
        ).renderGradientText().result;

        expect(testOutput).not.toBeNull();
        expect(testOutput.textContent).toBe('Test Text');
        expect(testOutput.tagName.toLowerCase()).toBe('h1');
        let expectedClasses = [
            'mt-12',
            'mb-6',
            'h-16',
            'lato-bold',
            'text-center',
            'text-transparent',
            'text-2xl',
            'bg-clip-text',
            'bg-gradient-to-r',
            'from-black',
            'to-gray-400',
            'sm:text-2xl',
            'md:text-2xl',
            'lg:text-3xl',
            'xl:text-4xl',
            // '2xl:my-24',
            '2xl:text-5xl',
        ];
        expectedClasses.map((item) => {
            expect(testOutput.classList.contains(item)).toBeTruthy();
        });
    });
});

describe('Test function _importSVG', function () {
    beforeEach(function () {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                text: () => Promise.resolve('Sample svg text'),
            })
        );
    });

    it('Function returns not null promise', function () {
        let testOutput = ComponentsTS._importSVG('/test');
        expect(testOutput).not.toBeNull();
    });

    it('Function returns the text as passed', function () {
        let testOutput = ComponentsTS._importSVG('/test');
        testOutput.then((data) => {
            expect(data).not.toBeNull();
            expect(data).toEqual('Sample svg text');
        });
    });

    afterEach(function () {
        jest.clearAllMocks();
    });
});

describe('Test function _parseSVG', function () {
    // Creating the svg element
    let svgElement = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
    );
    svgElement.setAttribute('height', '100');
    svgElement.setAttribute('width', '100');
    let rectElement = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'rect'
    );
    rectElement.setAttribute('x', '-0.66');
    rectElement.setAttribute('y', '-0.36');
    rectElement.setAttribute('width', '1025.32');
    rectElement.setAttribute('height', '288.72');
    svgElement.append(rectElement);

    let svgText = svgElement.outerHTML;

    it('Function returns a not null response', function () {
        let svgTag = ComponentsTS._parseSVG(svgText);
        expect(svgTag).not.toBeNull();
    });

    it('Function returns the right SVG element output', function () {
        let svgTag = ComponentsTS._parseSVG(svgText);
        expect(svgTag.tagName.toLowerCase()).toBe('svg');
        expect(svgTag.getAttribute('height')).toBe('100');
        expect(svgTag.getAttribute('width')).toBe('100');
        expect(svgTag.childNodes.length).toBe(1);
        expect(svgTag.childNodes[0].nodeName.toLowerCase()).toBe('rect');

        let rectTag = svgTag.querySelector('rect');
        expect(rectTag.getAttribute('x')).toBe('-0.66');
        expect(rectTag.getAttribute('y')).toBe('-0.36');
        expect(rectTag.getAttribute('width')).toBe('1025.32');
        expect(rectTag.getAttribute('height')).toBe('288.72');
    });
});

describe('Test class AnchorLinks', function () {
    it('Class has the required properties', function () {
        let testOutput = new ComponentsTS.AnchorLinks('Test String');
        expect(testOutput.hasOwnProperty('textContent')).toBeTruthy();
        expect(testOutput.hasOwnProperty('result')).toBeTruthy();
    });

    it('Class returns result that is an HTML element', function () {
        let testOutput = new ComponentsTS.AnchorLinks('Test String').result;
        expect(testOutput).not.toBeNull();
        expect(testOutput.tagName.toLowerCase()).toBe('a');
    });

    it('Method renderWithText outputs the right result', function () {
        let testOutput = new ComponentsTS.AnchorLinks(
            'Test String'
        ).renderWithText().result;
        expect(testOutput.textContent).toBe('Test String');
    });

    it('Method renderWithIcon outputs the right result', function () {
        let testOutput = new ComponentsTS.AnchorLinks(
            'Test String'
        ).renderWithIcon(['fas', 'fa-lines']).result;
        expect(testOutput.childNodes.length).toBe(1);
        expect(testOutput.childNodes[0].nodeName.toLowerCase()).toBe('i');

        let icon = testOutput.querySelector('i');
        expect(icon.classList.contains('fas')).toBeTruthy();
        expect(icon.classList.contains('fa-lines')).toBeTruthy();
    });

    it('Method renderNavLink outputs the right result', function () {
        let expectedClassList = [
            'block',
            'my-1',
            'cursor-pointer',
            'hover:text-gray-500',
            'sm:text-center',
            'sm:ml-2',
            'sm:mr-8',
            'lg:ml-5',
            'lg:mr-12',
            '2xl:text-lg',
            '2xl:mt-0',
            '2xl:inline-block',
        ];
        let testOutput = new ComponentsTS.AnchorLinks(
            'Test String'
        ).renderNavLink().result;
        expectedClassList.map((item) => {
            expect(testOutput.classList.contains(item)).toBeTruthy();
        });
    });

    it('Method renderNavDropdownLink outputs the right result', function () {
        let expectedClassList = [
            'flex',
            'py-1',
            'px-2',
            'rounded',
            'cursor-pointer',
            'hover:bg-gray-100',
            'sm:text-base',
            'sm:ml-0',
            'sm:mt-0',
            'sm:flex',
        ];
        let testOutput = new ComponentsTS.AnchorLinks(
            'Test String'
        ).renderNavDropdownLink().result;
        expectedClassList.map((item) => {
            expect(testOutput.classList.contains(item)).toBeTruthy();
        });
    });

    it('Method renderLargeInnocelfButton outputs the right result', function () {
        let expectedClassList = [
            'lato-regular',
            'block',
            'text-center',
            'mx-auto',
            // 'w-1/2',
            // 'mt-4',
            'py-2',
            'px-5',
            'rounded-xl',
            'shadow',
            'cursor-pointer',
            'border-2',
            'border-innoblack',
            'bg-innoblack',
            'text-white',
            'focus:ring',
            'focus:ring-innoblack',
            'focus:ring-offset-4',
            'hover:bg-gray-800',
            'text-sm',
            'md:text-lg',
            'md:py-3',
            'md:px-8',
        ];
        let testOutput = new ComponentsTS.AnchorLinks(
            'Test String'
        ).renderLargeInnocelfButton().result;
        expectedClassList.map((item) => {
            expect(testOutput.classList.contains(item)).toBeTruthy();
        });
        expect(testOutput.getAttribute('target')).toBe('_blank');
        expect(testOutput.textContent).toBe('Test String');
    });

    it('Method renderLargeHollowInnocelfButton outputs the right result', function () {
        let expectedClassList = [
            'lato-regular',
            'block',
            'text-center',
            'mx-auto',
            // 'w-1/2',
            // 'mt-4',
            'py-2',
            'px-5',
            'rounded-xl',
            'shadow',
            'cursor-pointer',
            'border-2',
            'border-innoblack',
            'focus:ring',
            'focus:ring-innoblack',
            'focus:ring-offset-4',
            'hover:bg-gray-300',
            'text-sm',
            'md:text-lg',
            'md:py-3',
            'md:px-8',
        ];
        let testOutput = new ComponentsTS.AnchorLinks(
            'Test String'
        ).renderLargeHollowInnocelfButton().result;
        expectedClassList.map((item) => {
            expect(testOutput.classList.contains(item)).toBeTruthy();
        });
        expect(testOutput.getAttribute('target')).toBe('_blank');
        expect(testOutput.textContent).toBe('Test String');
    });

    it('Method renderFooterButton outputs the right result', function () {
        let expectedClassList = [
            'bg-white',
            'text-center',
            'text-black',
            'p-2',
            'block',
            'rounded',
            'mt-3',
        ];
        let testOutput = new ComponentsTS.AnchorLinks(
            'Test String'
        ).renderFooterButton().result;
        expectedClassList.map((item) => {
            expect(testOutput.classList.contains(item)).toBeTruthy();
        });
        expect(testOutput.getAttribute('target')).toBe('_blank');
        expect(testOutput.getAttribute('type')).toBe('button');
    });

    it('Method renderLinkButton outputs the right result', function () {
        let expectedClassList = [
            'lato-regular',
            'bg-white',
            'text-gray-500',
            'p-2',
            'block',
            'rounded',
            'border',
            'border-gray-500',
            'hover:text-blue-500',
            'hover:border-blue-500',
            'focus:text-blue-700',
            'focus:border-blue-700',
        ];
        let testOutput = new ComponentsTS.AnchorLinks(
            'Test String'
        ).renderLinkButton().result;
        expectedClassList.map((item) => {
            expect(testOutput.classList.contains(item)).toBeTruthy();
        });
        expect(testOutput.getAttribute('type')).toBe('button');
    });
});

describe('Test class DropdownMenu', function () {
    let linksTextAndDestObject = {
        test_link_1: {
            link: '/test_link_dest_1',
        },
        test_link_2: {
            link: '/test_link_dest_2',
        },
    };

    it('Class has the required properties', function () {
        let testOutput = new ComponentsTS.DropdownMenu(
            'Test String',
            linksTextAndDestObject
        );

        let expectedProperties = [
            'buttonText',
            'linksTextAndDestObject',
            'mainMenu',
            'mainButton',
            'result',
        ];
        expectedProperties.map((item) => {
            expect(testOutput.hasOwnProperty(item)).toBeTruthy();
        });
    });

    it('Class returns result that is an HTML element', function () {
        let testOutput = new ComponentsTS.DropdownMenu(
            'Test String',
            linksTextAndDestObject
        ).render().result;

        expect(testOutput).not.toBeNull();
        expect(testOutput.tagName.toLowerCase()).toBe('div');
    });

    it('Verify that the class returns a dropdown menu', function () {
        let testOutput = new ComponentsTS.DropdownMenu(
            'Test String',
            linksTextAndDestObject
        ).render().result;

        // Test the classes of the main div element
        let mainDivClasses = ['relative', 'my-1', 'sm:mr-12'];
        mainDivClasses.map((item) => {
            expect(testOutput.classList.contains(item)).toBeTruthy();
        });
        expect(testOutput.childNodes.length).toBe(2);
    });

    it('Verify that the button of the dropdown menu is accurate', function () {
        let testOutput = new ComponentsTS.DropdownMenu(
            'Test String',
            linksTextAndDestObject
        ).render().result;

        // Test the button and its features
        expect(testOutput.childNodes[0].nodeName.toLowerCase()).toBe('button');

        let button = testOutput.querySelector('button');
        expect(button.textContent).toBe('Test String');
        let buttonClasses = ['hover:border-gray-500', 'focus:border-gray-500'];
        buttonClasses.map((item) => {
            expect(button.classList.contains(item)).toBeTruthy();
        });

        expect(button.childNodes.length).toBe(2);
        expect(button.childNodes[0].nodeName.toLowerCase()).toBe('#text');
        expect(button.childNodes[1].nodeName.toLowerCase()).toBe('i');
        let buttonIcon = button.querySelector('i');
        let buttonIconClasses = ['fas', 'fa-chevron-down', 'text-xs', 'ml-2'];
        buttonIconClasses.map((item) => {
            expect(buttonIcon.classList.contains(item)).toBeTruthy();
        });
    });

    it('Verify that the menu of the dropdown menu is accurate', function () {
        let testOutput = new ComponentsTS.DropdownMenu(
            'Test String',
            linksTextAndDestObject
        ).render().result;

        // Test the menu and its features
        expect(testOutput.childNodes[1].nodeName.toLowerCase()).toBe('div');

        let menu = testOutput.querySelector('div');
        let expectedClassList = [
            'absolute',
            'bg-white',
            'rounded',
            'border',
            'border-black-100',
            'shadow-md',
            'p-3',
            'right-0',
            'origin-top-right',
            'w-60',
            'hidden',
        ];
        expectedClassList.map((item) => {
            expect(menu.classList.contains(item)).toBeTruthy();
        });

        // Expect that the dropdown has two children
        expect(menu.childNodes.length).toBe(2);
        let links = menu.querySelectorAll('a');
        for (let i = 0; i < links.length; i++) {
            expect(links[i].textContent).toBe(
                'test_link_' + (i + 1).toFixed(0)
            );
            expect(links[i].href).toBe(
                'http://localhost/test_link_dest_' + (i + 1).toFixed(0)
            );
        }
    });

    it('Verify that the dropdown menu is shown when the button is clicked', function () {
        let testOutput = new ComponentsTS.DropdownMenu(
            'Test String',
            linksTextAndDestObject
        ).render().result;

        let button = testOutput.querySelector('button');
        let menu = testOutput.querySelector('div');

        expect(menu.classList.contains('hidden')).toBeTruthy();
        button.click();
        expect(menu.classList.contains('hidden')).toBeFalsy();
        button.click();
        expect(menu.classList.contains('hidden')).toBeTruthy();
        button.click();
        expect(menu.classList.contains('hidden')).toBeFalsy();
        document.dispatchEvent(new Event('click'));
        expect(menu.classList.contains('hidden')).toBeTruthy();
    });
});

describe('Test class Navbar', function () {
    beforeEach(function () {
        // Creating the svg element
        let svgElement = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'svg'
        );
        svgElement.setAttribute('height', '100');
        svgElement.setAttribute('width', '100');
        let rectElement = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'rect'
        );
        rectElement.setAttribute('x', '-0.66');
        rectElement.setAttribute('y', '-0.36');
        rectElement.setAttribute('width', '1025.32');
        rectElement.setAttribute('height', '288.72');
        svgElement.append(rectElement);

        let svgText = svgElement.outerHTML;

        global.fetch = jest.fn(() =>
            Promise.resolve({
                text: () => Promise.resolve(svgText),
            })
        );
    });

    it('Class has required properties', function () {
        let testOutput = new ComponentsTS.Navbar();

        let expectedProperties = [
            'result',
            'collapsibleContent',
            'navbarToggle',
        ];
        expectedProperties.map((item) => {
            expect(testOutput.hasOwnProperty(item)).toBeTruthy();
        });
    });

    it('Verify that the Navbar main is accurate', async function () {
        let testOutput = new ComponentsTS.Navbar().render().result;
        expect(testOutput).not.toBeNull();
        expect(testOutput.tagName.toLowerCase()).toBe('nav');

        let expectedClassList = [
            'flex',
            'flex-col',
            'py-6',
            'w-full',
            'm-auto',
            'justify-center',
            'flex-wrap',
            'lato-regular',
            'md:w-4/6',
            '2xl:flex-row',
            '2xl:flex',
            '2xl:w-9/12',
        ];
        expectedClassList.map((item) => {
            expect(testOutput.classList.contains(item)).toBeTruthy();
        });

        // Expect 3 children from the navbar
        expect(testOutput.childNodes.length).toBe(3);
    });

    it('Verify that the first child (the brand) is accurate', function () {
        let testOutput = new ComponentsTS.Navbar().render().result;
        let brand = testOutput.children[0];

        let expectedBrandClass = [
            'flex',
            'justify-center',
            'flex-shrink-0',
            'items-center',
            'w-4/6',
            'sm:w-full',
            '2xl:w-auto',
            '2xl:justify-start',
        ];
        expectedBrandClass.map((item) => {
            expect(brand.classList.contains(item)).toBeTruthy();
        });
        expect(brand.getAttribute('href')).toBe('/');
    });

    it('Verify that the second child (collapsible content) is accurate', function () {
        let testOutput = new ComponentsTS.Navbar().render().result;
        let collapsibleContent = testOutput.children[1];

        let expectedClasses = [
            'flex',
            'flex-col',
            'text-right',
            'pr-5',
            'hidden',
            'bg-gray-200',
            'sm:flex',
            'sm:flex-row',
            'sm:justify-center',
            'sm:mt-5',
            'sm:bg-white',
            'sm:pr-0',
            '2xl:justify-end',
            '2xl:w-auto',
            '2xl:items-center',
            '2xl:ml-auto',
            '2xl:mt-0',
        ];
        expectedClasses.map((item) => {
            expect(collapsibleContent.classList.contains(item)).toBeTruthy();
        });

        expect(collapsibleContent.childNodes.length).toBe(5);
    });

    it('Verify that the dropdown in collapsible content is accurate', function () {
        let testOutput = new ComponentsTS.Navbar().render().result;
        let collapsibleContent = testOutput.children[1];

        expect(collapsibleContent.children[0].tagName.toLowerCase()).toBe(
            'div'
        );
        let dropdownMenu = collapsibleContent.children[0];
        expect(dropdownMenu.children.length).toBe(2);
        expect(dropdownMenu.children[0].tagName.toLowerCase()).toBe('button');
        expect(dropdownMenu.children[1].tagName.toLowerCase()).toBe('div');

        let button = dropdownMenu.children[0];
        expect(button.textContent).toBe('About Us');

        let menu = dropdownMenu.children[1];
        expect(menu.children.length).toBe(3);

        let expectedTextContent = [
            'Our Story',
            'Testimonials',
            'Frequently Asked Questions',
        ];
        for (let i = 0; i < expectedTextContent.length; i++) {
            expect(menu.children[i].tagName.toLowerCase()).toBe('a');
            expect(menu.children[i].textContent).toBe(expectedTextContent[i]);
        }
    });

    it('Verify that the anchor links in collapsible content are accurate', function () {
        let testOutput = new ComponentsTS.Navbar().render().result;
        let collapsibleContent = testOutput.children[1];

        let allChildren = collapsibleContent.children;
        let otherChildren = Array.from(allChildren).slice(1);
        otherChildren.map((item) => {
            expect(item.tagName.toLowerCase()).toBe('a');
        });

        let expectedTextInAnchors = [
            'Services',
            'Our Process',
            'Blog',
            'Contact Us',
        ];
        for (let i = 0; i < otherChildren.length; i++) {
            expect(otherChildren[i].textContent).toBe(expectedTextInAnchors[i]);
        }
    });

    it('Verify that the navbar toggle is accurate', function () {
        let testOutput = new ComponentsTS.Navbar().render().result;
        let navbarToggle = testOutput.children[2];

        expect(navbarToggle.tagName.toLowerCase()).toBe('button');

        let expectedClasses = [
            'px-3',
            'py-1',
            'rounded',
            'border',
            'border-black',
            'cursor-pointer',
            'absolute',
            'self-end',
            'mr-5',
            'top-10',
            'sm:hidden',
        ];
        expectedClasses.map((item) => {
            expect(navbarToggle.classList.contains(item)).toBeTruthy();
        });

        let icon = navbarToggle.children[0];
        expect(icon.tagName.toLowerCase()).toBe('i');

        let expectedIconClasses = ['fas', 'fa-bars'];
        expectedIconClasses.map((item) => {
            expect(icon.classList.contains(item)).toBeTruthy();
        });
    });

    it('Verify that the navbar toggle clicks works as expected', function () {
        let testOutput = new ComponentsTS.Navbar().render().result;
        let collapsibleContent = testOutput.children[1];
        let navbarToggle = testOutput.children[2];

        expect(collapsibleContent.classList.contains('hidden')).toBeTruthy();
        navbarToggle.dispatchEvent(new Event('click'));
        expect(collapsibleContent.classList.contains('hidden')).toBeFalsy();
        navbarToggle.dispatchEvent(new Event('click'));
        expect(collapsibleContent.classList.contains('hidden')).toBeTruthy();
    });

    afterEach(function () {
        jest.clearAllMocks();
    });
});

describe('Test class DynamicTypedHeading', function () {
    it('Class has the required properties', function () {
        let testOutput = new ComponentsTS.DynamicTypedHeading();

        let desiredProperties = [
            'stringsArray',
            'dynamicTypedContent',
            'dynamicTypedCursor',
            'result',
        ];
        desiredProperties.map((item) => {
            expect(testOutput.hasOwnProperty(item)).toBeTruthy();
        });
    });

    it('Class outputs an HTML element and not null', function () {
        let testOutput = new ComponentsTS.DynamicTypedHeading().render().result;

        expect(testOutput).not.toBeNull();
        expect(testOutput.tagName.toLowerCase()).toBe('h1');
        expect(testOutput.children.length).toBe(2);
    });

    it('Class outputs an HTML element with the right classes', function () {
        let testOutput = new ComponentsTS.DynamicTypedHeading().render().result;

        let expectedClasses = [
            'mt-12',
            'mb-6',
            'h-16',
            'text-center',
            'text-transparent',
            'text-xl',
            'bg-clip-text',
            'bg-gradient-to-r',
            'from-black',
            'to-gray-400',
            'sm:text-2xl',
            'md:text-2xl',
            'lg:text-3xl',
            'xl:text-4xl',
            '2xl:my-24',
            '2xl:text-5xl',
        ];
        expectedClasses.map((item) => {
            expect(testOutput.classList.contains(item)).toBeTruthy();
        });
    });

    it('First child of output is accurate', function () {
        let testOutput = new ComponentsTS.DynamicTypedHeading().render().result;
        expect(testOutput.children[0].tagName.toLowerCase()).toBe('span');
    });

    it('Second child of output is accurate', function () {
        let testOutput = new ComponentsTS.DynamicTypedHeading().render().result;
        expect(testOutput.children[1].tagName.toLowerCase()).toBe('span');
        expect(testOutput.children[1].textContent).toBe('|');
    });
});

describe('Test class FirstPageListItem', function () {
    it('Class has required properties', function () {
        expect(typeof ComponentsTS.FirstPageListItem).toBe('function');

        let testOutput = new ComponentsTS.FirstPageListItem('Test String');
        expect(testOutput).not.toBeNull();
        expect(testOutput.hasOwnProperty('result')).toBeTruthy();
        expect(testOutput.hasOwnProperty('listText')).toBeTruthy();
    });

    it('Class method render returns the right output', function () {
        let testOutput = new ComponentsTS.FirstPageListItem(
            'Test String'
        ).render().result;
        expect(testOutput).not.toBeNull();
        expect(testOutput.childNodes.length).toBe(2);
        expect(testOutput.tagName.toLowerCase()).toBe('div');
        let expectedClassList = ['flex', 'items-center', 'my-2'];

        expectedClassList.map((item) => {
            expect(testOutput.classList.contains(item)).toBeTruthy();
        });
    });

    it('First child of the output is accurate', function () {
        let testOutput = new ComponentsTS.FirstPageListItem(
            'Test String'
        ).render().result;

        let firstChild = testOutput.children[0];
        expect(firstChild.tagName.toLowerCase()).toBe('i');
        let expectedClassList = [
            'far',
            'fa-check-circle',
            'mr-3',
            'text-xl',
            'sm:text-xl',
            'lg:text-2xl',
            '2xl:text-3xl',
        ];

        expectedClassList.map((item) => {
            expect(firstChild.classList.contains(item)).toBeTruthy();
        });
    });

    it('Second child of the output is accurate', function () {
        let testOutput = new ComponentsTS.FirstPageListItem(
            'Test String'
        ).render().result;

        let secondChild = testOutput.children[1];
        expect(secondChild.tagName.toLowerCase()).toBe('h3');
        let expectedClassList = [
            'text-xl',
            'font-bold',
            'sm:text-xl',
            'lg:text-2xl',
            '2xl:text-3xl',
        ];

        expectedClassList.map((item) => {
            expect(secondChild.classList.contains(item)).toBeTruthy();
        });
        expect(secondChild.textContent).toBe('Test String');
    });
});

describe('Test class Testimonial', function () {
    it('Class has required properties', function () {
        let testOutput = new ComponentsTS.Testimonial(
            'Test Person Name',
            'Test Review'
        );
        expect(testOutput).not.toBeNull();
        let expectedProperties = [
            'result',
            'paragraph',
            'review',
            'personName',
            'personNameHeading',
        ];
        expectedProperties.map((item) => {
            expect(testOutput.hasOwnProperty(item)).toBeTruthy();
        });
    });

    it('Class method renderHomepageReview returns the right output', function () {
        let testOutput = new ComponentsTS.Testimonial(
            'Test Person Name',
            'Test Review'
        ).renderHomepageReview().result;

        expect(testOutput).not.toBeNull();
        expect(testOutput.tagName.toLowerCase()).toBe('div');
        expect(testOutput.childNodes.length).toBe(3);
        expect(testOutput.children[0].tagName.toLowerCase()).toBe('p');
        expect(testOutput.children[1].tagName.toLowerCase()).toBe('hr');
        expect(testOutput.children[2].tagName.toLowerCase()).toBe('h5');
    });

    it('Verify that the first child is accurate renderHomepageReview', function () {
        let testOutput = new ComponentsTS.Testimonial(
            'Test Person Name',
            'Test Review'
        ).renderHomepageReview().result;

        let paragraph = testOutput.children[0];
        expect(paragraph.childNodes.length).toBe(3);
        expect(paragraph.children[0].tagName.toLowerCase()).toBe('i');
        expect(paragraph.children[1].tagName.toLowerCase()).toBe('span');
        expect(paragraph.children[2].tagName.toLowerCase()).toBe('i');

        // Verify the classes of the first icon
        let expectedIconList1 = ['fas', 'fa-quote-left', 'fa-sm', 'mr-3'];
        expectedIconList1.map((item) => {
            expect(paragraph.children[0].classList.contains(item)).toBeTruthy();
        });

        // Verify the classes of the span element
        let expectedSpanClass = [
            'text-xs',
            'sm:text-sm',
            'lg:text-base',
            '2xl:text-base',
        ];
        expectedSpanClass.map((item) => {
            expect(paragraph.children[1].classList.contains(item)).toBeTruthy();
        });
        expect(paragraph.children[1].textContent).toBe('Test Review');

        // Verify the classes of the second icon
        let expectedIconList2 = ['fas', 'fa-quote-right', 'fa-sm', 'ml-3'];
        expectedIconList2.map((item) => {
            expect(paragraph.children[2].classList.contains(item)).toBeTruthy();
        });
    });

    it('Verify that the second child is accurate renderHomepageReview', function () {
        let testOutput = new ComponentsTS.Testimonial(
            'Test Person Name',
            'Test Review'
        ).renderHomepageReview().result;
        let expectedClassList = [
            'mt-4',
            'mb-2',
            'w-1/2',
            'hr-bold',
            'hr-light',
            'mx-auto',
        ];
        expectedClassList.map((item) => {
            expect(
                testOutput.children[1].classList.contains(item)
            ).toBeTruthy();
        });
    });

    it('Verify that the third child is accurate renderHomepageReview', function () {
        let testOutput = new ComponentsTS.Testimonial(
            'Test Person Name',
            'Test Review'
        ).renderHomepageReview().result;
        let expectedClassList = [
            'text-base',
            'font-semibold',
            'lato-semibold',
            'sm:text-lg',
            'lg:text-xl',
            '2xl:text-2xl',
            'text-center',
        ];
        expectedClassList.map((item) => {
            expect(
                testOutput.children[2].classList.contains(item)
            ).toBeTruthy();
        });
        expect(testOutput.children[2].textContent).toBe('Test Person Name');
    });

    it('Class method renderTestimonialPageReview returns the right output', function () {
        let testOutput = new ComponentsTS.Testimonial(
            'Test Person Name',
            'Test Review'
        ).renderTestimonialPageReview('Test 2021').result;

        expect(testOutput).not.toBeNull();
        expect(testOutput.tagName.toLowerCase()).toBe('div');
        expect(testOutput.childNodes.length).toBe(4);
        expect(testOutput.children[0].tagName.toLowerCase()).toBe('p');
        expect(testOutput.children[1].tagName.toLowerCase()).toBe('hr');
        expect(testOutput.children[2].tagName.toLowerCase()).toBe('h5');
        expect(testOutput.children[3].tagName.toLowerCase()).toBe('div');
        let expectedClasses = [
            'transition-opacity',
            'duration-2000',
            'delay-200',
            'ease-in-out',
            'opacity-0',
        ];
        expectedClasses.map((item) => {
            expect(testOutput.classList.contains(item)).toBeTruthy();
        });
    });

    it('Verify that the first child is accurate renderTestimonialPageReview', function () {
        let testOutput = new ComponentsTS.Testimonial(
            'Test Person Name',
            'Test Review'
        ).renderTestimonialPageReview('Test 2021').result;

        let paragraph = testOutput.children[0];
        expect(paragraph.childNodes.length).toBe(3);
        expect(paragraph.children[0].tagName.toLowerCase()).toBe('i');
        expect(paragraph.children[1].tagName.toLowerCase()).toBe('span');
        expect(paragraph.children[2].tagName.toLowerCase()).toBe('i');

        // Verify the classes of the first icon
        let expectedIconList1 = ['fas', 'fa-quote-left', 'fa-sm', 'mr-3'];
        expectedIconList1.map((item) => {
            expect(paragraph.children[0].classList.contains(item)).toBeTruthy();
        });

        // Verify the classes of the span element
        let expectedSpanClass = [
            'text-xs',
            'sm:text-sm',
            'lg:text-base',
            '2xl:text-base',
        ];
        expectedSpanClass.map((item) => {
            expect(paragraph.children[1].classList.contains(item)).toBeTruthy();
        });
        expect(paragraph.children[1].textContent).toBe('Test Review');

        // Verify the classes of the second icon
        let expectedIconList2 = ['fas', 'fa-quote-right', 'fa-sm', 'ml-3'];
        expectedIconList2.map((item) => {
            expect(paragraph.children[2].classList.contains(item)).toBeTruthy();
        });
    });

    it('Verify that the second child is accurate renderTestimonialPageReview', function () {
        let testOutput = new ComponentsTS.Testimonial(
            'Test Person Name',
            'Test Review'
        ).renderTestimonialPageReview('Test 2021').result;
        let expectedClassList = [
            'mt-4',
            'mb-2',
            'w-1/2',
            'hr-bold',
            'hr-light',
            'mx-auto',
        ];
        expectedClassList.map((item) => {
            expect(
                testOutput.children[1].classList.contains(item)
            ).toBeTruthy();
        });
    });

    it('Verify that the third child is accurate renderTestimonialPageReview', function () {
        let testOutput = new ComponentsTS.Testimonial(
            'Test Person Name',
            'Test Review'
        ).renderTestimonialPageReview('Test 2021').result;
        let expectedClassList = [
            'text-base',
            'font-semibold',
            'lato-semibold',
            'sm:text-lg',
            'lg:text-xl',
            '2xl:text-2xl',
            'text-center',
        ];
        expectedClassList.map((item) => {
            expect(
                testOutput.children[2].classList.contains(item)
            ).toBeTruthy();
        });
        expect(testOutput.children[2].textContent).toBe('Test Person Name');
    });

    it('Verify that the fourth child is accurate renderTestimonialPageReview', function () {
        let testOutput = new ComponentsTS.Testimonial(
            'Test Person Name',
            'Test Review'
        ).renderTestimonialPageReview('Test 2021').result;
        let expectedClassList = ['justify-center', 'text-center', '-mt-2'];
        expectedClassList.map((item) => {
            expect(
                testOutput.children[3].classList.contains(item)
            ).toBeTruthy();
        });
        expect(testOutput.children[3].childNodes.length).toBe(1);
        expect(testOutput.children[3].children[0].tagName.toLowerCase()).toBe(
            'span'
        );
        expect(testOutput.children[3].children[0].textContent).toBe(
            'Test 2021'
        );
        expect(
            testOutput.children[3].children[0].classList.contains('text-xs')
        ).toBeTruthy();
        expect(
            testOutput.children[3].children[0].classList.contains('lato-light')
        ).toBeTruthy();
    });

    it('Class method renderAboutUsReview returns the right output', function () {
        let testOutput = new ComponentsTS.Testimonial(
            'Test Person Name',
            'Test Review'
        ).renderAboutUsReview().result;

        expect(testOutput).not.toBeNull();
        expect(testOutput.tagName.toLowerCase()).toBe('div');
        expect(testOutput.childNodes.length).toBe(3);
        expect(testOutput.children[0].tagName.toLowerCase()).toBe('p');
        expect(testOutput.children[1].tagName.toLowerCase()).toBe('hr');
        expect(testOutput.children[2].tagName.toLowerCase()).toBe('h5');
        let expectedClasses = ['my-auto'];
        expectedClasses.map((item) => {
            expect(testOutput.classList.contains(item)).toBeTruthy();
        });
    });

    it('Verify that the first child is accurate renderAboutUsReview', function () {
        let testOutput = new ComponentsTS.Testimonial(
            'Test Person Name',
            'Test Review'
        ).renderAboutUsReview().result;

        let paragraph = testOutput.children[0];
        expect(paragraph.childNodes.length).toBe(3);
        expect(paragraph.children[0].tagName.toLowerCase()).toBe('i');
        expect(paragraph.children[1].tagName.toLowerCase()).toBe('span');
        expect(paragraph.children[2].tagName.toLowerCase()).toBe('i');

        // Verify the classes of the first icon
        let expectedIconList1 = ['fas', 'fa-quote-left', 'fa-sm', 'mr-3'];
        expectedIconList1.map((item) => {
            expect(paragraph.children[0].classList.contains(item)).toBeTruthy();
        });

        // Verify the classes of the span element
        expect(paragraph.children[1].className).toBe('');
        expect(paragraph.children[1].textContent).toBe('Test Review');

        // Verify the classes of the second icon
        let expectedIconList2 = ['fas', 'fa-quote-right', 'fa-sm', 'ml-3'];
        expectedIconList2.map((item) => {
            expect(paragraph.children[2].classList.contains(item)).toBeTruthy();
        });
    });

    it('Verify that the second child is accurate renderAboutUsReview', function () {
        let testOutput = new ComponentsTS.Testimonial(
            'Test Person Name',
            'Test Review'
        ).renderAboutUsReview().result;
        let expectedClassList = [
            'mt-4',
            'mb-2',
            'w-1/2',
            'hr-bold',
            'hr-light',
            'mx-auto',
        ];
        expectedClassList.map((item) => {
            expect(
                testOutput.children[1].classList.contains(item)
            ).toBeTruthy();
        });
    });

    it('Verify that the third child is accurate renderAboutUsReview', function () {
        let testOutput = new ComponentsTS.Testimonial(
            'Test Person Name',
            'Test Review'
        ).renderAboutUsReview().result;
        let expectedClassList = [
            'text-base',
            'font-semibold',
            'lato-semibold',
            'sm:text-lg',
            'lg:text-xl',
            '2xl:text-2xl',
            'text-center',
        ];
        expectedClassList.map((item) => {
            expect(
                testOutput.children[2].classList.contains(item)
            ).toBeTruthy();
        });
        expect(testOutput.children[2].textContent).toBe('Test Person Name');
    });
});

describe('Test class Footer', function () {
    it('Class has required properties', function () {
        let testOutput = new ComponentsTS.Footer();
        expect(testOutput).not.toBeNull();
        expect(testOutput.hasOwnProperty('result')).toBeTruthy();
        expect(testOutput.hasOwnProperty('_quickLinksObject')).toBeTruthy();
        expect(testOutput.hasOwnProperty('_expertiseList')).toBeTruthy();
    });

    it('Class method render returns the right output', function () {
        let testOutput = new ComponentsTS.Footer().render().result;

        expect(testOutput).not.toBeNull();
        expect(testOutput.tagName.toLowerCase()).toBe('footer');
        let expectedClassList = [
            'flex',
            'bg-innoblack',
            'lato-regular',
            'text-white',
            'pt-5',
        ];
        expectedClassList.map((item) => {
            expect(testOutput.classList.contains(item)).toBeTruthy();
        });
        expect(testOutput.childNodes.length).toBe(2);
    });

    it('The container in the footer is accurate', function () {
        let testOutput = new ComponentsTS.Footer().render().result;

        let container = testOutput.children[0];
        expect(container).not.toBeNull();

        let expectedContainerClassList = [
            'container',
            'w-2/3',
            'mx-auto',
            'my-5',
            'md:w-full',
            'lg:w-11/12',
            '2xl:w-2/3',
        ];
        expectedContainerClassList.map((item) => {
            expect(container.classList.contains(item)).toBeTruthy();
        });

        expect(container.childNodes.length).toBe(1);
    });

    it('The grid in the container of the footer is accurate', function () {
        let testOutput = new ComponentsTS.Footer().render().result;
        let grid = testOutput.children[0].children[0];
        expect(grid).not.toBeNull();

        let expectedClasses = [
            'grid',
            'grid-cols-1',
            'md:grid-cols-3',
            'md:gap-2',
            'lg:gap-4',
        ];
        expectedClasses.map((item) => {
            expect(grid.classList.contains(item)).toBeTruthy();
        });

        expect(grid.childNodes.length).toBe(3);
    });

    it('The first column of the grid is accurate', function () {
        let testOutput = new ComponentsTS.Footer().render().result;
        let column = testOutput.children[0].children[0].children[0];

        expect(column).not.toBeNull();
        expect(column.childNodes.length).toBe(3);

        // Child 1 of the column is accurate
        expect(column.children[0].tagName.toLowerCase()).toBe('h5');
        expect(column.children[0].textContent).toBe('Innocelf, LLC');
        let child1Class = [
            'text-base',
            'font-semibold',
            'lato-semibold',
            'sm:text-lg',
            'lg:text-xl',
            '2xl:text-2xl',
            'uppercase',
        ];
        child1Class.map((item) => {
            expect(column.children[0].classList.contains(item)).toBeTruthy();
        });

        // Child 2 of the column is accurate
        expect(column.children[1].tagName.toLowerCase()).toBe('hr');
        let child2Class = [
            'w-40',
            'mb-4',
            'mt-3',
            'inline-block',
            'mx-auto',
            'border',
            'border-purple-800',
        ];
        child2Class.map((item) => {
            expect(column.children[1].classList.contains(item)).toBeTruthy();
        });

        // Child 3 of the column is accurate
        expect(column.children[2].tagName.toLowerCase()).toBe('p');
        let child3Class = [
            'text-sm',
            'font-medium',
            'lato-regular',
            'lg:text-base',
        ];
        child3Class.map((item) => {
            expect(column.children[2].classList.contains(item)).toBeTruthy();
        });
        expect(column.children[2].textContent).toContain(
            `Innocelf, LLC is a patent search firm in Michigan, USA, that offers
            the highest quality patent searches and
            analytics services to protect your invention at a resonable price.
            Schedule a free consultation with us today
            to get started on your patent journey.`
        );
    });

    it('The second column of the grid is accurate', function () {
        let testOutput = new ComponentsTS.Footer().render().result;
        let column = testOutput.children[0].children[0].children[1];

        expect(column).not.toBeNull();
        expect(column.childNodes.length).toBe(3);

        // Child 1 of the column is accurate
        expect(column.children[0].tagName.toLowerCase()).toBe('h5');
        expect(column.children[0].textContent).toBe('Links');
        let child1Class = [
            'text-base',
            'font-semibold',
            'lato-semibold',
            'sm:text-lg',
            'lg:text-xl',
            '2xl:text-2xl',
            'uppercase',
        ];
        child1Class.map((item) => {
            expect(column.children[0].classList.contains(item)).toBeTruthy();
        });

        // Child 2 of the column is accurate
        expect(column.children[1].tagName.toLowerCase()).toBe('hr');
        let child2Class = [
            'w-40',
            'mb-4',
            'mt-3',
            'inline-block',
            'mx-auto',
            'border',
            'border-purple-800',
        ];
        child2Class.map((item) => {
            expect(column.children[1].classList.contains(item)).toBeTruthy();
        });

        // Child 3 of the column is accurate
        expect(column.children[2].tagName.toLowerCase()).toBe('ul');

        let expectedTextContent = [
            'Home',
            'Services',
            'About',
            'Our Process',
            'Testimonials',
            'Frequently Asked Questions',
            'Blog',
        ];
        expectedTextContent.map((item) => {
            expect(column.children[2].textContent).toContain(item);
        });
        expect(column.children[2].childNodes.length).toBe(
            expectedTextContent.length
        );
    });

    it('The third column of the grid is accurate', function () {
        let testOutput = new ComponentsTS.Footer().render().result;
        let column = testOutput.children[0].children[0].children[2];

        expect(column).not.toBeNull();
        expect(column.childNodes.length).toBe(6);

        // Child 1 of the column is accurate
        expect(column.children[0].tagName.toLowerCase()).toBe('h5');
        expect(column.children[0].textContent).toBe('Contact');
        let child1Class = [
            'text-base',
            'font-semibold',
            'lato-semibold',
            'sm:text-lg',
            'lg:text-xl',
            '2xl:text-2xl',
            'uppercase',
        ];
        child1Class.map((item) => {
            expect(column.children[0].classList.contains(item)).toBeTruthy();
        });

        // Child 2 of the column is accurate
        expect(column.children[1].tagName.toLowerCase()).toBe('hr');
        let child2Class = [
            'w-40',
            'mb-4',
            'mt-3',
            'inline-block',
            'mx-auto',
            'border',
            'border-purple-800',
        ];
        child2Class.map((item) => {
            expect(column.children[1].classList.contains(item)).toBeTruthy();
        });

        // Child 3 of the column is accurate
        expect(column.children[2].tagName.toLowerCase()).toBe('a');
        let child3Class = [
            'bg-white',
            'text-center',
            'text-black',
            'p-2',
            'block',
            'rounded',
            'mt-3',
        ];
        child3Class.map((item) => {
            expect(column.children[2].classList.contains(item)).toBeTruthy();
        });
        expect(column.children[2].getAttribute('target')).toBe('_blank');
        expect(column.children[2].getAttribute('href')).toBe(
            'https://calendly.com/innocelf/virtual-appointment'
        );

        // Child 4 of the column is accurate
        expect(column.children[3].tagName.toLowerCase()).toBe('p');
        let child4Class = [
            'text-sm',
            'font-medium',
            'lato-regular',
            'sm:text-base',
            'lg:text-lg',
            '2xl:text-lg',
        ];
        child4Class.map((item) => {
            expect(column.children[3].classList.contains(item)).toBeTruthy();
        });

        // Child 5 of the column is accurate
        expect(column.children[4].tagName.toLowerCase()).toBe('a');
        let child5Class = [
            'bg-white',
            'text-center',
            'text-black',
            'p-2',
            'block',
            'rounded',
            'mt-3',
        ];
        child5Class.map((item) => {
            expect(column.children[4].classList.contains(item)).toBeTruthy();
        });
        expect(column.children[4].getAttribute('target')).toBe('_blank');
        expect(column.children[4].getAttribute('href')).toBe('/contact-us');

        // Child 6 of the column is accurate
        expect(column.children[5].tagName.toLowerCase()).toBe('p');
        let child6Class = [
            'text-sm',
            'font-medium',
            'lato-regular',
            'sm:text-base',
            'lg:text-lg',
            '2xl:text-lg',
            'mt-4',
        ];
        child6Class.map((item) => {
            expect(column.children[5].classList.contains(item)).toBeTruthy();
        });
    });

    it('Assert that the social media section is accurate', function () {
        let testOutput = new ComponentsTS.Footer().render().result;
        let column = testOutput.children[0].children[0].children[2];
        let socialMedia = column.children[5];

        expect(socialMedia).not.toBeNull();
        expect(socialMedia.childNodes.length).toBe(1);

        // The first child of the paragraph is a grid
        expect(socialMedia.children[0].tagName.toLowerCase()).toBe('div');
        let gridClassList = ['grid', 'grid-cols-6', 'gap-2'];
        gridClassList.map((item) => {
            expect(
                socialMedia.children[0].classList.contains(item)
            ).toBeTruthy();
        });

        let linkedin = socialMedia.children[0].children[0];

        // Assert that the linkedin aspects are accurate
        let linkedinClassList = [
            'fab',
            'fa-linkedin-in',
            'fa-lg',
            'white-text',
            'mr-4',
        ];
        expect(linkedin.tagName.toLowerCase()).toBe('a');
        expect(linkedin.getAttribute('target')).toBe('_blank');
        expect(linkedin.getAttribute('href')).toBe(
            'https://www.linkedin.com/company/innocelf-llc'
        );
        linkedinClassList.map((item) => {
            expect(linkedin.children[0].classList.contains(item)).toBeTruthy();
        });
    });

    it('Assert that the copyright and terms section is accurate', function () {
        let testOutput = new ComponentsTS.Footer().render().result;
        let copyrightSection = testOutput.children[1];

        expect(copyrightSection.tagName.toLowerCase()).toBe('div');
        expect(copyrightSection.childNodes.length).toBe(2);
        let copyRightClasses = [
            'flex',
            'flex-col',
            'gap-2',
            'py-3',
            'bg-black',
            'justify-center',
            'md:flex-row',
            'md:gap-12',
            'md:py-1',
        ];
        copyRightClasses.map((item) => {
            expect(copyrightSection.classList.contains(item)).toBeTruthy();
        });
    });

    it('Assert that the copyright section is accurate', function () {
        let testOutput = new ComponentsTS.Footer().render().result;
        let copyrightSection = testOutput.children[1].children[0];

        expect(copyrightSection.tagName.toLowerCase()).toBe('div');
        expect(copyrightSection.childNodes.length).toBe(1);
        let copyrightClasses = ['bg-black', 'justify-center', 'text-center'];
        copyrightClasses.map((item) => {
            expect(copyrightSection.classList.contains(item)).toBeTruthy();
        });

        let paragraph = copyrightSection.children[0];
        let paraClasses = [
            'text-sm',
            'font-medium',
            'lato-regular',
            'lg:text-base',
        ];
        paraClasses.map((item) => {
            expect(paragraph.classList.contains(item)).toBeTruthy();
        });
        expect(paragraph.textContent).toBe(
            '© 2020-2021 Copyright: Innocelf, LLC. All Rights Reserved'
        );
    });

    it('Assert that the privacy section is accurate', function () {
        let testOutput = new ComponentsTS.Footer().render().result;
        let privacySection = testOutput.children[1].children[1];

        expect(privacySection.tagName.toLowerCase()).toBe('div');
        expect(privacySection.childNodes.length).toBe(1);
        let privacyClasses = ['bg-black', 'justify-center'];
        privacyClasses.map((item) => {
            expect(privacySection.classList.contains(item)).toBeTruthy();
        });

        let grid = privacySection.children[0];
        let gridClasses = [
            'grid',
            'grid-cols-3',
            'text-center',
            'gap-1',
            'mx-auto',
            // 'mt-3',
            'md:grid-rows-none',
            'md:grid-cols-3',
            'md:gap-4',
            // 'md:w-2/3',
            // 'lg:w-2/5',
            // '2xl:w-1/3',
        ];
        gridClasses.map((item) => {
            expect(grid.classList.contains(item)).toBeTruthy();
        });
        expect(grid.childNodes.length).toBe(3);

        for (let i = 0; i < grid.childNodes.length; i++) {
            expect(grid.children[i].tagName.toLowerCase()).toBe('a');
        }

        // Anchor links of grid
        let policy = grid.children[0];
        expect(policy.textContent).toBe('Privacy Policy');
        expect(policy.getAttribute('href')).toBe('/privacy-policy/');

        let terms = grid.children[1];
        expect(terms.textContent).toBe('Terms of Use');
        expect(terms.getAttribute('href')).toBe('/terms-and-conditions/');

        let disclaimer = grid.children[2];
        expect(disclaimer.textContent).toBe('Disclaimer');
        expect(disclaimer.getAttribute('href')).toBe('/disclaimer/');
    });
});

describe('Test class ServiceDescription', function () {
    it('Class has the required properties', function () {
        let testOutput = new ComponentsTS.ServiceDescription(
            'Test Heading',
            ['Test Item 1', 'Test Item 2'],
            'Test Paragraph Content',
            'Test Image Source'
        );

        expect(testOutput).not.toBeNull();
        let expectedPropertyList = [
            'result',
            'desiredHeading',
            'itemsList',
            'paragraphContent',
            'imageSrc',
        ];
        expectedPropertyList.map((item) => {
            expect(testOutput.hasOwnProperty(item)).toBeTruthy();
        });
    });

    it('Class method render returns the right output', function () {
        let testOutput = new ComponentsTS.ServiceDescription(
            'Test Heading',
            ['Test Item 1', 'Test Item 2'],
            'Test Paragraph Content',
            'Test Image Source'
        ).render().result;

        expect(testOutput).not.toBeNull();
        expect(testOutput.tagName.toLowerCase()).toBe('div');
        expect(testOutput.classList.contains('mx-auto')).toBeTruthy();
        expect(testOutput.childNodes.length).toBe(4);
    });

    it('Class method return has the appropriate first child', function () {
        let testOutput = new ComponentsTS.ServiceDescription(
            'Test Heading',
            ['Test Item 1', 'Test Item 2'],
            'Test Paragraph Content',
            'Test Image Source'
        ).render().result;

        let child = testOutput.children[0];
        expect(child).not.toBeNull();
        expect(child.tagName.toLowerCase()).toBe('div');
        let desiredClassList = [
            'flex',
            'w-full',
            'p-4',
            'justify-center',
            'mx-auto',
            'md:w-3/4',
            'lg:w-4/6',
        ];
        desiredClassList.map((item) => {
            expect(child.classList.contains(item)).toBeTruthy();
        });
        expect(child.childNodes.length).toBe(2);

        // Image of the first child is accurate
        let image = child.children[0];
        expect(image).not.toBeNull();
        expect(image.tagName.toLowerCase()).toBe('img');
        let imageClassList = ['hidden', 'sm:inline-flex', 'sm:w-2/5'];
        imageClassList.map((item) => {
            expect(image.classList.contains(item)).toBeTruthy();
        });
        expect(image.getAttribute('src')).toBe('Test Image Source');

        // Heading of the first child is accurate
        // Image of the first child is accurate
        let heading = child.children[1];
        expect(heading).not.toBeNull();
        expect(heading.tagName.toLowerCase()).toBe('h3');
        let headingClassList = [
            'text-xl',
            'font-bold',
            'lato-bold',
            'sm:text-xl',
            'lg:text-2xl',
            '2xl:text-3xl',
            'text-center',
            'my-6',
            'w-full',
            'sm:w-1/2',
            'sm:self-center',
            'sm:ml-6',
        ];
        headingClassList.map((item) => {
            expect(heading.classList.contains(item)).toBeTruthy();
        });
        expect(heading.textContent).toBe('Test Heading');
    });

    it('Class method return has the appropriate second child', function () {
        let testOutput = new ComponentsTS.ServiceDescription(
            'Test Heading',
            ['Test Item 1', 'Test Item 2'],
            'Test Paragraph Content',
            'Test Image Source'
        ).render().result;

        let child = testOutput.children[1];
        expect(child).not.toBeNull();
        expect(child.tagName.toLowerCase()).toBe('div');
        let desiredClassList = [
            'grid',
            'gap-2',
            'grid-cols-1',
            'mx-auto',
            'w-full',
            'px-6',
            'sm:grid-cols-2',
            'md:w-5/6',
            'md:px-0',
            'lg:w-3/4',
            'xl:w-3/5',
            '2xl:w-1/2',
        ];
        desiredClassList.map((item) => {
            expect(child.classList.contains(item)).toBeTruthy();
        });
        expect(child.childNodes.length).toBe(2);

        // Unorderlist of the second child is accurate
        let list = child.children[0];
        expect(list).not.toBeNull();
        expect(list.tagName.toLowerCase()).toBe('ul');
        let unorderedClassList = [
            'leading-6',
            'lato-bold',
            'border-b-4',
            'border-black',
            'text-base',
            'list-disc',
            'list-inside',
            'pb-6',
            'sm:pb-0',
            'sm:text-lg',
            'sm:border-r-4',
            'sm:border-b-0',
            'sm:border-black',
            'sm:leading-10',
            'sm:text-center',
            'sm:self-center',
            'sm:list-none',
            'lg:text-2xl',
        ];
        unorderedClassList.map((item) => {
            expect(list.classList.contains(item)).toBeTruthy();
        });
        expect(list.childNodes.length).toBe(2);
        for (let i = 0; i < list.childNodes.length; i++) {
            expect(list.children[i].tagName.toLowerCase()).toBe('li');
            expect(list.children[i].textContent).toBe(
                'Test Item ' + (i + 1).toFixed(0)
            );
        }

        // Paragraph of the second child is accurate
        let paragraph = child.children[1];
        expect(paragraph).not.toBeNull();
        expect(paragraph.tagName.toLowerCase()).toBe('p');
        let paragraphClassList = [
            'text-sm',
            'font-medium',
            'lato-regular',
            'sm:text-base',
            'lg:text-lg',
            '2xl:text-lg',
            'm-auto',
            'leading-8',
            'text-justify',
            'mt-6',
            'sm:pl-7',
            'sm:mt-0',
        ];
        paragraphClassList.map((item) => {
            expect(paragraph.classList.contains(item)).toBeTruthy();
        });
        expect(paragraph.textContent).toBe('Test Paragraph Content');
    });

    it('Class method return has the appropriate third child', function () {
        let testOutput = new ComponentsTS.ServiceDescription(
            'Test Heading',
            ['Test Item 1', 'Test Item 2'],
            'Test Paragraph Content',
            'Test Image Source'
        ).render().result;

        let child = testOutput.children[2];
        expect(child).not.toBeNull();
        expect(child.tagName.toLowerCase()).toBe('div');
        let desiredClassList = [
            'flex-row',
            'w-1/2',
            'sm:w-1/4',
            'lg:w-1/6',
            'mx-auto',
            'mt-10',
        ];
        desiredClassList.map((item) => {
            expect(child.classList.contains(item)).toBeTruthy();
        });
        expect(child.childNodes.length).toBe(1);

        // Button of the third child is accurate
        let button = child.children[0];
        expect(button).not.toBeNull();
        expect(button.tagName.toLowerCase()).toBe('a');
        let buttonClassList = [
            'lato-regular',
            'block',
            'text-center',
            'mx-auto',
            'py-2',
            'px-5',
            'rounded-xl',
            'shadow',
            'cursor-pointer',
            'border-2',
            'border-innoblack',
            'bg-innoblack',
            'text-white',
            'focus:ring',
            'focus:ring-innoblack',
            'focus:ring-offset-4',
            'hover:bg-gray-800',
            'text-sm',
            'md:text-lg',
            'md:py-3',
            'md:px-8',
        ];
        buttonClassList.map((item) => {
            expect(button.classList.contains(item)).toBeTruthy();
        });
        expect(button.textContent).toBe('Get Started');
    });

    it('Class method return has the appropriate fourth child', function () {
        let testOutput = new ComponentsTS.ServiceDescription(
            'Test Heading',
            ['Test Item 1', 'Test Item 2'],
            'Test Paragraph Content',
            'Test Image Source'
        ).render().result;

        let child = testOutput.children[3];
        expect(child).not.toBeNull();
        expect(child.tagName.toLowerCase()).toBe('div');
        let desiredClassList = ['w-full', 'bg-gray-100', 'h-40', 'mt-5'];
        desiredClassList.map((item) => {
            expect(child.classList.contains(item)).toBeTruthy();
        });
        expect(child.childNodes.length).toBe(0);
    });
});

describe('Test class FAQ', function () {
    it('Class has the required properties', function () {
        let testOutput = new ComponentsTS.FAQ('Test Question', 'Test Answer');
        expect(testOutput).not.toBeNull();
        let desiredProperties = [
            'result',
            'question',
            'answer',
            'button',
            'container',
        ];
        desiredProperties.map((item) => {
            expect(testOutput.hasOwnProperty(item)).toBeTruthy();
        });
    });

    it('Class method render returns the right output', function () {
        let testOutput = new ComponentsTS.FAQ(
            'Test Question',
            'Test Answer'
        ).render().result;

        let expectedClasses = ['grid', 'grid-cols-1'];
        expectedClasses.map((item) => {
            expect(testOutput.classList.contains(item)).toBeTruthy();
        });
        expect(testOutput.childNodes.length).toBe(2);
    });

    it('Class method return has the appropriate first child', function () {
        let testOutput = new ComponentsTS.FAQ(
            'Test Question',
            'Test Answer'
        ).render().result;

        let child = testOutput.children[0];
        let childClasses = [
            'flex',
            'text-left',
            'lato-regular',
            'text-base',
            'px-4',
            'py-6',
            'bg-gray-100',
            'hover:border-gray-500',
            'focus:border-gray-500',
        ];

        expect(child.tagName.toLowerCase()).toBe('button');
        childClasses.map((item) => {
            expect(child.classList.contains(item)).toBeTruthy();
        });
        expect(child.textContent).toBe('Test Question');
        expect(child.childNodes.length).toBe(2);

        let icon = child.children[0];
        let iconClasses = [
            'fas',
            'fa-chevron-down',
            'text-xs',
            'ml-auto',
            'self-center',
        ];

        iconClasses.map((item) => {
            expect(icon.classList.contains(item)).toBeTruthy();
        });
    });

    it('Class method return has the appropriate second child', function () {
        let testOutput = new ComponentsTS.FAQ(
            'Test Question',
            'Test Answer'
        ).render().result;

        let child = testOutput.children[1];
        let childClasses = ['container', 'p-4', 'hidden', 'shadow-md'];

        expect(child.tagName.toLowerCase()).toBe('div');
        childClasses.map((item) => {
            expect(child.classList.contains(item)).toBeTruthy();
        });
        expect(child.childNodes.length).toBe(1);
        expect(child.hasAttribute('data-expand')).toBeTruthy();
        expect(child.getAttribute('data-expand')).toBe('true');

        let paragraph = child.children[0];
        let paragraphClasses = [
            'text-sm',
            'font-medium',
            'lato-regular',
            'sm:text-base',
            'lg:text-lg',
            '2xl:text-lg',
        ];

        paragraphClasses.map((item) => {
            expect(paragraph.classList.contains(item)).toBeTruthy();
        });
        expect(paragraph.textContent).toBe('Test Answer');
    });

    it('Button click has the appropriate response', function () {
        let testOutput = new ComponentsTS.FAQ(
            'Test Question',
            'Test Answer'
        ).render().result;

        let button = testOutput.children[0];
        let container = testOutput.children[1];

        // Click the button
        expect(container.classList.contains('hidden')).toBeTruthy();
        button.dispatchEvent(new Event('click'));
        expect(container.classList.contains('hidden')).toBeFalsy();
        button.dispatchEvent(new Event('click'));
        expect(container.classList.contains('hidden')).toBeTruthy();
    });
});

describe('Test class TextInputWithLabel', function () {
    it('Class has the required properties', function () {
        let inputElement = Object.assign(document.createElement('input'), {
            type: 'text',
            name: 'test-text-input',
        });
        let testOutput = new ComponentsTS.TextInputWithLabel(
            'Test Text Input',
            inputElement
        );

        expect(testOutput).not.toBeNull();
        let expectedProperties = [
            'result',
            'labelText',
            'labelTextSpan',
            'inputElement',
        ];
        expectedProperties.map((item) => {
            expect(testOutput.hasOwnProperty(item)).toBeTruthy();
        });
    });

    it('Class method render produces accurate results', function () {
        let inputElement = Object.assign(document.createElement('input'), {
            type: 'text',
            name: 'test-text-input',
        });
        let testOutput = new ComponentsTS.TextInputWithLabel(
            'Test Text Input',
            inputElement
        ).render().result;

        expect(testOutput).not.toBeNull();
        expect(testOutput.tagName.toLowerCase()).toBe('label');
        expect(testOutput.childNodes.length).toBe(2);
        let expectedClasses = ['block', 'lato-regular'];
        expectedClasses.map((item) => {
            expect(testOutput.classList.contains(item)).toBeTruthy();
        });
    });

    it('Class method render produces an accurate first child', function () {
        let inputElement = Object.assign(document.createElement('input'), {
            type: 'text',
            name: 'test-text-input',
        });
        let testOutput = new ComponentsTS.TextInputWithLabel(
            'Test Text Input',
            inputElement
        ).render().result;

        let child = testOutput.children[0];
        expect(child.tagName.toLowerCase()).toBe('span');
        expect(child.textContent).toBe('Test Text Input');
        let childClasses = ['text-gray-700', 'lato-regular'];
        childClasses.map((item) => {
            expect(child.classList.contains(item)).toBeTruthy();
        });
    });

    it('Class method render produces an accurate second child', function () {
        let inputElement = Object.assign(document.createElement('input'), {
            type: 'text',
            name: 'test-text-input',
        });
        let testOutput = new ComponentsTS.TextInputWithLabel(
            'Test Text Input',
            inputElement
        ).render().result;

        let child = testOutput.children[1];
        expect(child.tagName.toLowerCase()).toBe('input');
        expect(child.getAttribute('type')).toBe('text');
        expect(child.getAttribute('name')).toBe('test-text-input');
        let childClasses = [
            'mt-0',
            'block',
            'lato-regular',
            'w-full',
            'p-2',
            'text-sm',
            'border-0',
            'border-b',
            // 'border-gray-200',
            'border-gray-500',
            'focus:ring-0',
            'focus:border-black',
        ];
        childClasses.map((item) => {
            expect(child.classList.contains(item)).toBeTruthy();
        });
    });
});

describe('Test class SelectInputWithLabel', function () {
    it('Class has the required properties', function () {
        let inputElement = Object.assign(document.createElement('select'), {
            name: 'test-select-input',
        });
        let testOutput = new ComponentsTS.SelectInputWithLabel(
            'Test Text Input',
            inputElement
        );

        expect(testOutput).not.toBeNull();
        let expectedProperties = [
            'result',
            'labelText',
            'labelTextSpan',
            'inputElement',
        ];
        expectedProperties.map((item) => {
            expect(testOutput.hasOwnProperty(item)).toBeTruthy();
        });
    });

    it('Class method render produces accurate results', function () {
        let inputElement = Object.assign(document.createElement('select'), {
            name: 'test-select-input',
        });
        let testOutput = new ComponentsTS.SelectInputWithLabel(
            'Test Text Input',
            inputElement
        ).render().result;

        expect(testOutput).not.toBeNull();
        expect(testOutput.tagName.toLowerCase()).toBe('label');
        expect(testOutput.childNodes.length).toBe(2);
        let expectedClasses = ['block', 'lato-regular'];
        expectedClasses.map((item) => {
            expect(testOutput.classList.contains(item)).toBeTruthy();
        });
    });

    it('Class method render produces an accurate first child', function () {
        let inputElement = Object.assign(document.createElement('select'), {
            name: 'test-select-input',
        });
        let testOutput = new ComponentsTS.SelectInputWithLabel(
            'Test Text Input',
            inputElement
        ).render().result;

        let child = testOutput.children[0];
        expect(child.tagName.toLowerCase()).toBe('span');
        expect(child.textContent).toBe('Test Text Input');
        let childClasses = ['text-gray-700', 'lato-regular'];
        childClasses.map((item) => {
            expect(child.classList.contains(item)).toBeTruthy();
        });
    });

    it('Class method render produces an accurate second child', function () {
        let inputElement = Object.assign(document.createElement('select'), {
            name: 'test-select-input',
        });
        let testOutput = new ComponentsTS.SelectInputWithLabel(
            'Test Text Input',
            inputElement
        ).render().result;

        let child = testOutput.children[1];
        expect(child.tagName.toLowerCase()).toBe('select');
        expect(child.getAttribute('name')).toBe('test-select-input');
        let childClasses = [
            'mt-0',
            'block',
            'lato-regular',
            'bg-transparent',
            'w-full',
            'text-sm',
            'p-2',
            'border-0',
            'border-b',
            'border-gray-700',
            'focus:ring-0',
            'focus:border-black',
        ];
        childClasses.map((item) => {
            expect(child.classList.contains(item)).toBeTruthy();
        });
    });
});

describe('Test class CheckboxWithLabel', function () {
    it('Class has the required properties', function () {
        let inputElement = Object.assign(document.createElement('input'), {
            name: 'test-checkbox-input',
            type: 'checkbox',
        });
        let testOutput = new ComponentsTS.CheckboxWithLabel(
            'Test Text Input',
            inputElement
        );

        expect(testOutput).not.toBeNull();
        let expectedProperties = [
            'result',
            'labelText',
            'labelTextSpan',
            'inputElement',
        ];
        expectedProperties.map((item) => {
            expect(testOutput.hasOwnProperty(item)).toBeTruthy();
        });
    });

    it('Class method render produces accurate results', function () {
        let inputElement = Object.assign(document.createElement('input'), {
            name: 'test-checkbox-input',
            type: 'checkbox',
        });
        let testOutput = new ComponentsTS.CheckboxWithLabel(
            'Test Text Input',
            inputElement
        ).render().result;

        expect(testOutput).not.toBeNull();
        expect(testOutput.tagName.toLowerCase()).toBe('label');
        expect(testOutput.childNodes.length).toBe(2);
        let expectedClasses = [
            'flex',
            'items-center',
            'lato-regular',
            'cursor-pointer',
        ];
        expectedClasses.map((item) => {
            expect(testOutput.classList.contains(item)).toBeTruthy();
        });
    });

    it('Class method render produces an accurate second child', function () {
        let inputElement = Object.assign(document.createElement('input'), {
            name: 'test-checkbox-input',
            type: 'checkbox',
        });
        let testOutput = new ComponentsTS.CheckboxWithLabel(
            'Test Text Input',
            inputElement
        ).render().result;

        let child = testOutput.children[1];
        expect(child.tagName.toLowerCase()).toBe('span');
        expect(child.textContent).toBe('Test Text Input');
        let childClasses = ['text-gray-700', 'lato-regular'];
        childClasses.map((item) => {
            expect(child.classList.contains(item)).toBeTruthy();
        });
    });

    it('Class method render produces an accurate first child', function () {
        let inputElement = Object.assign(document.createElement('input'), {
            name: 'test-checkbox-input',
            type: 'checkbox',
        });
        let testOutput = new ComponentsTS.CheckboxWithLabel(
            'Test Text Input',
            inputElement
        ).render().result;

        let child = testOutput.children[0];
        expect(child.tagName.toLowerCase()).toBe('input');
        expect(child.type).toBe('checkbox');
        expect(child.getAttribute('name')).toBe('test-checkbox-input');
        let childClasses = [
            'h-5',
            'w-5',
            'cursor-pointer',
            'rounded',
            'bg-gray-200',
            'border-transparent',
            'focus:border-transparent',
            'focus:bg-gray-200',
            'text-gray-700',
            'focus:ring-1',
            'focus:ring-offset-2',
            'focus:ring-gray-500',
            'active:bg-black',
        ];
        childClasses.map((item) => {
            expect(child.classList.contains(item)).toBeTruthy();
        });
    });
});

describe('Test class TwoColumnContainer', function () {
    it('Class has the required properties', function () {
        let testOutput = new ComponentsTS.TwoColumnContainer('test-container');

        expect(testOutput).not.toBeNull();
        expect(testOutput.hasOwnProperty('result')).toBeTruthy();
        expect(testOutput.hasOwnProperty('idPrepend')).toBeTruthy();
    });

    it('Class method render returns the right output', function () {
        let testOutput = new ComponentsTS.TwoColumnContainer('test-container')
            .result;

        expect(testOutput.tagName.toLowerCase()).toBe('div');
        let expectedClasses = [
            'flex',
            'w-11/12',
            'mx-auto',
            'mb-24',
            'lg:flex-row',
            'lg:gap-12',
            'xl:w-3/4',
        ];
        expectedClasses.map((item) => {
            expect(testOutput.classList.contains(item)).toBeTruthy();
        });
        expect(testOutput.childNodes.length).toBe(2);
        expect(testOutput.id).toBe('test-container-main-container');
    });

    it('Class method render has the appropriate first child', function () {
        let testOutput = new ComponentsTS.TwoColumnContainer('test-container')
            .result;

        let child = testOutput.children[0];
        expect(child).not.toBeNull();
        expect(child.tagName.toLowerCase()).toBe('div');
        let expectedClasses = ['hidden', 'items-center', 'lg:flex', 'lg:w-2/5'];
        expectedClasses.map((item) => {
            expect(child.classList.contains(item)).toBeTruthy();
        });
        expect(child.id).toBe('test-container-left-container');
    });

    it('Class method render has the appropriate second child', function () {
        let testOutput = new ComponentsTS.TwoColumnContainer('test-container')
            .result;

        let child = testOutput.children[1];
        expect(child).not.toBeNull();
        expect(child.tagName.toLowerCase()).toBe('div');
        let expectedClasses = [
            'flex',
            'flex-col',
            'w-full',
            'gap-6',
            'mx-auto',
            'lg:w-3/5',
        ];
        expectedClasses.map((item) => {
            expect(child.classList.contains(item)).toBeTruthy();
        });
        expect(child.id).toBe('test-container-right-container');
    });
});

describe('Test class TypicalPostForm', function () {
    it('Class has the required properties', function () {
        let testOutput = new ComponentsTS.TypicalPostForm('test_form');

        expect(testOutput).not.toBeNull();
        expect(testOutput.hasOwnProperty('result')).toBeTruthy();
        expect(testOutput.hasOwnProperty('formId')).toBeTruthy();
    });

    it('Class result returns the right output', function () {
        let testOutput = new ComponentsTS.TypicalPostForm('test_form').result;

        expect(testOutput).not.toBeNull();
        expect(testOutput.method).toBe('post');
        expect(testOutput.enctype).toBe('application/x-www-form-urlencoded');
        expect(testOutput.id).toBe('test_form');

        let expectedClasses = [
            'flex',
            'flex-col',
            'gap-6',
            'w-11/12',
            'm-auto',
            'transition',
            'duration-150',
            'ease-in-out',
            'md:w-3/4',
        ];
        expectedClasses.map((item) => {
            expect(testOutput.classList.contains(item)).toBeTruthy();
        });
    });
});

describe('Test class TypicalFormSubmitButton', function () {
    it('Class has the required properties', function () {
        let testOutput = new ComponentsTS.TypicalFormSubmitButton(
            'Test Text Content'
        );

        expect(testOutput).not.toBeNull();
        expect(testOutput.hasOwnProperty('result')).toBeTruthy();
        expect(testOutput.hasOwnProperty('textContent')).toBeTruthy();
    });

    it('Class result returns the right output', function () {
        let testOutput = new ComponentsTS.TypicalFormSubmitButton(
            'Test Text Content'
        ).result;

        expect(testOutput).not.toBeNull();
        expect(testOutput.tagName.toLowerCase()).toBe('button');
        expect(testOutput.type).toBe('submit');
        expect(testOutput.textContent).toBe('Test Text Content');

        let expectedClasses = [
            'lato-regular',
            'block',
            'text-center',
            'mx-auto',
            'py-2',
            'px-5',
            'rounded-xl',
            'shadow',
            'cursor-pointer',
            'border-2',
            'border-innoblack',
            'bg-innoblack',
            'text-white',
            'focus:ring',
            'focus:ring-innoblack',
            'focus:ring-offset-4',
            'hover:bg-gray-800',
            'text-sm',
            'md:text-lg',
            'md:py-3',
            'md:px-8',
        ];
        expectedClasses.map((item) => {
            expect(testOutput.classList.contains(item)).toBeTruthy();
        });
    });
});

describe('Test class OneProcess', function () {
    it('Class has the required properties', function () {
        let testOutput = new ComponentsTS.OneProcess(
            'Test Process Heading',
            'Test Content HTML',
            'Test Image Source'
        );
        expect(testOutput).not.toBeNull();
        expect(testOutput.hasOwnProperty('result')).toBeTruthy();
        expect(testOutput.hasOwnProperty('processHeading')).toBeTruthy();
        expect(testOutput.hasOwnProperty('contentHTML')).toBeTruthy();
        expect(testOutput.hasOwnProperty('imageSrc')).toBeTruthy();
    });

    it('Class method result produces accurate results', function () {
        let testOutput = new ComponentsTS.OneProcess(
            'Test Process Heading',
            'Test Content HTML',
            'Test Image Source'
        ).result;

        expect(testOutput).not.toBeNull();
        expect(testOutput.tagName.toLowerCase()).toBe('div');
        expect(testOutput.childNodes.length).toBe(3);
        let expectedClasses = [
            'flex',
            'flex-col',
            'gap-6',
            'sm:flex-row',
            'sm:gap-6',
            'md:gap-12',
            'items-center',
            'transition-opacity',
            'delay-500',
            'duration-2000',
            'ease-in-out',
            'opacity-0',
        ];
        expectedClasses.map((item) => {
            expect(testOutput.classList.contains(item)).toBeTruthy();
        });
        expect(testOutput.hasAttribute('animate-one-process')).toBeTruthy();
        expect(testOutput.getAttribute('animate-one-process')).toBe('true');
    });

    it('Class method result produces an accurate first child', function () {
        let testOutput = new ComponentsTS.OneProcess(
            'Test Process Heading',
            'Test Content HTML',
            'Test Image Source'
        ).result;

        let child = testOutput.children[0];
        expect(child).not.toBeNull();
        expect(child.tagName.toLowerCase()).toBe('i');
        let expectedClass = [
            'far',
            'fa-circle',
            'text-gray-200',
            '-ml-1.5',
            'hidden',
            'sm:block',
        ];
        expectedClass.map((item) => {
            expect(child.classList.contains(item)).toBeTruthy();
        });
    });

    it('Class method result produces an accurate second child', function () {
        let testOutput = new ComponentsTS.OneProcess(
            'Test Process Heading',
            'Test Content HTML',
            'Test Image Source'
        ).result;

        let child = testOutput.children[1];
        expect(child).not.toBeNull();
        expect(child.tagName.toLowerCase()).toBe('div');
        let expectedClass = ['flex-grow'];
        expectedClass.map((item) => {
            expect(child.classList.contains(item)).toBeTruthy();
        });
        expect(child.childNodes.length).toBe(1);

        let heading = child.children[0];
        expect(heading.tagName.toLowerCase()).toBe('h4');
        expect(heading.classList.contains('my-auto')).toBeTruthy();
        expect(heading.textContent).toBe('Test Process Heading');
    });

    it('Class method result produces an accurate third child', function () {
        let testOutput = new ComponentsTS.OneProcess(
            'Test Process Heading',
            'Test Content HTML',
            'Test Image Source'
        ).result;

        let child = testOutput.children[2];
        expect(child).not.toBeNull();
        expect(child.tagName.toLowerCase()).toBe('div');
        let expectedClass = ['relative'];
        expectedClass.map((item) => {
            expect(child.classList.contains(item)).toBeTruthy();
        });
        expect(child.childNodes.length).toBe(2);

        let image = child.children[0];
        expect(image.tagName.toLowerCase()).toBe('img');
        expect(image.getAttribute('src')).toBe('Test Image Source');
        let imageClasses = [
            'object-contain',
            'rounded-3xl',
            'ml-auto',
            'sm:h-48',
            'md:flex',
            'md:h-60',
            'lg:h-72',
            'xl:h-96',
        ];
        imageClasses.map((item) => {
            expect(image.classList.contains(item)).toBeTruthy();
        });

        let overlayContainer = child.children[1];
        expect(overlayContainer.tagName.toLowerCase()).toBe('div');
        let containerClasses = [
            'flex',
            'w-full',
            'h-full',
            'text-white',
            'bg-black',
            'rounded-3xl',
            'opacity-80',
            'p-5',
            'absolute',
            'top-0',
            'left-0',
        ];
        containerClasses.map((item) => {
            expect(overlayContainer.classList.contains(item)).toBeTruthy();
        });
        expect(overlayContainer.innerHTML).toBe('Test Content HTML');
    });
});

describe('Test class OneProcessGapContainer', function () {
    it('Class has the required properties', function () {
        let testOutput = new ComponentsTS.OneProcessGapContainer(
            'Test Time Required'
        );
        expect(testOutput).not.toBeNull();
        expect(testOutput.hasOwnProperty('result')).toBeTruthy();
        expect(testOutput.hasOwnProperty('timeRequired')).toBeTruthy();
    });

    it('Class method result produces accurate results', function () {
        let testOutput = new ComponentsTS.OneProcessGapContainer(
            'Test Time Required'
        ).result;

        expect(testOutput).not.toBeNull();
        expect(testOutput.tagName.toLowerCase()).toBe('div');
        expect(testOutput.childNodes.length).toBe(2);
        let expectedClasses = [
            'flex',
            'border-l-2',
            'border-gray-200',
            'h-48',
            'my-6',
            'w-1/2',
            'ml-auto',
            'sm:h-72',
            'sm:-my-20',
            'sm:w-full',
            'md:h-80',
            'md:-my-24',
            'lg:h-96',
            'lg:-my-32',
            'transition-opacity',
            'delay-500',
            'duration-2000',
            'ease-in-out',
            'opacity-0',
        ];
        expectedClasses.map((item) => {
            expect(testOutput.classList.contains(item)).toBeTruthy();
        });
        expect(testOutput.hasAttribute('animate-one-process-gap')).toBeTruthy();
        expect(testOutput.getAttribute('animate-one-process-gap')).toBe('true');
    });

    it('Class method result produces an accurate first child', function () {
        let testOutput = new ComponentsTS.OneProcessGapContainer(
            'Test Time Required'
        ).result;

        let child = testOutput.children[0];
        expect(child).not.toBeNull();
        expect(child.tagName.toLowerCase()).toBe('i');
        let expectedClass = [
            'fas',
            'fa-chevron-down',
            'text-gray-200',
            'mt-auto',
            '-mb-2',
            '-ml-2',
        ];
        expectedClass.map((item) => {
            expect(child.classList.contains(item)).toBeTruthy();
        });
    });

    it('Class method result produces an accurate second child', function () {
        let testOutput = new ComponentsTS.OneProcessGapContainer(
            'Test Time Required'
        ).result;

        let child = testOutput.children[1];
        expect(child).not.toBeNull();
        expect(child.tagName.toLowerCase()).toBe('p');
        let expectedClass = ['my-auto', 'ml-5', 'text-gray-200'];
        expectedClass.map((item) => {
            expect(child.classList.contains(item)).toBeTruthy();
        });
    });
});
