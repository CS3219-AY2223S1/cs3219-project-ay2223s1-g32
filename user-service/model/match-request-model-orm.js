import { createMatchRequest } from "./repository.js";

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateMatchRequest(username, difficulty) {
  try {
    const newMatchRequest = await createMatchRequest({
      username,
      difficulty,
      False,
    });
    newMatchRequest.save();
    return true;
  } catch (err) {
    console.log("ERROR: Could not create new match request");
    return { err };
  }
}
