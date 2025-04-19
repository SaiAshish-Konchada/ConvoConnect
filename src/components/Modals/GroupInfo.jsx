import { X } from "lucide-react"; // Import X icon from lucide-react
import groupImage from "../../assets/group1.png"; // Import image directly
import PropTypes from "prop-types";
const GroupInfo = ({ group, onClose, onLeaveGroup, onBlockGroup }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-2xl w-full sm:w-[480px] max-h-[90vh] overflow-y-auto transition-transform transform-gpu">
        {/* Header with close button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-100">{group.name}</h2>
          <button
            onClick={onClose}
            className="text-xl text-gray-300 hover:text-gray-500 focus:outline-none transition-colors"
            aria-label="Close Group Info"
          >
            <X /> {/* Close icon */}
          </button>
        </div>

        {/* Group Image */}
        <div className="flex justify-center mb-6">
          <img
            src={group.groupPic || groupImage} // Use the imported image here
            alt={group.name}
            className="rounded-full w-32 h-32 object-cover border-4 border-gray-700"
          />
        </div>

        {/* Description */}
        <p className="text-gray-300 text-center mb-6">
          {group.description || "No description available."}
        </p>

        {/* Contact Info (Admins if applicable) */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-100">Contact Info</h3>
          {group.admin && (
            <>
              <p className="text-gray-300">
                Admin Phone: {group.admin.phone || "Not provided"}
              </p>
              <p className="text-gray-300">
                Admin Email: {group.admin.email || "Not provided"}
              </p>
            </>
          )}
        </div>

        {/* Members List */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-100">Members</h3>
          <ul className="mt-2 space-y-2">
            {group.members.map((member) => (
              <li key={member._id} className="text-sm text-gray-400">
                {" "}
                {/* Use unique member identifier */}
                {member.fullName}{" "}
                <span
                  className={`text-xs ${
                    group.onlineStatus[member._id]
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {group.onlineStatus[member._id] ? "Online" : "Offline"}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Leave Group / Block Group Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={onLeaveGroup}
            className="w-full py-2 bg-red-600 text-white text-lg font-medium rounded-md hover:bg-red-700 transition-colors focus:outline-none"
          >
            Leave Group
          </button>
          <button
            onClick={onBlockGroup}
            className="w-full py-2 bg-gray-600 text-white text-lg font-medium rounded-md hover:bg-gray-700 transition-colors focus:outline-none"
          >
            Block Group
          </button>
        </div>
      </div>
    </div>
  );
};

GroupInfo.propTypes = {
  group: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    groupPic: PropTypes.string,
    description: PropTypes.string,
    admin: PropTypes.shape({
      phone: PropTypes.string,
      email: PropTypes.string,
    }),
    members: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        fullName: PropTypes.string.isRequired,
        profilePic: PropTypes.string,
      }),
    ),
    onlineStatus: PropTypes.objectOf(PropTypes.bool), // Online status for each member
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onLeaveGroup: PropTypes.func.isRequired,
  onBlockGroup: PropTypes.func.isRequired,
};

export default GroupInfo;
