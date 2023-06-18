export enum Sex {
  nothing = "Не выбрано",
  man = "Man",
  woman = "Woman",
}

export type TFirstStepSliceState = {
  nickname: string;
  name: string;
  surname: string;
  sex: Sex;
  phone: string;
};
