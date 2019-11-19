module.exports = {industry};

function industry(root, _args, context) {
    return context.prisma.post({ id:root.id }).industry();
}