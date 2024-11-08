import User from "@/database/users";

export default async function Users() {
  const users = await User.findAll();
  return users.map((user) => (
    <div key={user.id}>
      {user.email}, {user.id}
    </div>
  ));
}
