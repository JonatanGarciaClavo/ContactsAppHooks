import React, { useContext } from 'react';
import Snackbar from 'material-ui/Snackbar';
import { Context as SnackbarContext } from '../../state/snackbar/context';

function SB() {
  const [message, { close }] = useContext(SnackbarContext);
  return (
    <Snackbar open={!!message} message={message} autoHideDuration={3000} onRequestClose={close} />
  );
}

export default SB;
