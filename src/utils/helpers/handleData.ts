import { IFinalData } from "../../pages/Form/Steps/ThirdStep/types";
import { TAllValues } from "../../redux/slices/formValues/formValues";

export const handleData = (finalData: IFinalData, values: TAllValues) => {
  Object.assign(finalData, values.allValues[0]);
  Object.assign(finalData, values.allValues[1]);
  Object.assign(finalData, values.allValues[2]);
  Object.assign(finalData, values.allValues[3]);

  return finalData;
};
