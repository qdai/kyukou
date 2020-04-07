const migrateSettings = () => {
  try {
    const persisted = JSON.parse(localStorage.getItem('persist:root'));
    // eslint-disable-next-line no-underscore-dangle
    if (persisted && persisted._persist && JSON.parse(persisted._persist).version === 1) {
      return {
        selectedAbouts: JSON.parse(persisted.selectedAbouts),
        selectedDepartments: JSON.parse(persisted.selectedDepartments)
      };
    }
    return {};
  // eslint-disable-next-line no-unused-vars
  } catch (err) {
    return {};
  }
};

export default migrateSettings;
