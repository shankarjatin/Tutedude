import React from 'react';
import Button from './Button';  // Import the reusable Button component

const UserCard = ({
  username,
  interests,
  mutualFriends,
  requestSent,
  onSendRequest,
  onAcceptRequest,
  onRejectRequest,
  acceptButtonText = "Accept",  // Default text for Accept button
  rejectButtonText = "Reject", // Default text for Reject button
  removeButtonText = "Remove", // Default text for Remove button
  onRemoveFriend,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl">
      <div className="flex flex-col items-center">
        {/* Avatar Placeholder */}
        <div className="w-20 h-20 bg-[#8174A0] rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
          {username[0]}
        </div>
        <h3 className="text-xl font-semibold text-[#441752] mb-2">{username}</h3>
        <p className="text-sm text-gray-600 mb-2">
          Interests: {interests?.join(', ') || 'No interests listed'}
        </p>

        {/* Display Mutual Friends if available */}
        {mutualFriends > 0 ? (
          <div className="text-sm text-gray-600 mb-4">
            <strong>Mutual Friends:</strong>
            <span> {mutualFriends}</span>
          </div>
        ) : (
          <p className="text-sm text-gray-600 mb-4">No mutual friends.</p>
        )}

        {/* Render buttons based on the props passed */}
        {onRemoveFriend ? (
          // Remove button (for FriendsPage)
          <Button
            onClick={onRemoveFriend}
            text={removeButtonText}
            disabled={false}
            buttonStyle="bg-red-600 text-white"
            hoverStyle="hover:bg-red-700"
          />
        ) : onAcceptRequest && onRejectRequest ? (
          // Accept/Reject buttons (for FriendRequestsPage)
          <div className="flex justify-around space-x-4 mt-4">
            <Button
              onClick={onAcceptRequest}
              text={acceptButtonText}
              disabled={false}
              buttonStyle="bg-green-700 text-white"
              hoverStyle="hover:bg-green-800"
            />
            <Button
              onClick={onRejectRequest}
              text={rejectButtonText}
              disabled={false}
              buttonStyle="bg-red-600 text-white"
              hoverStyle="hover:bg-red-700"
            />
          </div>
        ) : (
          // Send Request button (for AllUsersPage or SearchUsersPage)
          <Button
            onClick={onSendRequest}
            text={requestSent ? 'Request Sent' : 'Send Request'}
            disabled={requestSent}
            buttonStyle={requestSent ? 'bg-gray-400 text-white' : 'bg-[#441752] text-white'}
            hoverStyle={requestSent ? '' : 'hover:bg-[#8174A0]'}
          />
        )}
      </div>
    </div>
  );
};

export default UserCard;
