enum Sex {
  man = "Man",
  woman = "Woman",
}

export interface IFirstStepValues {
  nickname: string;
  name: string;
  surname: string;
  sex: Sex.man;
}
