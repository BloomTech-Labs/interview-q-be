module.exports = {
	createPost,
	deletePost,
	updatePost,
	deleteIndustry,
	updateIndustry,
	removeTagFromPost,
	createAvailability,
	deleteAvailability,
	createBooking,
	deleteBooking,
};

const { checkFields, splitAndTrimTags, getUserId } = require('../utils');

// Mutations/Operations for Post
async function createPost(_parent, args, context) {
	let {
		price,
		position,
		industryName,
		description,
		tagString,
		company,
		isPublished,
	} = args;
	const coachID = getUserId(context);

	if (isPublished) {
		checkFields({ position, industryName, description, company });
	}

	if (tagString) {
		tagString = tagString.toLowerCase();
		const tagArray = splitAndTrimTags(tagString);
		const tagsObjArray = await addNewTags(tagArray, context);

		return Promise.all(tagsObjArray).then(tags => {
			return context.prisma.createPost({
				price,
				position,
				description,
				coachID,
				company,
				isPublished,
				industry: { connect: { name: industryName } },
				tags: { connect: tagArray },
			});
		});
	} else {
		return context.prisma.createPost({
			price,
			position,
			description,
			coachID,
			company,
			isPublished,
			industry: { connect: { name: industryName } },
		});
	}
}

async function deletePost(_parent, _args, context) {
	const id = getUserId(context);
	let foundPostTags = await context.prisma
		.post({ coachID: id })
		.tags()
		.id();
	updatedPost = await context.prisma.deletePost({ coachID: id });
	deleteDisconnectedTags(context, foundPostTags);
	return updatedPost;
}

async function updatePost(_parent, args, context) {
	let {
		id,
		price,
		position,
		description,
		industryName,
		tagString,
		company,
		isPublished,
	} = args;
	let updatedPost;
	let foundPostTags;
	if (tagString !== undefined) {
		foundPostTags = await context.prisma
			.post({ id })
			.tags()
			.id();
		await context.prisma.updatePost({
			data: {
				tags: { disconnect: foundPostTags },
			},
			where: {
				id,
			},
		});
	}
	if (tagString && industryName) {
		tagString = tagString.toLowerCase();
		const tagArray = splitAndTrimTags(tagString);
		const tagsObjArray = await addNewTags(tagArray, context);
		updatedPost = await context.prisma.updatePost({
			data: {
				price,
				position,
				description,
				company,
				isPublished,
				industry: { connect: { name: industryName } },
				tags: { connect: tagArray },
			},
			where: {
				id,
			},
		});
	} else if (tagString) {
		tagString = tagString.toLowerCase();
		const tagArray = splitAndTrimTags(tagString);
		const tagsObjArray = await addNewTags(tagArray, context);
		updatedPost = await context.prisma.updatePost({
			data: {
				price,
				position,
				description,
				company,
				isPublished,
				tags: { connect: tagArray },
			},
			where: {
				id,
			},
		});
	} else if (industryName) {
		updatedPost = await context.prisma.updatePost({
			data: {
				price,
				position,
				description,
				isPublished,
				company,
				industry: { connect: { name: industryName } },
			},
			where: {
				id,
			},
		});
	} else {
		//If no industry and tagname
		updatedPost = await context.prisma.updatePost({
			data: { price, position, description, isPublished, company },
			where: {
				id,
			},
		});
	}
	if (foundPostTags) {
		deleteDisconnectedTags(context, foundPostTags);
	}
	return updatedPost;
}

// Mutations/Operations for Industry
function deleteIndustry(_parent, args, context) {
	return context.prisma.deleteIndustry({ id: args.id });
}

function updateIndustry(_parent, args, context) {
	return context.prisma.updateIndustry({
		data: { args },
		where: {
			id,
		},
	});
}

// Mutations/Operations for Tag
function addNewTags(array, context) {
	return array.map(async tag => {
		return await context.prisma.upsertTag({
			where: {
				name: tag.name,
			},
			create: {
				name: tag.name,
			},
			update: {
				name: tag.name,
			},
		});
	});
}

function removeTagFromPost(_parent, args, context) {
	const { id, tag } = args;

	return context.prisma.updatePost({
		data: { tags: { delete: { name: tag } } },
		where: { id },
	});
}

function deleteDisconnectedTags(context, tags) {
	return Promise.all(
		tags.map(async tag => {
			if (
				(await context.prisma
					.postsConnection({ where: { tags_some: { id: tag.id } } })
					.aggregate()
					.count()) === 0
			) {
				return await context.prisma.deleteTag({ id: tag.id });
			}
		}),
	);
}

// Mutations/Operations for Availibilities
async function createAvailability(_parent, args, context) {
	const { year, month, day, start_hour, start_minute } = args;
	const coach = getUserId(context);
	const uniquecheck = coach + year + month + day + start_hour + start_minute;

	return context.prisma.createAvailability({
		...args,
		coach,
		isOpen: true,
		uniquecheck,
		recurring: false,
	});
}

function deleteAvailability(_parent, args, context) {
	return context.prisma.deleteAvailability({ id: args.id });
}

// Mutations/Operations for Bookings

function createBooking(parent, args, context) {
	return context.prisma.createBooking({})
}

function deleteBooking(parent, args, context) {
	return context.prisma.deleteBooking({id: args.id})
}
