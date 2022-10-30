import * as Constants from "@constants";

import { validate } from "./validate";

function validateDiscordId(discordId: string) {
  return validate(discordId, Constants.Validation.discord);
}

export { validateDiscordId };
