import classes from "./SecondStep.module.scss";
import { useForm, useFieldArray } from "react-hook-form";
import { IconContext } from "react-icons";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addAdvantage,
  changeAdvantageByIndex,
  changeRadioValue,
  checkboxCheck,
  removeAdvantage,
  secondStep,
} from "../../../../redux/slices/secondStepSlice/secondStepSlice";
import { saveData } from "../../../../redux/slices/formValues/formValues";
import FormButtons from "../../../../components/FormButtons/FormButtons";
import {
  changeCurrentStep,
  stepper,
} from "../../../../redux/slices/stepperSlice/stepperSlice";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Tips } from "../../../../utils/consts";
import { IFormValues } from "./types";

const SecondStep = () => {
  const second = useSelector(secondStep);
  const stepperData = useSelector(stepper);
  const dispatch = useDispatch();

  const formSchema = {
    value: yup
      .string()
      .min(1, Tips.REQUIRED)
      .max(50, `${Tips.MAX_LENGTH} 50`)
      .required("Поле должно быть заполнено")
      .typeError("Поле должно быть заполнено"),
  };

  const schema = yup.object().shape({
    advantages: yup
      .array()
      .of(yup.object().shape(formSchema))
      .required()
      .min(1, Tips.REQUIRED)
      .max(50, Tips.REQUIRED)
      .typeError(Tips.REQUIRED),
    checkbox: yup
      .array()
      .of(yup.number())
      .min(1, "Обязательное поле")
      .of(yup.number().required())
      .required()
      .typeError(Tips.CHECKBOX_AND_RADIO),

    radio: yup.number().required(Tips.CHECKBOX_AND_RADIO),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormValues>({
    defaultValues: {},
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const { append, remove } = useFieldArray<IFormValues>({
    name: "advantages",
    control,
  });

  const dataSave = (data: IFormValues) => {
    dispatch(saveData({ index: 2, data: data }));
    dispatch(changeCurrentStep(stepperData.currentStep + 1));
  };

  return (
    <form id="secondStep" onSubmit={handleSubmit(dataSave)}>
      <section className={classes.secondStep}>
        <div className={classes.marked}>Advantages</div>
        {second.advantages.map((field, index) => {
          return (
            <section
              key={`${field.id}${index}`}
              className={classes.advantageInputs}
            >
              <input
                placeholder="Placeholder"
                type="text"
                value={second.advantages[index].text}
                id={`field-advantages-${index}`}
                {...register(`advantages.${index}.value`)}
                onChange={(e) => {
                  dispatch(
                    changeAdvantageByIndex({
                      index: index,
                      text: e.target.value,
                    })
                  );
                }}
              />
              <button
                className={classes.removeAdvantageButton}
                id={`button-remove-${index}`}
                onClick={() => {
                  remove(index);
                  dispatch(removeAdvantage({ index: index, number: 1 }));
                }}
                type="button"
              >
                <IconContext.Provider
                  value={{ color: "#CCCCCC", size: "15px" }}
                >
                  <div>
                    <FaTrash />
                  </div>
                </IconContext.Provider>
              </button>
              <span className={classes.error}>
                {errors?.advantages?.[index]?.value?.message}
              </span>
            </section>
          );
        })}
        <button
          className={classes.addAdvantageButton}
          id="button-add"
          onClick={() => {
            append({
              value: "",
            });
            dispatch(addAdvantage({ id: second.advantages.length, text: "" }));
          }}
          type="button"
        >
          +
        </button>
        <p className={classes.error}>{errors?.advantages?.message}</p>

        <div className={classes.checkboxGroup}>
          <span>Checkbox group</span>
          {second.checkbox.map((item, i) => (
            <div key={i}>
              <input
                id={`field-checkbox-group-option-${i}`}
                type="checkbox"
                value={i + 1}
                checked={second.isChecked[i]}
                {...register("checkbox")}
                onChange={() => {
                  dispatch(checkboxCheck({ index: i }));
                }}
              />
              <label htmlFor="checkbox">{item}</label>
            </div>
          ))}
        </div>
        <p className={classes.error}>{errors?.checkbox?.message}</p>
        <div className={classes.radioGroup}>
          <span className={classes.marked}>Radio group</span>
          <label>
            <input
              id="field-radio-group-option-1"
              value={1}
              checked={second.radioValue === 1 ? true : false}
              {...register("radio")}
              onChange={() => {
                dispatch(changeRadioValue(1));
              }}
              type="radio"
            />
            1
          </label>
          <label>
            <input
              id="field-radio-group-option-2"
              value={2}
              checked={second.radioValue === 2 ? true : false}
              {...register("radio")}
              onChange={() => {
                dispatch(changeRadioValue(2));
              }}
              type="radio"
            />
            2
          </label>
          <label>
            <input
              id="field-radio-group-option-3"
              value={3}
              checked={second.radioValue === 3 ? true : false}
              {...register("radio")}
              onChange={() => {
                dispatch(changeRadioValue(3));
              }}
              type="radio"
            />
            3
          </label>
        </div>
        <p className={classes.error}>{errors?.radio?.message}</p>
      </section>
      <FormButtons form="secondStep" />
    </form>
  );
};

export default SecondStep;
