import React, { useEffect, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

function ToastComponent({ message, response, isOpen }) {
  const [open, setOpen] = useState(null);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      onClose={() => setOpen(false)}
      autoHideDuration={3000}
    >
      <Alert
        severity={response}
        onClose={() => setOpen(false)}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default ToastComponent;
