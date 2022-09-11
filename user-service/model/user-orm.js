import { createUser, getHashedPassword, getUser } from './repository.js';

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateUser(username, password) {
    try {
        const existingUser = await getUser(username);
        if (existingUser) {
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
