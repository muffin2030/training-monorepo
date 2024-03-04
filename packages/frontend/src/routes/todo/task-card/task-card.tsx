import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Task } from "@app/types/Task";
import {
  $buttonContainer,
  $container,
  $descriptionContainer,
  $done,
  $isDoneButton,
  $label,
} from "./styles";
import { Button } from "@app/ui-kit/button/button";
import { cx } from "@linaria/core";
import { useDispatch } from "@app/redux/store";
import {
  editTask,
  deleteTask,
  switchIsDone,
} from "@app/redux/todoSlice/todoSlice";

type Props = {
  task: Task;
  className?: string;
};

export const TaskCard: FC<Props> = ({ task, className }) => {
  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [newLabel, setNewLabel] = useState<string>(task.label);

  useEffect(() => {
    setNewLabel(task.label);
  }, [task.label]);

  const switchEdit = useCallback(() => {
    setIsEdit((prev) => !prev);
  }, []);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setNewLabel(e.target.value);
  }, []);

  const handleEdit = useCallback(() => {
    dispatch(
      editTask({
        ...task,
        label: newLabel,
      }),
    );

    switchEdit();
  }, [dispatch, newLabel, task]);

  const handleDelete = useCallback(() => {
    dispatch(deleteTask(task.id));
  }, [dispatch, task.id]);

  const handleCancel = useCallback(() => {
    switchEdit();
    setNewLabel(task.label);
  }, [task.label, switchEdit]);

  const switchDone = useCallback(() => {
    dispatch(switchIsDone(task.id));
  }, [dispatch, task.id]);

  return (
    <div className={cx($container, className)}>
      <div className={$descriptionContainer}>
        {isEdit ? (
          <input type="text" value={newLabel} onChange={handleChange} />
        ) : (
          <div className={cx($label, task.isDone && $done)}>{task.label}</div>
        )}
      </div>
      <div className={$buttonContainer}>
        {isEdit ? (
          <>
            <Button onClick={handleCancel}>cancel</Button>
            <Button onClick={handleEdit}>save</Button>
          </>
        ) : (
          <>
            <Button onClick={switchEdit}>edit</Button>
            <Button onClick={switchDone} className={$isDoneButton}>
              {task.isDone ? "Undone" : "Done"}
            </Button>
            <Button onClick={handleDelete}>delete</Button>
          </>
        )}
      </div>
    </div>
  );
};
