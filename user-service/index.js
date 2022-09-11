import express from 'express';
import cors from 'cors';
import { createUser } from './controller/user-controller.js';
import { loginUser } from './controller/login-controller.js';

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())

const userRouter = express.Router()
const loginRouter = express.Router()

// Controller will contain all the User-defined Routes
// UserRouter
userRouter.get('/', (_, res) => res.send('Hello World from user-service'))
userRouter.post('/', createUser)

// LoginRouter
loginRouter.post('/', loginUser)


app.use('/api/user', userRouter).all((_, res) => {
    res.setHeader('content-type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
})

app.use('/api/login', loginRouter).all((_, res) => {
  res.setHeader('content-type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
})

app.listen(8000, () => console.log('user-service listening on port 8000'));
