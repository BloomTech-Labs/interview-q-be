module.exports = {
	// user
	coach,
	__resolveReference,
};

// function user(parent, _args, context) {
//   return context.prisma.availability({ id: parent.id }).user()
// }

function coach(availability) {
	return { __typename: 'User', id: availability.coach };
}

function __resolveReference(availability, context) {
	return context.prisma.availability({ id: availability.id });
}
