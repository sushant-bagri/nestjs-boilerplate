# Nest API Boiler Plate
## Requirement

- Node version `v14.18.3`
## Usage (quick start)

### With Postgres -- checkout to branch -> feature/nestjs-setup-with-postgres-typeorm
1.  Clone the repo
2.  Install dependent node modules
    - RUN in CLI from project root`npm install`
3.  Setup local environment configs
    - RUN in CLI from project root `./setenv.sh`
4.  Setup the dependencies (This will setup the databases)
    - Postgres - RUN in CLI from project root `docker-compose up`.Leave this terminal running.
    - Dynamo Db - After following installation from the above link, checkout in the directory where your download file is, and run this command to start your DB `java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb`
5.  Do database migration
    - On a different terminal, RUN in CLI from project root `npm run migrate`
6.  Start up app in developer mode (will watch and recompile for changes)
    - `npm run watch:dev`
7.  Build the app
    - `npm run build`
8.  Open browser tab to [Swagger UI Explorer](http://localhost:3000/api-docs) to explore API


### With MongoDB -- checkout to branch -> feature/nestjs-setup-with-mongodb
1. Clone the repo
2. Install dependent node modules
    - RUN in CLI from project root`npm install`
3. Setup local environment configs 
    - RUN in CLI from project root `./setenv.sh`
5. Start up app in developer mode (will watch and recompile for changes)
    - `npm run watch:dev`
6. Build the app 
    - `npm run build`
7. Open browser tab to [Swagger UI Explorer](http://localhost:3001/api-docs) to explore API
