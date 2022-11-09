# History Service

## Server Setup
1. Create a `.env` file to contain environment variables.
2. Create a Cloud DB URL using Mongo Atlas.
3. Enter the DB URL created as `DB_CLOUD_URI` in `.env` file.
4. Install npm packages using `npm i`.
5. Run History Service using `npm run dev`

## API Endpoints

### **Get all histories: `GET /api/history/`**
Returns a list of all existing histories.

### **Get specified history: `GET /api/history/:id`**
Returns the history specified by `id` in the request parameter.

Request Parameters:
| Key | Description                   |
| --- | ----------------------------- |
| id  | ID of the history of interest |

### **Get history for specified user: `GET /api/history/user/:userId`**
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
| question     | Name of the attempted question. Required field.                  |
| content      | Code content submitted for the question attempt. Optional field. |

### **Delete specified history: `DELETE /api/history/:id`**
Returns the history specified by `id` in the request parameter.

Request Parameters:
| Key | Description                   |
| --- | ----------------------------- |
| id  | ID of the history of interest |

### **Delete history for specified user: `DELETE /api/history/user/:userId`**
Returns all history records pertaining to the specified user.

Request Parameters:
| Key    | Description                |
| ------ | -------------------------- |
| userId | ID of the user of interest |
