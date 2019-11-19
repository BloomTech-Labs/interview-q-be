module.exports = {
  createPost,
  deletePost,
  updatePost,
}

const {checkFields} = require('../utils');

function createPost(_parent, args, context){
    const { price, position, description } = args;
    
    checkFields({price, position, description});

    return context.prisma.createPost(args);
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