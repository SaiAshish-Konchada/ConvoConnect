import React from "react";
import { X } from "lucide-react";
import PropTypes from "prop-types";
const GroupInfoModal = ({ group, onClose, onLeaveGroup }) => (
  <div className="fixed inset-0 z-40 bg-black bg-opacity-40 flex justify-center items-center">
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{group.name} Info</h2>
        <button onClick={onClose}>
          <X />
        </button>
      </div>
      <p className="mb-4">{group.description}</p>
      <h3 className="font-medium mb-2">Members</h3>
      <ul className="space-y-1 mb-4">
        {group.members.map((m) => (
          <li key={m} className="flex justify-between">
            <span>{m}</span>
            <span
              className={
                group.onlineStatus[m] ? "text-green-500" : "text-gray-400"
              }
            >
              {group.onlineStatus[m] ? "Online" : "Offline"}
            </span>
          </li>
        ))}
      </ul>
      <button
        className="btn btn-sm btn-outline btn-error"
        onClick={onLeaveGroup}
      >
        Leave Group
      </button>
    </div>
  </div>
);

GroupInfoModal.propTypes = {
  group: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    members: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        fullName: PropTypes.string.isRequired,
      }),
    ).isRequired,
    onlineStatus: PropTypes.objectOf(PropTypes.bool).isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onLeaveGroup: PropTypes.func.isRequired,
};

export default GroupInfoModal;
