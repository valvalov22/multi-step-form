import classes from "./FirstStep.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  changeName,
  changeNickName,
  changeSurname,
  chooseSex,
  firstStep,
} from "../../../../redux/slices/firstStepSlice/firstStepSlice";
import { useForm } from "react-hook-form";
import { saveData } from "../../../../redux/slices/formValues/formValues";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormButtons from "../../../../components/FormButtons/FormButtons";
import {
  changeCurrentStep,
  stepper,
} from "../../../../redux/slices/stepperSlice/stepperSlice";
import { Tips, regex } from "../../../../utils/consts";
import { IFirstStepValues } from "./types";

const FirstStep = () => {
  const first = useSelector(firstStep);
  const stepperData = useSelector(stepper);
  const dispatch = useDispatch();

  // const options = [
  //   { id: "field-sex-option-man", value: "man", label: "Man" },
  //   { id: "field-sex-option-woman", value: "woman", label: "Woman" },
  // ];

  const schema = yup.object().shape({
    nickname: yup
      .string()
      .min(1, Tips.REQUIRED)
      .max(30)
      .matches(regex.nickname, Tips.LETTERS_EN_RU_AND_NUMBERS)
      .required(),
    name: yup
      .string()
      .min(1, Tips.REQUIRED)
      .max(50)
      .matches(regex.name, Tips.LETTERS_EN_RU)
      .required()
      .typeError("Поле не заполнено"),
    surname: yup
      .string()
      .min(1, Tips.REQUIRED)
      .max(50)
      .matches(regex.surname, Tips.LETTERS_EN_RU)
      .required(Tips.REQUIRED),
    sex: yup.string().label("Selected sex").required(Tips.REQUIRED),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    // control,
  } = useForm<IFirstStepValues>({
    resolver: yupResolver(schema),
  });

  const dataSave = (data: IFirstStepValues) => {
    dispatch(saveData({ index: 1, data: data }));
    dispatch(changeCurrentStep(stepperData.currentStep + 1));
  };

  return (
    <form
      id="firstStep"
      className={classes.marked}
      onSubmit={handleSubmit(dataSave)}
    >
      <section>
        <div className={classes.firstStep}>
          <label>Nickname</label>
          <input
            placeholder="Placeholder"
            value={first.nickname}
            type="text"
            id="field-nickname"
            {...register("nickname", {
              required: Tips.REQUIRED,
              maxLength: {
                value: 30,
                message: `${Tips.MAX_LENGTH} 30`,
              },
              pattern: {
                value: regex.nickname,
                message: Tips.LETTERS_EN_RU_AND_NUMBERS,
              },
            })}
            onChange={(e) => {
              dispatch(changeNickName(e.target.value));
            }}
          />
          {errors?.nickname ? (
            <p className={classes.error}>{errors?.nickname?.message}</p>
          ) : null}

          <label>Name</label>
          <input
            placeholder="Placeholder"
            value={first.name}
            type="text"
            id="field-name"
            {...register("name")}
            onChange={(e) => {
              dispatch(changeName(e.target.value));
            }}
          />
          <p className={classes.error}>{errors?.name?.message}</p>

          <label>Sername</label>
          <input
            placeholder="Placeholder"
            value={first.surname}
            type="text"
            id="field-sername"
            {...register("surname")}
            onChange={(e) => {
              dispatch(changeSurname(e.target.value));
            }}
          />
          <p className={classes.error}>{errors?.surname?.message}</p>
        </div>
        <div>
          <div className={classes.pickSex}>
            <label htmlFor="sex">Sex</label>
            <select
              placeholder="Не выбрано"
              className={classes.selectSex}
              value={first.sex}
              {...register("sex")}
              onChange={(e) => {
                dispatch(chooseSex(e.target.value));
              }}
              id="field-sex"
            >
              <option id="field-sex-option-man" value="man">
                man
              </option>
              <option id="field-sex-option-woman" value="woman">
                woman
              </option>
            </select>
            {/* <Controller
              name="sex"
              control={control}
              render={({ field: { onChange, value, ref, name } }) => (
                <Select
                  inputId="field-sex"
                  className={classes.selectSex}
                  options={options}
                  ref={ref}
                  name={name}
                  value={options.find((c) => c.value === value)}
                  onChange={(val) => onChange(val?.value)}
                />
              )}
            /> */}
            <p className={classes.error}>{errors?.sex?.message}</p>
          </div>
        </div>
        <FormButtons form="firstStep" />
      </section>
    </form>
  );
};

export default FirstStep;
