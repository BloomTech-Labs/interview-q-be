const {
  createPost,
	deletePost,
	updatePost,
	deleteIndustry,
	updateIndustry,
	removeTagFromPost,
} = require('./Posts');

const {
	createAvailability,
	deleteAvailability,
	createBooking,
  deleteBooking,
} = require('./Availabilities');

const {
	createReview,
	updateReview,
	deleteReview,
	createResponse,
	updateResponse,
	deleteResponse,
	createReport,
	updateReport,
} = require('./Feedback');

module.exports = {
	createPost,
	deletePost,
	updatePost,
	deleteIndustry,
	updateIndustry,
	removeTagFromPost,
	createAvailability,
	deleteAvailability,
	createBooking,
	deleteBooking,
	createReview,
	updateReview,
	deleteReview,
	createResponse,
	updateResponse,
	deleteResponse,
	createReport,
	updateReport,
};
