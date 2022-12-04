/**
 * @jest-environment node
 * @jest-environment-options {"url": "http://localhost:3000"}
 */
import { signup } from "../services/auth-service";
import {
  getMyDislikedTuits,
  getMyLikedTuits,
  getTuitLikesdata,
  userTogglesTuitLikes,
  userTogglesTuitDislikes
} from "../services/likes-service";
import { createTuit, deleteTuit } from "../services/tuits-service";
import { deleteUsersByUsername } from "../services/users-service";


describe('Likes REST API test', () => {
  // sample user that will be created first that will post a tuit
  const ripley = {
    username: 'ellenripley',
    password: 'lv426',
    email: 'ellenripley@aliens.com',
    firstName: 'ripley',
  };

  let newUser;
  let demotTuit;

  beforeAll(async () => {
    // remove any/all users to make sure we create it in the test
    await deleteUsersByUsername(ripley.username);
    // insert new user in the database
    newUser = await signup(ripley);
    demotTuit = await createTuit({
      tuit: "This is a test tuit",
      uid: newUser._id,
    });
  })

  // clean up after test runs
  afterAll(async () => {
    // remove any data we created
    await deleteUsersByUsername(ripley.username);
    await deleteTuit(demotTuit._id);
  });

  test('can like the tuit with REST API', async () => {
    //verfify that i can like th tuit, initially like count for this will be 0.
    const res = await userTogglesTuitLikes(newUser._id, demotTuit._id);
    expect(res.likes).toEqual(1);
    expect(res.dislikes).toEqual(0);
  });

  test('can unlike the tuit with REST API', async () => {
    //verfify that i can like th tuit, initially like count for this will be 0.
    const res = await userTogglesTuitLikes(newUser._id, demotTuit._id);
    expect(res.likes).toEqual(0);
    expect(res.dislikes).toEqual(0);
  });

  test('can dislike the tuit with REST API', async () => {
    //verfify that i can like th tuit, initially like count for this will be 0.
    const res = await userTogglesTuitDislikes(newUser._id, demotTuit._id);
    expect(res.likes).toEqual(0);
    expect(res.dislikes).toEqual(1);
  });

  test('can un-dislike the tuit with REST API', async () => {
    //verfify that i can like th tuit, initially like count for this will be 0.
    const res = await userTogglesTuitDislikes(newUser._id, demotTuit._id);
    expect(res.likes).toEqual(0);
    expect(res.dislikes).toEqual(0);
  });

  test('can dislike the tuit after liking with REST API', async () => {
    //verfify that i can like th tuit, initially like count for this will be 0.
    const res = await userTogglesTuitLikes(newUser._id, demotTuit._id);
    expect(res.likes).toEqual(1);
    expect(res.dislikes).toEqual(0);
    const res2 = await userTogglesTuitDislikes(newUser._id, demotTuit._id);
    expect(res2.dislikes).toEqual(1);
    expect(res2.likes).toEqual(0);
  });
});