import { abouts, departments } from '../../constant';
import migrateSettings from './migrate-settings';
import usePersistedList from '../use-persisted-list';

const storagePrefix = 'kyukou-v2-settings';

const useSettings = () => {
  const oldSettings = migrateSettings();
  const [selectedAbouts, toggleAbout] = usePersistedList(`${storagePrefix}-abouts`, oldSettings.selectedAbouts || abouts);
  const [selectedDepartments, toggleDepartment] = usePersistedList(`${storagePrefix}-departments`, oldSettings.selectedDepartments || departments);

  return {
    selectedAbouts,
    selectedDepartments,
    toggleAbout,
    toggleDepartment
  };
};

export default useSettings;
