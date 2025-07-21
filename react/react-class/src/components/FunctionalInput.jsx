import React, { useState } from "react";
import { Count } from "./Count/Count";
import { Todo } from "./Todo/Todo";

// eslint-disable-next-line react/function-component-definition, react/prop-types
const FunctionalInput = ({ name }) => {
  /*
    We declare two state variables and their setters,
    one to store the To-Do's
    and the other to store the value of the input field
  */
  const [todos, setTodos] = useState([
    { text: "Just some demo tasks", edit: false },
    { text: "As an example", edit: false },
  ]);
  const [inputVal, setInputVal] = useState("");

  const handleInputChange = (e) => {
    setInputVal(e.target.value);
  };
  const handleDelete = (val) => {
    const newTodos = todos.filter((todo) => todo.text !== val);
    setTodos(newTodos);
  };
  const handleEdit = (val) => {
    const newTodos = todos.map((todo) => {
      if (todo.text === val) return { ...todo, edit: true };
      else return todo;
    });
    setTodos(newTodos);
  };
  const handleTodoSubmit = (oldTodo, newTodo) => {
    const newTodos = todos.filter((todo) => todo.text !== oldTodo);
    newTodos.push({ text: newTodo, edit: false });
    setTodos(newTodos);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos((todo) => [...todo, { text: inputVal, edit: false }]);
    setInputVal("");
  };

  return (
    <section>
      <h3>{name}</h3>
      {/* The input field to enter To-Do's */}
      <form onSubmit={handleSubmit}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="task-entry">Enter a task: </label>
        <input
          type="text"
          name="task-entry"
          value={inputVal}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
      <h4>All the tasks!</h4>
      {/* The list of all the To-Do's, displayed */}
      <ul>
        {todos.map((todo) => (
          <Todo
            key={todo.text}
            todo={todo.text}
            edit={todo.edit}
            onEdit={handleEdit}
            handleDelete={handleDelete}
            handleSubmit={handleTodoSubmit}
          />
        ))}
      </ul>
      <Count children={<>Number of todos: {todos.length}</>} />
    </section>
  );
};

export default FunctionalInput;
