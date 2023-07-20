import TodoItem from "./TodoItem";

/* eslint-disable react/prop-types */
const TodoList = () => {
  const testList = [
    { id: "abc", text: "Test Item 1", done: false },
    { id: "def", text: "Test Test", done: false },
    { id: "gih", text: "Test 42", done: true },
    { id: "jkl", text: "Test, just another one", done: false },
  ];

  // temporary, will be replaced with outside provided handlers
  const editHandler = (id, newText) => alert(`Edit called for ${id}. New text: ${newText}`);
  const deleteHandler = (id) => alert(`Delete called for ${id}`);
  const doneHandler = (id, isDone) => alert(`${id} is status ${isDone}`);

  return (
    <div className="container">
      {testList &&
        testList.map((item) => (
          <TodoItem key={item.id} doneHandler={doneHandler} editHandler={editHandler} deleteHandler={deleteHandler} {...item} />
        ))}
    </div>
  );
};

export default TodoList;
