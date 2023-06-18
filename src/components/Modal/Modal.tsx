import React from "react";
import classes from "./Modal.module.scss";
import { useSelector } from "react-redux";
import { thirdStep } from "../../redux/slices/thirdStepSlice/thirdStepSlice";
import Loader from "../Loader/Loader";

interface IModalProps {
  img: string;
  heading: string;
  onClose: () => void;
  button: React.ReactNode;
  isOpen: boolean;
}

const Modal: React.FC<IModalProps> = ({ img, heading, button, isOpen }) => {
  const thirdStepData = useSelector(thirdStep);

  return (
    <>
      {isOpen ? (
        <div className={classes.modal}>
          <div className={classes.wrapper}>
            {thirdStepData.loading ? (
              <Loader />
            ) : (
              <>
                <h2 className={classes.text}>{heading}</h2>
                <img src={img} alt="status img" />
                <div className={classes.button}>{button}</div>
              </>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
