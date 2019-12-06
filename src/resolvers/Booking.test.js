require('dotenv').config();

const request = require('supertest');

const server = require('../server');

const token =
	'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNrM3Jramo2YTAwNWYwNzEya25xY3EyYWMiLCJlbWFpbCI6ImpvaG4ud2lja0BoaXRtYW4ub3JnIiwiaWF0IjoxNTc1NjUwOTYyLCJleHAiOjE1NzU2OTQxNjJ9.f-CoMs6eF5LCZLJal3h19J3494BCZucL13OBF2QUeBU';

describe('Booking Queries', () => {
	const app = server.createHttpServer({});

	let uniquecheck;
	let coachID;
	let seekerID;

	it('returns bookings', async () => {
		const response = await request(app)
			.post('/')
			.send({
				query: `query {
          bookings {
            id
            uniquecheck
            coach {
              id
            }
            seeker {
              id
            }
          }
        }`,
			});

		uniquecheck = response.body.data.bookings[0].uniquecheck;
		coachID = response.body.data.bookings[0].coach.id;
		seekerID = response.body.data.bookings[0].uniquecheck;

		expect(response.body.data.bookings).toBeTruthy();
	});

	it('returns bookings by coach', async () => {
		const response = await request(app)
			.post('/')
			.send({
				query: `query {
          bookingsByCoach(coach_id: "${coachID}") {
            id
          }
        }`,
			});

		expect(response.body.data.bookingsByCoach).toBeTruthy();
	});

	it('returns bookings by seeker', async () => {
		const response = await request(app)
			.post('/')
			.send({
				query: `query {
          bookingsBySeeker(seeker_id: "${seekerID}") {
            id
          }
        }`,
			});

		expect(response.body.data.bookingsBySeeker).toBeTruthy();
	});

	it('returns bookings by uniquecheck', async () => {
		const response = await request(app)
			.post('/')
			.send({
				query: `query {
          bookingByUniquecheck(uniquecheck: "${uniquecheck}") {
            id
          }
        }`,
			});

		expect(response.body.data.bookingByUniquecheck).toBeTruthy();
	});
});

describe('Booking Mutations', () => {
	const app = server.createHttpServer({});

	let uniquecheck;

	const randomInt = (a, b) => {
		const min = Math.ceil(a);
		const max = Math.floor(b);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	it('creates a booking', async () => {
		const availabilities = await request(app)
			.post('/')
			.send({
				query: `query {
        availabilities {
          id
          coach {
            id
          }
        }
      }`,
			});

		const coachID = availabilities.body.data.availabilities[0].coach.id;
		const availabilityA = availabilities.body.data.availabilities[0].id;
		const availabilityB = availabilities.body.data.availabilities[1].id;

		const response = await request(app)
			.post('/')
			.set({ Authorization: token })
			.send({
				query: `mutation {
          createBooking(
            year: ${randomInt(2020, 2030)}
            month: ${randomInt(1, 12)}
            day: ${randomInt(1, 31)}
            hour: ${randomInt(0, 23)}
            minute: ${randomInt(0, 60)}
            coach: "${coachID}"
            availabilityA: "${availabilityA}"
            availabilityB: "${availabilityB}"
          ) {
            id
            uniquecheck
          }
        }`,
			});

		uniquecheck = response.body.data.createBooking.uniquecheck;

		expect(response.body.data.createBooking.id).toBeTruthy();
	});

	it('deletes a booking', async () => {
		const mutation = await request(app)
			.post('/')
			.set({ Authorization: token })
			.send({
				query: `mutation {
          deleteBooking(uniquecheck: "${uniquecheck}") {
            id
          }
        }`,
			});

		expect(mutation.body.data.deleteBooking.id).toBeTruthy();

		const query = await request(app)
			.post('/')
			.send({
				query: `query {
          bookingByUniquecheck(uniquecheck: "${uniquecheck}") {
            id
          }
        }`,
			});

		expect(query.body.data).toBeFalsy();
	});
});
