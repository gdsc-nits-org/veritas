import * as Utils from "@utils";

const improperPosition = Utils.Response.Error("Improper Position", 401);
const improperDomain = Utils.Response.Error("Improper Domain", 401);

const leadExists = Utils.Response.Error("Lead Already Exists for Session", 401);
const alreadyPromoted = Utils.Response.Error("Already promoted", 401);

export { improperPosition, improperDomain, leadExists, alreadyPromoted };
