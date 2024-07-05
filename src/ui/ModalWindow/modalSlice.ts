import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  active: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.active = true;
    },
    closeModal: (state) => {
      state.active = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
