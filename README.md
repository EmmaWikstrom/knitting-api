# Yarn Stash API

A REST Web API for managing a yarn stash.  
The API allows users to create, read, update and delete yarn entries stored in a MongoDB database.

This project was built as part of a Backend, Performance and API course assignment.

---

## Tech Stack

- Node.js  
- Express  
- MongoDB  
- Mongoose  
- dotenv  

---

## Installation

Clone the repository and install dependencies:

```bash
npm install

---

## Environment Setup

Create a `.env` file in the root directory with the following content:

```env
MONGODB_URI=mongodb://localhost:27017/yarnstash
# PORT=4000  # Optional, defaults to 4000
```

Make sure MongoDB is running locally or update the URI for your setup.

---

## Running MongoDB Locally 

If MongoDB is installed locally, start it with:

```bash
mongod --dbpath ~/mongodb-data
```
(Use your own db path if different.)

## Start the Server

Start the server with:

```bash
node index.js
```

The API will run on: 
http://localhost:4000

---

## API Endpoints

Get all yarns

GET /api/yarns
Returns a list of all yarn entries.

Status codes:
200 OK
500 Internal Server Error

Get a yarn by ID

GET /api/yarns/:id

Status codes:
200 OK
400 Bad Request (invalid id format)
404 Not Found (yarn does not exist)
500 Internal Server Error

---

## Example Requests

### Get all yarns
```bash
curl http://localhost:4000/api/yarns
```

### Create a new yarn

POST /api/yarns

Example body:

{
  "name": "Sunday",
  "brand": "Sandnes Garn",
  "weight": "fingering",
  "skeins": 2,
  "gramsPerSkein": 50,
  "metersPerSkein": 250,
  "colorName": "forest green",
  "colorCode": "1234",
  "dyeLot": "L001"
}

```bash
curl -X POST http://localhost:4000/api/yarns \
	-H "Content-Type: application/json" \
	-d '{
		"name": "Merino Wool",
		"brand": "BrandName",
		"weight": "DK",
		"fiber": "100% Merino",
		"colorName": "Blue",
		"skeins": 2
	}'
```
Status codes: 
201 Created 
422 Unprocessable Entity (validation error)

### Update a yarn
```bash
curl -X PATCH http://localhost:4000/api/yarns/<id> \
	-H "Content-Type: application/json" \
	-d '{ "skeins": 3 }'
```

### Delete a yarn
```bash
curl -X DELETE http://localhost:4000/api/yarns/<id>
```

| Method | Endpoint              | Description                |
|--------|----------------------|----------------------------|
| GET    | /api/health          | Health check               |
| GET    | /api/yarns           | List all yarns             |
| GET    | /api/yarns/:id       | Get a single yarn by ID    |
| POST   | /api/yarns           | Create a new yarn          |
| PATCH  | /api/yarns/:id       | Update a yarn by ID        |
| DELETE | /api/yarns/:id       | Delete a yarn by ID        |


