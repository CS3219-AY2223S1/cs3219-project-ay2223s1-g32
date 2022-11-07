const express = require("express")
const cors = require('cors')
const { getAllQuestions, getQuestion, getRandomQuestion } = require('./controller/question-controller')
const unknownEndpointHandler = require('./middleware/unknownEndpointHandler')
const errorHandler = require('./middleware/errorHandler')

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())

const router = express.Router()
router.get('/', (_, res) => res.send('Hello World from question-service'))
app.use(router)

const questionRouter = express.Router()

questionRouter
  .get('/', getAllQuestions)
  .get('/random', getRandomQuestion)
  .get('/:id', getQuestion)


app.use('/api/question', questionRouter).all((_, res) => {
    res.setHeader('content-type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
})

app.use(unknownEndpointHandler)
app.use(errorHandler)

const port = 8002
app.listen(port, () => console.log(`question-service listening on port ${port}`));
