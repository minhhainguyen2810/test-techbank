import TodoList from "./component/TodoList";
import TodoForm from "./component/TodoForm";
import { Inputs, TTodo } from "./type";
import React, { useEffect, useState } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Datepicker } from "flowbite-react";
import dayjs from "dayjs";
import { useTodoStore } from "./store";

function App() {
  const addTodo = useTodoStore((state) => state.addTodo);
  const syncStore = useTodoStore((state) => state.syncStore);
  const todoForm = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    addTodo({ id: Date.now(), ...data });
    console.log(data);
  };

  useEffect(() => {
    const todosLocal = JSON.parse(
      localStorage.getItem("todos") || "[]"
    ) as TTodo[];
    if (todosLocal) syncStore(todosLocal);
  }, [syncStore]);

  return (
    <div className="p-4">
      <div>
        <h1 className="my-4 font-bold">Minh Nguyen's Todo App</h1>
        <form
          className="flex max-w-md flex-col gap-4"
          onSubmit={todoForm.handleSubmit(onSubmit)}
        >
          <TodoForm todoForm={todoForm} />
          <Button gradientDuoTone="purpleToBlue" type="submit">
            Add
          </Button>
        </form>
        <TodoList />
      </div>
    </div>
  );
}

export default App;
