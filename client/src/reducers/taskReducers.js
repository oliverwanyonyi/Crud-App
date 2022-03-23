import {
  CREATE_TASK_FAIL,
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  FETCH_TASK_FAIL,
  FETCH_TASK_REQUEST,
  FETCH_TASK_SUCCESS,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAIL,
  UPDATE_TASK_FAIL,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_REQUEST,
} from "../constants/taskConstants";
import { CLEAR_ERRORS } from "../constants/userConstants";

export const addTaskReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_TASK_REQUEST:
      return { loading: true };
    case CREATE_TASK_SUCCESS:
      return { loading: false, success: action.payload };
    case CREATE_TASK_FAIL:
      return { loading: false, error: action.payload };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
export const fetchTasksReducer = (state = { tasks: [] }, action) => {
  switch (action.type) {
    case FETCH_TASK_REQUEST:
      return { loading: true };
    case FETCH_TASK_SUCCESS:
      return { loading: false, tasks: action.payload };
    case FETCH_TASK_FAIL:
      return { loading: false, error: action.payload };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const updateTaskReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_TASK_REQUEST:
      return { loading: true };
    case UPDATE_TASK_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_TASK_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteTaskReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_TASK_REQUEST:
      return { loading: true };
    case DELETE_TASK_SUCCESS:
      return { loading: false, success: action.payload };
    case DELETE_TASK_FAIL:
      return { loading: false, error: action.payload };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
