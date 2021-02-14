'use strict';

// Enable the "comment on upwork" asterisk
document.getElementById('comment_on_upwork').style.display = 'inline';

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

		if (allReviewsJson[i].fields.upwork_review === true) {
			newReviewCard.setAttribute('upwork-review', 'true');
		}
		carouselItem.append(newReviewCard);

		document.getElementById('carousel_review_list').append(carouselItem);
	}
}

addReviews();
