import useUsers from "../../hooks/useUsers";
import Avatar from "../Avatar";

const FollowBar = () => {
  const { data: users = [] } = useUsers();

  if (users.length === 0) {
    return null;
  }

  return (
    <div className="px-4 py-4 hidden lg:block">
        <div className="bg-neutral-800 rounded-xl p-4">
            <h2 className="text-xl font-semibold">Who to follow</h2>
            <div className="flex flex-col gap-6 mt-4">
                {users.map((user: Record<string,any>) => (
                  <div key={user.id} className="flex flex-row gap-4">
                    <Avatar userId={user.id} />
                    <div className="flex flex-col">
                      <h3 className="text-sm font-semibold">{user.name}</h3>
                      <p className="text-sm text-neutral-400">@{user.username}</p>
                    </div>
                  </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default FollowBar;