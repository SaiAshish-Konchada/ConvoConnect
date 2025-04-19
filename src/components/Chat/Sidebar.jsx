import { useEffect, useState } from "react";
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";
import SidebarStructure from "../skeletons/SidebarStructure";
import { Users } from "lucide-react";
import PropTypes from "prop-types";
const Sidebar = () => {
  const {
    getUsers,
    getGroups,
    users,
    groups,
    selectedUser,
    setSelectedUser,
    isUsersLoading,
  } = useChatStore();
  const { onlineUsers = [] } = useAuthStore();

  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
    getGroups();
  }, [getUsers, getGroups]);

  const isOnline = (id) => onlineUsers.includes(id);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => isOnline(user._id))
    : users;

  const filteredGroups = showOnlineOnly
    ? groups.filter((group) => group.members.some((m) => isOnline(m._id)))
    : groups;

  if (isUsersLoading) return <SidebarStructure />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      {/* Header */}
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" aria-hidden="true" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>

        {/* Toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
              aria-label="Toggle to show online users only"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">
            ({onlineUsers.length} online)
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="overflow-y-auto w-full py-3">
        <Section title="Friends" emptyText="No contacts available">
          {filteredUsers.map((user) => (
            <ContactItem
              key={user._id}
              id={user._id}
              name={user.fullName}
              avatar={user.profilePic || "/avatar.png"}
              isOnline={isOnline(user._id)}
              isSelected={selectedUser?._id === user._id}
              onClick={() => setSelectedUser(user)}
            />
          ))}
        </Section>
        <Section title="Groups" emptyText="No groups available">
          {filteredGroups.map((group) => (
            <ContactItem
              key={group._id}
              id={group._id}
              name={group.name}
              avatar={group.groupPic || "/group-avatar.png"}
              isOnline={group.members.some((m) => isOnline(m._id))}
              subtitle={
                group.members
                  .map((memberId) => {
                    const member = users.find((u) => u._id === memberId);
                    return member ? member.fullName : null;
                  })
                  .filter(Boolean)
                  .join(", ") || "No members"
              }
              isSelected={selectedUser?._id === group._id}
              onClick={() =>
                setSelectedUser({
                  _id: group._id,
                  fullName: group.name,
                  profilePic: group.groupPic || "/group-avatar.png",
                })
              }
            />
          ))}
        </Section>

        {filteredUsers.length === 0 && filteredGroups.length === 0 && (
          <div className="text-center text-zinc-500 py-4">
            No online users or groups
          </div>
        )}
      </div>
    </aside>
  );
};

const Section = ({ title, emptyText, children }) => (
  <>
    <h3 className="px-4 text-lg font-medium mt-4">{title}</h3>
    {children.length > 0 ? (
      <ul className="space-y-1">{children}</ul>
    ) : (
      <div className="text-center text-zinc-500 py-4">{emptyText}</div>
    )}
  </>
);

Section.propTypes = {
  title: PropTypes.string.isRequired,
  emptyText: PropTypes.string,
  children: PropTypes.node,
};

const ContactItem = ({
  id,
  name,
  avatar,
  isOnline,
  subtitle,
  isSelected,
  onClick,
}) => (
  <li>
    <button
      onClick={onClick}
      aria-label={`Open chat with ${name}`}
      className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${
        isSelected ? "bg-base-300 ring-1 ring-base-300" : ""
      }`}
    >
      <div className="relative mx-auto lg:mx-0">
        <img
          src={avatar}
          alt={name}
          className="size-12 object-cover rounded-full"
        />
        {isOnline && (
          <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
        )}
      </div>
      <div className="hidden lg:block text-left min-w-0">
        <div className="font-medium truncate">{name}</div>
        {subtitle ? (
          <div className="text-sm text-zinc-400">{subtitle}</div>
        ) : (
          <div className="text-sm text-zinc-400">
            {isOnline ? "Online" : "Offline"}
          </div>
        )}
      </div>
    </button>
  </li>
);

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  isOnline: PropTypes.bool.isRequired,
  subtitle: PropTypes.string,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Sidebar;
