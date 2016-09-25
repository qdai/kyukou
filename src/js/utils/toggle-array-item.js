const toggleArrayItem = (array, item) => {
  const result = [...array];
  const index = array.indexOf(item);
  if (index >= 0) {
    result.splice(index, 1);
  } else {
    result.push(item);
  }
  return result;
};

export default toggleArrayItem;
