import useLocalStorage from '../shared/useLocalStorage';

const SETTINGS_KEY = 'contact-list-settings';
export const LIST_MODE = 'list';
export const CARD_MODE = 'card';

export default function useListSettings(initialValue = LIST_MODE) {
  const [mode, setMode] = useLocalStorage(SETTINGS_KEY, initialValue);
  return {
    mode,
    setMode,
    LIST_MODE,
    CARD_MODE,
  };
}
