import { Task } from "@app/types/Task";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TodoSlice = {
  tasks: {
    allIds: string[];
    byId: Record<string, Task>;
  };
  filter: "all" | "done" | "undone";
};

const initialState: TodoSlice = {
  tasks: {
    allIds: [],
    byId: {},
  },
  filter: "all",
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTask: (state, { payload }: PayloadAction<string>) => {
      const newTask: Task = {
        id: Math.floor(Math.random() * 100000000).toString(),
        label: payload,
        isDone: false,
      };

      state.tasks.allIds.push(newTask.id);
      state.tasks.byId[newTask.id] = newTask;
    },
    editTask: (state, { payload }: PayloadAction<Task>) => {
      const { id, label, isDone } = payload;

      state.tasks.byId[id] = {
        ...payload,
        label,
      };
    },
    deleteTask: (state, { payload }: PayloadAction<string>) => {
      state.tasks.allIds = state.tasks.allIds.filter((id) => id !== payload);
      delete state.tasks.byId[payload];
    },
    switchIsDone: (state, { payload }: PayloadAction<string>) => {
      state.tasks.byId[payload].isDone = !state.tasks.byId[payload].isDone;
    },
    setFilter: (state, { payload }: PayloadAction<TodoSlice["filter"]>) => {
      state.filter = payload;
    },
  },
});

export const { addTask, editTask, deleteTask, switchIsDone, setFilter } =
  todoSlice.actions;
