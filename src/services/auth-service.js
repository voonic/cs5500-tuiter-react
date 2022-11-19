import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL
const AUTH_API = `${BASE_URL}/auth`

const api = axios.create({
  withCredentials: true
});

export const signup = async (user) => {
  console.log(`${AUTH_API}/signup`);
  let response = await api.post(`${AUTH_API}/signup`, user);
  return response.data;
}

export const profile = () =>
  api.post(`${AUTH_API}/profile`)
    .then(response => response.data);

export const logout = (user) =>
  api.post(`${AUTH_API}/logout`, user)
    .then(response => response.data);

export const login = (credentials) =>
  api.post(`${AUTH_API}/login`, credentials)
    .then(response => response.data);



