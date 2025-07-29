import React, { useState } from 'react';

const UserCard = ({ firstName, lastName, photoUrl, about, skills, age, gender }) => {
  const [loading, setLoading] = useState(true);
  return (
    <div className="card bg-base-300 w-96 shadow-sm my-5">
      <figure>
        <img
          className={`${loading ? 'skeleton h-auto w-full' : 'h-auto'}`}
          src={photoUrl}
          loading="lazy"
          alt="Shoes"
          onLoad={() => setLoading(false)}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
        <div className='flex justify-between'>
            <strong>Gender: <span className='capitalize'>{gender}</span></strong>
            <span className='strong'>Age: {age}</span>
        </div>
        <p className='line-clamp-3' title={about}>{about}</p>
        <div className="card-actions justify-end my-5">
          {skills?.map((skill) => (
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
