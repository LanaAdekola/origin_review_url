'use strict';
function _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
/**
 * The class is a Dynamic Typed Heading to render the dynamic typed feature of the
 * first page
 */
export class DynamicTypedHeading {
    constructor() {
        this.stringsArray = [
            'filing a Patent Application?',
            'commercializing your product?',
            'researching a new business name or logo?',
            'performing technology assessment?',
        ];
        this.dynamicTypedContent = document.createElement('span');
        this.dynamicTypedCursor = document.createElement('span');
        this.result = document.createElement('h1');
    }
    render() {
        let desiredClasses = [
            'mt-12',
            'mb-6',
            'h-16',
            'text-white',
            'lato-regular',
            // 'text-center',
            // 'text-transparent',
            // 'text-xl',
            // 'bg-clip-text',
            // 'bg-gradient-to-r',
            // 'from-black',
            'to-gray-400',
            'sm:text-2xl',
            'md:text-2xl',
            'lg:text-3xl',
            'xl:text-4xl',
            '2xl:mt-12',
            '2xl:mb-6',
            '2xl:text-5xl',
        ];
        desiredClasses.map((item) => {
            this.result.classList.add(item);
        });
        let text = document.createTextNode('Are you ');
        this.result.append(text);
        this.initializeDynamicTypedContent();
        this.initializeDynamicTypedCursor();
        return this;
    }
    initializeDynamicTypedContent() {
        this.result.append(this.dynamicTypedContent);
        this.startDynamicTyping();
    }
    initializeDynamicTypedCursor() {
        this.dynamicTypedCursor.textContent = '|';
        this.result.append(this.dynamicTypedCursor);
    }
    async startDynamicTyping() {
        while (true) {
            for (let i = 0; i < this.stringsArray.length; i++) {
                let string = this.stringsArray[i];
                let dynamicString = '';
                for (let j = 0; j < string.length; j++) {
                    dynamicString += string[j];
                    window.requestAnimationFrame(() => {
                        this.dynamicTypedContent.textContent = dynamicString;
                    });
                    await _sleep(100);
                }
                this.dynamicTypedCursor.classList.add('hidden');
                await _sleep(2000);
                this.dynamicTypedCursor.classList.remove('hidden');
                for (let j = string.length; j > 0; j--) {
                    dynamicString = dynamicString.slice(0, -1);
                    window.requestAnimationFrame(() => {
                        this.dynamicTypedContent.textContent = dynamicString;
                    });
                    await _sleep(100);
                }
            }
        }
    }
}
