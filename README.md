# node-ts-express-typeorm-docker-poo


## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
This project is a simple REST API that simulates the behavior of a user making a purchase of one or more products. It allows you to create, read, update and delete users, as well as authenticate them using JSON Web Tokens. It was created using TypeScript, Node.js, Express.js, TypeORM, PostgreSQL and Docker. The main goal of this project was to learn how to use TypeORM. The project was created following the MVC pattern and using OOP.
	
## Technologies
The main technologies with which the project was created are the following:
* TypeScript v5.2.2
* Node.js v18.12.1
* Express.js v4.18.2
* TypeORM: V0.3.17
* Docker Desktop v4.24.0
* Postgres:14.9-alpine (Docker image)
	
## Setup
To run this project execute the following commands:
* In the root folder run:
    - `$ docker compose run --rm server sh`
* Then in the **/usr/src/app** folder inside the container run:
    -  `# npm run m:run`
* Then exit the container (just type **exit**) and, again In the root folder of the project,  run:
    - `$ docker compose up`

After all that previous steps, the server will start running on port 3000 and it will be ready to receive requests. Also the database will be running on port 5432 and it will be ready to receive connections, in case you want to connect to it using a client like **DBeaver**, **pgAdmin**, etc.

The *.env files are included in the project wich is not a really good practice, but I did it just to make it easier to run the project. In a real project, the *.env files should be ignored by git and should be created manually in the server container.

You can test the differents endpoint using the **Postman** collection that is in the root folder of the project. You will have to import it in Postman and set the **{{base_url}}** environment variable to **http://localhost:3000/api**.
</br>
</br>
</br>

**miticoDev**
</br>
[My LinkedIn Profile](https://www.linkedin.com/in/ignacio-ba61321a6/)