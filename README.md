# CS3219-AY22-23-Project

CS3219 Project By Team 32.

Program initialisation can be done either via Docker local deployment of manually.

## Initialisation by Docker Local Deployment (Docker Compose)
1. Open a terminal in this directory, and run the following command: 
`docker compose -f "docker-compose.yml" up -d --build`
2. Wait for all Docker images to run.
3. Access the service via `http://localhost:3000`.

## Manual Initialisation
### User Service
1. Rename `.env.sample` file to `.env`.
2. Create a Cloud DB URL using Mongo Atlas.
3. Enter the DB URL created as `DB_CLOUD_URI` in `.env` file.
3. Enter your secret string of choice created as `SECRETS` in `.env` file.
4. Install npm packages using `npm i`.
5. Run the service using `npm start`.

### Matching Service
1. Rename `.env.sample` file to `.env`.
2. Create a Cloud DB URL using Mongo Atlas.
3. Enter the DB URL created as `DB_CLOUD_URI` in `.env` file.
4. Install npm packages using `npm i`.
5. Run the service using `npm start`.

### Question Service
1. Rename `.env.sample` file to `.env`.
2. Create a Cloud DB URL using Mongo Atlas.
3. Enter the DB URL created as `DB_CLOUD_URI` in `.env` file.
4. Install npm packages using `npm i`.
5. Run the service using `npm start`.

### History Service
1. Rename `.env.sample` file to `.env`.
2. Create a Cloud DB URL using Mongo Atlas.
3. Enter the DB URL created as `DB_CLOUD_URI` in `.env` file.
4. Install npm packages using `npm i`.
5. Run the service using `npm start`.

### Chatting Service
1. Rename `.env.sample` file to `.env`.
2. Create a Cloud DB URL using Mongo Atlas.
3. Enter the DB URL created as `DB_CLOUD_URI` in `.env` file.
4. Install npm packages using `npm i`.
5. Run the service using `npm start`.

### Frontend
1. Install npm packages using `npm i --force`.
2. Run the frontend using `npm i start`.
3. Access the service via `http://localhost:3000`.
Note for (2), if facing issues still, use `npm run start-force`.