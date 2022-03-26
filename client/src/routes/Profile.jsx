import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../css/profile.css";
import { toast } from "react-toastify";
import { CLEAR_ERRORS, CLEAR_SUCCESS_NOTIF } from "../constants/userConstants";
import { getUserProfile, updateUserProfile } from "../actions/userActions";
import Loader from "../components/Loader";
import moment from "moment";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const userLogin = useSelector((state) => state.userLogin);
  const userProfile = useSelector((state) => state.userProfile);
  const { user: userDetails, loading: loadingProfile } = userProfile;
  const updateProfile = useSelector((state) => state.updateProfile);
  const { success: successUpdate, loading: loadingUpdate } = updateProfile;

  const { error, user: userInfo } = userLogin;
  const onChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(user));
  };

  useEffect(() => {
    if (userDetails) {
      setUser({ ...userDetails, password: "" });
    }
  }, [userDetails]);
  useEffect(() => {
    if (error) {
      toast.error(error, { position: toast.POSITION.BOTTOM_CENTER });
      dispatch({ type: CLEAR_ERRORS });
    }
    if (successUpdate) {
      toast.success("Your details have been updated successfully", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      dispatch({ type: CLEAR_SUCCESS_NOTIF });
    }

    if (!userInfo) {
      navigate("/login");
    } else {
      dispatch(getUserProfile());
    }
  }, [dispatch, userInfo, error, navigate, successUpdate]);
  return (
    <>
      <div className="profile__container">
        <div className="row">
          <div className="col-left">
            <div className="form-wrapper">
              <h3 className="form-title">Update your profile</h3>
              {loadingProfile ? (
                <Loader />
              ) : (
                <form className="form">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={user.name}
                      onChange={(e) => onChangeHandler(e)}
                      placeholder="e.g janedoe"
                      id="name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={(e) => onChangeHandler(e)}
                      placeholder="e.g janedoe@example.com"
                      id="email"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="password"
                      value={user.password}
                      onChange={(e) => onChangeHandler(e)}
                      id="password"
                    />
                  </div>
                  <button
                    className="update__profile-btn btn"
                    onClick={updateHandler}
                    disabled={loadingUpdate}
                  >
                    {loadingUpdate ? (
                      <>
                        <span className="submit-loading"></span> updating
                      </>
                    ) : (
                      <>Update profile</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
          <div className="col-right">
            <div>
              <p>Joined :{moment(userDetails?.createdAt).fromNow()}</p>
              <p>Updated: {moment(userDetails?.updatedAt).fromNow()}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
