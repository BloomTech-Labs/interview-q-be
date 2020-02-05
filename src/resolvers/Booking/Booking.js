module.exports = {
	coach,
	seeker,
	__resolveReference,
	availability,
	review,
	// response,
	report,
};

function coach(booking) {
	return { __typename: 'User', id: booking.coach };
}

function seeker(booking) {
	return { __typename: 'User', id: booking.seeker };
}

function __resolveReference(booking, context) {
	return context.prisma.booking({ id: booking.id });
}

function availability(parent, _args, context) {
	return context.prisma.booking({ id: parent.id }).availability();
}



function report(parent, _args, context) {
	return context.prisma.booking({ id: parent.id }).report();
}

// provides information to __resolveReference in Core Review resolver
function review(parent) {
	return { __typename: "Review", job: parent.id }
}
