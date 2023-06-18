import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCurrentStep,
  stepper,
} from "../../redux/slices/stepperSlice/stepperSlice";
import { useNavigate } from "react-router-dom";
import classes from "./FormButtons.module.scss";

type TFormButtonsProps = {
  form: string;
};

const FormButtons: React.FC<TFormButtonsProps> = ({ form }) => {
  const stepperData = useSelector(stepper);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className={classes.formButtons}>
      <button
        className={classes.formBackButton}
        form={form}
        id="button-back"
        onClick={() => {
          stepperData.currentStep === 1
            ? navigate("/")
            : dispatch(changeCurrentStep(stepperData.currentStep - 1));
        }}
        type="button"
      >
        Назад
      </button>
      <button
        className={classes.submitFormButton}
        form={form}
        id={
          stepperData.currentStep === stepperData.steps.length
            ? "button-send"
            : "button-next"
        }
        onSubmit={() => {
          dispatch(changeCurrentStep(stepperData.currentStep + 1));
          stepperData.currentStep === stepperData.steps.length
            ? navigate("/")
            : null;
        }}
        type="submit"
      >
        {stepperData.currentStep === stepperData.steps.length
          ? "Отправить"
          : "Далее"}
      </button>
    </div>
  );
};

export default FormButtons;
