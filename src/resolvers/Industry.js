module.exports = { posts };

function posts(root, _args, context) {
	return context.prisma.industry({ id: root.id }).posts();
}
