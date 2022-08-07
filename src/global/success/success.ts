import * as Interfaces from "@interfaces";
/**
 * @description Gives back a JSON
 * Object to send as response.
 *
 * @param msg Success message
 */
function success<T = string>(msg: T): Interfaces.JSONInterface.JSONResponse<T> {
  return {
    success: true,
    msg,
  };
}

export default success;
