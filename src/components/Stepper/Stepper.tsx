import classes from "./Stepper.module.scss";
import { TiTick } from "react-icons/ti";
import { useState } from "react";
import { useSelector } from "react-redux";
import { IconContext } from "react-icons";
import { stepper } from "../../redux/slices/stepperSlice/stepperSlice";

const Stepper = () => {
  const stepperData = useSelector(stepper);
  const [complete] = useState(false);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        {stepperData?.steps.map((step, i) => (
          <div
            key={i}
            className={`${classes.stepItem} ${
              stepperData.currentStep === i + 1 && `${classes.active}`
            } ${i + 1 < stepperData.currentStep && `${classes.complete}`}`}
          >
            <div className={classes.step}>
              {i + 1 < stepperData.currentStep || complete ? (
                <IconContext.Provider
                  value={{ color: "#FFFFFF", size: "13px" }}
                >
                  <div>
                    <TiTick />
                  </div>
                </IconContext.Provider>
              ) : (
                ""
              )}
            </div>
            <p>{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
