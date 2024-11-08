import { auth } from "@/auth";
import User from "@/database/users";

export default async function Users() {
  const session = await auth();
  if (!session) return null;

  const users = await User.findAll();
  return users.map((user) => (
    <div key={user.id}>
      {user.email}, {user.id}
    </div>
  ));
}
