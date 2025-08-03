import React, { useEffect } from 'react'
import { getRequests, acceptRequest, rejectRequest } from '../api';
import { useDispatch, useSelector } from 'react-redux';
import { setRequests, acceptRequest as acceptRequestAction, rejectRequest as rejectRequestAction } from '../store/requestsSlice';
import { useToast } from '../hooks/useTost';
import { getGenderIcon, getAgeColor, truncateText } from '../util/userUtils';

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
        <div className='flex flex-col justify-center items-center py-6 p-4'>
            <div className="text-center mb-6">
                <h1 className='text-3xl font-bold text-base-content mb-2'>Connection Requests</h1>
                <p className='text-base-content/70'>People who want to connect with you</p>
            </div>
            
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-7xl'>
                {requests.length > 0 && requests.map((request) => {
                    const { firstName, lastName, photoUrl, about, skills, age, gender } = request.fromUserId;
                    
                    return (
                        <div key={request._id} className="card bg-gradient-to-br from-base-200 to-base-300 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300">
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
                                            {truncateText(about, 80)}
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
                                    <button 
                                        className="btn btn-circle btn-outline btn-sm btn-error" 
                                        title="Reject Request"
                                        onClick={() => handleRejectRequest(request._id)}
                                    >
                                        <svg className="size-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                                                <path d="M18 6L6 18M6 6l12 12"></path>
                                            </g>
                                        </svg>
                                    </button>
                                    <button 
                                        className="btn btn-circle btn-outline btn-sm btn-warning" 
                                        title="View Profile"
                                    >
                                        <svg className="size-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
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
                                        <svg className="size-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
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