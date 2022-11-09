const express = require("express")
const cors = require('cors')
const { getAllHistories, getHistory, getUserHistory, createHistory, deleteHistory, deleteUserHistory } = require('./controller/history-controller')
const unknownEndpointHandler = require('./middleware/unknownEndpointHandler')
const errorHandler = require('./middleware/errorHandler')

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())

const router = express.Router()
router.get('/', (_, res) => res.send('Hello World from history-service'))
app.use(router)

const historyRouter = express.Router()

historyRouter
  .get('/', getAllHistories)
  .get('/:id', getHistory)
  .get('/user/:userId', getUserHistory)
  .post('/', createHistory)
  .delete('/:id', deleteHistory)
  .delete('/user/:userId', deleteUserHistory)
  
app.use('/api/history', historyRouter).all((_, res) => {
    res.setHeader('content-type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
})

app.use(unknownEndpointHandler)
app.use(errorHandler)

const port = 8005
app.listen(port, () => console.log(`history-service listening on port ${port}`));