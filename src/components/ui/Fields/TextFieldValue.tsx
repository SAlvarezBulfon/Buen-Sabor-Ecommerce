import React from 'react';
import { ErrorMessage, Field } from 'formik';
import { TextField, InputLabel } from '@mui/material';
import './textFieldValue.css'; // Importa el archivo de estilos CSS

interface TextFieldValueProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  disabled?: boolean;
  defaultValue?: string;
}

const TextFieldValue: React.FC<TextFieldValueProps> = ({ label, name, type, placeholder, disabled, defaultValue }) => {
  return (
    <div className="text-field-container">
      <InputLabel htmlFor={name} className="label">
        {label}
      </InputLabel>
      <Field
        as={TextField}
        variant="outlined"
        fullWidth
        placeholder={placeholder}
        name={name}
        type={type}
        autoComplete="off"
        disabled={disabled}
        defaultValue={defaultValue}
      />
      <ErrorMessage component="div" name={name} className="error" />
    </div>
  );
};

export default TextFieldValue;
