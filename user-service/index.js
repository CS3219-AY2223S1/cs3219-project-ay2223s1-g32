import express from 'express';
import cors from 'cors';
import { createUser, deleteUser, updateUserPassword } from './controller/user-controller.js';
import { loginUser } from './controller/login-controller.js';
import { logoutUser } from './controller/logout-controller.js';
import { authUser } from './controller/user-auth-cookie-controller.js';

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser());
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())
app.use((
  jwt({
    secret: PROCESS.env.SECRET,
    getToken: req => req.cookies.token
  })
));

const userRouter = express.Router()
const loginRouter = express.Router()
const logoutRouter = express.Router()

// Controller will contain all the User-defined Routes
// UserRouter
userRouter
  .get('/', (_, res) => res.send('Hello World from user-service'))
  .post('/', createUser)
  .put('/', updateUserPassword)
  .delete('/', deleteUser);

// LoginRouter
loginRouter.post('/', loginUser)

// logoutRouter
logoutRouter.post('/', logoutUser)

app.use('/api/user', userRouter).all((_, res) => {
    res.setHeader('content-type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
})

app.use('/api/login', loginRouter).all((_, res) => {
  res.setHeader('content-type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
})

app.use('/api/logout', logoutUser).all((_, res) => {
  res.setHeader('content-type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
})

app.listen(8000, () => console.log('user-service listening on port 8000'));
