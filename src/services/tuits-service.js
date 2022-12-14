import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;
//const BASE_URL = "http://ec2-54-164-88-1.compute-1.amazonaws.com:4000";
// const BASE_URL = "https://software-engineering-node-fa22.herokuapp.com/api";
//const BASE_URL = "http://localhost:4000";
const TUITS_API = `${BASE_URL}/tuits`;
const USERS_API = `${BASE_URL}/users`;

const api = axios.create({
  withCredentials: true
});

export const findAllTuits = () =>
  api.get(TUITS_API)
    .then(response => response.data);

export const findTuitById = (tid) =>
  api.get(`${TUITS_API}/${tid}`)
    .then(response => response.data);

export const findTuitByUser = (uid) =>
  api.get(`${USERS_API}/${uid}/tuits`)
    .then(response => response.data);

export const createTuit = (tuit) =>
  api.post(`${TUITS_API}`, tuit)
    .then(response => response.data);

export const updateTuit = (tid, tuit) =>
  api.post(`${TUITS_API}/${tid}`, tuit)
    .then(response => response.data);

export const deleteTuit = (tid) =>
  api.delete(`${TUITS_API}/${tid}`)
    .then(response => response.data);
