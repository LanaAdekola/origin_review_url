'use strict';

import { AnchorLinks } from './AnchorLinks.js';

/**
 * The class is a Dropdown Menu Component to render a button that gets transformed
 * into a dropdown menu when clicked and reverts to a button when clicked outside
 * on the document
 */
export class DropdownMenu {
    constructor(buttonText, linksTextAndDestObject) {
        this.buttonText = buttonText;
        this.linksTextAndDestObject = linksTextAndDestObject;
        this.result = document.createElement('div');
        this.mainButton = document.createElement('button');
        this.mainMenu = document.createElement('div');
    }
    render() {
        // Add classes to the main element
        let desiredClassList = ['relative', 'my-1', 'sm:mr-12'];
        desiredClassList.map((item) => {
            this.result.classList.add(item);
        });
        // Add sub-elements to the main element
        this.initializeButton();
        this.initializeMenu();
        this.createLinks();
        // Listen to event listeners
        let mainMenu = this.mainMenu;
        let mainButton = this.mainButton;
        let buttonClick = this._buttonClick;
        let globalDocumentClick = this._globalDocumentClick;
        this.mainButton.addEventListener('click', function () {
            buttonClick(mainMenu);
        });
        document.addEventListener('click', function (event) {
            globalDocumentClick(event, mainMenu, mainButton);
        });
        return this;
    }
    initializeButton() {
        let desiredButtonClass = [
            // 'p-2',
            'hover:border-gray-500',
            'focus:border-gray-500',
            'sm:text-lg',
            '2xl:text-xl',
        ];
        let desiredIconClass = ['fas', 'fa-chevron-down', 'text-xs', 'ml-2'];
        this.mainButton.type = 'button';
        this.mainButton.textContent = this.buttonText;
        desiredButtonClass.map((item) => {
            this.mainButton.classList.add(item);
        });
        let icon = document.createElement('i');
        desiredIconClass.map((item) => {
            icon.classList.add(item);
        });
        this.mainButton.append(icon);
        this.result.append(this.mainButton);
    }
    initializeMenu() {
        let desiredMenuClass = [
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
            'z-50',
            'hidden',
        ];
        desiredMenuClass.map((item) => {
            this.mainMenu.classList.add(item);
        });
        this.result.append(this.mainMenu);
    }
    createLinks() {
        Object.keys(this.linksTextAndDestObject).map((item) => {
            let newLink = new AnchorLinks(item)
                .renderWithText()
                .renderNavDropdownLink().result;
            newLink.setAttribute(
                'href',
                this.linksTextAndDestObject[item].link
            );
            this.mainMenu.append(newLink);
        });
    }
    _buttonClick(mainMenu) {
        if (mainMenu.classList.contains('hidden')) {
            mainMenu.classList.remove('hidden');
        } else {
            mainMenu.classList.add('hidden');
        }
    }
    _globalDocumentClick(event, mainMenu, mainButton) {
        if (
            event.target !== mainButton &&
            !mainMenu.classList.contains('hidden')
        ) {
            mainMenu.classList.add('hidden');
        }
    }
}
