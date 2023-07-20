import { useState, useEffect } from "react";
import TodoList from "./components/TodoList.jsx";
import "./App.css";

function App() {
  const initialTodos = JSON.parse(localStorage.getItem("todos")) || [];
  const [todos, setTodos] = useState(initialTodos);
  const [addTodoFieldText, setAddTodoFieldText] = useState("");

  // Load todos from localStorage on component mount
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  // Save todos to localStorage whenever 'todos' changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // add a new todo
  const addTodo = (event) => {
    event.preventDefault();

    if (!addTodoFieldText) return;

    const newTodo = {
      done: false,
      id: crypto.randomUUID(),
      text: addTodoFieldText,
    };

    setTodos([...todos, newTodo]);
    setAddTodoFieldText("");
  };

  // remove todo
  const removeTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  // toggle mark todo done
  const toggleDone = (id) => {
    const updatedTodos = todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo));
    setTodos(updatedTodos);
  };

  // save edits to todos
  const handleSaveEdit = (id, newText) => {
    const updatedTodos = todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo));
    setTodos(updatedTodos);
  };

  // tiny easter egg ;)
  const madeWithEmotes = ["♥️", "♥️", "😭", "🤬", "🤯", "😵‍💫", "🥳", "😱"];
  const getRandomEmote = () => {
    const rnd = Math.floor(Math.random() * madeWithEmotes.length);
    return madeWithEmotes[rnd];
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-100 m-0 m-sm-5">
      <div className="container p-0 p-md-5">
        <div className="content">
          {/* Header */}
          <div className="row mb-4">
            <div className="col-12 text-center">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-todo-list/check1.webp"
                alt="Check"
                width="60"
              />
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
        </div>
        <div className="row">
          <div className="col-12 mt-5 text-center small">
            Made with {getRandomEmote()} by{" "}
            <a href="https://github.com/tamer4osman" className="link-dark" target="_blank" rel="noreferrer">
              Tamer
            </a>{" "}
            and{" "}
            <a href="https://github.com/brlywk" className="link-dark" target="_blank" rel="noreferrer">
              Christoph
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
