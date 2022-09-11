import { createUser, getHashedPassword, isExistingUser } from './repository.js';

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateUser(username, password) {
    try {
        const isExist = await isExistingUser(username);
        if (isExist) {
            throw 'User already exists';
        }

        const passwordHash = await getHashedPassword(password);
        const newUser = await createUser({username, passwordHash});
        newUser.save();
        return true;

    } catch (err) {
        console.log('ERROR: Could not create new user');
        return { err };
    }
}
