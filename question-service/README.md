# Question Service

## Server Setup
1. Create a `.env` file to contain environment variables.
2. Create a Cloud DB URL using Mongo Atlas.
3. Enter the DB URL created as `DB_CLOUD_URI` in `.env` file.
4. Install npm packages using `npm i`.
6. Populate the question database with preset data using `npm run populate-db`
6. Run Question Service using `npm run dev`

## API Endpoints

### **Get all questions: `GET /api/question/`**
Returns a list of all existing questions.

### **Get specified question: `GET /api/question/:id`**
Returns the question specified by `id` in the request parameters.

**Request Parameters:**
| Key | Description                    |
| --- | ------------------------------ |
| id  | ID of the question of interest |

### **Get specified question: `GET /api/question/random`**
Returns a random question. Returned question can be further specified by optional values in the request query parameters.

**Request Query Parameters:**
| Key        | Description                                                                                 |
| ---------- | ------------------------------------------------------------------------------------------- |
| prevId     | ID of the previous question, provide to not return the same question in the subsequent call |
| difficulty | Difficulty level of the returned question. Supported values: `["Easy", "Medium", "Hard"]`   |

**Example Queries:**
| Query                                                                      | Explanation                                                                                                 |
| -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `GET /api/question/random`                                                 | Get a random question without any condition                                                                 |
| `GET /api/question/random?prevId=634ac4b53f53e338055aae9d`                 | Get a random question that does not have `id` of `634ac4b53f53e338055aae9d`                                 |
| `GET /api/question/random?prevId=634ac4b53f53e338055aae9d&difficulty=Easy` | Get a random question that does not have `id` of `634ac4b53f53e338055aae9d`, and has `difficulty` of `Easy` |
