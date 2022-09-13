import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = { todos: [], status: "idle", error: null };

const todosSlice = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {
    getFromLocalStorage(state, action) {
      try {
        const items = JSON.parse(localStorage.getItem("todos")) || [];
        state.todos = items;
        state.status = "succeeded";
      } catch (error) {
        localStorage.setItem("todos", JSON.stringify({}));
        state.todos = [];
        state.status = "failed";
        state.error = error.message;
      }
    },
    addToLocalStorage: {
      reducer(state, action) {
        state.todos.push(action.payload);
        const sortedItems = state.todos.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        state.todos = sortedItems;
        localStorage.setItem("todos", JSON.stringify(sortedItems));
      },
      prepare(newTodo) {
        return {
          payload: {
            id: nanoid(),
            content: newTodo,
            isCompleted: false,
            date: new Date().toISOString(),
          },
        };
      },
    },
    removeFromLocalStorage(state, action) {
      const filtered = state.todos.filter((todo) => todo.id !== action.payload);
      state.todos = filtered;
      localStorage.setItem("todos", JSON.stringify(filtered));
    },
    completeTodo(state, action) {
      const filtered = state.todos.filter(
        (todo) => todo.id !== action.payload.id
      );
      const selected = state.todos.find(
        (todo) => todo.id === action.payload.id
      );
      const updated = {
        id: selected.id,
        content: selected.content,
        isCompleted: !selected.isCompleted,
        date: selected.date,
      };
      filtered.push(updated);
      const sortedItems = filtered.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      state.todos = sortedItems;
      localStorage.setItem("todos", JSON.stringify(sortedItems));
    },
    editSelectedTodo(state, action) {
      const filtered = state.todos.filter(
        (todo) => todo.id !== action.payload.id
      );
      filtered.push(action.payload);
      const sortedItems = filtered.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      state.todos = sortedItems;
      localStorage.setItem("todos", JSON.stringify(sortedItems));
    },
  },
});

export const selectAllTodos = (state) => state.todos.todos;
export const getTodosError = (state) => state.todos.error;
export const getTodosStatus = (state) => state.todos.status;

export const {
  getFromLocalStorage,
  addToLocalStorage,
  removeFromLocalStorage,
  completeTodo,
  editSelectedTodo,
} = todosSlice.actions;

export default todosSlice.reducer;
