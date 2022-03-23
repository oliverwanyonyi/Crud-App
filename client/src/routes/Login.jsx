import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userLogin } from "../actions/userActions";
import { CLEAR_ERRORS } from "../constants/userConstants";
import "../css/auth.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const userDetails = useSelector((state) => state.userLogin);
  const { error, user: userInfo, loading } = userDetails;
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userLogin(user));
  };
  const guestHandler = (e) => {
    e.preventDefault();

    setUser({ email: "guest@example.com", password: "123456" });
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
      toast.success("Login Successful", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      navigate("/");
    }
  }, [dispatch, userInfo, navigate, error]);
  return (
    <section className="signup__section">
      <div className="signup-container">
        <h1 className="welcome-text">Login into your account</h1>
        <form className="form">
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
          <div className="auth-btns">
            <button
              className="submit-btn"
              disabled={loading}
              onClick={submitHandler}
            >
              {loading ? (
                <>
                  <span className="submit-loading"></span> Loading
                </>
              ) : (
                <>Login</>
              )}
            </button>
            <button
              className="submit-btn get-credentials"
              onClick={(e) => guestHandler(e)}
            >
              Guest user
            </button>
          </div>
        </form>
        <p>
          Don't have an account <Link to="/register">Create account</Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
