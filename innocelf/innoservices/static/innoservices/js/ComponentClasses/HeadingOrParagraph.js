'use strict';
/**
 * The class is a Heading or Paragraph Component to render the text in a heading
 * or paragraph tag with the desired class
 */
export class HeadingOrParagraph {
    constructor(tag, textContent) {
        this.tag = tag;
        this.textContent = textContent;
        this.headingClassDefs = {
            h1: {
                class: [
                    'text-3xl',
                    //'font-bold',
                    'lato-regular',
                    'sm:text-4xl',
                    'lg:text-5xl',
                    '2xl:text-6xl',
                ],
            },
            h2: {
                class: [
                    'text-2xl',
                    //'font-bold',
                    'lato-regular',
                    'sm:text-3xl',
                    'lg:text-4xl',
                    '2xl:text-5xl',
                ],
            },
            h3: {
                class: [
                    'text-xl',
                    //'font-bold',
                    'lato-regular',
                    'sm:text-xl',
                    'lg:text-2xl',
                    '2xl:text-3xl',
                ],
            },
            h4: {
                class: [
                    'text-lg',
                    //'font-bold',
                    'lato-regular',
                    'sm:text-xl',
                    'lg:text-2xl',
                    '2xl:text-3xl',
                ],
            },
            h5: {
                class: [
                    'text-base',
                    //'font-semibold',
                    'lato-regular',
                    'sm:text-lg',
                    'lg:text-xl',
                    '2xl:text-2xl',
                ],
            },
            h6: {
                class: [
                    'text-sm',
                    // 'font-semibold',
                    'lato-regular',
                    'sm:text-base',
                    'lg:text-lg',
                    '2xl:text-xl',
                ],
            },
            p: {
                class: [
                    'text-sm',
                    //'font-medium',
                    'lato-light',
                    'sm:text-base',
                    'lg:text-lg',
                    '2xl:text-lg',
                ],
            },
        };
        if (this.tag === 'p') {
            this.result = document.createElement(this.tag);
        } else {
            this.result = document.createElement(this.tag);
        }
        // Add base classes for the heading to behave appropriately
        this.headingClassDefs[this.tag].class.map((item) => {
            this.result.classList.add(item);
        });
        this.result.textContent = this.textContent;
    }

    renderWithClass(desiredClassList) {
        desiredClassList.map((item) => {
            this.result.classList.add(item);
        });
        return this;
    }

    renderGradientText() {
        // Remove default classes
        this.result.className = '';
        let headingClassList = [
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
        headingClassList.map((item) => {
            this.result.classList.add(item);
        });
        return this;
    }

    renderMissionOrValueText() {
        this.result.className = '';
        this.result.classList.add(
            'text-base',
            'lato-light',
            'sm:text-lg',
            'lg:text-xl'
        );

        return this;
    }

    renderFooterDisclaimers() {
        this.result.className = '';
        this.result.classList.add(
            'text-xs',
            'lg:text-sm',
            'lato-light',
            'text-white'
        );

        return this;
    }
}
