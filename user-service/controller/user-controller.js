import { getUser, isValidLogin } from '../model/repository.js';
import { ormCreateUser as _createUser, ormUpdateUserPassword as _updateUserPassword } from '../model/user-orm.js'

export async function createUser(req, res) {
    try {
        const { username, password } = req.body;
        if (username && password) {
            const resp = await _createUser(username, password);
            console.log(resp);
            if (resp.err) {
                return res.status(400).json({message: 'Could not create a new user: ' + resp.err});
            } else {
                console.log(`Created new user ${username} successfully!`)
                return res.status(201).json({message: `Created new user ${username} successfully!`});
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
    const { username, oldPassword, newPassword } = req.body;
    
    const existingUser = await getUser(username);
    if (!existingUser) {
      return res.status(404).json({message: `User does not exist: ${username}`});
    }

    const isLoginSuccess = await isValidLogin(username, oldPassword);
    if (!isLoginSuccess) {
      return res.status(400).json({message: 'Incorrect username or old password'});
    }

    const resp = await _updateUserPassword(existingUser._id, username, newPassword);
    console.log(resp);
    if (resp.err) {
        return res.status(400).json({message: 'Could not change user password: ' + resp.err});
    } else {
        console.log(`Password changed for ${username} successfully!`)
        return res.status(201).json({message: `Password changed for ${username} successfully!`});
    }

  } catch (error) {
    console.log(error)
    return res.status(500).json({message: 'Database failure when changing password!'});
  }
} 