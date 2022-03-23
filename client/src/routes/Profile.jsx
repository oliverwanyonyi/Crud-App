import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CLEAR_ERRORS } from "../constants/userConstants";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);

  const { error, user } = userLogin;

  useEffect(() => {
    if (error) {
      toast.error(error, { position: toast.POSITION.BOTTOM_CENTER });
      dispatch({ type: CLEAR_ERRORS });
    }
    if (!user) {
      navigate("/login");
    }
  }, [dispatch, user, error, navigate]);
  return <span>profile page coming soon</span>;
};

export default Profile;
