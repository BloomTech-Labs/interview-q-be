module.exports = {
  interviewQinfo,
  post,
  posts,
  industry,
  industries
}

function interviewQinfo() {
  return '"Welcome to InterviewQ" - love JQH';
}

function post(_parent, args, context){
  return context.prisma.post({ id: args.id })
}

function posts(_parent, _args, context){
  return context.prisma.posts()
}

function industry(_parent, args, context) {
  return context.prisma.posts({ where: {industry: {name: args.name}}})
}

function industries(_parent, _args, context){
  return context.prisma.industries();
}