import React, { useContext } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { Context as SnackbarContext } from '../../state/snackbar/context';

const ANCHOR_ORIGIN = {
  vertical: 'bottom',
  horizontal: 'left',
};

function SB() {
  const [message, { close }] = useContext(SnackbarContext);
  return (
    <Snackbar
      anchorOrigin={ANCHOR_ORIGIN}
      open={!!message}
      message={message}
      autoHideDuration={3000}
      onClose={close}
    />
  );
}

export default SB;
