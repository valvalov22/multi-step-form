export enum Sex {
  man = "Man",
  woman = "Woman",
}

export type TFirstStepSliceState = {
  nickname: string;
  name: string;
  surname: string;
  sex: Sex;
};
