import React, { useState } from 'react';
import { getGenderIcon, getAgeColor, truncateText } from '../util/userUtils';

const UserCardLayout = ({ 
  user, 
  showActions = true, 
  actionButtons = null,
  imageSize = "w-96",
  cardHeight = "min-h-96",
  showSkills = true,
  maxSkills = null
}) => {
  const [loading, setLoading] = useState(true);
  const { firstName, lastName, photoUrl, about, skills, age, gender } = user;

  const handleImageLoad = () => setLoading(false);
  const handleImageError = () => {
    console.error('Image failed to load:', photoUrl);
    setLoading(false);
  };

  const displaySkills = maxSkills ? skills?.slice(0, maxSkills) : skills;

  return (
    <div className="card bg-gradient-to-br from-base-200 to-base-300 w-full shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300">
      <div className={`flex ${cardHeight}`}>
        {/* Left Side - Profile Image */}
        <div className={`relative ${imageSize} flex-shrink-0`}>
          <img
            className={`${loading ? 'skeleton w-full h-full object-cover' : 'w-full h-full object-cover'}`}
            src={photoUrl}
            loading="lazy"
            alt={`${firstName} ${lastName}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
          {!loading && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          )}
          
          {/* Age and Gender Badge Overlay */}
          {!loading && (
            <div className="absolute top-3 right-3 flex gap-1">
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

        {/* Right Side - Content */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          {/* Top Content */}
          <div className="flex-1">
            {/* Name */}
            <h3 className="text-lg font-bold text-base-content mb-2">
              {`${firstName} ${lastName}`}
            </h3>
            
            {/* About Section */}
            {about && (
              <div className="mb-3">
                <div className="flex items-start gap-2 mb-1">
                  <span className="text-xs">💬</span>
                  <span className="text-xs font-medium text-base-content/70">About</span>
                </div>
                <p className="text-xs text-base-content/80 leading-relaxed pl-4" title={about}>
                  {truncateText(about, 80)}
                </p>
              </div>
            )}

            {/* Skills Section */}
            {showSkills && skills && skills.length > 0 && (
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs">🛠️</span>
                  <span className="text-xs font-medium text-base-content/70">Skills</span>
                </div>
                <div className="flex flex-wrap gap-1 pl-4">
                  {displaySkills.map((skill) => (
                    <div 
                      key={skill} 
                      className="badge badge-outline badge-xs hover:badge-primary transition-colors duration-200"
                      title={skill}
                    >
                      {skill}
                    </div>
                  ))}
                  {maxSkills && skills.length > maxSkills && (
                    <div className="badge badge-ghost badge-xs">
                      +{skills.length - maxSkills} more
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {showActions && actionButtons && (
            <div className="card-actions justify-end pt-2 border-t border-base-300">
              {actionButtons}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCardLayout; 