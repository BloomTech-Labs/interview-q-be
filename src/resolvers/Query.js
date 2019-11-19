module.exports = {
  interviewQinfo,
  post,
  posts,
}

function interviewQinfo() {
  return '"Welcome to InterviewQ" - love JQH';
}

function post (_parent, args, context){
  return context.prisma.post({ id: args.id })
}

function posts (_parent, _args, context){
  return context.prisma.posts()
}