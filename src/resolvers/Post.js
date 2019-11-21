module.exports = { industry, coach, tags };

function industry(root, _args, context) {
    return context.prisma.post({ id: root.id }).industry();
}

async function coach(post, args, context) {
  let user = await context.prisma.post({id: post.id}).coach()
  console.log(user);
  return { __typename: "User", email: user.email, isCoach: user.isCoach }
}

function tags(root, _args, context) {
    return context.prisma.post({ id: root.id }).tags();
}