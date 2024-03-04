import { createAsyncThunk } from "@reduxjs/toolkit";
import { resolveWithValue } from "@tm/common/lib/utils/resolve-with-value";

export const heavyCalculations = createAsyncThunk(
  "heavy-calculations",
  async (payload, thunkAPI) => {
    await resolveWithValue(true, 1000);

    return true;
  },
);
