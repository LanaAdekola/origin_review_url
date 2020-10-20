'use strict';

let clientQs = JSON.parse(document.getElementById('client_qs').textContent);
let jsonClientQs = JSON.parse(clientQs);
console.log(jsonClientQs);

document.getElementById('edit_client_profile').addEventListener('click', function () {
	let allTextInputs = document.querySelectorAll('.form-control');

	for (let text = 0; text < allTextInputs.length; text++) {
		allTextInputs[text].disabled = false;
	}

	if (jsonClientQs[0].fields.global_nda_document === '' && jsonClientQs[0].fields.global_nda_authorization) {
		document.getElementById('client_use_global_nda').disabled = false;
		document.getElementById('client_global_nda').disabled = false;
	} else if (jsonClientQs[0].fields.global_nda_document === '' && !jsonClientQs[0].fields.global_nda_authorization) {
		document.getElementById('client_use_global_nda').disabled = false;
	}

	document.getElementById('save_client_profile').disabled = false;
});

document.getElementById('client_use_global_nda').addEventListener('change', function () {
	if (this.checked) {
		document.getElementById('client_global_nda_choose_file').classList =
			'btn btn-flat border border-dark btn-sm float-left';
		document.getElementById('client_global_nda').disabled = false;
	} else {
		document.getElementById('client_global_nda_choose_file').classList =
			'btn btn-flat border border-dark btn-sm float-left disabled';
		document.getElementById('client_global_nda').disabled = true;
	}
});

function readNDAFile(filesData) {
	// let filesData = e.target.files;
	return new Promise((resolve, reject) => {
		let fileReader = new FileReader();
		fileReader.onload = function (event) {
			let fileContents = event.target.result;
			resolve(fileContents);
		};
		fileReader.readAsBinaryString(filesData[0]);
	});
}

document.getElementById('save_client_profile').addEventListener('click', async function (e) {
	e.preventDefault();

	let formData = new FormData(document.getElementById('change_client_information'));

	$.ajax({
		type: 'POST',
		url: '/update-client-profile',
		data: formData,
		cache: false,
		processData: false,
		contentType: false,
		success: function () {
			$('#information_saved_success_modal').modal('show');
		},
	});

});
