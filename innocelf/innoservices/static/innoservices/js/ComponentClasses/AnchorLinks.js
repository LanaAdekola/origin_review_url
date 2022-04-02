'use strict';
/**
 * The class is an Anchor Link Component to render a button or a link using the
 * Anchor tag. The class has many method to create various different type of
 * clickable elements
 */
export class AnchorLinks {
    constructor(textContent) {
        this.textContent = textContent;
        this.result = document.createElement('a');
    }

    renderWithText() {
        this.result.textContent = this.textContent;
        return this;
    }

    renderWithTextAndUnderline() {
        this.result.textContent = this.textContent;
        this.result.classList.add(
            'underline',
            'uppercase',
            'text-xs',
            'md:text-sm'
        );
        return this;
    }

    renderWithIcon(iconClass) {
        let i = document.createElement('i');
        iconClass.map((item) => {
            i.classList.add(item);
        });
        this.result.append(i);
        return this;
    }

    renderNavLink() {
        let desiredClassList = [
            'block',
            'my-1',
            // 'mt-4',
            // 'mr-12',
            // 'ml-5',
            'cursor-pointer',
            'hover:text-gray-500',
            'sm:text-center',
            'sm:ml-2',
            'sm:mr-8',
            'sm:text-lg',
            'lg:ml-5',
            'lg:mr-12',
            '2xl:text-xl',
            '2xl:mt-0',
            '2xl:inline-block',
        ];
        desiredClassList.map((item) => {
            this.result.classList.add(item);
        });
        return this;
    }

    renderNavDropdownLink() {
        let desiredClassList = [
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
        desiredClassList.map((item) => {
            this.result.classList.add(item);
        });
        return this;
    }

    renderLargeInnocelfButton() {
        this.result.textContent = this.textContent;
        this.result.target = '_blank';
        let desiredClassList = [
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
        desiredClassList.map((item) => {
            this.result.classList.add(item);
        });
        return this;
    }

    renderLargeInnocelfButtonFullRound() {
        this.result.textContent = this.textContent;
        this.result.target = '_blank';
        let desiredClassList = [
            'lato-regular',
            'block',
            'text-center',
            'w-3/4',
            'mx-auto',
            // 'w-1/2',
            // 'mt-4',
            'py-2',
            'px-5',
            'rounded-full',
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
            'sm:w-2/3',
            'md:text-xl',
            'md:w-1/2',
            'lg:ml-0',
            'xl:w-1/3',
            'xl:ml-0',
        ];
        desiredClassList.map((item) => {
            this.result.classList.add(item);
        });
        return this;
    }

    renderLargeInnocelfGradientButtonFullRound() {
        this.result.textContent = this.textContent;
        this.result.target = '_blank';
        let desiredClassList = [
            'lato-semibold',
            'block',
            'text-center',
            'w-1/3',
            'py-2',
            'px-5',
            'rounded-full',
            'bg-gradient-to-r',
            'from-gray-300',
            'to-gray-200',
            'shadow',
            'cursor-pointer',
            'text-black',
            'focus:ring',
            'focus:ring-innoblack',
            'focus:ring-offset-4',
            'hover:bg-gray-800',
            'text-sm',
            'md:text-3xl',
            'md:py-4',
            'md:px-8',
        ];
        desiredClassList.map((item) => {
            this.result.classList.add(item);
        });
        return this;
    }

    renderMediumInnocelfButtonFullRound() {
        this.result.textContent = this.textContent;
        this.result.target = '_blank';
        let desiredClassList = [
            'lato-regular',
            'block',
            'text-center',
            'w-2/5',
            // 'w-1/2',
            // 'mt-4',
            'py-2',
            'px-5',
            'rounded-full',
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
            'sm:w-1/3',
            'md:w-1/2',
            'md:text-xl',
            'md:py-2',
            'md:px-5',
            'lg:w-4/12',
        ];
        desiredClassList.map((item) => {
            this.result.classList.add(item);
        });
        return this;
    }

    renderLargeHollowInnocelfButton() {
        this.result.textContent = this.textContent;
        this.result.target = '_blank';
        let desiredClassList = [
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
        desiredClassList.map((item) => {
            this.result.classList.add(item);
        });
        return this;
    }

    renderMediumHollowInnocelfButtonFullRound() {
        this.result.textContent = this.textContent;
        this.result.target = '_blank';
        let desiredClassList = [
            'lato-regular',
            'block',
            'text-center',
            'w-4/12',
            // 'w-1/2',
            // 'mt-4',
            'py-2',
            'px-5',
            'rounded-full',
            'shadow',
            'cursor-pointer',
            'border-2',
            'border-innoblack',
            'focus:ring',
            'focus:ring-innoblack',
            'focus:ring-offset-4',
            'hover:bg-gray-50',
            'text-sm',
            'md:text-xl',
            'md:py-2',
            'md:px-5',
        ];
        desiredClassList.map((item) => {
            this.result.classList.add(item);
        });
        return this;
    }

    renderFooterButton() {
        this.result.textContent = this.textContent;
        this.result.target = '_blank';
        this.result.type = 'button';
        let desiredClassList = [
            'bg-white',
            'text-center',
            'text-black',
            'p-2',
            'block',
            'rounded',
            'mt-3',
            'lato-regular',
        ];
        desiredClassList.map((item) => {
            this.result.classList.add(item);
        });
        return this;
    }

    renderLinkButton() {
        this.result.textContent = this.textContent;
        this.result.type = 'button';
        let desiredClassList = [
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
        desiredClassList.map((item) => {
            this.result.classList.add(item);
        });
        return this;
    }
}
