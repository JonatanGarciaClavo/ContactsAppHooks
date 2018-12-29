import { requiredValidation, maxLength } from "../../globals/validators";

export default function validate(values) {
  const errors = {};
  if (!requiredValidation(values.name)) {
    errors.name = "Name is required";
  } else if (!maxLength(values.name, 4)) {
    errors.name = "Name has to 4 o more characters";
  }
  return errors;
}
