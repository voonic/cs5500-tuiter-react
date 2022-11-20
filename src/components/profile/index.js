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
              <li className="nav-item">
                <Link to="/profile/mytuits"
                  className="nav-link active">
                  My Tuits</Link>
              </li>
            </ul>
          )} />
        <Route path="/mytuits"
          element={<MyTuits />} />
      </Routes>
    </div>
  );
};
export default Profile;

