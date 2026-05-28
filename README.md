# StreamFlix Netflix Clone

StreamFlix is a Netflix-style full-stack app built with:

- React + Vite + TypeScript + Tailwind CSS
- Spring Boot 3
- Controller -> Service interface -> Impl backend architecture
- JWT authentication
- TMDB API data
- Microsoft SQL Server database

## Project Structure

```text
backend/   Spring Boot API, JWT auth, users, TMDB proxy
frontend/  Vite React TypeScript app with Tailwind UI
lat.md     Database and implementation notes
```

Backend packages use this structure:

```text
controller/        HTTP controllers
service/           service interfaces
service/impl/      business logic implementations
repository/        Spring Data repositories
entity/            JPA entities
dto/               request and response DTOs
security/          JWT and Spring Security config
exception/         API exception handling
```

## Requirements

- Java 21
- Maven
- Node.js 18+
- TMDB API key
- SQL Server running on `localhost:1433`

## Backend Setup

Configure backend values in `backend/src/main/resources/application.properties`:

```text
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=streamflix_db;encrypt=true;trustServerCertificate=true
spring.datasource.username=sa
spring.datasource.password=Password123!
tmdb.api.key=your_tmdb_api_key_here
app.jwt.secret=change-this-development-secret-change-this-development-secret
```

By default, the backend connects to:

```text
jdbc:sqlserver://localhost:1433;databaseName=streamflix_db;encrypt=true;trustServerCertificate=true
```

You can override it with `DB_URL`.

Run the API:

```cmd
cd backend
mvn spring-boot:run
```

The backend runs on:

```text
http://localhost:8080
```

Main endpoints:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/tmdb/trending`
- `GET /api/tmdb/movies/popular`
- `GET /api/tmdb/tv/popular`
- `GET /api/tmdb/search?query=batman`

TMDB endpoints require a valid JWT token from login or register.

## Frontend Setup

Install dependencies:

```cmd
cd frontend
npm install
```

Run the app:

```cmd
npm run dev
```

The frontend runs on:

```text
http://127.0.0.1:5173
```

Frontend environment values live in `frontend/.env`. If your backend URL changes, update:

```text
VITE_API_BASE_URL=http://localhost:8080
```

Frontend routes:

- `/` landing page
- `/login` login page
- `/register` register page
- `/browse` protected movie browsing page

Route definitions live in `frontend/src/routes.tsx`. Page-level navigation is handled inside the page components with React Router. Reusable UI primitives follow the shadcn-style local component pattern under `frontend/src/components/ui`.

For local development, the backend allows CORS from:

```text
http://localhost:*
http://127.0.0.1:*
```

## Current Features

- Landing page with Login and Register buttons
- Register account with BCrypt password hashing
- Login with JWT
- Protected TMDB browsing page
- Trending, popular movies, popular TV, and search
- Responsive Netflix-inspired Tailwind UI

## Notes

TMDB provides metadata only. This clone does not stream movies or store video files.
