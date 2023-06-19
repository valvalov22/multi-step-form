import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { BASE_URL } from "../../../utils/consts";
import axios from "axios";
import { IAllValues, IFinalData } from "./types";

export const sendForm = createAsyncThunk(
  "formValuesSlice/sendForm",
  async (finalData: IFinalData) => {
    const { data } = await axios.post<IFinalData>(
      `${BASE_URL}/content/v1/bootcamp/frontend`,
      finalData
    );
    return data;
  }
);

export type TAllValues = {
  allValues: IAllValues[];
};

const initialState: TAllValues = {
  allValues: [],
};

const formValuesSlice = createSlice({
  name: "formValuesSlice",
  initialState,
  reducers: {
    saveData: (state, action) => {
      // state.allValues.
      const { index, data } = action.payload;
      state.allValues.splice(index, 1, data);
      // state.allValues.push(action.payload);
    },
  },
});

export default formValuesSlice.reducer;

export const { saveData } = formValuesSlice.actions;
export const formValues = (state: RootState) => state.formValuesSlice;
