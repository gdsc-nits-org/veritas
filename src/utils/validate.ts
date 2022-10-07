function validate(text: string, validator: RegExp) {
  return text !== undefined && typeof text === "string" && validator.test(text);
}

export { validate };
