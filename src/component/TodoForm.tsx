import React, { useState } from "react";
import { useTodoStore } from "../store";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import {
  useForm,
  SubmitHandler,
  Controller,
  UseFormReturn,
} from "react-hook-form";
import { Inputs, TTodo } from "../type";
import { Datepicker } from "flowbite-react";
import dayjs from "dayjs";

const TodoForm: React.FC<{
  todoForm: UseFormReturn<Inputs, any, Inputs>;
}> = ({ todoForm }) => {
  const { register, control } = todoForm;

  return (
    <div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="title" value="Title" />
        </div>
        <TextInput {...register("title", { required: true })} />
        {todoForm.formState.errors.title &&
          todoForm.formState.touchedFields.title && (
            <span className="text-red-500">This field is required</span>
          )}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="description" value="Description" />
        </div>
        <TextInput {...register("description")} />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="dueDate" value="Due Date" />
        </div>
        <Controller
          name="dueDate"
          control={control}
          render={({ field }) => (
            <Datepicker
              {...field}
              value={
                field.value
                  ? dayjs(new Date(field.value)).format("DD/MM/YYYY")
                  : undefined
              }
              onSelectedDateChanged={(date) => {
                field.onChange(date);
              }}
            />
          )}
        />
      </div>
    </div>
  );
};

export default TodoForm;
