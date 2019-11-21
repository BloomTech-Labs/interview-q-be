function post(parent, args, context, info) {
  return context.prisma.post({coachID: parent.id})
}

module.exports = {
  post
}