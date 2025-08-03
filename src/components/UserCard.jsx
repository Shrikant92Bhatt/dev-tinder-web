import React, { useState } from 'react';
import { sendConnectionRequest, rejectUser } from '../api';
import { useToast } from '../hooks/useTost';

const UserCard = ({ _id, firstName, lastName, photoUrl, about, skills, age, gender, onAction, showActions = true }) => {
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const { showToast } = useToast();

  console.log('UserCard rendering with props:', { _id, firstName, lastName, photoUrl, about, skills, age, gender });

  // Gender icon mapping
  const getGenderIcon = (gender) => {
    switch (gender?.toLowerCase()) {
      case 'male':
        return '👨';
      case 'female':
        return '👩';
      default:
        return '👤';
    }
  };

  // Age group color mapping
  const getAgeColor = (age) => {
    if (age < 25) return 'badge-primary';
    if (age < 35) return 'badge-secondary';
    if (age < 45) return 'badge-accent';
    return 'badge-neutral';
  };

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
      <div className="flex h-96">
        {/* Left Side - Full Height Profile Image */}
        <div className="relative w-96 flex-shrink-0">
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
              <div className={`badge ${getAgeColor(age)} gap-1 text-white font-semibold`}>
                <span className="text-sm">🎂</span>
                {age}
              </div>
              <div className="badge badge-ghost gap-1 bg-black/50 backdrop-blur-sm">
                <span className="text-sm">{getGenderIcon(gender)}</span>
                <span className="capitalize text-sm">{gender}</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Side - Content with Action Buttons */}
        <div className="flex-1 p-8 flex flex-col justify-between">
          {/* Top Content */}
          <div>
            {/* Name */}
            <h2 className="card-title text-3xl font-bold text-base-content mb-4">
              {`${firstName} ${lastName}`}
            </h2>
            
            {/* About Section */}
            {about && (
              <div className="mb-6">
                <div className="flex items-start gap-2 mb-3">
                  <span className="text-xl">💬</span>
                  <span className="text-base font-medium text-base-content/70">About</span>
                </div>
                <p className="text-lg text-base-content/80 leading-relaxed pl-7" title={about}>
                  {about.length > 120 ? `${about.substring(0, 120)}...` : about}
                </p>
              </div>
            )}

            {/* Skills Section */}
            {skills && skills.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">🛠️</span>
                  <span className="text-base font-medium text-base-content/70">Skills & Expertise</span>
                </div>
                <div className="flex flex-wrap gap-2 pl-7">
                  {skills.map((skill) => (
                    <div 
                      key={skill} 
                      className="badge badge-outline badge-md hover:badge-primary transition-colors duration-200 cursor-pointer"
                      title={skill}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons - Integrated into right content */}
          {showActions && (
            <div className="flex justify-end gap-4 pt-1 border-t border-base-300">
              <button 
                className="btn btn-circle btn-outline btn-error btn-lg" 
                title="Not Interested"
                onClick={handleReject}
                disabled={actionLoading}
              >
                {actionLoading ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  <span className="text-2xl">✕</span>
                )}
              </button>
              <button 
                className="btn btn-circle btn-outline btn-warning btn-lg" 
                title="View Profile"
              >
                <span className="text-2xl">👁️</span>
              </button>
              <button 
                className="btn btn-circle btn-primary btn-lg" 
                title="Interested"
                onClick={handleInterested}
                disabled={actionLoading}
              >
                {actionLoading ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  <span className="text-2xl">❤️</span>
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
