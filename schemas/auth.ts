import * as yup from "yup";

export const registerSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});
