# API Documentation

#### Backend deployed at [Heroku](https://interview-q-staging.herokuapp.com/) <br>
Contact Labs19 team for alternate deployment.
## Getting started

To get the server running locally:

- Clone this repo
- **npm install** to install all required dependencies
- **npm run server** to start the local server
- **npm test** to start server using testing environment

### Node.js + graphql-yoga + Prisma + Apollo Federation

We chose this framework for:

- Scalability: since the QualityHub project currently includes Core and InterviewQ (but will include future modules, like ResumeQ, etc.), we wanted to set up a gateway that would connect the different back-ends
- Simplicity: we wanted to set up a gateway so that the various front-end apps associated with the QualityHub project would only need to hit one endpoint
- Flexibility: we chose to implement GraphQL to make it easier for future front-end developers to access the backend schema

## Endpoints

#### Organization Routes & User Routes

InterviewQ: https://interview-q-staging.herokuapp.com

This GraphQL back-end API is connected to the overall project via Apollo Federation through the Gateway here: https://quality-hub-gateway-staging.herokuapp.com

# Data Model

Specific schemas (data models, queries, mutations) for the GraphQL back-end API can be accessed at the link above. Additional documentation is viewable in the GraphQL Playground for the Federation Gateway.

```
type Post {
  id: ID! @id
  price: Int
  position: String
  industry: Industry
  description: String
  coachID: String! @unique
  createdAt: DateTime! @createdAt
  lastUpdated: DateTime! @updatedAt
  company: String
  isPublished: Boolean! @default(value: true)
  desc_lc: String
  company_lc: String
  position_lc: String
  tags: [Tag]!
  # coach: User @provides(fields: "email") @relation(link: TABLE name: "UserOnPost", onDelete: SET_NULL)
  # ratingsId: ID!
}

type Industry {
	id: ID! @id
	name: String! @unique
  posts: [Post]!
}

type Tag {
  id: ID! @id
  name: String! @unique
  posts: [Post]!
}

type Availability {
  id: ID! @id
  hour: Int!
  minute: Int!
  coach: String!
  bookingID: String
	year: Int!
	month: Int!
	day: Int!
  uniquecheck: String! @unique
	isOpen: Boolean!
	recurring: Boolean!
}

type Booking {
  id: ID! @id
  year: Int!
  month: Int!
  day: Int!
  hour: Int!
  minute: Int!
  coach: String!
  seeker: String!
  uniquecheck: String! @unique
  availability: [Availability]!
	pending: Boolean
	confirmed: Boolean
  interviewGoals: String
  interviewQuestions: String
  resumeURL: String
  report: Report @relation(link: INLINE)
  price: Int!
  date: DateTime!
}



type Report {
  id: ID! @id
  coach: String!
  seeker: String!
  booking: Booking! @unique
  strengths: String!
  growthAreas: String!
  suggestions: String!
  additionalComments: String
  createdAt: DateTime! @createdAt
  isSent: Boolean
}


```



## Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

For dynamic deployment, env-cmd is recommended. in the ./config directory you may specify different environment files for different purposes. For local development, the development.env file can be created and used. See Docker information below to more details.

- JWT_SECRET - Used for authentication - must match between each federation member.
- PRISMA_ENDPOINT - specifies prisma service endpoint.
- PRISMA_SECRET - specifies secret to access prisma.
- PRISMA_MANAGEMENT_API_SECRET - not in use. Specifies the secret to manage Prisma.
- PRISMA_PORT - Port on which Prisma service Runs
- APOLLO_PORT - Port on which Apollo Server Runs
- PG_USER - Postgres DB username.
- PG_PASSWORD - Postgres DB password.


## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](https://github.com/Lambda-School-Labs/quality-hub-core-fe) for details on the front-end of our project.

## Local Development

Requirements: NodeJS, Prisma CLI, and Docker (Docker Desktop was used)

### Initialization

cd to src directory, check out a new feature branch using `git checkout -b <feature-name>`, make sure new feature branch is even with functional master branch (may be production in some cases).

Run `npm i` to install dependencies, check package.json to verify that `env-cmd` has been added.

Run `docker-compose up` to start a Docker container from `docker-compose.yml`

`docker-compose.yml` contains information which docker-compose will use to build the Prisma and Postgres services for this repository.

An .env file is needed at the root directory with the following variables defined:

- `PRISMA_ENDPOINT`, `PRISMA_SECRET`, `PG_USER`, `PG_PASSWORD`

cd to src/prisma and run `prisma deploy -e ..config/development.env`

This will build a Prisma service from prisma.yml and datamodel.prisma and deploy it according to the environment variables contained in src/config/development.env listed below

- `PRISMA_ENDPOINT`, `PRISMA_SECRET`, `PG_USER`, `PG_PASSWORD`, `JWT_SECRET`

cd to the parent directory `cd ..`

Run `npm run development` This executes the development script which assigns the .env variables to those contained in /config/development.env and will start an instance of node at the assigned port. _This endpoint will be specified in the Gateway's environment variable and assigned to its corresponding service._

### Updating Prisma Service

If changes are made to datamodel.prisma, the service will need to be deployed using `prisma deploy -e ../config/development.env` following that, the Prisma client will need to be generated. Run `prisma generate -e ../config/development.env` This updates src/generated with the latest version of Prisma Client.
