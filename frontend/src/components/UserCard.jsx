import React from 'react';
import Button from './Button';

const UserCard = ({
  username,
  interests,
  mutualFriends,
  requestSent,
  onSendRequest,
  onAcceptRequest,
  onRejectRequest,
  acceptButtonText = "Accept",
  rejectButtonText = "Reject",
  removeButtonText = "Remove",
  onRemoveFriend,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-xl p-6 transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-[#F1F1F1]">
      <div className="flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-[#8174A0] to-[#441752] rounded-full flex items-center justify-center text-white text-3xl font-semibold mb-4 shadow-lg">
          {username[0]}
        </div>
        <h3 className="text-2xl font-semibold text-[#441752] mb-2">{username}</h3>
        <p className="text-sm text-gray-600 mb-2">
          Interests: {interests?.join(', ') || 'No interests listed'}
        </p>

        {mutualFriends > 0 ? (
          <div className="text-sm text-gray-600 mb-4">
            <strong className="text-[#441752]">Mutual Friends:</strong>
            <span> {mutualFriends}</span>
          </div>
        ) : (
          <p className="text-sm text-gray-600 mb-4">No mutual friends.</p>
        )}

        <div className="w-full mt-6 flex justify-center gap-4">
          {onRemoveFriend ? (
            <Button
              onClick={onRemoveFriend}
              text={removeButtonText}
              disabled={false}
              buttonStyle="bg-red-600 text-white"
              hoverStyle="hover:bg-red-700"
            />
          ) : onAcceptRequest && onRejectRequest ? (
            <div className="flex justify-around w-full space-x-4">
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
    </div>
  );
};

export default UserCard;
