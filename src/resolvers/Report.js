module.exports = { coach, seeker, booking };

function coach(report) {
	return { __typename: 'User', id: report.coach };
}

function seeker(report) {
	return { __typename: 'User', id: report.seeker };
}

function booking(parent, args, context) {
	return context.prisma.report({ id: parent.id }).booking();
}
