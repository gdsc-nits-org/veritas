import * as Utils from "@utils";

const chapterAlreadyTransitioned = Utils.Response.Error(
  "Chapter Alreaddy Transitioned",
  401
);

export { chapterAlreadyTransitioned };
