import { getUserToken } from '../model/repository.js';

export async function authUser(req, res) {
  try {
    const { username, password } = req.body;
    const token = await getUserToken(username);
    res.status(200).json({ token });
  } catch (err) {
      return res.status(500).json({message: 'Failed to retrieve jwt token!'})
  }
}
