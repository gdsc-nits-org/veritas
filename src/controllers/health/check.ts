import * as Success from "@success";
import * as Interfaces from "@interfaces";

const check: Interfaces.Controller.Async = async (_req, res) => {
  return res.json(Success.Health.check);
};

export { check };
