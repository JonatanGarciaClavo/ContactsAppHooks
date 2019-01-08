import { useCallback, useContext } from 'react';
import { Context as UIContext } from '../ui/context';

const useAsyncLoaderCallback = (callback, inputs) => {
  const {
    1: { setLoader },
  } = useContext(UIContext);

  return useCallback(async (...args) => {
    setLoader(true);
    await callback(...args);
    setLoader(false);
  }, inputs);
};

export default useAsyncLoaderCallback;
