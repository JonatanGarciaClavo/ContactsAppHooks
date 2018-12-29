import React from "react";
import TextField from "material-ui/TextField";

function renderTextField({
  input,
  label,
  placeholder,
  meta: { touched, error },
  ...custom
}) {
  return (
    <TextField
      hintText={placeholder}
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      {...custom}
    />
  );
}

export default renderTextField;
