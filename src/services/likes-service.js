import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const USERS_API = `${BASE_URL}/users`;

const api = axios.create({
  withCredentials: true
});

export const userTogglesTuitLikes = (uid, tid) =>
  api.post(`${USERS_API}/${uid}/togglelikes/${tid}`)
    .then(response => response.data);

export const userTogglesTuitDislikes = (uid, tid) =>
  api.post(`${USERS_API}/${uid}/toggledislikes/${tid}`)
    .then(response => response.data);

export const getTuitLikesdata = (uid, tid) =>
  api.get(`${USERS_API}/${uid}/likedata/${tid}`)
    .then(response => response.data);

