import * as Interfaces from "@interfaces";

/**
 * @description Gives back a JSON
 * Object to send as response.
 *
 * @param msg Error message
 */
function error(msg: string): Interfaces.JSONInterface.JSONResponse {
  return {
    success: false,
    msg,
  };
}

export default error;
