import { useTodoStore } from "../store";
import Todo from "./Todo";

const TodoList: React.FC = () => {
  const todos = useTodoStore((state) => state.todos);

  return (
    <div>
      <h2 className="my-4 font-bold">Your todo list:</h2>
      <div className="flex flex-col gap-3">
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
};
export default TodoList;
