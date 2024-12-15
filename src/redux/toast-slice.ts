import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToastState {
  title: string | null;
  description: string | null;
  status: "success" | "error" | "info" | "warning" | null;
}

const initialState: ToastState = {
  title: null,
  description: null,
  status: null,
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setToast: (
      state,
      action: PayloadAction<{
        title: string;
        description: string;
        status: "success" | "error" | "info" | "warning";
      }>
    ) => {
      state.title = action.payload.title;
      state.description = action.payload.description;
      state.status = action.payload.status;
    },
    clearToast: (state) => {
      state.title = null;
      state.description = null;
      state.status = null;
    },
  },
});

export const { setToast, clearToast } = toastSlice.actions;

export default toastSlice.reducer;
