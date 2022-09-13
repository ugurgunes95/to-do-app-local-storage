import React from "react";
import DeleteIcon from "./DeleteIcon";
import DoneIcon from "./DoneIcon";
import EditIcon from "./EditIcon";
import { useNavigate } from "react-router-dom";

const SingleTodo = ({ todo }) => {
  let navigate = useNavigate();
  return (
    <article
      className="todo text-center p-4 my-2"
      style={{ textDecoration: todo.isCompleted && "line-through" }}
    >
      {todo.content.length > 50 ? (
        <div
          onClick={() =>
            navigate("/selected", { replace: true, state: { todo: todo } })
          }
        >{`${todo.content.substring(0, 50)}...`}</div>
      ) : (
        <div
          onClick={() =>
            navigate("/selected", { replace: true, state: { todo: todo } })
          }
        >
          {todo.content}
        </div>
      )}
      <div className="text-center mt-4">
        <DoneIcon todo={todo} />
        <EditIcon todo={todo} />
        <DeleteIcon id={todo.id} />
      </div>
    </article>
  );
};

export default SingleTodo;
