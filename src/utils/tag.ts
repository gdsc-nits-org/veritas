const tagValidate = (tag: string) => {
  if (typeof tag !== "string") {
    return false;
  }
  if (!tag.length) {
    return false;
  }

  return true;
};

export { tagValidate };
