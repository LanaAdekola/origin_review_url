'use strict';

let phoneNumberTextInputId = 'contact_us_phone';
addDashestoPhoneNumber(phoneNumberTextInputId);

document
	.getElementById('contact_us_reason')
	.querySelectorAll('option')
	.forEach(function (el) {
		el.style.backgroundColor = '#2f2c2c';
		el.style.color = 'white';
	});

document.getElementById('submit_contact_us_form').addEventListener('click', function (e) {
	if (document.getElementById('contact_us_form').checkValidity()) {
		e.preventDefault();
		grecaptcha.ready(function () {
			grecaptcha.execute(recaptcha_site_key, { action: 'submit' }).then(function (token) {
				let input = document.createElement('input');
				input.type = 'hidden';
				input.name = 'g-recaptcha-response';
				input.value = token;
				document.getElementById('contact_us_form').append(input);
				document.getElementById('contact_us_form').submit();
			});
		});
	}
});
