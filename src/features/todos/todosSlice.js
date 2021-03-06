import { createSlice } from '@reduxjs/toolkit';

let nextTodoId = 0;

const todosSlice = createSlice({
  name: 'todos', // a string used as a prefix for generated action types e.g. `${slice.name}/${slice.reducers.toString()}` => `todos/addTodo` or`todos/toggleTodo`
  initialState: [], // initial state value for the reducer slice
  reducers: {
    // an object, where the keys will become action type strings, and the functions are reducers that will be run when that action type is dispatched
    // we can either pass an object with a reducer function and a prepare function
    addTodo: {
      reducer(state, action) {
        // fired when `todos/addTodo` is dispatched
        const { id, text } = action.payload;
        // Mutable state like below is okay, immer (https://github.com/immerjs/immer) + RTK is handling this by wrapping all reducers here in a .produce from immer
        state.push({ id, text, completed: false });
      },
      // Prepare allows us to define how the action payload is created, in this case we want the next id to be created for us rather than forcing the consumer of said action to generate it
      // NOTE: the return value of prepare must return an object with property payload, otherwise the action's payload will be undefined. It _may_ also include meta, which can be used to define other meta data related to said action
      prepare(text) {
        return { payload: { text, id: nextTodoId++ } };
      },
    },
    // or we can pass the reducer function directly
    // toggleTodo expects an action where the payload _is_ the id we are toggling
    toggleTodo(state, action) {
      // fired when `todos/toggleTodo` is dispatched
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    clearTodos(state, action) {
      return [];
    }
    // NOTE: no need for a default reducer here, reducer generated by createSlice already knows to handle all other action types by returning state
  },
});

// The result of createSlice looks something like this:
/*
  {
    name: "todos",
    reducer: (state, action) => newState,
    actions: {
      addTodo: (payload) => ({type: "todos/addTodo", payload}),
      toggleTodo: (payload) => ({type: "todos/toggleTodo", payload})
    },
    caseReducers: {
      addTodo: (state, action) => newState,
      toggleTodo: (state, action) => newState,
    }
  }
*/

// "Ducks pattern": Suggests putting action creators and reducers in one file...
// do named exports of action creators
export const { addTodo, toggleTodo, clearTodos } = todosSlice.actions;
// and default export of the reducer function
export default todosSlice.reducer;
