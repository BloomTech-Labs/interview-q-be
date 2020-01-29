function post(parent, _args, context) {
  return context.prisma.post({ coachID: parent.id });
}

module.exports = {
  post,
};
