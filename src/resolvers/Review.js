module.exports = { coach, seeker, booking };

function coach(review) {
	return { __typename: 'User', id: review.coach };
}

function seeker(review) {
	return { __typename: 'User', id: review.seeker };
}

function booking(parent, _args, context) {
	return context.prisma.review({ id: parent.id }).booking();
}
