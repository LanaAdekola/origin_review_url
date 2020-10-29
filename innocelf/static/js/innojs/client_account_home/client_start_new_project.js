'use strict';

function wordCount() {
	let projectDescription = document.getElementById('start_new_project_description');

	projectDescription.addEventListener('keyup', function () {
		document.getElementById('start_new_project_description_word_count').textContent =
			this.value.length.toString() + ' / 3000';
	});
}

wordCount();

document.getElementById('submit_start_new_project_request').addEventListener('click', function (e) {
	e.preventDefault();

	let formData = new FormData(document.getElementById('start_new_project_request_form'));

	$.ajax({
		type: 'POST',
		url: '',
		data: formData,
		cache: false,
		processData: false,
		contentType: false,
		success: function (data) {
			if (data === 'Success') {
				$('#start_project_request_saved_modal').modal('show');
			} else if (data === 'Failure') {
				$('#start_project_request_failed_modal').modal('show');
			}
		},
	});
});
