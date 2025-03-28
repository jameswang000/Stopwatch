import { Component } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import Count from "./Count";

class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
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

  handleSubmit(e) {
    e.preventDefault();
    this.setState((state) => ({
      todos: [
        ...state.todos,
        { item: state.inputVal, id: uuidv4(), editMode: false },
      ],
      inputVal: "",
    }));
  }

  render() {
    return (
      <section>
        <h3>{this.props.name}</h3>
        <form onSubmit={this.handleSubmit}>
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
        <ul>
          {this.state.todos.map((todo) => {
            const handleDelete = (e) => {
              e.preventDefault();
              this.setState((state) => ({
                ...state,
                todos: state.todos.filter(
                  (currTodo) => currTodo.id !== todo.id
                ),
              }));
            };

            const handleEditResubmit = (e) => {
              e.preventDefault();
              this.setState((state) => ({
                ...state,
                todos: state.todos.map((currTodo) => {
                  if (currTodo.id == todo.id) {
                    return { ...currTodo, editMode: !currTodo.editMode };
                  }
                  return currTodo;
                }),
              }));
            };

            const handleChangeItem = (e) => {
              e.preventDefault();
              this.setState((state) => ({
                ...state,
                todos: state.todos.map((currTodo) => {
                  if (currTodo.id == todo.id) {
                    return { ...currTodo, item: e.target.value };
                  }
                }),
              }));
            };

            return (
              <div key={todo.id}>
                {todo.editMode ? (
                  <>
                    <input
                      type="text"
                      onChange={handleChangeItem}
                      value={todo.item}
                    />
                    <button onClick={handleEditResubmit}>Resubmit</button>
                  </>
                ) : (
                  <>
                    <li>{todo.item}</li>
                    <button onClick={handleEditResubmit}>Edit</button>
                  </>
                )}
                <button onClick={handleDelete}>Delete</button>
              </div>
            );
          })}
        </ul>
        <Count count={this.state.todos.length} />
      </section>
    );
  }
}

Todo.propTypes = { name: PropTypes.string };

export default Todo;
