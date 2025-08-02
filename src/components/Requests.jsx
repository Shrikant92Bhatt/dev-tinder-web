import React, { useEffect } from 'react'
import { getRequests, acceptRequest, rejectRequest } from '../api';
import { useDispatch, useSelector } from 'react-redux';
import { setRequests, acceptRequest as acceptRequestAction, rejectRequest as rejectRequestAction } from '../store/requestsSlice';
import { useToast } from '../hooks/useTost';

const Requests = () => {
    const dispatch = useDispatch();
    const { requests } = useSelector((state) => state.requests);
    const { showToast } = useToast();
    
    const fetchRequests = async () => {
        try {
            const resp = await getRequests();
            dispatch(setRequests(resp.data));
        } catch (error) {
            console.error(error);
            showToast({ message: 'Failed to fetch requests', type: 'error' });
        }
    }   
    
    useEffect(() => {
        fetchRequests();
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

    const handleAcceptRequest = async (requestId) => {
        try {
            await acceptRequest(requestId);
            dispatch(acceptRequestAction(requestId));
            showToast({ message: 'Connection request accepted!', type: 'success' });
        } catch (error) {
            console.error(error);
            showToast({ message: 'Failed to accept request', type: 'error' });
        }
    };

    const handleRejectRequest = async (requestId) => {
        try {
            await rejectRequest(requestId);
            dispatch(rejectRequestAction(requestId));
            showToast({ message: 'Connection request rejected', type: 'info' });
        } catch (error) {
            console.error(error);
            showToast({ message: 'Failed to reject request', type: 'error' });
        }
    };

    if(requests.length === 0) {
        return (
            <div className='flex justify-center items-center my-16'>
                <div className='text-center'>
                    <div className="text-6xl mb-4">📨</div>
                    <h1 className='text-2xl font-bold text-base-content mb-2'>No pending requests</h1>
                    <p className='text-base-content/70'>You don't have any connection requests at the moment</p>
                </div>
            </div>
        )
    }

    return (
        <div className='flex flex-col justify-center items-center my-8 p-4'>
            <div className="text-center mb-8">
                <h1 className='text-3xl font-bold text-base-content mb-2'>Connection Requests</h1>
                <p className='text-base-content/70'>People who want to connect with you</p>
            </div>
            
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl'>
                {requests.length > 0 && requests.map((request) => {
                    const { firstName, lastName, photoUrl, about, skills, age, gender, _id } = request.fromUserId;
                    
                    return (
                        <div key={_id} className="card bg-gradient-to-br from-base-200 to-base-300 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300">
                            {/* Profile Header */}
                            <div className="card-body p-6">
                                <div className="flex items-start gap-4 mb-4">
                                    {/* Profile Image */}
                                    <div className="avatar">
                                        <div className="w-16 h-16 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-200">
                                            <img 
                                                src={photoUrl} 
                                                alt={`${firstName} ${lastName}`}
                                                className="w-full h-full object-cover rounded-full"
                                            />
                                        </div>
                                    </div>
                                    
                                    {/* Name and Basic Info */}
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-base-content mb-1">
                                            {`${firstName} ${lastName}`}
                                        </h3>
                                        
                                        {/* Age and Gender Badges */}
                                        <div className="flex gap-2 mb-2">
                                            <div className={`badge ${getAgeColor(age)} gap-1 text-white font-semibold text-xs`}>
                                                <span>🎂</span>
                                                {age}
                                            </div>
                                            <div className="badge badge-ghost gap-1 text-xs bg-base-100/50">
                                                <span className="text-sm">{getGenderIcon(gender)}</span>
                                                <span className="capitalize">{gender}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* About Section */}
                                <div className="mb-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-sm">💬</span>
                                        <span className="text-xs font-medium text-base-content/70">About</span>
                                    </div>
                                    {about ? (
                                        <p className="text-sm text-base-content/80 leading-relaxed pl-6">
                                            {about.length > 100 ? `${about.substring(0, 100)}...` : about}
                                        </p>
                                    ) : (
                                        <p className="text-sm text-base-content/50 leading-relaxed pl-6 italic">
                                            No bio available
                                        </p>
                                    )}
                                </div>

                                {/* Skills Section */}
                                {skills && skills.length > 0 && (
                                    <div className="mb-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-sm">🛠️</span>
                                            <span className="text-xs font-medium text-base-content/70">Skills</span>
                                        </div>
                                        <div className="flex flex-wrap gap-1 pl-6">
                                            {skills.slice(0, 4).map((skill) => (
                                                <div 
                                                    key={skill} 
                                                    className="badge badge-outline badge-sm hover:badge-primary transition-colors duration-200"
                                                    title={skill}
                                                >
                                                    {skill}
                                                </div>
                                            ))}
                                            {skills.length > 4 && (
                                                <div className="badge badge-ghost badge-sm">
                                                    +{skills.length - 4} more
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="card-actions justify-end pt-4 border-t border-base-300">
                                    <button 
                                        className="btn btn-circle btn-outline btn-sm btn-error" 
                                        title="Reject Request"
                                        onClick={() => handleRejectRequest(request._id)}
                                    >
                                        <svg className="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                                                <path d="M18 6L6 18M6 6l12 12"></path>
                                            </g>
                                        </svg>
                                    </button>
                                    <button 
                                        className="btn btn-circle btn-outline btn-sm btn-warning" 
                                        title="View Profile"
                                    >
                                        <svg className="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                <circle cx="12" cy="12" r="3"></circle>
                                            </g>
                                        </svg>
                                    </button>
                                    <button 
                                        className="btn btn-circle btn-primary btn-sm" 
                                        title="Accept Request"
                                        onClick={() => handleAcceptRequest(request._id)}
                                    >
                                        <svg className="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                                                <path d="M20 6L9 17l-5-5"></path>
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

export default Requests 