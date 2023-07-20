import TodoItem from "./TodoItem";

/* eslint-disable react/prop-types */
const TodoList = ({ todos, doneHandler, editHandler, deleteHandler }) => {
  return (
    <>
      {todos &&
        todos.length > 0 &&
        todos.map((item) => (
          <TodoItem key={item.id} doneHandler={doneHandler} editHandler={editHandler} deleteHandler={deleteHandler} {...item} />
        ))}
    </>
  );
};

export default TodoList;
