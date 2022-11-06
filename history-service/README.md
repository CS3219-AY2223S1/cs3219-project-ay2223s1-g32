# History Service

## Server Setup
1. Create a `.env` file to contain environment variables.
2. Create a Cloud DB URL using Mongo Atlas.
3. Enter the DB URL created as `DB_CLOUD_URI` in `.env` file.
4. Install npm packages using `npm i`.
5. Run History Service using `npm run dev`

## API Endpoints

### **Get all questions: `GET /api/history/`**
Returns a list of all existing histories.

### **Get specified question: `GET /api/history/:id`**
Returns the history specified by `id` in the request parameter.

Request Parameters:
| Key | Description                   |
| --- | ----------------------------- |
| id  | ID of the history of interest |

### **Get specified question: `GET /api/user/:userId`**
Returns all history records pertaining to the specified user.

Request Parameters:
| Key    | Description                |
| ------ | -------------------------- |
| userId | ID of the user of interest |

### **Create a history record: `POST /api/history/`**
Creates a new history record based on the provided attributes.

Request Body:
| Key          | Description                                                      |
| ------------ | ---------------------------------------------------------------- |
| user         | ID of the user. Required field.                                  |
| collaborator | Name of the user's collaborator. Required field.                 |
| question     | Name of the attempted question. Required field.                  |
| content      | Code content submitted for the question attempt. Optional field. |
