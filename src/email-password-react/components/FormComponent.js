import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';
import { MESSAGE_CONSTANT } from '../constants/MessageConstant';
import { Row } from 'react-bootstrap';

function FormComponent({ label, id }) {
  const [configurations, setConfigurations] = useState({
    pattern: null,
    required: null,
    valid: null,
  });

  const { register, formState: { errors } } = useFormContext();


  useEffect(() => {
    switch (label) {
      case 'Email':
        setConfigurations({
          ...configurations,
          pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          required: MESSAGE_CONSTANT.email.required,
          valid: MESSAGE_CONSTANT.email.valid,
        });
        break;
      case 'Password':
        setConfigurations({
          ...configurations,
          pattern:
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
          required: MESSAGE_CONSTANT.password.required,
          valid: MESSAGE_CONSTANT.password.valid,
        });
        break;
      case 'Confirm Password':
        setConfigurations({
          ...configurations,
          pattern:
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
          required: MESSAGE_CONSTANT.confirmPassword.required,
          valid: MESSAGE_CONSTANT.confirmPassword.valid,
        });
        break;
      default:
        return configurations;
    }
  }, [label]);

  const errorFinder = (label) => {
    if (Object.keys(errors).includes(label)) {
      if (Object.values(errors)[0].type === 'pattern') {
        return configurations.valid;
      }
      return Object.values(errors)[0].message;
    }
  };


  return (
    <Row className="justify-content-center">
      <TextField
        {...register(`${label}`, {
          pattern: configurations.pattern,
          required: configurations.required,
        })}
        type={`${id}`}
        label={label}
        id={`standard-${id}`}
        variant="standard"
        error={Boolean(errorFinder(label))}
        helperText={errorFinder(label)}
      />
    </Row>

  );
}

export default FormComponent;
