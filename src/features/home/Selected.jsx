import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Selected = () => {
  const { state } = useLocation();
  const { todo } = state;
  let navigate = useNavigate();

  return (
    <article className="single-todo bg-dark text-center">
      <button
        className="btn btn-outline-light btn-block"
        onClick={() => navigate("/", { replace: true })}
      >
        Back
      </button>
      <h3 className="mt-5">{todo.content}</h3>
    </article>
  );
};

export default Selected;
