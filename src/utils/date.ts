function checkDateValidity(date: string | number) {
  const dateObject = new Date(date);

  return !isNaN(dateObject.getTime());
}

export { checkDateValidity };
