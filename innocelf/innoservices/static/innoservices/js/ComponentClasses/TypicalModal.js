'use strict';

/**
 * The class represents a typical modal structure without the content of the modal
 * Subsequent classes will be created for the content
 */
export class TypicalModal {
    constructor(modalId) {
        this.modalId = modalId;
        this.result = document.createElement('div');
        let resultAttributes = {
            'aria-labelledby': 'modal-title',
            role: 'dialog',
            'aria-modal': 'true',
        };

        Object.keys(resultAttributes).map((item) => {
            this.result.setAttribute(item, resultAttributes[item]);
        });
        this.result.classList.add(
            'fixed',
            'z-10',
            'inset-0',
            'overflow-y-auto',
            'hidden'
        );
        this.mainDiv = document.createElement('div');
        this.backgroundOverlayDiv = document.createElement('div');
        this.mainContentDiv = document.createElement('div');
        this.modalContentDiv = document.createElement('div');
        this.closeButton = document.createElement('button');
        this.createMainDiv();

        // Hide the modal when escape is pressed
        document.onkeyup = (event) => {
            if (event.key === 'Escape' || event.keyCocde === 27) {
                this._closeModal();
            }
        };
        this.closeButton.onclick = () => {
            this._closeModal();
        };
    }

    createMainDiv() {
        this.mainDiv.classList.add(
            'flex',
            'items-end',
            'justify-center',
            'min-h-screen',
            'pt-4',
            'px-4',
            'pb-20',
            'text-center',
            'sm:block',
            'sm:p-0'
        );
        this.mainDiv.id = this.modalId + '_main_div';

        this.createBackgroundOverlay();
        this.createContentDiv();
        this.mainDiv.append(
            this.backgroundOverlayDiv,
            this.createSpanToTrickBrowser(),
            this.mainContentDiv
        );
        this.result.append(this.mainDiv);
    }

    createBackgroundOverlay() {
        this.backgroundOverlayDiv.classList.add(
            'fixed',
            'inset-0',
            'bg-gray-500',
            'bg-opacity-75',
            'transition-opacity',
            'ease-out',
            'duration-300',
            'opacity-0'
        );
        this.backgroundOverlayDiv.setAttribute('aria-hidden', 'true');
        this.backgroundOverlayDiv.id = this.modalId + '_background_overlay_div';
    }

    createSpanToTrickBrowser() {
        let span = document.createElement('span');
        span.classList.add(
            'hidden',
            'sm:inline-block',
            'sm:align-middle',
            'sm:h-screen'
        );
        span.setAttribute('aria-hidden', 'true');
        span.innerHTML = '&#8203;';
        return span;
    }

    createContentDiv() {
        this.mainContentDiv.classList.add(
            'inline-block',
            'align-bottom',
            'bg-white',
            'rounded-lg',
            'text-left',
            'overflow-hidden',
            'shadow-xl',
            'transform',
            'transition-all',
            'sm:my-8',
            'sm:align-middle',
            'sm:max-w-lg',
            'sm:w-full',
            'ease-out',
            'duration-300',
            'opacity-0',
            'translate-y-4',
            'sm:translate-y-0',
            'sm:scale-95'
        );
        this.mainContentDiv.id = this.modalId + '_main_content_div';

        this.createModalContent();
        this.mainContentDiv.append(this.modalContentDiv);
    }

    createModalContent() {
        this.modalContentDiv.classList.add(
            'bg-white',
            'px-4',
            'pt-5',
            'pb-4',
            'sm:p-6',
            'sm:pb-4',
            'relative'
        );
        this.modalContentDiv.id = this.modalId + '_modal_content_div';
        this.createCloseButton();

        this.modalContentDiv.append(this.closeButton);
    }

    createCloseButton() {
        this.closeButton.type = 'button';
        this.closeButton.classList.add(
            'inline-flex',
            'ml-auto',
            'absolute',
            'top-0',
            'right-0',
            'text-black',
            'px-3',
            'py-2',
            'm-3',
            'rounded-xl',
            'hover:bg-gray-300',
            'hover:text-gray-900'
        );
        let icon = document.createElement('i');
        icon.classList.add('fas', 'fa-times');
        this.closeButton.append(icon);
    }

    _showModal() {
        this.__replaceEaseAndDurationClasses(this.backgroundOverlayDiv, 'show');
        this.__replaceEaseAndDurationClasses(this.mainContentDiv, 'show');

        this.result.classList.toggle('hidden');
        setTimeout(() => {
            this.backgroundOverlayDiv.classList.replace(
                'opacity-0',
                'opacity-100'
            );

            this.mainContentDiv.classList.remove(
                'opacity-0',
                'translate-y-4',
                'sm:translate-y-0',
                'sm:scale-95'
            );
            this.mainContentDiv.classList.add(
                'opacity-100',
                'translate-y-0',
                'sm:scale-100'
            );
        }, 100);
    }

    _closeModal() {
        this.__replaceEaseAndDurationClasses(
            this.backgroundOverlayDiv,
            'close'
        );
        this.__replaceEaseAndDurationClasses(this.mainContentDiv, 'close');

        setTimeout(() => {
            this.backgroundOverlayDiv.classList.replace(
                'opacity-100',
                'opacity-0'
            );

            this.mainContentDiv.classList.remove(
                'opacity-100',
                'translate-y-0',
                'sm:scale-100'
            );
            this.mainContentDiv.classList.add(
                'opacity-0',
                'translate-y-4',
                'sm:translate-y-0',
                'sm:scale-95'
            );
        }, 100);

        setTimeout(() => {
            this.result.classList.toggle('hidden');
        }, 800);
        setTimeout(() => {
            this.result.remove();
        }, 1000);
    }

    __replaceEaseAndDurationClasses(element, state) {
        if (state === 'close') {
            element.classList.replace('ease-out', 'ease-in');
            element.classList.replace('duration-300', 'duration-200');
        } else if (state === 'show') {
            element.classList.replace('ease-in', 'ease-out');
            element.classList.replace('duration-200', 'duration-300');
        }
    }
}
