import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';

function renderTextField({ name, input, label, placeholder, meta: { touched, error }, ...custom }) {
  return (
    <FormControl error={!!(touched && error)} aria-describedby="text-input">
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Input id={name} {...input} {...custom} />
      {touched && error && <FormHelperText id={name}>{error}</FormHelperText>}
    </FormControl>
  );
}

export default renderTextField;
