import React, { useContext } from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import { Context as UIContext } from '../../state/ui/context';

function Loader() {
  const [ui] = useContext(UIContext);
  if (ui.isLoading) {
    return <LinearProgress mode="indeterminate" />;
  }
  return <span style={{ width: '4px' }} />;
}

export default Loader;
