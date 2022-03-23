import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTasks } from "../actions/taskActions";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Modal from "../components/Modal";
import Task from "../components/Task";
import { CLEAR_ERRORS } from "../constants/userConstants";
const Home = ({ showModal, setShowModal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const taskList = useSelector((state) => state.taskList);
  const { tasks, error, loading } = taskList;

  const createTask = useSelector((state) => state.createTask);
  const deleteTask = useSelector((state) => state.deleteTask);
  const updateTask = useSelector((state) => state.updateTask);

  const userLogin = useSelector((state) => state.userLogin);

  const [editId, setEditId] = useState(null);
  const { user: userInfo } = userLogin;

  const { success: successCreate, error: errorCreate } = createTask;
  const { success: successDelete } = deleteTask;
  const { success: successUpdate, error: errorUpdate } = updateTask;

  useEffect(() => {
    if (errorUpdate || errorCreate) {
      toast.info(errorUpdate || errorCreate, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      dispatch({ type: CLEAR_ERRORS });
    }
    dispatch(getTasks());
  }, [
    dispatch,
    successCreate,
    successDelete,
    successUpdate,
    errorCreate,
    errorUpdate,
  ]);

  useEffect(() => {
    if (error) {
      toast.error(error, { position: toast.POSITION.BOTTOM_CENTER });
      dispatch({ type: CLEAR_ERRORS });
    }
    if (!userInfo) {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo, error]);

  return (
    <>
      {showModal && (
        <Modal
          showModal={showModal}
          editId={editId}
          setEditId={setEditId}
          setShowModal={setShowModal}
        />
      )}

      {loading ? (
        <Loader />
      ) : (
        <div className="tasks__container">
          {tasks?.length < 1 && (
            <p className="landing__text">
              Once you create tasks they will appear here
            </p>
          )}
          <div className="tasks__row">
            {tasks?.map((task) => (
              <Task
                key={task._id}
                setEditId={setEditId}
                showModal={showModal}
                setShowModal={setShowModal}
                task={task}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
