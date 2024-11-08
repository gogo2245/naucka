import { auth } from "@/auth";
import Users from "@/components/users";

export default async function Home() {
  const session = await auth();
  return session ? <Users /> : <p>Prihlas sa</p>;
}
