module.exports = { industry, tags };

function industry(root, _args, context) {
    return context.prisma.post({ id: root.id }).industry();
}

function tags(root, _args, context) {
    return context.prisma.post({ id: root.id }).tags();
}