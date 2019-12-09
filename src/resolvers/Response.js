module.exports = { review };

function review(parent, _args, context) {
	return context.prisma.response({ id: parent.id }).review();
}
