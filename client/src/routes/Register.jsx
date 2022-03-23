import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userRegister } from "../actions/userActions";
import { CLEAR_ERRORS } from "../constants/userConstants";
import "../css/auth.css";
const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.userRegister);
  const { loading, error, user: userInfo } = userDetails;
  const registerHandler = (e) => {
    e.preventDefault();
    dispatch(userRegister(user));
  };
  const onChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (error) {
      toast.error(error, { position: toast.POSITION.BOTTOM_CENTER });
      dispatch({ type: CLEAR_ERRORS });
    }
    if (userInfo) {
      navigate("/login");
    }
  }, [navigate, userInfo, error, dispatch]);
  return (
    <section className="signup__section">
      <div className="signup-container">
        <h1 className="welcome-text">Create an account</h1>
        <form className="form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g Jane doe"
              name="name"
              value={user.name}
              onChange={(e) => onChangeHandler(e)}
              id="name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g janedoe@example.com"
              name="email"
              value={user.email}
              onChange={(e) => onChangeHandler(e)}
              id="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="e.g janedoe@example.com"
              name="password"
              value={user.password}
              onChange={(e) => onChangeHandler(e)}
              id="password"
            />
          </div>
          <button
            className="submit-btn"
            onClick={(e) => registerHandler(e)}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="submit-loading"></span> Loading
              </>
            ) : (
              <>Create account</>
            )}
          </button>
        </form>
        <p>
          Already have an account <Link to="/login">login</Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
