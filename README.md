# CSE341 Books API

## Description

A RESTful Books API built with Node.js, Express, and MongoDB. This project allows users to retrieve all books or retrieve a single book by its ID.

## Live Deployment

**Render URL:** https://cse341-books-uflx.onrender.com

## Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- JavaScript
- Render

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/books` | Retrieve all books |
| GET | `/books/:id` | Retrieve a single book by ID |

## Example Requests

### Get All Books

`GET /books`

Returns an array of book objects.

### Get a Single Book

`GET /books/b1`

Example response:

```json
{
  "id": "b1",
  "author": "Maya Rivera",
  "title": "Patterns of Light",
  "publicationDate": "2021-08-17"
}
```

## Response Status Codes

- `200 OK` — Request successful.
- `404 Not Found` — The requested book does not exist.
- `500 Internal Server Error` — An unexpected server error occurred.

## Environment Variables

The application requires the following environment variables:

- `MONGODB_URI` — MongoDB Atlas connection string.
- `MONGODB_DB_NAME` — MongoDB database name.
- `PORT` — Server port (provided automatically by Render in production).

Never commit your `.env` file or expose database credentials.

## Running Locally

1. Clone the repository.
2. Install dependencies:

   `npm install`

3. Create a `.env` file with the required environment variables.
4. Start the development server:

   `npm run dev`

The API will run locally at `http://localhost:3000` if port 3000 is configured.