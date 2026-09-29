# SWYNEX Deployable Backend Service

A deployable REST API developed for the **SWYNEX Technologies Backend Developer Internship – Task 4**.

The project provides a backend expense management service using Node.js, Express.js, and MariaDB. It includes authentication, input validation, CRUD operations, database integration, consistent error handling, sample database data, and deployment documentation.

## Features

* RESTful API
* Create, Read, Update, and Delete expense records
* API key authentication
* Protected API endpoints
* Input validation
* Consistent JSON error responses
* MariaDB database integration
* Environment-based configuration
* Sample database data
* Deployment-ready project structure
* Complete setup and testing documentation

## Technologies Used

* Node.js
* Express.js
* MariaDB
* MySQL2
* dotenv
* Git
* GitHub

## Project Structure

```text
SWYNEX-Deployable-Backend-Service/
│
├── .env
├── .gitignore
├── database.sql
├── db.js
├── package-lock.json
├── package.json
├── README.md
└── server.js
```

> The `.env` file contains local configuration and secret credentials. It must not be uploaded to GitHub.

## Database Setup

The project uses a MariaDB database named:

```text
swynex_crud
```

The database contains an `expenses` table with the following fields:

* `id`
* `title`
* `amount`
* `category`
* `created_at`

The `database.sql` file automatically:

1. Creates the database.
2. Creates the `expenses` table.
3. Inserts sample expense records.

### Run the Database Script

Open MariaDB/MySQL and run:

```sql
SOURCE database.sql;
```

Alternatively, copy and execute the contents of `database.sql` in your database client.

## Installation

Clone the repository:

```bash
git clone https://github.com/duashah110/SWYNEX-Deployable-Backend-Service.git
```

Move into the project directory:

```bash
cd SWYNEX-Deployable-Backend-Service
```

Install the project dependencies:

```bash
npm install
```

## Environment Configuration

Create a `.env` file in the project root:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_DATABASE_PASSWORD
DB_NAME=swynex_crud
PORT=5000
API_KEY=YOUR_SECRET_API_KEY
```

Replace the placeholder values with your own local database password and secret API key.

### Security

Never upload `.env` to GitHub.

The project includes `.env` in `.gitignore` to prevent credentials from being committed.

## Running the API

Start the server with:

```bash
node server.js
```

The API will run at:

```text
http://localhost:5000
```

If the server starts successfully, the terminal will display:

```text
Server is running on http://localhost:5000
Database connected successfully!
```

## API Endpoints

### Health Check

```text
GET /health
```

This endpoint is public and does not require an API key.

Example response:

```json
{
  "success": true,
  "status": "OK",
  "message": "SWYNEX API is running successfully"
}
```

### Get All Expenses

```text
GET /api/expenses
```

Requires the `x-api-key` header.

### Create Expense

```text
POST /api/expenses
```

Requires the `x-api-key` header.

Example request body:

```json
{
  "title": "Lunch",
  "amount": 500,
  "category": "Food"
}
```

### Update Expense

```text
PUT /api/expenses/:id
```

Requires the `x-api-key` header.

Example request body:

```json
{
  "title": "Dinner",
  "amount": 800,
  "category": "Food"
}
```

### Delete Expense

```text
DELETE /api/expenses/:id
```

Requires the `x-api-key` header.

## Authentication

Protected expense endpoints use API key authentication.

The API key must be provided through the following HTTP header:

```text
x-api-key: YOUR_SECRET_API_KEY
```

### Missing API Key

A request without an API key returns:

```json
{
  "success": false,
  "error": "API key is required"
}
```

HTTP status:

```text
401 Unauthorized
```

### Invalid API Key

A request with an incorrect API key returns:

```json
{
  "success": false,
  "error": "Invalid API key"
}
```

HTTP status:

```text
403 Forbidden
```

## Input Validation

The API validates expense data before inserting or updating records.

Validation includes:

* Title is required.
* Title must be a string.
* Title must contain at least 2 characters.
* Amount is required.
* Amount must be a valid number.
* Amount must be greater than zero.
* Category is required.
* Category must be a string.
* Category must contain at least 2 characters.

Invalid requests return HTTP status `400`.

Example:

```json
{
  "success": false,
  "error": "Valid title, positive amount, and category are required"
}
```

## Error Handling

The API returns consistent JSON responses for common errors.

### 401 – Missing Authentication

```json
{
  "success": false,
  "error": "API key is required"
}
```

### 403 – Invalid Authentication

```json
{
  "success": false,
  "error": "Invalid API key"
}
```

### 404 – Resource Not Found

```json
{
  "success": false,
  "error": "Expense not found"
}
```

### 500 – Server Error

```json
{
  "success": false,
  "error": "Failed to process request"
}
```

## Testing

The API can be tested using PowerShell, Postman, or another API testing tool.

### Test Health Endpoint

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/health" -Method GET
```

### Test Protected Endpoint Without API Key

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/expenses" -Method GET
```

Expected result:

```json
{
  "success": false,
  "error": "API key is required"
}
```

### Test Protected Endpoint With API Key

```powershell
$headers = @{
    "x-api-key" = "YOUR_SECRET_API_KEY"
}

Invoke-RestMethod -Uri "http://localhost:5000/api/expenses" -Method GET -Headers $headers
```

### Test Invalid API Key

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/expenses" -Method GET -Headers @{"x-api-key"="wrong-key"}
```

Expected result:

```json
{
  "success": false,
  "error": "Invalid API key"
}
```

## Deployment Notes

Before deploying the backend service:

1. Install Node.js on the deployment environment.
2. Clone the repository.
3. Run `npm install`.
4. Create environment variables using the deployment platform's environment settings.
5. Configure the MariaDB database.
6. Run the SQL script to create the database structure and sample data.
7. Set the `PORT` environment variable if required by the hosting platform.
8. Start the application using:

```bash
node server.js
```

The application reads configuration from environment variables, so database credentials and API keys do not need to be stored directly in the source code.

## Production Security Notes

For production deployment:

* Do not commit `.env`.
* Use strong secret API keys.
* Store secrets using environment variables.
* Use HTTPS.
* Restrict database access.
* Use a dedicated production database user instead of the root account.
* Keep dependencies updated.
* Do not expose database credentials in logs or source code.

## Deployment Readiness

The project is structured so another developer can:

1. Clone the repository.
2. Install dependencies.
3. Configure environment variables.
4. Create the MariaDB database.
5. Run the provided SQL script.
6. Start the backend service.
7. Test the API endpoints.

## Task Information

**Company:** SWYNEX Technologies

**Internship:** Backend Developer Internship

**Task:** Task 4 – Deployable Backend Service

**Intern:** Dua Shah

## Task Objective

The objective of this task is to prepare a backend service that another developer can run or deploy by providing complete documentation, sample data, environment configuration, testing instructions, and deployment notes.
