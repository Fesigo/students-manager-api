# Students Manager API

This API was created as part of a skill assessment for FastSoft. This project was crafted as part of a recruitment process to assess my technical skills.

<br>

## Description

> Students Manager API is a project developed using the [NestJS](https://github.com/nestjs/nest) framework and [Prisma ORM](https://github.com/prisma). This API serves as a tool for teachers to manage their students.

<br>

## Project Setup

### Other required software

- [PostgreSQL](https://www.postgresql.org/download/)

<br>

### Installation

Clone this repository to your local environment:

```bash
git clone https://github.com/Fesigo/students-manager-api.git
```

<br>

Move into the project directory:

```bash
cd students-manager-api
```

<br>

Next, create a new .env file by following the structure in [.env.example](https://github.com/Fesigo/students-manager-api/blob/master/.env.example).

Afterwards, utilize npm to install project dependencies:

```bash
npm install
```

<br>

Run Prisma migrations to create the local database:

```bash
npx prisma migrate dev
```

<br>

Start the development server:

```bash
npm run start:dev
```

<br>

### Documentation

Once the application is running, access the Swagger documentation at http://localhost:3000/swagger.

<br>

## License

Nest is [MIT licensed](LICENSE).
