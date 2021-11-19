import React from 'react';
import { Button } from '@mui/material';

function ButtonComponent({
  btnValue,
  btnClickHandler,
  btnType,
  disabled,
  ...props
}) {
  return (
    <Button
      variant="contained"
      onClick={btnClickHandler}
      disabled={disabled}
      id="Button"
      type={btnType}
      {...props}
      sx={{ width: '150px', height: '40px' }}
      style={{ background: disabled ? '' : '#009063' }}
    >
      {btnValue}
    </Button>
  );
}

export default ButtonComponent;
