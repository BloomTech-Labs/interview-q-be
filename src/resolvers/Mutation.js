module.exports = {
    createPost,
    deletePost,
    updatePost,
}

const { checkFields, splitAndTrimTags } = require('../utils');

async function createPost(_parent, args, context) {
    const { price, position, industryName, description, tagString } = args;

    checkFields({ price, position, industryName, description });

    // const tagArray = splitAndTrimTags(tagString);
    // console.log(tagArray)

    // const tagsObjArray = tagArray.map(tag => {
    //     console.log(tag)
    const tag = await context.prisma.upsertTag({
            where: {
                name: tagString
            },
            create: {
                name: tagString
            },
            update: {
                name: tagString
            }
        })
        .then(res => {
            console.log(res);
        })
        // })

    // console.log(tagsObjArray);

    return context.prisma.createPost({ price, position, industry: { connect: { name: industryName } }, description, tags: { connect: {name: tagString } } });
}

function deletePost(_parent, args, context) {
    return context.prisma.deletePost({ id: args.id })
}

function updatePost(_parent, args, context) {
    const { price, position, description, id } = args;

    return context.prisma.updatePost({
        data: { price, position, description },
        where: {
            id
        }
    })
}