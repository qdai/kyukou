import createPersistedState from 'use-persisted-state';
import { useCallback } from 'react';

const usePersistedList = (storageKey, initialList) => {
  const usePersistedState = createPersistedState(storageKey);

  const [list, setList] = usePersistedState(initialList);

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
