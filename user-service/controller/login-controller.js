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
    res.cookie('token', token, { httpOnly: true });
    return res.status(200).json({ username, token });
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: 'Server failure when attempting login!'})
  }
}
