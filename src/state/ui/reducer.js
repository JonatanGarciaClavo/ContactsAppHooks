import { useReducer } from 'react';

const SET_LOADER = 'ui/SET_LOADER';

function useUIReducer() {
  const [ui, dispatch] = useReducer(
    (state, action) => {
      const payload = action.payload;
      switch (action.type) {
        case SET_LOADER:
          return {
            ...state,
            isLoading: payload,
          };
        default:
          return state;
      }
    },
    {
      isLoading: false,
    },
  );
  const setLoader = payload =>
    dispatch({
      type: SET_LOADER,
      payload,
    });
  return [ui, { setLoader }];
}

export default useUIReducer;
