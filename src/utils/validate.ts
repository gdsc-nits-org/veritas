function validate(text: string, validator: RegExp) {
  return typeof text === "string" && text !== undefined && validator.test(text);
}

export { validate };
