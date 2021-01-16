'use strict';

'use strict';

import { addDashestoPhoneNumber } from './_global_functions.js';

let phoneNumberTextInputId = 'contact_us_phone';
addDashestoPhoneNumber(phoneNumberTextInputId);

document
	.getElementById('contact_us_reason')
	.querySelectorAll('option')
	.forEach(function (el) {
		el.style.backgroundColor = '#2f2c2c';
		el.style.color = 'white';
	});
