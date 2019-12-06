require('dotenv').config();

const request = require('supertest');

const server = require('../server');

const token =
	'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNrM3Jramo2YTAwNWYwNzEya25xY3EyYWMiLCJlbWFpbCI6ImpvaG4ud2lja0BoaXRtYW4ub3JnIiwiaWF0IjoxNTc1NjUwOTYyLCJleHAiOjE1NzU2OTQxNjJ9.f-CoMs6eF5LCZLJal3h19J3494BCZucL13OBF2QUeBU';

describe('Availability Queries', () => {
	const app = server.createHttpServer({});

	let coachID;
	let uniquecheck;

	it('returns availabilities', async () => {
		const response = await request(app)
			.post('/')
			.send({
				query: `query {
        availabilities {
          id
          uniquecheck
          coach {
            id
          }
        }
      }`,
			});

		coachID = response.body.data.availabilities[0].coach.id;
		uniquecheck = response.body.data.availabilities[0].uniquecheck;

		expect(response.body.data.availabilities).toBeTruthy();
	});

	it('returns availabilities by coach', async () => {
		const response = await request(app)
			.post('/')
			.send({
				query: `query {
	    availabilitiesByCoach(coach_id: "${coachID}") {
        id
      }
	  }`,
			});

		expect(response.body.data.availabilitiesByCoach).toBeTruthy();
	});

	it('returns availabilities by uniquecheck', async () => {
		const response = await request(app)
			.post('/')
			.send({
				query: `query {
        availabilityByUniquecheck(uniquecheck: "${uniquecheck}") {
          id
        }
      }`,
			});

		expect(response.body.data.availabilityByUniquecheck).toBeTruthy();
	});
});

describe('Availability Mutations', () => {
	const app = server.createHttpServer({});

	let uniquecheck;

	const randomInt = (a, b) => {
		const min = Math.ceil(a);
		const max = Math.floor(b);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	it('creates an availability', async () => {
		const response = await request(app)
			.post('/')
			.set({ Authorization: token })
			.send({
				query: `mutation {
          createAvailability(start_hour: ${randomInt(
						1,
						12,
					)}, start_minute: ${randomInt(0, 60)}, year: ${randomInt(
					2020,
					2030,
				)}, month: ${randomInt(1, 12)}, day: ${randomInt(
					1,
					31,
				)}, recurring: false) {
          id
            uniquecheck
          }
        }`,
			});

		uniquecheck = response.body.data.createAvailability.uniquecheck;

		expect(response.body.data.createAvailability.id).toBeTruthy();
	});

	it('deletes an availability', async () => {
		const mutation = await request(app)
			.post('/')
			.set({ Authorization: token })
			.send({
				query: `mutation {
        deleteAvailability(uniquecheck: "${uniquecheck}") {
          id
        }
      }`,
			});

		expect(mutation.body.data.deleteAvailability.id).toBeTruthy();

		const query = await request(app)
			.post('/')
			.send({
				query: `query {
        availabilityByUniquecheck(uniquecheck: "${uniquecheck}") {
          id
        }
      }`,
			});

		expect(query.body.data).toBeFalsy();
	});
});
