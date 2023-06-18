import { IFinalData } from "../pages/Form/Steps/ThirdStep/types";

export enum Tips {
  "REQUIRED" = "Обязательное поле",
  "MAX_LENGTH" = "Максимальное количество символов",
  "EMAIL" = "Введите корректный email",
  "PHONE" = "Введите номер телефона",
  "LETTERS_EN_RU" = "Только латинские или кириллические буквы",
  "LETTERS_EN_RU_AND_NUMBERS" = "Только латинские, кириллические буквы и цифры",
  "CHECKBOX_AND_RADIO" = "Выберите хотя бы одно значение",
}

export const regex = {
  email: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9]{2,}\.[a-zA-Z.]{2,}$/,
  nickname: /^[a-zA-Zа-яА-яёЁ0-9]+$/,
  name: /^[a-zA-Zа-яА-яёЁ]+$/,
  surname: /^[a-zA-Zа-яА-яёЁ]+$/,
};

export const USER = {
  firstname: "Валерий",
  lastName: "Веретенников",
  phone: "9120154853",
  email: "vlrik@mail.ru",
};

export const BASE_URL = "https://api.sbercloud.ru";

export const finalData: IFinalData = {
  name: "",
  advantages: [],
  sex: "",
  nickname: "",
  phone: "",
  email: "",
  checkbox: [],
  radio: 0,
  surname: "",
  about: "",
};
