import { create } from "zustand";
import { Inputs, TTodo, TodoStore } from "../type";
import { produce } from "immer";

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  addTodo: (todo) => {
    set((state) => {
      localStorage.setItem("todos", JSON.stringify([...state.todos, todo]));
      return { todos: [...state.todos, todo] };
    });
  },
  removeTodo: (id) => {
    set((state) => {
      localStorage.setItem(
        "todos",
        JSON.stringify(state.todos.filter((todo) => todo.id !== id))
      );

      return { todos: state.todos.filter((todo) => todo.id !== id) };
    });
  },
  markCompleted: (id) => {
    set(
      produce((state: TodoStore) => {
        const selectedTodo = state.todos.findIndex((todo) => todo.id === id);
        state.todos[selectedTodo].completed =
          !state.todos[selectedTodo].completed;
      })
    );
  },
  updateTodo: (id: number, value: Inputs) => {
    set(
      produce((state: TodoStore) => {
        const selectedTodo = state.todos.findIndex((todo) => todo.id === id);
        console.log(selectedTodo);

        state.todos[selectedTodo] = { ...state.todos[selectedTodo], ...value };
      })
    );
  },
  syncStore: (todos: TodoStore["todos"]) => {
    set((state) => ({ todos }));
  },
}));
