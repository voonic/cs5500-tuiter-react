import { screen, render } from "@testing-library/react";
import Tuits from "../components/tuits";
import { HashRouter } from "react-router-dom";
import { createTuit, deleteTuit, findAllTuits } from "../services/tuits-service";
import { createUser, deleteUser } from "../services/users-service";

const MOCKED_USERS = [
  "alice", "bob", "charlie"
];

const MOCKED_TUITS = [
  { _id: 12, tuit: "alice's tuit" }, { _id: 13, tuit: "bob's tuit" }, { _id: 14, tuit: "charlie's tuit" }
];

test('tuit list renders static tuit array', () => {
  render(
    <HashRouter>
      <Tuits tuits={MOCKED_TUITS} />
    </HashRouter>);
  const linkElement = screen.getByText(/alice's tuit/i);
  expect(linkElement).toBeInTheDocument();
});

test('tuit list renders async', async () => {
  // create a new user first
  const newUser = await createUser({ username: 'NASA', password: 'lv426', email: 'repley@weyland.com', firstName: 'NASA' });
  // create a new tuit by this user, this guratees a tuit will be present
  const newTuit = await createTuit({
    tuit: 'async tuit test',
    postedBy: newUser._id,
  });
  // fetch all tuits
  const tuitsAll = await findAllTuits();
  render(
    <HashRouter>
      <Tuits tuits={tuitsAll} />
    </HashRouter>);
  const linkElement = screen.getByText(/async tuit test/i);
  expect(linkElement).toBeInTheDocument();
  // remove the above created user
  await deleteUser(newUser._id);
  await deleteTuit(newTuit._id);
});
