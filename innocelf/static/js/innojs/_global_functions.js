'use strict';

export function addDashestoPhoneNumber(phoneNumberTextInputId) {
	document.getElementById(phoneNumberTextInputId).addEventListener('keyup', function () {
		let phoneNumber = this.value;
		let phoneNumberNew;
		if (this.value.length === 3) {
			phoneNumberNew = phoneNumber + '-';
			this.value = phoneNumberNew;
		} else if (this.value.length === 7) {
			phoneNumberNew = phoneNumber + '-';
			this.value = phoneNumberNew;
		}
	});
}
