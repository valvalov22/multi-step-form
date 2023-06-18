import classes from "./ThirdStep.module.scss";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  changeTextareaValue,
  cleanFieldsThirdStep,
  setLoading,
  setOpen,
  setRejectedOpen,
  thirdStep,
} from "../../../../redux/slices/thirdStepSlice/thirdStepSlice";
import {
  formValues,
  saveData,
  sendForm,
} from "../../../../redux/slices/formValues/formValues";
import FormButtons from "../../../../components/FormButtons/FormButtons";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Tips, finalData } from "../../../../utils/consts";
import Modal from "../../../../components/Modal/Modal";
import { useNavigate } from "react-router-dom";
import successImg from "../../../../img/success.svg";
import rejectedImg from "../../../../img/rejected.svg";
import { useAppDispatch } from "../../../../redux/store";
import { cleanFieldsFirstStep } from "../../../../redux/slices/firstStepSlice/firstStepSlice";
import { cleanFieldsSecondStep } from "../../../../redux/slices/secondStepSlice/secondStepSlice";
import { changeCurrentStep } from "../../../../redux/slices/stepperSlice/stepperSlice";
import { IThirdStepValues } from "./types";
import { handleData } from "../../../../utils/helpers/handleData";

const ThirdStep = () => {
  const dispatch = useAppDispatch();
  const third = useSelector(thirdStep);
  const values = useSelector(formValues);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    about: yup
      .string()
      .max(200, `${Tips.MAX_LENGTH} 200`)
      .required(Tips.REQUIRED),
  });

  const closeModal = () => {
    dispatch(setOpen(false));
    dispatch(setRejectedOpen(false));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IThirdStepValues>({
    resolver: yupResolver(schema),
  });

  // прикольная и большая логика отправки, вся моя жизнь dispatch)))
  const getAllValues = (data: IThirdStepValues) => {
    dispatch(saveData({ index: 3, data: data }));
    dispatch(setLoading(true));
    dispatch(setOpen(true));

    const advantagesTemp: string[] = [];

    values.allValues[2].advantages.forEach((advantage) => {
      advantagesTemp.push(advantage.value);
    });
    handleData(finalData, values);

    finalData.advantages = advantagesTemp;
    finalData.about = third.about;
    finalData.radio = Number(finalData.radio);

    dispatch(sendForm(finalData)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(cleanFieldsFirstStep());
        dispatch(cleanFieldsSecondStep());
        dispatch(cleanFieldsThirdStep());
        dispatch(setLoading(false));
      }

      if (res.meta.requestStatus === "rejected") {
        dispatch(setOpen(false));
        dispatch(setRejectedOpen(true));
        dispatch(setLoading(false));
      }
    });
  };

  return (
    <>
      <form id="thirdStep" onSubmit={handleSubmit(getAllValues)}>
        <section className={classes.thirdStep}>
          <label className={classes.marked}>About</label>
          <div className={classes.wrapper}>
            <textarea
              maxLength={200}
              id="field-about"
              className={classes.textarea}
              {...register("about")}
              onChange={(e) => {
                dispatch(changeTextareaValue(e.target.value));
              }}
              value={third.about}
              placeholder="About"
            ></textarea>
            <span className={classes.symbolsCounter}>
              {third.about.replace(/\s/g, "").length}
            </span>
            <p className={classes.error}>{errors.about?.message}</p>
          </div>
        </section>
        <FormButtons form="thirdStep" />
      </form>

      <Modal
        isOpen={third.isOpen}
        button={
          <button
            id="button-to-main"
            onClick={() => {
              navigate("/");
              dispatch(changeCurrentStep(1));
              closeModal();
            }}
          >
            На главную
          </button>
        }
        onClose={closeModal}
        heading="Форма успешно отправлена"
        img={successImg}
      ></Modal>

      <Modal
        isOpen={third.rejectedIsOpen}
        button={
          <button
            id="button-close"
            onClick={() => {
              closeModal();
            }}
          >
            Закрыть
          </button>
        }
        onClose={closeModal}
        heading="Ошибка"
        img={rejectedImg}
      ></Modal>
    </>
  );
};

export default ThirdStep;
