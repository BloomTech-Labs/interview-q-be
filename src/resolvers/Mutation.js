module.exports = {
  createPost,
  deletePost,
  updatePost,
}

const {checkFields} = require('../utils');

function createPost(_parent, args, context){
    const { price, position, industryName, description } = args;
    
    checkFields({price, position, industryName, description});

    return context.prisma.createPost({price, position, industry: {connect: {name: industryName}}, description});
}

function deletePost(_parent, args, context){
  return context.prisma.deletePost({ id: args.id })
}

function updatePost(parent, args, context) {
  const { price, position, description, id } = args;

  return context.prisma.updatePost({
    data: {price, position, description},
    where: {
      id
    }
  })
}