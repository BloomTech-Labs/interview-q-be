module.exports = {
  info,
  post,
  posts,
}

function info() {
  return 'Welcome to InterviewQ';
}

function post (_parent, args, context){
  return context.prisma.post({ id: args.id })
}

function posts (_parent, _args, context){
  return context.prisma.posts()
}