import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default async function page() {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  if (session?.userId) {
    redirect("/admin");
  }

  redirect ('/login')
}
