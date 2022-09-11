import { isValidLogin, getUserToken } from "../model/repository.js";

export async function loginUser(req, res) {
  try {
    const { username, password } = req.body;
    const isSuccess = await isValidLogin(username, password);
    console.log("isSuccess:" + isSuccess)
    if (!isSuccess) {
      return res.status(400).json({message: 'Incorrect username or password'});
    }

    const token = await getUserToken(username);
    console.log("token:" + token)
    return res.status(200).send({ username, token });

  } catch (error) {
    console.log(error)
    return res.status(500).json({message: 'Server failure when attempting login!'})
  }
}
