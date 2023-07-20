import { useState, useEffect } from "react";
import TodoList from "./components/TodoList.jsx";
import "./App.css";

function App() {
  const initialTodos = JSON.parse(localStorage.getItem("todos")) || [];
  const [todos, setTodos] = useState(initialTodos);
  const [addTodoFieldText, setAddTodoFieldText] = useState("");
  // const [editTodoId, setEditTodoId] = useState(null);
  // const [editTodoText, setEditTodoText] = useState("");

  // Load todos from localStorage on component mount
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  // Save todos to localStorage whenever 'todos' changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (event) => {
    event.preventDefault();

    if (!addTodoFieldText) return;

    const newTodo = {
      done: false,
      id: crypto.randomUUID(), // You can use any unique identifier here
      text: addTodoFieldText,
    };

    setTodos([...todos, newTodo]);
    setAddTodoFieldText("");
  };

  const removeTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const toggleDone = (id) => {
    const updatedTodos = todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo));
    setTodos(updatedTodos);
  };

  // const handleEditTodo = (id) => {
  //   setEditTodoId(id);
  //   const todoToEdit = todos.find((todo) => todo.id === id);
  //   setEditTodoText(todoToEdit.text);
  // };

  // const handleEditChange = (event) => {
  //   setEditTodoText(event.target.value);
  // };

  const handleSaveEdit = (id, newText) => {
    const updatedTodos = todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo));
    setTodos(updatedTodos);
    // setEditTodoId(null);
    // setEditTodoText("");
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-100 m-0 m-md-5">
      <div className="container content">
        {/* Header */}
        <div className="row mb-4">
          <div className="col-12 text-center">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-todo-list/check1.webp" alt="Check" width="60" />
            <h2 className="my-4">ToDo List</h2>
          </div>
        </div>

        {/* Add Todo Field */}
        <form onSubmit={(event) => addTodo(event)}>
          <div className="row mb-4">
            <div className="col-8 col-md-10">
              <input
                type="text"
                className="form-control"
                onChange={(event) => setAddTodoFieldText(event.currentTarget.value)}
                value={addTodoFieldText}
                placeholder="Add new task..."
              />
            </div>
            <div className="col-4 col-md-2">
              <button className="btn btn-primary w-100" type="submit">
                Add Todo
              </button>
            </div>
          </div>
        </form>

        {/* List Display */}
        <div className="row">
          <div className="col-12">
            <TodoList todos={todos} doneHandler={toggleDone} editHandler={handleSaveEdit} deleteHandler={removeTodo} />
          </div>
        </div>
        {/* <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editTodoId === todo.id ? (
              <>
                <input type="text" value={editTodoText} onChange={handleEditChange} />
                <button onClick={() => handleSaveEdit(todo.id)}>Save</button>
              </>
            ) : (
              <>
                <input type="checkbox" checked={todo.done} onChange={() => toggleDone(todo.id)} />
                <span>{todo.text}</span>
                <button onClick={() => handleEditTodo(todo.id)}>Edit</button>
                <button onClick={() => removeTodo(todo.id)}>Remove</button>
              </>
            )}
          </li>
        ))}
      </ul> */}
      </div>
    </div>
  );
}

export default App;
