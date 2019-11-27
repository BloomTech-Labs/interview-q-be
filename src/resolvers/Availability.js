module.exports = {
	// user
	coach,
	__resolveReference,
};

// function user(root, _args, context) {
//   return context.prisma.availability({ id: root.id }).user()
// }

function coach(availability) {
	return { __typename: 'User', id: availability.coach };
}

function __resolveReference(availability, context) {
	return context.prisma.availability({ id: availability.id });
}
