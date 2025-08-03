import React, { useState } from 'react';
import { sendConnectionRequest, rejectUser } from '../api';
import { useToast } from '../hooks/useTost';

const UserCard = ({ _id, firstName, lastName, photoUrl, about, skills, age, gender, onAction }) => {
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
    <div className="card bg-gradient-to-br from-base-200 to-base-300 w-full shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300">
      {/* Profile Image with Overlay */}
      <div className="relative">
        <figure className="relative">
          <img
            className={`${loading ? 'skeleton h-64 w-full object-cover' : 'h-64 w-full object-cover'}`}
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
        </figure>
        
        {/* Age and Gender Badge Overlay */}
        {!loading && (
          <div className="absolute top-3 right-3 flex gap-2">
            <div className={`badge ${getAgeColor(age)} gap-1 text-white font-semibold text-xs`}>
              <span className="text-xs">🎂</span>
              {age}
            </div>
            <div className="badge badge-ghost gap-1 text-xs bg-black/50 backdrop-blur-sm">
              <span className="text-xs">{getGenderIcon(gender)}</span>
              <span className="capitalize text-xs">{gender}</span>
            </div>
          </div>
        )}
      </div>

      <div className="card-body p-4">
        {/* Name and Basic Info */}
        <div className="mb-1">
          <h2 className="card-title text-xl font-bold text-base-content mb-2">
            {`${firstName} ${lastName}`}
          </h2>
          
          {/* About Section */}
          {about && (
            <div className="mb-1">
              <div className="flex items-start gap-2 mb-1">
                <span className="text-sm">💬</span>
                <span className="text-xs font-medium text-base-content/70">About</span>
              </div>
              <p className="text-sm text-base-content/80 leading-relaxed pl-5" title={about}>
                {about.length > 120 ? `${about.substring(0, 120)}...` : about}
              </p>
            </div>
          )}
        </div>

        {/* Skills Section */}
        {skills && skills.length > 0 && (
          <div className="mb-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm">🛠️</span>
              <span className="text-xs font-medium text-base-content/70">Skills & Expertise</span>
            </div>
            <div className="flex flex-wrap gap-1 pl-5">
              {skills.map((skill) => (
                <div 
                  key={skill} 
                  className="badge badge-outline badge-xs hover:badge-primary transition-colors duration-200 cursor-pointer"
                  title={skill}
                >
                  {skill}
                </div>
              ))}
              {/* {skills.length > 3 && (
                <div className="badge badge-ghost badge-xs">
                  +{skills.length - 3} more
                </div>
              )} */}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="card-actions justify-end pt-3 border-t border-base-300">
          <button 
            className="btn btn-circle btn-outline btn-error btn-sm" 
            title="Not Interested"
            onClick={handleReject}
            disabled={actionLoading}
          >
            {actionLoading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <span className="text-lg">✕</span>
            )}
          </button>
          <button 
            className="btn btn-circle btn-outline btn-warning btn-sm" 
            title="View Profile"
          >
            <span className="text-lg">👁️</span>
          </button>
          <button 
            className="btn btn-circle btn-primary btn-sm" 
            title="Interested"
            onClick={handleInterested}
            disabled={actionLoading}
          >
            {actionLoading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <span className="text-lg">❤️</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
