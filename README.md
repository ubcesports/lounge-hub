# UBCEA Lounge Hub

## Dev Environment

## Local Database Setup

The lounge hub uses a PostgreSQL database hosted on a AWS EC2 instance. You can login into the AWS account using dev@ubcesports.ca. The password for AWS is saved in the google password manager. If you need access to the gmail of dev@ubcesports.ca, please contact your development directors.

### Navigating to the AWS EC2 instance

1. Login to AWS and search for EC2.
2. Go to `Instances` and click on the `ubcea-1` instance. You should be able to see all the information for the instance here.
3. [See below](#logging-into-the-database-locally) for how to connect to the instance locally.

### Logging into the database locally

The EC2 instance uses SSH to connect to your local machine.

1. You'll need to download the certificate file from the google drive of dev@ubcesports.ca. It is found in `Lounge App/Secrets/augmnt.pem`.
   > [IMPORTANT]: Do NOT share this file with anyone.
2. Move the downloaded `augmnt.pem` to a secure folder. This file is usually placed under your users `.ssh` folder found under `/Users/<USER>/.ssh/`.
3. Run `ssh -i "<path to your augmnt.pem>" ubuntu@ec2-54-245-134-32.us-west-2.compute.amazonaws.com`
4. You can now login to the database using `sudo -u postgres psql`

#### PgAdmin 4

You can use any database development platform with PostgreSQL but here is a quick guide on how to connect to [pgAdmin](https://www.pgadmin.org/).

1. Open pgAdmin and click "Add New Server"
2. Add a server name (this can be anything)
3. Click on the connection tab and enter
   1. Host name: `54.245.134.32` - this is the EC2 instance public IP address.
   2. Post: `5432` - this is the port to connect to postgre
   3. Maintenance db: `loungehub`
   4. Username: `admin`
   5. Password: contact your development directors for the password
   6. Click `save`

You should now be connected to the database on pgAdmin. If you have any issues, please contact your development directors.
