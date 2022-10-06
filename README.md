# Awesomesauce
Awesome app for creating (p)awsome articles!

## Stack:
NodeJS, NestJS, Express, TypeORM, PostgreSQL, React, Redux toolkit, Typescript, Jest

## Run application
### Docker
Run composed application: docker-compose -f docker-compose-dev.yml up

### Browser
Open in web browser: http://localhost:3000

### API documentation
Swagger documentation here: http://localhost:5500/api/v1/docs

## Known issues and self-feedback:
- git versioning - not pushing directly to master and create more branches
- configure nginx proxy server
- implement web sockets for comments and voting
- error handling - returning user-friendly REST API messages
- frontend npm vulnerabilities
- use react-persist so state doesn't change after refresh
- create docker-compose.yml for production 
