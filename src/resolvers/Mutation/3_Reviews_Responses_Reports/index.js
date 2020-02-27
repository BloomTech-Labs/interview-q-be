module.exports = {
  createReview,
  updateReview,
  deleteReview,
  createResponse,
  updateResponse,
  deleteResponse,
  createReport,
  updateReport
};

const { checkFields, splitAndTrimTags, getUserId } = require("../../../utils");

// Mutations for Reviews
async function createReview(_parent, args, context) {
  console.log("CREATE REVIEW");

  const { uniqueBooking, rating, review } = args;

  const booking = await context.prisma.booking({ uniquecheck: uniqueBooking });

  return context.prisma.createReview({
    coach: booking.coach,
    seeker: booking.seeker,
    booking: {
      connect: { uniquecheck: uniqueBooking }
    },
    rating,
    review
  });
}

function updateReview(_parent, args, context) {
  const { id, rating, review } = args;
  return context.prisma.updateReview({
    data: { rating, review },
    where: {
      id
    }
  });
}

function deleteReview(_parent, args, context) {
  return context.prisma.deleteReview({ id: args.id });
}

// Mutations for Responses
function createResponse(_parent, args, context) {
  const { reviewID, uniqueBooking, text } = args;

  return context.prisma.createResponse({
    review: {
      connect: { id: reviewID }
    },
    text,
    booking: {
      connect: { uniquecheck: uniqueBooking }
    }
  });
}

function updateResponse(_parent, args, context) {
  const { id, text } = args;
  return context.prisma.updateResponse({
    data: { text },
    where: { id }
  });
}

function deleteResponse(_parent, args, context) {
  return context.prisma.deleteResponse({ id: args.id });
}

// Mutations for Reports
async function createReport(_parent, args, context) {
  console.log("RUNNING CREATEREPORT MUTATION");
  const {
    uniqueBooking,
    firstImpression_rating,
    firstImpression_comment,
    resume_rating,
    resume_comment,
    professionalism_rating,
    professionalism_comment,
    generalAttitude_rating,
    generalAttitude_comment,
    technicalProficiency_rating,
    technicalProficiency_comment,
    contentOfAnswers_rating,
    contentOfAnswers_comment,
    communication_rating,
    communication_comment
  } = args;

  const booking = await context.prisma.booking({ uniquecheck: uniqueBooking });

  console.log("pre-return");

  return context.prisma.createReport({
    coach: booking.coach,
    seeker: booking.seeker,
    booking: {
      connect: { uniquecheck: uniqueBooking }
    },
    firstImpression_rating,
    firstImpression_comment,
    resume_rating,
    resume_comment,
    professionalism_rating,
    professionalism_comment,
    generalAttitude_rating,
    generalAttitude_comment,
    technicalProficiency_rating,
    technicalProficiency_comment,
    contentOfAnswers_rating,
    contentOfAnswers_comment,
    communication_rating,
    communication_comment
  });
}

function updateReport(_parent, args, context) {
  return context.prisma.updateReport({
    data: { args },
    where: { id }
  });
}
