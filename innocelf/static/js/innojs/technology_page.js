'use strict';

function readMoreReadLess(tagId) {
	let dots = document.getElementById(tagId + '_dots');
	let serviceDetail = document.getElementById(tagId + '_detail');
	let showMoreButton = document.getElementById(tagId + '_show_more');
	let entireParagraph = document.getElementById(tagId + '_paragraph');

	if (dots.style.display === 'none') {
		dots.style.display = 'inline';
		showMoreButton.textContent = 'read more';
		serviceDetail.style.display = 'none';
		entireParagraph.classList = 'grey-text font-small mx-4 text-justify';
	} else {
		dots.style.display = 'none';
		showMoreButton.textContent = 'read less';
		serviceDetail.style.display = 'inline';
		entireParagraph.classList = 'text-dark font-small mx-4 text-justify';
	}
}
