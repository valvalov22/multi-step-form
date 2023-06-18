import { useSelector } from "react-redux";
import Stepper from "../../components/Stepper/Stepper";
import { stepper } from "../../redux/slices/stepperSlice/stepperSlice";
import FirstStep from "./Steps/FirstStep/FirstStep";
import SecondStep from "./Steps/SecondStep/SecondStep";
import ThirdStep from "./Steps/ThirdStep/ThirdStep";
import classes from "./Form.module.scss";

const Form = () => {
  const stepperData = useSelector(stepper);
  return (
    <div>
      <Stepper />
      <div className={classes.mainForm}>
        <div>
          {stepperData.currentStep === 1 && <FirstStep />}
          {stepperData.currentStep === 2 && <SecondStep />}
          {stepperData.currentStep === 3 && <ThirdStep />}
        </div>

        <div className={classes.buttons}></div>
      </div>
    </div>
  );
};

export default Form;
