import { $Enums } from "@/prisma/generated/client1";

export type AuthUser = {
  userId: number;
  name: string;
  role: $Enums.rdl_admin_user_list_role | null;
  depot: string | null;
};
