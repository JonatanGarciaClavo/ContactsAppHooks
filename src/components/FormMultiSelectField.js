/**
 *
 * FormSelectField
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';

function FormMultiSelectField({
  options,
  input: { value, onChange, onBlur, ...inputProps },
  label,
  meta: { touched, error },
  multiple,
  ...custom
}) {
  return (
    <FormControl style={{ width: 167 }}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value || multiple ? [] : ''}
        onChange={onChange}
        fullWidth
        {...inputProps}
        {...custom}
      >
        {options.map(opt => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.text}
          </MenuItem>
        ))}
      </Select>
      {touched && error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}

FormMultiSelectField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
  options: PropTypes.array.isRequired,
};

export default FormMultiSelectField;
