export type TTodo = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  completed?: boolean;
};

// Define the type for Todo store state
export type TodoStore = {
  todos: TTodo[];
  addTodo: (todo: TTodo) => void;
  removeTodo: (id: number) => void;
  markCompleted: (id: number) => void;
  updateTodo: (id: number, value: Inputs) => void;
  syncStore: (todo: TTodo[]) => void;
};

export type Inputs = {
  title: string;
  description: string;
  dueDate: string;
};
