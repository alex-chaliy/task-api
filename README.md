# Task API

A GraphQL-based API built with NestJS, TypeORM, and PostgreSQL, featuring user authentication with JWT tokens.

## Features

- **GraphQL API** with Apollo Server
- **User Authentication** (Sign-up & Sign-in)
- **JWT Token-based Authentication**
- **PostgreSQL Database** with TypeORM
- **TypeScript** for type safety
- **Password Hashing** with bcryptjs
- **Input Validation** with class-validator

## Prerequisites

- Node.js v22+
- PostgreSQL 18+
- npm or yarn

## Project setup

```bash
npm install
```

1. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your PostgreSQL credentials:
   ```
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USER=postgres
   DATABASE_PASSWORD=your_password
   DATABASE_NAME=task_api_db
   JWT_SECRET=your_jwt_secret_key
   ```

2. **Create PostgreSQL database**
   ```bash
   psql -U postgres 
   createdb task_api_db
   ```

If psql command not found:
https://stackoverflow.com/a/79875872/7455192 

3. **Check connection to PostgreSQL**
   ```bash
   nc -vz <hostname> <port_number>
   ```
   for example, in our case:
   ```bash
   nc -vz 127.0.0.1 5432
   ```

4. Also you can check if <db_name> exists

  #### Method 1: Using psql (Best for checking existence)
  This method lists all databases and pipes the output to grep to find your specific database name.
   ```bash
   psql -l | grep -qw your_db_name && echo "Database 'your_db_name' exists." || echo "Database 'your_db_name' does not exist."
   ```
   in dev mode:
      ```bash
   psql  -U postgres   -l | grep -qw task_api_db && echo "Database 'task_api_db' exists." || echo "Database 'task_api_db' does not exist."
   ```

   #### Method 2: Using pg_isready (For connection status) 
   This utility checks if the server is accepting connections for a specific database. 
   ```bash
   pg_isready -d your_db_name -q && echo "Server ready for 'your_db_name'." || echo "Server not ready or DB not found."
   ```
   in dev mode:
   ```bash
   pg_isready -d task_api_db -q && echo "Server ready for 'task_api_db'." || echo "Server not ready or DB not found."
   ```

5. Use PostgreSQL from terminal to create and setup a new db user
  ```bash
  # connect to postgreSql command line tool
  sudo -i -u postgres

  # create a new user in db
  createuser --interactive --pwprompt <username>
  ```

  #### The cli tool will ask you to create a password for a new user.

  #### But also you can setup a db user password manually:
  ```bash
  ALTER USER <username> PASSWORD 'mynewpassword@#$@#sfsSDF';
  ```

6. pg_hba.conf

    sudo find / -name pg_hba.conf

    cat /opt/homebrew/var/postgresql@14/pg_hba.conf 

    sudo cat /Library/PostgreSQL/18/data/pg_hba.conf 


    #### postgresql remove macos

    open /Library/PostgreSQL/<version>/uninstall-postgresql.app
    open /Library/PostgreSQL/18/uninstall-postgresql.app



    sudo /Library/PostgreSQL/<version>/uninstall-postgresql.app/Contents/MacOS/installbuilder.sh
    sudo /Library/PostgreSQL/18/uninstall-postgresql.app/Contents/MacOS/installbuilder.sh
    



## Compile and run the project

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run build
npm run start:prod
```

## GraphQL Playground

The GraphQL playground is available at `http://localhost:5001/graphql`

### Example Mutations

**Sign Up:**
```graphql
mutation {
  signUp(input: {
    email: "user@example.com"
    password: "password123"
    firstName: "John"
    lastName: "Doe"
  }) {
    accessToken
    id
    email
    firstName
    lastName
  }
}
```

**Sign In:**
```graphql
mutation {
  signIn(input: {
    email: "user@example.com"
    password: "password123"
  }) {
    accessToken
    id
    email
    firstName
    lastName
  }
}
```

**Get User (after Sign In):**
```graphql
query {
  user {
    id
    email
    firstName
    lastName
    createdAt
    updatedAt
  }
}
```

Note: The `user` query requires JWT authentication. Include the `accessToken` from the Sign In response in the Authorization header:
```
Authorization: Bearer <accessToken>
```

**Get User by ID:**
```graphql
query {
  getUserById(id: "user-uuid-here") {
    id
    email
    firstName
    lastName
    createdAt
    updatedAt
  }
}

query {
  getUserById(id: "af23-4234-e0a9-8b3b4-af23-4234-e0a9-8b3b4") {
    id
    email
    firstName
    lastName
    createdAt
    updatedAt
  }
}
```

Note: The `getUserById` query does not require authentication.

## Run tests

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## Project Structure

```
src/
├── auth/                 # Authentication module
│   ├── strategies/      # JWT strategy
│   ├── dto/             # Auth DTOs
│   ├── auth.service.ts
│   ├── auth.resolver.ts
│   └── auth.module.ts
├── users/               # Users module
│   ├── entities/        # User entity
│   ├── users.service.ts
│   ├── users.resolver.ts
│   └── users.module.ts
├── config/              # Configuration
│   └── database.config.ts
├── app.module.ts        # Main app module
└── main.ts              # Entry point
```

## Deployment

Deployment configuration depends on your target environment (AWS, Heroku, Docker, etc.).

## License

MIT licensed
