import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Sex, TFirstStepSliceState } from "./types";

const initialState: TFirstStepSliceState = {
  nickname: "",
  name: "",
  surname: "",
  sex: Sex.man,
};

const firstStepSlice = createSlice({
  name: "firstStepSlice",
  initialState,
  reducers: {
    changeNickName: (state, action) => {
      state.nickname = action.payload;
    },
    changeName: (state, action) => {
      state.name = action.payload;
    },
    changeSurname: (state, action) => {
      state.surname = action.payload;
    },
    chooseSex: (state, action) => {
      state.sex = action.payload;
    },
    cleanFieldsFirstStep: (state) => {
      state.name = "";
      state.nickname = "";
      state.surname = "";
    },
  },
});

export default firstStepSlice.reducer;

export const {
  changeName,
  changeNickName,
  changeSurname,
  chooseSex,
  cleanFieldsFirstStep,
} = firstStepSlice.actions;
export const firstStep = (state: RootState) => state.firstStepSlice;
