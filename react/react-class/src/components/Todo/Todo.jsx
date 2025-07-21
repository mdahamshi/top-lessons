import "./Todo.css";
import { Component } from "react";

export class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: props.todo
    }
  }
  onChange = (e) => {
    this.setState({inputVal: e.target.value});
  }
  render() {
    return (
      <li className="todo">
        {this.props.edit ? (
          <>
           <form onSubmit={(e) => e.preventDefault() + this.props.handleSubmit(this.props.todo, this.state.inputVal)}>
          <label htmlFor="task-entry">Edit: </label>
          <input
            type="text"
            name="task-entry"
            value={this.state.inputVal}
            onChange={(e) => this.onChange(e)}
          />
          <button type="submit">Re Submit</button>
        </form>
          </>
        ) : (
          <>
            {this.props.todo}
            <button onClick={() => this.props.handleDelete(this.props.todo)}>
              Delete
            </button>
            <button onClick={() => this.props.onEdit(this.props.todo)}>
              Edit
            </button>
          </>
        )}
      </li>
    );
  }
}
