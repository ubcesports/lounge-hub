# UBCEA Lounge Hub

## Dev Environment

### Docker Compose (recommended)

1. Install docker desktop
2. Add environment variables

Create a `.env` file in the `/app` directory following the `.env.example` file. Ask your development directors for the values.

> Note: The app will not run correctly unless you have the `.env` file in your `/app` directory.

3. Run the following in the root directory

```
docker compose up -d --build
```

4. Go to `localhost:3000` to see the app. Changes on the backend and frontend will hot reload.
5. To stop containers run,

```
docker compose down
```

### Local Machine

If you wish to run the app on your local machine instead, please follow these instructions.

Install node version `20.4.0`

Verify node installation by running `node -v` and `npm -v`

### Install Dependencies and Running Services

The lounge-hub repo is a mono repo separated into two parts:

- app: express API backend
- client: next.js React frontend
  You'll need to install two separate node modules to get all the dependencies and run two seperate servers for the backend and the frontend.

#### Backend

To install backend dependencies, in the root directory, run

```
cd app
npm install
```

#### Frontend

To install frontend dependencies, in the root directory, run:

```
cd client
npm install
```

#### Root

You'll also need to install node module dependencies in the root directory for development and deployment dependencies. Run `npm install` in the root directory.

### Run the app

In the root directory run

```
./start.sh
```

View `start.sh` to see the separate commands that are run if you wish to run the backend and frontend separately.

### Tests

The tests are separated by backend, frontend and integration tests.

Run backend tests by running `cd app` and then `npm test`.

### Linting

The repo uses the Prettier formatter. Run prettier locally by running `npm run format` in the root directory.

## Local Database Setup

The lounge hub uses a PostgreSQL database hosted on a AWS EC2 instance. You can login into the AWS account using dev@ubcesports.ca. The password for AWS is saved in the google password manager. If you need access to the gmail of dev@ubcesports.ca, please contact your development directors.

### Navigating to the AWS EC2 instance

1. Login to AWS and search for EC2.
2. Go to `Instances` and click on the `ubcea-1` instance. You should be able to see all the information for the instance here.
3. [See below](#logging-into-the-database-locally) for how to connect to the instance locally.

### Logging into the database locally

The EC2 instance uses SSH to connect to your local machine.

1. Ask your development directors for the `augmnt.pem` file.
   > [IMPORTANT]: Do NOT share this file with anyone.
2. Move the downloaded `augmnt.pem` to a secure folder. This file is usually placed under your users `.ssh` folder found under `/Users/<USER>/.ssh/`.
3. Run `ssh -i "<path to your augmnt.pem>" ubuntu@ec2-54-245-134-32.us-west-2.compute.amazonaws.com`
4. You can now login to the database using `sudo -u postgres psql`

#### pgAdmin 4

You can use any database development platform with PostgreSQL but we recommend pgAdmin. Here is a quick guide on how to connect to [pgAdmin](https://www.pgadmin.org/).

1. Open pgAdmin and click "Add New Server"
2. Add a server name (this can be anything)
3. Click on the connection tab and enter:
   1. Host name: `54.245.134.32` - this is the EC2 instance public IP address.
   2. Post: `5432` - this is the port to connect to postgre
   3. Maintenance db: `loungehub`
   4. Username: `admin`
   5. Password: contact your development directors for the password
   6. Click `save`

You should now be connected to the database on pgAdmin. If you have any issues, please contact your development directors.

## Local Production Setup

To mimic a production environment locally, switch `nginx/Dockerfile` to the following:

```
FROM nginx AS prod
COPY dev-default.conf /etc/nginx/conf.d/default.conf
```

Then move your existing .env file from `/app` to the root of the project

Then run

```
docker compose -f "docker-compose.prod.yml" up --build -d
```

Go to `localhost` to see the app.

To stop the containers, run

```
docker compose -f "docker-compose.prod.yml" down
```

Make sure you switch back `nginx/Dockerfile` before merging to main and move your `.env` back to `/app` to run locally.
