import { useState, useEffect, React } from "react";
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import * as service from "../../services/auth-service"
import MyDislikedTuits from "./my-disliked-tuits";
import MyLikedTuits from "./my-liked-tuits";
import MyTuits from "./my-tuits";

const Profile = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  useEffect(async () => {
    try {
      const user = await service.profile();
      setProfile(user);
    } catch (e) {
      navigate('/login');
    }
  }, []);
  const logout = () => {
    service.logout()
      .then(() => navigate('/login'));
  }
  return (
    <div>
      <h4>{profile.username}</h4>
      <h6>@{profile.username}</h6>
      <button onClick={logout}>Logout</button>
      <div>
        <ul className="mt-4 nav nav-pills nav-fill">
          <li className="nav-item me-3">
            <Link to="/profile/mytuits"
              className={`nav-link ${pathname.indexOf("mytuits") > -1 ? "active" : ""}`}>
              My Tuits</Link>
          </li>
          <li className="nav-item me-3">
            <Link to="/profile/my-likes"
              className={`nav-link ${pathname.indexOf("my-likes") > -1 ? "active" : ""}`}>
              My Liked Tuits</Link>
          </li>
          <li className="nav-item">
            <Link to="/profile/my-dislikes"
              className={`nav-link ${pathname.indexOf("my-dislikes") > -1 ? "active" : ""}`}>
              My Disliked Tuits</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route path="/mytuits"
          element={<MyTuits uid={profile._id} />} />
        <Route path="/my-likes"
          element={<MyLikedTuits uid={profile._id} />} />
        <Route path="/my-dislikes"
          element={<MyDislikedTuits uid={profile._id} />} />
      </Routes>
    </div>
  );
};
export default Profile;

