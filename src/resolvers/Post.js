module.exports = { industry, coach, tags, __resolveReference };

function industry(root, _args, context) {
	return context.prisma.post({ id: root.id }).industry();
}

function coach(post) {
	return { __typename: 'User', id: post.coachID };
}

function tags(root, _args, context) {
	return context.prisma.post({ id: root.id }).tags();
}

function __resolveReference(post, context) {
	return context.prisma.post({ id: post.id });
}
