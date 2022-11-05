import { getUser, createBlacklistedToken } from './repository.js';

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateBlacklistedToken(username, token) {
    try {
        const existingUser = await getUser(username);
        
        if (!existingUser) {
          throw 'User does not exist';
        }

        const blacklistedToken = await createBlacklistedToken({ token: token, username: username, userId: existingUser._id });
        blacklistedToken.save();
        return true;

    } catch (error) {
        console.log('ERROR: Could not blacklist user token:');
        return { error };
    }
}
