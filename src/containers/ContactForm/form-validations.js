import { requiredValidation, isEmail, isUrl } from "../../globals/validators";

export default function validate(values) {
  const errors = {};
  if (!requiredValidation(values.email)) {
    errors.email = "Email is required";
  } else if (!isEmail(values.email)) {
    errors.email = "Email format is incorrect";
  }
  if (!requiredValidation(values.name)) {
    errors.name = "Name is Required";
  }
  if (!isUrl(values.imgUrl)) {
    errors.imgUrl = "Invalid url";
  }
  return errors;
}
