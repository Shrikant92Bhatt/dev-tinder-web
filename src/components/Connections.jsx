import React, { useEffect } from 'react'
import { getConnections } from '../api';
import { useDispatch, useSelector } from 'react-redux';
import { setConnections } from '../store/connectionSlice';

const Connections = () => {
    const dispatch = useDispatch();
    const {connections} = useSelector((state) => state.connection);
    
    const fetchConnections = async () => {
        try {
            const resp = await getConnections();
            dispatch(setConnections(resp.data));
        } catch (error) {
            console.error(error);
        }
    }   
    useEffect(() => {
        fetchConnections();
    }, []);

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

    if(connections.length === 0) {
        return (
            <div className='flex justify-center items-center my-16'>
                <div className='text-center'>
                    <div className="text-6xl mb-4">🤝</div>
                    <h1 className='text-2xl font-bold text-base-content mb-2'>No connections found</h1>
                    <p className='text-base-content/70'>Start connecting with people to see them here!</p>
                </div>
            </div>
        )
    }

    return (
        <div className='flex flex-col justify-center items-center py-6 p-4'>
            <div className="text-center mb-6">
                <h1 className='text-3xl font-bold text-base-content mb-2'>Your Connections</h1>
                <p className='text-base-content/70'>People you've connected with</p>
            </div>
            
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-7xl'>
                {connections.length > 0 && connections.map((connection) => {
                    const { firstName, lastName, photoUrl, about, skills, age, gender } = connection;
                    
                    return (
                        <div key={connection._id} className="card bg-gradient-to-br from-base-200 to-base-300 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300">
                            {/* Profile Header */}
                            <div className="card-body p-4">
                                <div className="flex items-start gap-3 mb-3">
                                    {/* Profile Image */}
                                    <div className="avatar">
                                        <div className="w-12 h-12 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-200">
                                            <img 
                                                src={photoUrl} 
                                                alt={`${firstName} ${lastName}`}
                                                className="w-full h-full object-cover rounded-full"
                                            />
                                        </div>
                                    </div>
                                    
                                    {/* Name and Basic Info */}
                                    <div className="flex-1">
                                        <h3 className="text-base font-bold text-base-content mb-1">
                                            {`${firstName} ${lastName}`}
                                        </h3>
                                        
                                        {/* Age and Gender Badges */}
                                        <div className="flex gap-1 mb-1">
                                            <div className={`badge ${getAgeColor(age)} gap-1 text-white font-semibold text-xs`}>
                                                <span>🎂</span>
                                                {age}
                                            </div>
                                            <div className="badge badge-ghost gap-1 text-xs bg-base-100/50">
                                                <span className="text-xs">{getGenderIcon(gender)}</span>
                                                <span className="capitalize text-xs">{gender}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* About Section */}
                                <div className="mb-3">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs">💬</span>
                                        <span className="text-xs font-medium text-base-content/70">About</span>
                                    </div>
                                    {about ? (
                                        <p className="text-xs text-base-content/80 leading-relaxed pl-4">
                                            {about.length > 80 ? `${about.substring(0, 80)}...` : about}
                                        </p>
                                    ) : (
                                        <p className="text-xs text-base-content/50 leading-relaxed pl-4 italic">
                                            No bio available
                                        </p>
                                    )}
                                </div>

                                {/* Skills Section */}
                                {skills && skills.length > 0 && (
                                    <div className="mb-3">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs">🛠️</span>
                                            <span className="text-xs font-medium text-base-content/70">Skills</span>
                                        </div>
                                        <div className="flex flex-wrap gap-1 pl-4">
                                            {skills.slice(0, 3).map((skill) => (
                                                <div 
                                                    key={skill} 
                                                    className="badge badge-outline badge-xs hover:badge-primary transition-colors duration-200"
                                                    title={skill}
                                                >
                                                    {skill}
                                                </div>
                                            ))}
                                            {skills.length > 3 && (
                                                <div className="badge badge-ghost badge-xs">
                                                    +{skills.length - 3} more
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="card-actions justify-end pt-2 border-t border-base-300">
                                    <button className="btn btn-circle btn-outline btn-sm btn-warning" title="Message">
                                        <svg className="size-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                            </g>
                                        </svg>
                                    </button>
                                    <button className="btn btn-circle btn-outline btn-sm btn-error" title="Remove Connection">
                                        <svg className="size-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                                                <path d="M18 6L6 18M6 6l12 12"></path>
                                            </g>
                                        </svg>
                                    </button>
                                    <button className="btn btn-circle btn-primary btn-sm" title="View Profile">
                                        <svg className="size-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                <circle cx="12" cy="12" r="3"></circle>
                                            </g>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Connections