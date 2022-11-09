import { getRequestToken, getTokenUser, getUser, isValidLogin } from '../model/repository.js';
import { ormCreateUser as _createUser, ormUpdateUserPassword as _updateUserPassword, ormDeleteUser as _deleteUser } from '../model/user-orm.js'

export async function createUser(req, res) {
    try {
        const { username, password } = req.body;
        if (username && password) {
            const resp = await _createUser(username, password);

            if (resp.error) {
                return res.status(400).json({message: 'Could not create a new user: ' + resp.error});
            } else {
                console.log(`Created new user ${username} successfully!`)
                return res.status(200).json({message: `Created new user ${username} successfully!`});
            }
        } else {
            return res.status(400).json({message: 'Username and/or Password are missing!'});
        }
    } catch (err) {
        return res.status(500).json({message: 'Database failure when creating new user!'})
    }
}

export async function updateUserPassword(req, res) {
  try {
    const { username, newPassword } = req.body;
    const token = getRequestToken(req?.headers?.authorization);
    const user = await getTokenUser(token);
    if (!user) {
      return res.status(400).json({message: `Invalid authorization token`});
    }

    const resp = await _updateUserPassword(user._id, username, newPassword);

    if (resp.error) {
        return res.status(400).json({message: 'Could not change user password: ' + resp.error});
    } else {
      console.log(`Password changed for ${username} successfully!`)
      return res.status(200).json({message: `Password changed for ${username} successfully!`});
    }

  } catch (error) {
    console.log(error)
    return res.status(500).json({message: 'Database failure when changing password!'});
  }
} 

export async function deleteUser(req, res) {
  try {
    const { username } = req.body;
    
    const token = getRequestToken(req?.headers?.authorization);
    const user = await getTokenUser(token);
    if (!user) {
      return res.status(400).json({message: `Invalid authorization token`});
    }

    const resp = await _deleteUser(user._id);

    if (resp.error) {
      return res.status(400).json({message: 'Could not delete user: ' + resp.error});
    } else {
      console.log(`User ${username} deleted successfully!`)
      return res.status(204).json({message: `User ${username} deleted successfully!`});
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({message: 'Database failure when deleting user!'})
  }
}