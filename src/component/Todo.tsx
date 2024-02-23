import { Button, Modal } from "flowbite-react";
import { useTodoStore } from "../store";
import { Inputs, TTodo } from "../type";
import { useState } from "react";
import TodoForm from "./TodoForm";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

const Todo: React.FC<{ todo: TTodo }> = ({ todo }) => {
  const [openModal, setOpenModal] = useState(false);
  const { removeTodo, markCompleted, updateTodo } = useTodoStore((state) => ({
    removeTodo: state.removeTodo,
    markCompleted: state.markCompleted,
    updateTodo: state.updateTodo,
  }));
  const todoForm = useForm<Inputs>({ defaultValues: todo });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    updateTodo(todo.id, data);
    console.log(data);
    setOpenModal(false);
  };

  return (
    <div className="flex gap-4">
      <span
        onClick={() => markCompleted(todo.id)}
        className={`${todo.completed ? "line-through" : ""} cursor-pointer`}
      >
        {todo.title}
      </span>
      <Button size="xs" onClick={() => setOpenModal(true)}>
        Edit
      </Button>
      <Button
        gradientMonochrome="failure"
        size="xs"
        onClick={() => removeTodo(todo.id)}
      >
        Delete
      </Button>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <form
          className="flex flex-col gap-4"
          onSubmit={todoForm.handleSubmit(onSubmit)}
        >
          <div className="p-4">
            <TodoForm todoForm={todoForm} />
          </div>
          <Modal.Footer>
            <Button type="submit">Save</Button>
            <Button color="gray" onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default Todo;
