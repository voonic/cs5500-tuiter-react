import { useState, useEffect, React } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import * as service from "../../services/auth-service"
import MyTuits from "./my-tuits";

const Profile = () => {
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
      <Routes>
        <Route index
          element={(
            <ul className="mt-4 nav nav-pills nav-fill">
              <li className="nav-item me-3">
                <Link to="/profile/mytuits"
                  className="nav-link active">
                  My Tuits</Link>
              </li>
              <li className="nav-item me-3">
                <Link to="/profile/my-liked-tuits"
                  className="nav-link active">
                  My Liked Tuits</Link>
              </li>
              <li className="nav-item">
                <Link to="/profile/my-desliked-tuits"
                  className="nav-link active">
                  My Disliked Tuits</Link>
              </li>
            </ul>
          )} />
        <Route path="/mytuits"
          element={<MyTuits uid={profile._id} />} />
      </Routes>
    </div>
  );
};
export default Profile;

