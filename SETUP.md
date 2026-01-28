# Task API - Setup Guide

## Quick Start

### 1. Prerequisites
- PostgreSQL must be installed and running
- Node.js v18+

### 2. Database Setup
```bash
# Create database
createdb task_api_db

# Login to PostgreSQL (if needed)
psql -U postgres
```

### 3. Environment Configuration
Copy and configure your environment:
```bash
cp .env.example .env
```

Update `.env` with your PostgreSQL credentials if different from defaults.

### 4. Install Dependencies & Run
```bash
npm install
npm run start:dev
```

The application will:
- Start on `http://localhost:5001`
- Auto-create tables using TypeORM synchronization
- GraphQL playground at `http://localhost:5001/graphql`

## API Usage

### Authentication Flow

1. **Sign Up** - Create a new user account
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

2. **Sign In** - Get access token
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

3. **Use Token** - Add to GraphQL headers:
   ```json
   {
     "Authorization": "Bearer YOUR_ACCESS_TOKEN"
   }
   ```

### Get User Profile
```graphql
query {
  getUser(id: "user-uuid") {
    id
    email
    firstName
    lastName
    isVerified
    createdAt
    updatedAt
  }
}
```

## Available Scripts

- `npm run start` - Start production server
- `npm run start:dev` - Start in watch mode
- `npm run build` - Build for production
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run e2e tests

## Troubleshooting

### Database Connection Error
- Verify PostgreSQL is running: `psql -U postgres -l`
- Check `.env` credentials match your PostgreSQL setup
- Ensure database `task_api_db` exists

### Port Already in Use
Change `PORT` in `.env` to an available port (default: 5001)

### GraphQL Schema Not Generated
The `schema.gql` file is auto-generated. If missing, rebuild:
```bash
npm run start:dev
```

## Technology Stack

- **Runtime**: Node.js
- **Framework**: NestJS
- **API**: GraphQL (Apollo Server)
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT with Passport
- **Language**: TypeScript
- **Password Hash**: bcryptjs
- **Validation**: class-validator

## Project Architecture

```
src/
├── auth/              # Authentication logic
│   ├── auth.service.ts
│   ├── auth.resolver.ts    # GraphQL mutations
│   ├── auth.module.ts
│   ├── dto/                # Input/Output types
│   └── strategies/         # Passport JWT strategy
├── users/             # User management
│   ├── users.service.ts
│   ├── users.resolver.ts   # GraphQL queries
│   ├── users.module.ts
│   └── entities/           # Database entities
├── config/
│   └── database.config.ts  # Database configuration
└── app.module.ts      # Main application module
```

## Next Steps

1. Start the development server
2. Visit `http://localhost:5001/graphql`
3. Test sign-up and sign-in mutations
4. Implement additional features as needed

## Support

For NestJS documentation, visit: https://docs.nestjs.com
For GraphQL Apollo documentation: https://www.apollographql.com/docs/apollo-server/
