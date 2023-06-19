export interface IFinalData {
  name: string;
  advantages: string[];
  sex: string;
  nickname: string;
  phone: string;
  email: string;
  checkbox: number[];
  radio: number;
  surname: string;
  about: string;
}

export interface IAllValues extends Omit<IFinalData, "advantages"> {
  sex: Sex;
  advantages: IAdvantage[];
  email: string;
}

export enum Sex {
  nothing = "Не выбрано",
  man = "Man",
  woman = "Woman",
}

export interface IAdvantage {
  value: string;
}
