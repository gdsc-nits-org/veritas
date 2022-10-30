const appendWithoutDuplicates: (arr1: string[], arr2: string[]) => string[] = (
  arr1,
  arr2
) => {
  if (!arr1 && arr2) {
    return arr2;
  } else if (!arr2 && arr1) {
    return arr1;
  } else if (!arr1 && !arr2) {
    return [];
  }
  arr1.push(...arr2);
  const arr = new Set(arr1);
  return Array.from(arr);
};

export { appendWithoutDuplicates };
