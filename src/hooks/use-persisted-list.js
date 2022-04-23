import { useCallback } from 'react';
import { useLocalStorage } from 'usehooks-ts';

const usePersistedList = (storageKey, initialList) => {
  const [list, setList] = useLocalStorage(storageKey, initialList);

  const toggleListItem = useCallback(item => {
    setList(prevList => {
      const nextList = [...prevList];
      const index = prevList.indexOf(item);
      if (index >= 0) {
        nextList.splice(index, 1);
      } else {
        nextList.push(item);
      }
      return nextList;
    });
  }, [setList]);

  return [list, toggleListItem];
};

export default usePersistedList;
