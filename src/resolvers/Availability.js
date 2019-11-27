module.exports = {
  // user
  coach
}

// function user(root, _args, context) {
//   return context.prisma.availability({ id: root.id }).user()
// }

function coach(availability) {
  return { __typename: "User", id: availability.coach }
}