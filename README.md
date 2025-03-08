# Backend Developer Assignment

## Objective

#### Demonstrate your ability to build and manage a scalable backend using Nest.js, PostgreSQL, and AWS S3.

# Figure Collection API

## Getting Started

To get this project up and running locally, follow the steps below:

1. Clone repository:
   `git clone https://github.com/DenzelGranadoz/figure-collection-api.git`

2. Change directory into the cloned repository:
   `cd figure-collection-api`

3. Copy the `.env.example` file to `.env` and fill the corresponding fields. db has to match docker

4. Download Docker

5. Open a terminal inside the project directory and run:
   `docker-compose up --build
`

This will run the database and the nestjs application in your local machine

## Testing Endpoints with Postman

You can use the provided Postman collection to test the API endpoints locally.

### Steps to import the collection:

1. Download the Postman collection file:

   - [Download Postman Collection](https://github.com/DenzelGranadoz/figure-collection-api/blob/main/postman/figure-collection-api.postman_collection.json)

2. Open Postman and click on **Import** in the top-left corner.

3. Select the downloaded `.json` file or paste the shared link in the **Link** tab.

4. Once imported, you can use the Postman collection to test the API.

\*\*\*Make sure to run the database and the nestjs application in your local machine

Feel free to reach out if you have any questions or issues while testing the API.

# Design decisions and approach

### Authentication flow

- To implement this, I opted with creating an Auth module and a Users module along with the jwtservice library. Auth module for authenticating and users module to help with validating data from the db. Auth guard to protect routes.
- When user requests to login, authentication happens once user has been validated. I opted to simply return the id and username for verification when testing the endpoint but this can be used to display logged in user data in the frontend.
- When validating the password, I used bcrypt to compare the entered password with the stored hashed password.
- Once user has been validated, we generate access token using JWT and return that along with the username and id.
- The access token can then be used/validated when making requests within protected routes
- In order to control routes, I added an auth guard extract access token and use jwt service to verify the token

### Figure CRUD endpoints

- Most of Figure related features was handled within the Figure module. An upload module was needed in order to accomodate the implementation of uploading a file with AWS S3
- I opted to add the auth guard for each endpoint, to simulate a user logged in making requests
- For the pagination of Get all figures, I used Page and limit queries to easily filter data
- uploading was separated into another module just to keep separation of concerns since business logic was handled within the figure module

### Others

- Separation of Concerns: By using DI, we ensure that a service can be injected to have a modular and maintainable code. This would also make testing easier
- Most of the input validation was handled by the DTOs
- Whenever possible, I attempted to add error handling within each service.
- Meaningful exceptions and http status code
- I opted with using IDs for both Users and Figures table for scalability and handling data when implementing pagination

## Future considerations

- Relationship of the Users and Figures table, a one to many and many to one since a User can own many Figures but a figure has to be tied up to one User
- Look into kubernetes when deploying to Prod
- Role based authorization instead of just limiting protecting routes in a logged in setting
- Look into logging, when the app scales, it would make debugging easier
- Writing Tests, to ensure maintainability. I also left test files for future implementation
- Caching, when the app and data scales,it would be good to speed up retrieval of records
