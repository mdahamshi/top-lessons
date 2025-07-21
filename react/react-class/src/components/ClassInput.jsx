/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import { Count } from "./Count/Count";
import { Todo } from "./Todo/Todo";

class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [
        { text: "Just some demo tasks", edit: false },
        { text: "As an example", edit: false },
      ],
      inputVal: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }
  handleDelete = (val) => {
    const newTodos = this.state.todos.filter((todo) => todo.text !== val);
    this.setState({ todos: newTodos });
  };
  handleEdit = (val) => {
    const newTodos = this.state.todos.map((todo) => {
      if (todo.text === val) return { ...todo, edit: true };
      else return todo;
    });
    this.setState({ todos: newTodos });
  };
  handleTodoSubmit = (oldTodo, newTodo) => {
    const newTodos = this.state.todos.filter((todo) => todo.text !== oldTodo);
    newTodos.push({text: newTodo, edit: false});
    this.setState({ todos: newTodos });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState((state) => ({
      todos: state.todos.concat({ text: state.inputVal, edit: false }),
      inputVal: "",
    }));
  }

  render() {
    return (
      <section>
        {/* eslint-disable-next-line react/prop-types */}
        <h3>{this.props.name}</h3>
        {/* The input field to enter To-Do's */}
        <form onSubmit={this.handleSubmit}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        <h4>All the tasks!</h4>
        {/* The list of all the To-Do's, displayed */}
        <ul>
          {this.state.todos.map((todo) => (
            <Todo
              key={todo.text}
              onEdit={this.handleEdit}
              edit={todo.edit}
              todo={todo.text}
              handleDelete={this.handleDelete}
              handleSubmit={this.handleTodoSubmit}
            />
          ))}
        </ul>
        <Count children={<>Number of todos: {this.state.todos.length}</>} />
      </section>
    );
  }
}

export default ClassInput;
