require('dotenv').config();

const request = require('supertest');

const server = require('../server');

describe('Availability', () => {
	const app = server.createHttpServer({});
	const token =
		'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNrM3Jramo2YTAwNWYwNzEya25xY3EyYWMiLCJlbWFpbCI6ImpvaG4ud2lja0BoaXRtYW4ub3JnIiwiaWF0IjoxNTc1NjUwOTYyLCJleHAiOjE1NzU2OTQxNjJ9.f-CoMs6eF5LCZLJal3h19J3494BCZucL13OBF2QUeBU';
});
