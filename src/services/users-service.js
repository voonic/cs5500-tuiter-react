import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;
//const BASE_URL = "http://ec2-54-164-88-1.compute-1.amazonaws.com:4000";
// const BASE_URL = "https://software-engineering-node-fa22.herokuapp.com/api";
//const BASE_URL = "http://localhost:4000";

const LOGIN_API = `${BASE_URL}/login`;
const USERS_API = `${BASE_URL}/users`;

const api = axios.create({
  withCredentials: true
});

export const createUser = (user) =>
  api.post(`${USERS_API}`, user)
    .then(response => response.data);

export const findAllUsers = () =>
  api.get(USERS_API)
    .then(response => response.data);

export const findUserById = (uid) =>
  api.get(`${USERS_API}/${uid}`)
    .then(response => response.data);

export const deleteUser = (uid) =>
  api.delete(`${USERS_API}/${uid}`)
    .then(response => response.data);

export const deleteUsersByUsername = (username) =>
  api.delete(`${USERS_API}/username/${username}/delete`)
    .then(response => response.data);

export const findUserByCredentials = (credentials) =>
  api.post(`${LOGIN_API}`, credentials)
    .then(response => response.data);

const service = {
  findAllUsers
}

export default service;