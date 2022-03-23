import axios from "axios";
import { api } from "../api/api";
import {
  CREATE_TASK_FAIL,
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  DELETE_TASK_FAIL,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  FETCH_TASK_FAIL,
  FETCH_TASK_REQUEST,
  FETCH_TASK_SUCCESS,
  UPDATE_TASK_FAIL,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_REQUEST,
} from "../constants/taskConstants";

export const addTask = (task) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_TASK_REQUEST });
    const {
      userLogin: { user },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    };
    const { data } = await axios.post(`${api}/tasks/create`, task, config);
    dispatch({ type: CREATE_TASK_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: CREATE_TASK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getTasks = (page) => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCH_TASK_REQUEST });
    const {
      userLogin: { user },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    const { data } = await axios.get(`${api}/tasks/all`, config);
    dispatch({ type: FETCH_TASK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_TASK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteTask = (taskId) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_TASK_REQUEST });
    const {
      userLogin: { user },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    const { data } = await axios.delete(`${api}/tasks/${taskId}`, config);
    dispatch({ type: DELETE_TASK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_TASK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editTask = (taskId, task) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_TASK_REQUEST });
    const {
      userLogin: { user },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    };
    await axios.put(`${api}/tasks/${taskId}`, task, config);
    dispatch({ type: UPDATE_TASK_SUCCESS });
  } catch (error) {
    dispatch({
      type: UPDATE_TASK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
