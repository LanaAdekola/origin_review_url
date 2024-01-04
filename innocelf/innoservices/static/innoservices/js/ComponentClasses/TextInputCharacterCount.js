'use strict';

export class TextInputCharacterCount {
    constructor(labelWithInput) {
        this.labelWithInput = labelWithInput;
        this.counterSpan = document.createElement('span');
        this.counterSpan.classList.add('text-xs', 'lato-light', 'text-right');
        this.labelWithInput.append(this.counterSpan);

        let input =
            this.labelWithInput.querySelector('input') ||
            this.labelWithInput.querySelector('textarea');

        if (input.hasAttribute('maxlength')) {
            let inputValuesLength = input.value.length.toFixed(0);
            let maxLength = input.getAttribute('maxlength');
            let maxLengthInt = parseInt(maxLength);

            // Initial text
            this.counterSpan.textContent =
                inputValuesLength + ' / ' + maxLength;

            input.onkeyup = (e) => {
                let characterLength = e.target.value.length;
                this.counterSpan.textContent =
                    characterLength.toFixed(0) + ' / ' + maxLength;
            };
        }
    }
}
