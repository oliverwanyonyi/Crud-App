import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deleteTask, editTask } from "../actions/taskActions";

const Task = ({ task, setEditId, setShowModal, showModal }) => {
  const dispatch = useDispatch();

  const deleteHandler = (taskId) => {
    if (window.confirm("Are you sure this action can't be undone")) {
      dispatch(deleteTask(taskId));
    }
  };

  const editHandler = (taskId) => {
    setEditId(taskId);
    setShowModal(!showModal);
  };

  const markCompleteHandler = (e, taskId) => {
    dispatch(editTask(taskId, { completed: e.target.checked }));
  };
  return (
    <div className="task__col">
      <div className={task.completed ? "task completed" : "task"}>
        <span className="mark-task-complete">
          <input
            type="checkbox"
            onChange={(e) => markCompleteHandler(e, task._id)}
            checked={task.completed}
            name="complete"
            id="checkbox"
          />
        </span>
        <div className="task__info">
          <h4 className="task__time-tracker">
            {moment(task.createdAt).fromNow()}
          </h4>
          <h2 className="task__title">{task.title}</h2>
          <p className="task__description">{task.desc}</p>
          <div className="task-actions">
            <button
              className="btn edit__btn"
              onClick={() => editHandler(task._id)}
            >
              Edit
            </button>
            <button
              className="btn delete__btn"
              onClick={() => deleteHandler(task._id)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
