# StreamFlix Database Documentation

## Database Name

```text
streamflix_db
```

---

# Database Purpose

This database is designed for a Netflix-style streaming platform clone using TMDB API.

The database stores:

* Users
* Profiles
* Watchlists
* Favorites
* Watch history
* Ratings
* Cached TMDB metadata

The database does NOT store actual movie video files.

---

# Tables Overview

## users

Stores application accounts.

### Main Fields

| Field         | Type          |
| ------------- | ------------- |
| id            | BIGINT        |
| full_name     | NVARCHAR(150) |
| email         | NVARCHAR(150) |
| password_hash | NVARCHAR(255) |
| role          | NVARCHAR(50)  |
| is_active     | BIT           |

### Notes

* Email must be unique.
* Passwords must be hashed.
* One user can have multiple profiles.

---

## refresh_tokens

Stores JWT refresh tokens.

### Relationship

```text
users (1) -> (N) refresh_tokens
```

### Purpose

* Session persistence
* Token rotation
* Logout support

---

## profiles

Stores Netflix-style profiles.

### Relationship

```text
users (1) -> (N) profiles
```

### Example

One account may contain:

* Dad
* Mom
* Kids

### Important Fields

| Field        | Description          |
| ------------ | -------------------- |
| profile_name | Profile display name |
| avatar_url   | Profile image        |
| is_kids      | Kids profile flag    |

---

## media

Stores cached metadata from TMDB.

### Relationship

Referenced by:

* watchlists
* favorites
* ratings
* watch_histories
* trailers

### Important Fields

| Field         | Description               |
| ------------- | ------------------------- |
| tmdb_id       | Original TMDB movie/tv ID |
| media_type    | MOVIE or TV               |
| title         | Content title             |
| overview      | Description               |
| poster_path   | Poster image              |
| backdrop_path | Background image          |
| vote_average  | TMDB rating               |

### Notes

Unique constraint:

```text
(tmdb_id, media_type)
```

---

## genres

Stores movie genres.

### Example Data

* Action
* Comedy
* Horror
* Thriller
* Drama

---

## media_genres

Many-to-many table between media and genres.

### Relationship

```text
media (N) <-> (N) genres
```

---

## watchlists

Stores "My List" feature.

### Relationship

```text
profiles (1) -> (N) watchlists
media (1) -> (N) watchlists
```

### Notes

* One profile can save many movies/shows.
* Duplicate media per profile is not allowed.

---

## favorites

Stores favorite content.

### Difference from Watchlist

Watchlist:

* Want to watch later

Favorite:

* Personally liked content

---

## watch_histories

Stores watching progress.

### Features Supported

* Continue Watching
* Resume Playback
* Watch Tracking

### Important Fields

| Field            | Description               |
| ---------------- | ------------------------- |
| progress_seconds | Current playback position |
| duration_seconds | Total duration            |
| is_finished      | Completed watching        |

---

## ratings

Stores profile ratings.

### Rules

* Rating value: 1–5
* One profile can rate one media once

---

## trailers

Stores trailer information.

### Example

Usually linked to YouTube trailer videos.

### Important Fields

| Field          | Description      |
| -------------- | ---------------- |
| tmdb_video_key | TMDB trailer key |
| site           | YouTube          |
| type           | Trailer / Teaser |

---

# Main Entity Relationships

```text
users
 └── profiles
      ├── watchlists
      ├── favorites
      ├── ratings
      └── watch_histories

media
 ├── media_genres
 ├── trailers
 ├── watchlists
 ├── favorites
 ├── ratings
 └── watch_histories

genres
 └── media_genres
```

---

# Database Rules

## Password Security

Passwords must NEVER be stored as plain text.

Recommended:

* BCrypt
* Argon2

---

## Recommended Indexes

Recommended indexes:

```text
users.email
media.tmdb_id
watchlists.profile_id
favorites.profile_id
watch_histories.profile_id
ratings.profile_id
```

---

# Naming Convention

## Tables

Use:

```text
plural_snake_case
```

Example:

```text
watch_histories
media_genres
```

---

## Columns

Use:

```text
snake_case
```

Example:

```text
created_at
profile_id
poster_path
```

---

## Primary Keys

Use:

```text
id
```

---

## Foreign Keys

Use:

```text
<entity>_id
```

Example:

```text
user_id
media_id
profile_id
```

---

# TMDB Notes

TMDB provides:

* Movies
* TV Shows
* Posters
* Backdrops
* Ratings
* Genres
* Trailers

TMDB does NOT provide:

* Full movie streaming

This database only stores metadata and user activity.

---

# Future Expansion Ideas

Possible future tables:

* subscriptions
* payments
* comments
* reviews
* notifications
* recommendations
* episode_progress
* streaming_servers

---

# End

---

# App Implementation Notes

## Stack

The app is implemented as a full-stack Netflix clone:

* Frontend: Vite, React, TypeScript, Tailwind CSS
* Backend: Spring Boot 3, Spring Security, Spring Data JPA
* Auth: JWT access token
* Password hashing: BCrypt
* Data provider: TMDB API
* Database: Microsoft SQL Server on localhost:1433

---

## Implemented Backend Modules

The backend uses a Controller -> Service -> Impl architecture:

```text
Controller classes handle HTTP requests.
Service interfaces define use cases.
impl classes contain the business logic.
```

Package layout:

```text
controller/
service/
service/impl/
repository/
entity/
dto/
security/
exception/
```

### Auth

Endpoints:

```text
POST /api/auth/register
POST /api/auth/login
```

Register creates a user, hashes the password, and returns:

```text
token
user
```

Login validates the password and returns the same auth response.

---

### TMDB Proxy

Endpoints:

```text
GET /api/tmdb/trending
GET /api/tmdb/movies/popular
GET /api/tmdb/tv/popular
GET /api/tmdb/search?query=<search text>
```

These routes are protected by JWT. The frontend does not store the TMDB API key.

Required environment variable:

```text
TMDB_API_KEY
```

For local development, backend values are configured in:

```text
backend/src/main/resources/application.properties
```

Optional environment variables:

```text
JWT_SECRET
CORS_ALLOWED_ORIGINS
DB_URL
DB_USERNAME
DB_PASSWORD
```

Local CORS defaults allow Vite dev URLs:

```text
http://localhost:*
http://127.0.0.1:*
```

Local SQL Server credentials:

```text
username: sa
password: Password123!
```

Default database connection:

```text
jdbc:sqlserver://localhost:1433;databaseName=streamflix_db;encrypt=true;trustServerCertificate=true
```

---

## Implemented Frontend Pages

Frontend routing uses React Router:

```text
/         Landing page
/login    Login page
/register Register page
/browse   Protected browsing page
```

Route definitions are stored in:

```text
frontend/src/routes.tsx
```

Page navigation is handled inside page components with React Router hooks. Shared UI primitives use a shadcn-style local structure:

```text
frontend/src/components/ui/button.tsx
frontend/src/components/ui/input.tsx
```

### Landing Page

The first screen includes:

* StreamFlix branding
* Login button
* Register button
* Hero section styled with Tailwind

---

### Auth Pages

The frontend includes:

* Login form
* Register form
* JWT persistence in localStorage
* Logout action

---

### Browse Page

After login, users can view:

* Featured weekly trending item
* Trending titles
* Popular movies
* Popular TV shows
* Search results from TMDB

---

## Run Commands

Backend:

```cmd
cd backend
mvn spring-boot:run
```

Frontend:

```cmd
cd frontend
npm install
npm run dev
```

---

## Next Database Expansion

The current backend starts with users and JWT login. The database design above can be implemented next by adding:

* profiles
* media cache
* watchlists
* favorites
* watch histories
* ratings
* trailers
