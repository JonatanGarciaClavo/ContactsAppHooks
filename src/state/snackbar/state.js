import { useState } from 'react';

function useSnackbarState() {
  const [message, setMessage] = useState(null);
  const close = () => {
    setMessage(null);
  };
  const displayError = error => {
    let message = 'Unknown error';
    if (error && error.message) {
      message = error.message;
    } else if (typeof error === 'string') {
      message = error;
    }
    console.error(message);
    setMessage(message);
  };
  return [message, { setMessage, close, displayError }];
}

export default useSnackbarState;
