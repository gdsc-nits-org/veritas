interface JSONResponse<T = string> {
  success: boolean;
  msg: T;
}

export { JSONResponse };
