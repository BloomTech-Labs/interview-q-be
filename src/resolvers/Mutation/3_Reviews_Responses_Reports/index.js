module.exports = {
	createReview,
	updateReview,
	deleteReview,
	createResponse,
	updateResponse,
	deleteResponse,
	createReport,
	updateReport,
};

// Mutations for Reviews
async function createReview(_parent, args, context) {
	const { uniqueBooking, rating, review } = args;

	const booking = await context.prisma.booking({ uniquecheck: uniqueBooking });

	const post = await context.prisma.post({ coachID: booking.coach });

	return context.prisma.createReview({
		coach: booking.coach,
		seeker: booking.seeker,
		booking: {
			connect: { uniquecheck: uniqueBooking },
		},
		rating,
		review,
		post: {
			connect: { id: post.id },
		},
	});
}

function updateReview(_parent, args, context) {
	return context.prisma.updateReview({
		data: { args },
		where: {
			id,
		},
	});
}

function deleteReview(_parent, args, context) {
	return context.prisma.deleteReview({ id: args.id });
}

// Mutations for Responses
function createResponse(_parent, args, context) {
	const { reviewID, uniqueBooking, text } = args;

	return context.prisma.createReview({
		review: {
			connect: { id: reviewID },
		},
		text,
		booking: {
			connect: { uniquecheck: uniqueBooking },
		},
	});
}

function updateResponse(_parent, args, context) {
	return context.prisma.updateResponse({
		data: { args },
		where: { id },
	});
}

function deleteResponse(_parent, args, context) {
	return context.prisma.deleteResponse({ id: args.id });
}

// Mutations for Reports
async function createReport(_parent, args, context) {
	const {
		uniqueBooking,
		strengths,
		growthAreas,
		suggestions,
		additionalComments,
	} = args;

	const booking = await context.prisma.booking({ uniquecheck: uniqueBooking });

	return context.prisma.createReport({
		coach: booking.coach,
		seeker: booking.seeker,
		booking: {
			connect: { uniquecheck: uniqueBooking },
		},
		strengths,
		growthAreas,
		suggestions,
		additionalComments,
	});
}

function updateReport(_parent, args, context) {
	return context.prisma.updateReport({
		data: { args },
		where: { id },
	});
}