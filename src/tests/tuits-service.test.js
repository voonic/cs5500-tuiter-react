import { createTuit, deleteTuit, findAllTuits, findTuitById } from "../services/tuits-service";
import { createUser, deleteUsersByUsername } from "../services/users-service";

describe('Tuits REST API test', () => {
  // sample user that will be created first that will post a tuit
  const ripley = {
    username: 'ellenripley',
    password: 'lv426',
    email: 'ellenripley@aliens.com',
    firstName: 'ripley',
  };

  let newUser;
  let demotTuit;

  // setup test before running test
  beforeAll(async () => {
    // remove any/all users to make sure we create it in the test
    await deleteUsersByUsername(ripley.username);
    // insert new user in the database
    newUser = await createUser(ripley);
    demotTuit = {
      tuit: "This is a test",
      postedBy: newUser._id,
    }
  })

  // clean up after test runs
  afterAll(async () => {
    // remove any data we created
    await deleteUsersByUsername(ripley.username);
  })

  test('can insert a new tuit with REST API', async () => {
    const tuit = await createTuit(demotTuit);
    // verify inserted user's tuit properties match parameter demoTuit
    expect(demotTuit.tuit).toEqual(tuit.tuit);
    expect(demotTuit.postedBy).toEqual(tuit.postedBy);
    expect(0).toEqual(tuit.likesCount);
    // remove any data we created
    await deleteTuit(tuit._id);
  });


  test('can delete tuit wtih REST API', async () => {
    const tuit = await createTuit(demotTuit);
    let response = await deleteTuit(tuit._id);
    expect(1).toEqual(response.deletedCount);
    // remove any data we created
    await deleteTuit(tuit._id);
  });

  test('can retrieve a tuit by their primary key with REST API', async () => {
    const tuit = await createTuit(demotTuit);
    let savedTuit = await findTuitById(tuit._id);
    expect(demotTuit.tuit).toEqual(savedTuit.tuit);
    expect(demotTuit.postedBy).toEqual(savedTuit.postedBy);
    // remove any data we created
    await deleteTuit(tuit._id);
  });

  test('can retrieve all tuits with REST API', async () => {
    const tuitsMap = ["tuit one", "tuit two", "tuit three"];
    // insert several known tuits
    tuitsMap.map(tuitStr =>
      createTuit({
        tuit: tuitStr,
        postedBy: newUser._id,
      })
    );

    // find the all tuits
    const allTuits = await findAllTuits();

    // there should be a minimum number of users
    expect(allTuits.length).toBeGreaterThanOrEqual(tuitsMap.length);

    // let's check each tuit we inserted
    const tuitsWeInserted = allTuits.filter(
      tuit => tuitsMap.indexOf(tuit.tuit) >= 0);

  });
});
