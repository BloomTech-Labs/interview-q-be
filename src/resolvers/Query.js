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
  where.AND.push({industry: {name: args.industry}});
  if (args.price) {
    let prices = args.price.split(',');
    where.AND.push({price_gte: Number(prices[0])});
    where.AND.push({price_lte: Number(prices[1])});
  }
  if (args.tags) {
    let tags = args.tags.split(' ');
    let idx = where.AND.push({tags_some: {OR: []}});
    tags.forEach(tag => {
      where.AND[idx-1].tags_some.OR.push({name: tag});
    })
  }

  return context.prisma.posts({where, orderBy: args.orderBy})
}

function industry(_parent, args, context) {
  return context.prisma.posts({ where: {industry: {name: args.name}}})
}

function industries(_parent, _args, context){
  return context.prisma.industries();
}