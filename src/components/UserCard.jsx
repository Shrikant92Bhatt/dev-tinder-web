import React, { useState } from 'react';
import { sendConnectionRequest, rejectUser } from '../api';
import { useToast } from '../hooks/useTost';
import { getGenderIcon, getAgeColor, truncateText } from '../util/userUtils';

const UserCard = ({ _id, firstName, lastName, photoUrl, about, skills, age, gender, onAction, showActions = true }) => {
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const { showToast } = useToast();



  const handleInterested = async () => {
    if (actionLoading) return;
    
    setActionLoading(true);
    try {
      await sendConnectionRequest(_id);
      showToast({ message: 'Connection request sent!', type: 'success' });
      if (onAction) onAction(_id, 'interested');
    } catch (error) {
      console.error(error);
      showToast({ message: 'Failed to send request', type: 'error' });
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (actionLoading) return;
    
    setActionLoading(true);
    try {
      await rejectUser(_id);
      showToast({ message: 'User Ignored', type: 'info' });
      if (onAction) onAction(_id, 'rejected');
    } catch (error) {
      console.error(error);
      showToast({ message: 'Failed to reject user', type: 'error' });
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="card bg-gradient-to-br from-base-200 to-base-300 w-full shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300">
      {/* Mobile: Vertical Layout, Desktop: Horizontal Layout */}
      <div className="flex flex-col lg:flex-row min-h-96">
        {/* Left Side - Profile Image */}
        <div className="relative w-full lg:w-96 h-64 lg:h-auto flex-shrink-0">
          <img
            className={`${loading ? 'skeleton w-full h-full object-cover' : 'w-full h-full object-cover'}`}
            src={photoUrl}
            loading="lazy"
            alt={`${firstName} ${lastName}`}
            onLoad={() => setLoading(false)}
            onError={() => {
              console.error('Image failed to load:', photoUrl);
              setLoading(false);
            }}
          />
          {!loading && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          )}
          
          {/* Age and Gender Badge Overlay */}
          {!loading && (
            <div className="absolute top-4 right-4 flex gap-2">
              <div className={`badge ${getAgeColor(age)} gap-1 text-white font-semibold text-xs lg:text-sm`}>
                <span className="text-xs lg:text-sm">🎂</span>
                {age}
              </div>
              <div className="badge badge-ghost gap-1 bg-black/50 backdrop-blur-sm text-xs lg:text-sm">
                <span className="text-xs lg:text-sm">{getGenderIcon(gender)}</span>
                <span className="capitalize text-xs lg:text-sm">{gender}</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Side - Content with Action Buttons */}
        <div className="flex-1 p-4 lg:p-8 flex flex-col justify-between">
          {/* Top Content */}
          <div className="flex-1">
            {/* Name */}
            <h2 className="card-title text-xl lg:text-3xl font-bold text-base-content mb-3 lg:mb-4">
              {`${firstName} ${lastName}`}
            </h2>
            
            {/* About Section */}
            {about && (
              <div className="mb-4 lg:mb-6">
                <div className="flex items-start gap-2 mb-2 lg:mb-3">
                  <span className="text-lg lg:text-xl">💬</span>
                  <span className="text-sm lg:text-base font-medium text-base-content/70">About</span>
                </div>
                <p className="text-sm lg:text-lg text-base-content/80 leading-relaxed pl-5 lg:pl-7" title={about}>
                  {truncateText(about, window.innerWidth < 1024 ? 80 : 120)}
                </p>
              </div>
            )}

            {/* Skills Section */}
            {skills && skills.length > 0 && (
              <div className="mb-4 lg:mb-6">
                <div className="flex items-center gap-2 mb-2 lg:mb-3">
                  <span className="text-lg lg:text-xl">🛠️</span>
                  <span className="text-sm lg:text-base font-medium text-base-content/70">Skills & Expertise</span>
                </div>
                <div className="flex flex-wrap gap-1 lg:gap-2 pl-5 lg:pl-7">
                  {skills.map((skill) => (
                    <div 
                      key={skill} 
                      className="badge badge-outline badge-sm lg:badge-md hover:badge-primary transition-colors duration-200 cursor-pointer text-xs lg:text-sm"
                      title={skill}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons - Mobile: Bottom, Desktop: Right */}
          {showActions && (
            <div className="flex justify-center lg:justify-end gap-3 lg:gap-4 pt-4 lg:pt-6 border-t border-base-300 mt-3 lg:mt-4">
              <button 
                className="btn btn-circle btn-outline btn-error btn-md lg:btn-lg" 
                title="Not Interested"
                onClick={handleReject}
                disabled={actionLoading}
              >
                {actionLoading ? (
                  <span className="loading loading-spinner loading-sm lg:loading-md"></span>
                ) : (
                  <span className="text-lg lg:text-2xl">✕</span>
                )}
              </button>
              <button 
                className="btn btn-circle btn-outline btn-warning btn-md lg:btn-lg" 
                title="View Profile"
              >
                <span className="text-lg lg:text-2xl">👁️</span>
              </button>
              <button 
                className="btn btn-circle btn-primary btn-md lg:btn-lg" 
                title="Interested"
                onClick={handleInterested}
                disabled={actionLoading}
              >
                {actionLoading ? (
                  <span className="loading loading-spinner loading-sm lg:loading-md"></span>
                ) : (
                  <span className="text-lg lg:text-2xl">❤️</span>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
