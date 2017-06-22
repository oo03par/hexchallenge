# HEX Challenge
Holiday Extras remote code challenge

## Pre-Requisites
The following are pre-requisite of the project:

* [NodeJS](https://nodejs.org/en/) - built with version 4.4.7
* [npm](https://www.npmjs.com/) - built with version 2.15.8
* [MongoDB](https://www.mongodb.com/) - run against version 3.2.8

The project has been written to use Mongo in non-authenticated mode. I am running in a docker container using the following docker command

```
docker run --name mongo -p 27017:27017 -d mongo
```

Please check the project out and run the following command to update local packages etc.:

```
npm update
```

## Running
Run the following command from the root folder of the application

```
npm start
```

This will start the application on port 8080 - point your web browser to http://localhost:8080/ to see the homepage.

### Endpoints

The following endpoints have been written:
- GET - `/user` - Get all users
- POST - `/user` - Create a new user. Body must be sent as From URL Encoded data, with the following parameters
-- email - The user's email address - required
-- forename - The user's forename - optional, 50 characters or less
-- surname - The user's surname - optional, 100 characters or less
- GET - `/user/{id}` - Read the user data
- PUT - `/user/{id}` - Update the user with new information. Body as for create
- DELETE - `/user/{id}` - Delete the specific user

There is also a swagger file in the project.

## Testing
Tests have been written using the [Mocha](https://mochajs.org/) JavaScript test framework - to execute the tests, run

```
npm test
```

## Notes
The project has been written using a TDD approach. Unit tests can be found under the _test_ folder.
I chose the technology stack (Node and Express) as this is, what I understand, is used at Holiday Extras. This also provided me with a further challenge to up my JavaScript skills.
