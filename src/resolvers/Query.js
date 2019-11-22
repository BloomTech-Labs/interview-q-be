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

function posts(parent, args, context){
  // Create filter here
  let where =  {AND: []};
  if (args.industry) {
    where.AND.push({industry: {name: args.industry}});
  }
  if (args.price) {
    let prices = args.price.split(',');
    where.AND.push({price_gte: Number(prices[0])});
    where.AND.push({price_lte: Number(prices[1])});
  }
  return context.prisma.posts({where})
}

function industry(_parent, args, context) {
  return context.prisma.posts({ where: {industry: {name: args.name}}})
}

function industries(_parent, _args, context){
  return context.prisma.industries();
}