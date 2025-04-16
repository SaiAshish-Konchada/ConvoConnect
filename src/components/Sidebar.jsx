import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarStructure from "./skeletons/SidebarStructure";
import { Users } from "lucide-react";

const Sidebar = () => {
  const {
    getUsers,
    users,
    selectedUser,
    selectedGroup,
    setSelectedUser,
    setSelectedGroup, // <-- Add this
    isUsersLoading,
    getGroups,
    groups,
  } = useChatStore();

  const { onlineUsers = [] } = useAuthStore(); // Default to empty array if undefined
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  // Fetch users and groups
  useEffect(() => {
    getUsers();
    getGroups(); // Fetch groups
  }, [getUsers, getGroups]);

  // Filter users/groups based on the "Show online only" toggle
  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  const filteredGroups = showOnlineOnly
    ? groups.filter((group) =>
        group.members.some((member) => onlineUsers.includes(member._id)),
      )
    : groups;

  if (isUsersLoading) return <SidebarStructure />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>

        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">
            ({onlineUsers.length} online)
          </span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        <h3 className="px-4 text-lg font-medium">Friends</h3>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${
                selectedUser?._id === user._id
                  ? "bg-base-300 ring-1 ring-base-300"
                  : ""
              }`}
            >
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.name}
                  className="size-12 object-cover rounded-full"
                />
                {onlineUsers.includes(user._id) && (
                  <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
                )}
              </div>
              <div className="hidden lg:block text-left min-w-0">
                <div className="font-medium truncate">{user.fullName}</div>
                <div className="text-sm text-zinc-400">
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className="text-center text-zinc-500 py-4">
            No contacts available
          </div>
        )}

        <h3 className="px-4 text-lg font-medium mt-4">Groups</h3>
        {filteredGroups.length > 0 ? (
          filteredGroups.map((group) => (
            <button
              key={group._id}
              onClick={() =>
                setSelectedUser({
                  _id: group._id,
                  fullName: group.name, // Set the group's name as fullName
                  profilePic: group.groupPic || "/group-avatar.png", // Use the group's avatar or a fallback
                })
              } // Set selected group
              className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${
                selectedUser?._id === group._id
                  ? "bg-base-300 ring-1 ring-base-300"
                  : ""
              }`}
            >
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={group.groupPic || "/group-avatar.png"} // Group avatar (fallback to default)
                  alt={group.name}
                  className="size-12 object-cover rounded-full"
                />
              </div>
              <div className="hidden lg:block text-left min-w-0">
                <div className="font-medium truncate">{group.name}</div>
                <div className="text-sm text-zinc-400">
                  {group.members
                    .map((memberId) => {
                      const member = users.find(
                        (user) => user._id === memberId,
                      );
                      return member ? member.fullName : null; // If user is found, display full name
                    })
                    .join(", ")}
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className="text-center text-zinc-500 py-4">
            No groups available
          </div>
        )}

        {filteredUsers.length === 0 && filteredGroups.length === 0 && (
          <div className="text-center text-zinc-500 py-4">
            No online users or groups
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
