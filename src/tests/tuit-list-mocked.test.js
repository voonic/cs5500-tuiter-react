import { screen, render } from "@testing-library/react";
import Tuits from "../components/tuits";
import { HashRouter } from "react-router-dom";
import { createTuit, deleteTuit, findAllTuits } from "../services/tuits-service";
import axios from "axios";

jest.mock('axios');

const MOCKED_TUITS = [
  { _id: 12, tuit: "alice's tuit" }, { _id: 13, tuit: "bob's tuit" }, { _id: 14, tuit: "charlie's tuit" }
];

test('tuit list renders mocked', async () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({ data: { tuits: MOCKED_TUITS } }));
  const response = await findAllTuits();
  const allTuits = response.tuits;
  render(
    <HashRouter>
      <Tuits tuits={MOCKED_TUITS} />
    </HashRouter>);
  const linkElement = screen.getByText(/alice's tuit/i);
  expect(linkElement).toBeInTheDocument();
});
