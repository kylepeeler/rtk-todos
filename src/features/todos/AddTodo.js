import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTodo, clearTodos } from 'features/todos/todosSlice';

const mapDispatch = { addTodo, clearTodos };

const AddTodo = ({ addTodo, clearTodos }) => {
  const [todoText, setTodoText] = useState('');

  const onChange = (e) => setTodoText(e.currentTarget.value);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!todoText.trim()) {
            return;
          }
          addTodo(todoText);
          setTodoText('');
        }}
      >
        <input value={todoText} onChange={onChange} />
        <button type="submit">Add Todo</button>
        <button type="button" onClick={() => clearTodos()}>
          Clear Todos
        </button>
      </form>
    </div>
  );
};

export default connect(null, mapDispatch)(AddTodo);
