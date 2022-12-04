import { useNavigate } from "react-router-dom";
import { useState, React } from "react";
import * as service
  from "../../services/auth-service";

export const Login = () => {
  const [newUser, setNewUser] = useState({});
  const [loginUser, setLoginUser] = useState({});
  const navigate = useNavigate()
  const register = (e) => {
    e.preventDefault();
    service.signup(newUser)
      .then(() => navigate('/profile'))
      .catch(e => alert(e));
    return false;
  }


  const login = (e) => {
    e.preventDefault();
    service.login(loginUser)
      .then((user) => navigate('/profile/mytuits'))
      .catch(e => alert(e));
    return false;
  }

  return (
    <div>
      <h1>Register</h1>
      <form name="register" onSubmit={register}>
        <input type="text" className="mb-2 form-control"
          onChange={(e) =>
            setNewUser({ ...newUser, username: e.target.value })}
          placeholder="username" required />
        <input className="mb-2 form-control"
          onChange={(e) =>
            setNewUser({ ...newUser, password: e.target.value })}
          placeholder="password" type="password" required />
        <input className="mb-2 form-control"
          onChange={(e) =>
            setNewUser({ ...newUser, email: e.target.value })}
          placeholder="email" type="email" required />
        <button type="submit" className="btn btn-primary mb-5">Register
        </button>
      </form>
      <h1>Login</h1>
      <form name="login" onSubmit={login}>
        <input className="mb-2 form-control"
          onChange={(e) =>
            setLoginUser({ ...loginUser, username: e.target.value })}
          placeholder="username" required />
        <input className="mb-2 form-control"
          onChange={(e) =>
            setLoginUser({ ...loginUser, password: e.target.value })}
          placeholder="password" type="password" required />
        <button type="submit" className="btn btn-primary mb-5">Login</button>
      </form>
      {/* <h1>Login As</h1> */}

      {/* <UserList users={existingUsers} deleteUser={deleteUser}/> */}

    </div>
  );
};