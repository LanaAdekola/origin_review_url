'use strict';

function addReviews() {
	let allReviews = JSON.parse(document.getElementById('all_reviews_json').textContent);
	let allReviewsJson = JSON.parse(allReviews);

	for (let i = 0; i < allReviewsJson.length; i++) {
		let testimonialName =
			allReviewsJson[i].fields.first_name +
			' ' +
			allReviewsJson[i].fields.last_name[0] +
			'. (' +
			allReviewsJson[i].fields.month_year +
			')';

		let carouselItem = document.createElement('div');
		if (i === 0) {
			carouselItem.classList = 'carousel-item active';
		} else {
			carouselItem.classList = 'carousel-item';
		}
		let newReviewCard = new TestimonialCard();
		newReviewCard.setAttribute('testimonial-name', testimonialName);
		newReviewCard.setAttribute('testimonial-content', allReviewsJson[i].fields.review);

		carouselItem.append(newReviewCard);

		document.getElementById('carousel_review_list').append(carouselItem);
	}
}

addReviews();
