module.exports = { industry, tags, user };

function industry(root, _args, context) {
	return context.prisma.post({ id: root.id }).industry();
}

function tags(root, _args, context) {
	return context.prisma.post({ id: root.id }).tags();
}

function user(post) {
	return { __typename: 'User', email: post.review_email };
}
