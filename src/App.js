import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Todos from "./features/home/Todos";
import EditTodo from "./features/home/EditTodo";
import NewTodo from "./features/home/NewTodo";
import Selected from "./features/home/Selected";

const App = () => {
  return (
    <main className="App">
      <Routes>
        <Route path="/" element={<Todos />}></Route>
        <Route path="/home" element={<Todos />}></Route>
        <Route path="/edit" element={<EditTodo />}></Route>
        <Route path="/new" element={<NewTodo />}></Route>
        <Route path="/selected" element={<Selected />}></Route>
      </Routes>
    </main>
  );
};

export default App;
