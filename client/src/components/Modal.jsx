import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "../actions/taskActions";

import "../css/modal.css";

const Modal = ({ showModal, setShowModal, setEditId, editId }) => {
  const taskToEdit = useSelector((state) =>
    editId ? state.taskList?.tasks?.find((task) => task._id === editId) : null
  );
  const dispatch = useDispatch();
  const [task, setTask] = useState({
    title: "",
    desc: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    if (editId) {
      dispatch(editTask(editId, task));
      toggleModalHandler();
      setTask({
        title: "",
        desc: "",
      });
    } else {
      dispatch(addTask(task));

      setShowModal(!showModal);
      setTask({
        title: "",
        desc: "",
      });
    }
  };
  const onChangeHandler = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  function toggleModalHandler() {
    setShowModal(!showModal);
    setEditId(null);
  }
  useEffect(() => {
    if (taskToEdit) {
      setTask({
        title: taskToEdit.title,
        desc: taskToEdit.desc,
      });
    }
  }, [taskToEdit]);
  return (
    <div className="task__modal">
      <div className="task__modal-overlay" onClick={toggleModalHandler}></div>
      <div className="task__modal-container">
        <form className="form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g learn a new language"
              value={task.title}
              onChange={(e) => onChangeHandler(e)}
              name="title"
              id="title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="desc">description</label>
            <textarea
              type="text"
              name="desc"
              id="desc"
              onChange={(e) => onChangeHandler(e)}
              value={task.desc}
              placeholder="e.g learn a new language"
            ></textarea>
          </div>
          <button className="submit-btn" onClick={(e) => submitHandler(e)}>
            {editId ? <>Update {task.title}</> : <>Create {task.title}</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
