import React, { useState } from 'react';

const UserCard = ({ firstName, lastName, photoUrl, about, skills }) => {
  const [loading, setLoading] = useState(true);
  return (
    <div className="card bg-base-300 w-96 shadow-sm my-5">
      <figure>
        <img
          className={`${loading ? 'skeleton h-32 w-full' : ''}`}
          src={photoUrl}
          loading="lazy"
          alt="Shoes"
          onLoadingComplete={() => setLoading(false)}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
        <p>{about}</p>
        <div className="card-actions justify-end">
          {skills.map((skill) => (
            <div className="badge badge-outline" key={skill}>
              {skill}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
