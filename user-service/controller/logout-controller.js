import { getRequestToken, getTokenUser } from "../model/repository.js";
import { ormCreateBlacklistedToken as _createBlacklistedToken } from "../model/blacklisted-token-orm.js";

export async function logoutUser(req, res) {
  try {
    const token = getRequestToken(req);
    const user = await getTokenUser(token);
    if (!user) {
      return res.status(400).json({message: `Invalid authorization token`});
    }
    await _createBlacklistedToken(user.username, token);
    return res.status(200).json({message: `Logout successful for ${user.username}!`});

  } catch (error) {
    console.log(error)
    return res.status(500).json({message: 'Server failure when attempting logout!'})
  }
}
