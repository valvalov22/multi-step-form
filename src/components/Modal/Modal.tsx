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
  close?: React.ReactNode;
  isOpen: boolean;
  rejected: boolean;
}

const Modal: React.FC<IModalProps> = ({
  img,
  heading,
  button,
  isOpen,
  rejected,
  close,
}) => {
  const thirdStepData = useSelector(thirdStep);

  return (
    <>
      {isOpen ? (
        <div className={classes.modal}>
          {thirdStepData.loading ? (
            <Loader />
          ) : (
            <div className={classes.wrapper}>
              <h2
                className={
                  rejected ? `${classes.textRejected}` : `${classes.text}`
                }
              >
                {heading}
              </h2>
              {rejected ? <div className={classes.close}>{close}</div> : null}

              <img src={img} alt="status img" />
              <div
                className={
                  rejected ? `${classes.buttonRejected}` : `${classes.button}`
                }
              >
                {button}
              </div>
            </div>
          )}
        </div>
      ) : null}
    </>
  );
};

export default Modal;
