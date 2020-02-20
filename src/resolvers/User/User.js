function post(parent, _args, context) {
  return context.prisma.post({ coachID: parent.authId });
}

module.exports = {
  post
};
