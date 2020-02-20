module.exports = { industry, coach, tags, __resolveReference };

function industry(parent, _args, context) {
  return context.prisma.post({ id: parent.id }).industry();
}

function coach(post) {
  return { __typename: "User", authId: post.coachID };
}

function tags(parent, _args, context) {
  return context.prisma.post({ id: parent.id }).tags();
}

function __resolveReference(post, context) {
  return context.prisma.post({ id: post.id });
}
