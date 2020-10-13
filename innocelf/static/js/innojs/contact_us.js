'use strict';

document.getElementById('contact_us_phone').addEventListener('keyup', function () {
	let phoneNumber = this.value;
	console.log(this.value.length);
	let phoneNumberNew;
	if (this.value.length === 3) {
		phoneNumberNew = phoneNumber + '-';
		this.value = phoneNumberNew;
	} else if (this.value.length === 7) {
		phoneNumberNew = phoneNumber + '-';
		this.value = phoneNumberNew;
	}
});
