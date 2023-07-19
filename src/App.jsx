import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const initialTodos = JSON.parse(localStorage.getItem('todos')) || [];
  const [todos, setTodos] = useState(initialTodos);


  // Load todos from localStorage on component mount
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos);
  }, []);

  // Save todos to localStorage whenever 'todos' changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    const newTodo = {
      done: false,
      id: Date.now(), // You can use any unique identifier here
      text: "New todo",
    };
    setTodos([...todos, newTodo]);
  };

  const removeTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const toggleDone = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );
    setTodos(updatedTodos);
  };

  const handleEditTodo = (id) => {
    setEditTodoId(id);
    const todoToEdit = todos.find((todo) => todo.id === id);
    setEditTodoText(todoToEdit.text);
  };



  return (
    <div>

    </div>
  );
};

export default App
