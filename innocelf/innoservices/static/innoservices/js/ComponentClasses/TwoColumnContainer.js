'use strict';
/**
 * The Two Column Container is a container with two columns. The left column
 * has a picture and the right column has text or other material. This is used
 * on the Testimonials and Contact Us Page
 */
export class TwoColumnContainer {
    constructor(idPrepend) {
        this.idPrepend = idPrepend;
        this.result = document.createElement('div');
        this.result.id = idPrepend + '-main-container';
        let firstColumn = this._firstColumn();
        let secondColumn = this._secondColumn();
        this.result.append(firstColumn, secondColumn);
        let containerClasses = [
            'flex',
            'w-11/12',
            'mx-auto',
            'mb-24',
            'lg:flex-row',
            'lg:gap-12',
            'xl:w-3/4',
        ];
        containerClasses.map((item) => {
            this.result.classList.add(item);
        });
    }
    _firstColumn() {
        let container = document.createElement('div');
        let containerClasses = [
            'hidden',
            'items-center',
            'lg:flex',
            'lg:w-2/5',
        ];
        containerClasses.map((item) => {
            container.classList.add(item);
        });
        container.id = this.idPrepend + '-left-container';
        return container;
    }
    _secondColumn() {
        let container = document.createElement('div');
        let containerClasses = [
            'flex',
            'flex-col',
            'w-full',
            'gap-6',
            'mx-auto',
            'lg:w-3/5',
        ];
        containerClasses.map((item) => {
            container.classList.add(item);
        });
        container.id = this.idPrepend + '-right-container';
        return container;
    }
}
