interface IAdvantages {
  id: number;
  text: string;
}

export type TSecondStepSliceState = {
  advantages: IAdvantages[];
  checkbox: number[];
  radio: number;
  isChecked: boolean[];
  radioValue: number;
};
