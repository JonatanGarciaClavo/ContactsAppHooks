/**
 *
 * FormSelectField
 *
 */

import React from "react";
import PropTypes from "prop-types";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

function FormMultiSelectField({
  options,
  input: { value, onChange, onBlur, ...inputProps },
  label,
  meta: { touched, error },
  ...custom
}) {
  return (
    <SelectField
      style={{ margin: "1.5em 0 0 0" }}
      {...inputProps}
      value={value}
      hintText={label}
      errorText={touched && error}
      onChange={(e, index, optionValue) => {
        if (value !== optionValue) {
          onChange(optionValue);
        }
      }}
      onBlur={() => onBlur(value)}
      multiple
      {...custom}
    >
      {options.map((opt) => (
        <MenuItem
          key={`option-${opt.value}`}
          value={opt.value}
          primaryText={opt.text}
        />
      ))}
    </SelectField>
  );
}

FormMultiSelectField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
  options: PropTypes.array.isRequired
};

export default FormMultiSelectField;
