import { useNavigate } from "react-router-dom";
import classes from "./Home.module.scss";
import { useForm } from "react-hook-form";
import { Tips, USER, regex } from "../../utils/consts";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputMask from "react-input-mask";
import { useDispatch } from "react-redux";
import { changeEmail, changePhone } from "../../redux/slices/mainFormslice";
import { saveData } from "../../redux/slices/formValues/formValues";
import { getFirstLetters } from "../../utils/helpers/getFirstLetters";
import { IconContext } from "react-icons";
import { FaFolder } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();
  const startButton = () => {
    navigate("/create");
  };

  const dispatch = useDispatch();

  interface IMainFormValues {
    phone: string;
    email: string;
  }
  const schema = yup.object().shape({
    email: yup
      .string()
      .email(Tips.REQUIRED)
      .matches(regex.email, Tips.EMAIL)
      .required(Tips.REQUIRED),
    phone: yup
      .string()
      .min(18, Tips.REQUIRED)
      .required()
      .typeError("Поле не заполнено"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IMainFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  const submit = (data: IMainFormValues) => {
    dispatch(saveData({ index: 0, data: data }));
  };
  return (
    <div className={classes.container}>
      <header className={classes.headerWrapper}>
        <div className={classes.avatar}>
          {getFirstLetters(USER.firstname, USER.lastName)}
        </div>
        <div className={classes.info}>
          <span className={classes.name}>
            {`${USER.firstname} ${USER.lastName}`}
          </span>
          <div className={classes.links}>
            <IconContext.Provider
              value={{
                color: "#CCCCCC",
                size: "15px",
              }}
            >
              <FaFolder />
            </IconContext.Provider>
            <a target="_blank" href="https://t.me/lavver">
              <span>Telegram</span>
            </a>
            <IconContext.Provider
              value={{
                color: "#CCCCCC",
                size: "15px",
              }}
            >
              <FaFolder />
            </IconContext.Provider>
            <a target="_blank" href="https://github.com/valvalov22">
              <span>GitHub</span>
            </a>
            <IconContext.Provider
              value={{
                color: "#CCCCCC",
                size: "15px",
              }}
            >
              <FaFolder />
            </IconContext.Provider>
            <a target="_blank" href="https://disk.yandex.ru/d/BOlSysC_ZfuH5Q">
              <span>Resume</span>
            </a>
          </div>
        </div>
      </header>
      <hr className={classes.divider}></hr>
      <form onSubmit={handleSubmit(submit)} className="personal-info">
        <div className={classes.personalInfo}>
          <label htmlFor="phone">Номер телефона</label>
          <InputMask
            // disabled
            {...register("phone")}
            mask="+7 (999) 999-99-99"
            maskChar={null}
            value={USER.phone}
            onChange={(e) => {
              dispatch(changePhone(e.target.value));
            }}
          />
          <p className={classes.error}>{errors.phone?.message}</p>
          <label htmlFor="email">Email</label>
          <input
            {...register("email")}
            value={USER.email}
            onChange={(e) => {
              dispatch(changeEmail(e.target.value));
            }}
            id="email"
            type="text"
            placeholder="example@example.com"
          />
          <p className={classes.error}>{errors.email?.message}</p>
        </div>
        <button
          className={classes.buttonStart}
          id="button-start"
          onClick={() => {
            if (isValid) {
              handleSubmit(submit);
              startButton();
            }
          }}
          type="submit"
        >
          Начать
        </button>
      </form>
    </div>
  );
};

export default Home;
