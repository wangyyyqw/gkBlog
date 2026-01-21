import { ContentType } from "@prisma/client";

export type ReactionsProps = {
  contentType: ContentType;
  contentTitle: string;
  withCountView?: boolean;
};

/* eslint-disable @typescript-eslint/no-unused-vars */
function Reactions({
  contentType,
  contentTitle,
  withCountView = true,
}: ReactionsProps) {
  return null;
}
/* eslint-enable @typescript-eslint/no-unused-vars */

export default Reactions;
