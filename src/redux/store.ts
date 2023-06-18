import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import firstStepSlice from "./slices/firstStepSlice/firstStepSlice";
import secondStepSlice from "./slices/secondStepSlice/secondStepSlice";
import thirdStepSlice from "./slices/thirdStepSlice/thirdStepSlice";
import mainFormslice from "./slices/mainFormslice";
import formValuesSlice from "./slices/formValues/formValues";
import stepperSlice from "./slices/stepperSlice/stepperSlice";

export const store = configureStore({
  reducer: {
    firstStepSlice,
    secondStepSlice,
    thirdStepSlice,
    mainFormslice,
    formValuesSlice,
    stepperSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
