import { User } from "@prisma/client";

export interface RequestWithUser extends Request {
  user: User | null;
}
export type RequestWithUser2 = Request & {
  user: User | null;
};
