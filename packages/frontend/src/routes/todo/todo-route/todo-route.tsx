import React, { ChangeEvent, FC, useCallback, useMemo } from "react";
import { Layout } from "@app/components/layout/layout";
import { useDispatch, useSelector } from "@app/redux/store";
import { Input } from "@app/ui-kit/input/input";
import { Button } from "@app/ui-kit/button/button";
import { addTask, setFilter, TodoSlice } from "@app/redux/todoSlice/todoSlice";
import { TaskCard } from "../task-card/task-card";
import {
  $addButton,
  $container,
  $filterContainer,
  $formContainer,
  $taskCard,
  $tasksContainer,
} from "./styles";
import { useForm } from "react-hook-form";
import { getSimpleResolver } from "@app/utils/get-simple-resolver";
import { TError } from "@app/types/TError";
import { createValidationError } from "@app/utils/create-validation-error";

type FormValues = {
  label: string;
};

const defaultValues: FormValues = {
  label: "",
};

const validate = (values: Partial<FormValues>) => {
  const errors: TError<FormValues> = {};

  if (!values.label) {
    errors.label = createValidationError("label is required");
  }

  return errors;
};

export const TodoRoute: FC = () => {
  const dispatch = useDispatch();
  const { allIds, byId } = useSelector((state) => state.todo.tasks);
  const { filter } = useSelector((state) => state.todo);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<FormValues>>({
    defaultValues,
    resolver: getSimpleResolver(validate),
    mode: "onTouched",
  });

  const doSubmit = useCallback(({ label }: Partial<FormValues>) => {
    dispatch(addTask(label));
  }, []);

  const taskList = useMemo(() => allIds.map((id) => byId[id]), [allIds, byId]);

  const filteredTaskList = useMemo(
    () =>
      taskList.filter((el) => {
        switch (filter) {
          case "all":
            return true;

          case "done":
            return el.isDone;

          case "undone":
            return !el.isDone;
        }
      }),
    [filter, taskList],
  );

  const handleFilterChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      dispatch(setFilter(e.target.value as TodoSlice["filter"]));
    },
    [dispatch],
  );

  return (
    <Layout>
      <div className={$container}>
        <form onSubmit={handleSubmit(doSubmit)} className={$formContainer}>
          <Input
            title="Task label"
            {...register("label")}
            error={errors.label?.message}
          />

          <Button type="submit" className={$addButton}>
            Add task
          </Button>
        </form>
        <div className={$filterContainer}>
          <select
            name="filter"
            id="filter"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="all">All</option>
            <option value="done">Done</option>
            <option value="undone">Undone</option>
          </select>
        </div>
        <div className={$tasksContainer}>
          {filteredTaskList.map((task) => (
            <TaskCard key={task.id} task={task} className={$taskCard} />
          ))}
        </div>
      </div>
    </Layout>
  );
};
