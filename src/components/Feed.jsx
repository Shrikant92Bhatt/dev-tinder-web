import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFeed } from '../api/index';
import { addFeed, setLoading, removeUserFromFeed } from '../store/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const dispatch = useDispatch();
  const { data: feedData, loading } = useSelector((root) => root.feed);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  
  const fetchFeed = async () => {
    dispatch(setLoading());
    try {
      const data = await getFeed();
      console.log('Feed data received:', data);
      dispatch(addFeed(data));
    } catch (error) {
      console.error('Error fetching feed:', error);
    }
  };
  
  useEffect(() => {
    fetchFeed();
  }, []);

  const handleUserAction = (userId, action) => {
    // Move to next user after action
    setCurrentUserIndex(prev => prev + 1);
    // Remove the user from the feed after action
    dispatch(removeUserFromFeed(userId));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <div className="flex w-52 flex-col gap-4">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
    );
  }

  // Check if we have data
  if (!feedData || !feedData.data || feedData.data.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <div className="text-center">
          <div className="text-6xl mb-4">👥</div>
          <h1 className="text-2xl font-bold text-base-content mb-2">No users found</h1>
          <p className="text-base-content/70">There are no users to display at the moment</p>
        </div>
      </div>
    );
  }

  // Check if we've gone through all users
  if (currentUserIndex >= feedData.data.length) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold text-base-content mb-2">You've seen everyone!</h1>
          <p className="text-base-content/70">Check back later for new connections</p>
          <button 
            className="btn btn-primary mt-4"
            onClick={() => {
              setCurrentUserIndex(0);
              fetchFeed();
            }}
          >
            Refresh Feed
          </button>
        </div>
      </div>
    );
  }

  const currentUser = feedData.data[currentUserIndex];

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)] p-4">
      <div className="w-full max-w-4xl">
        <UserCard 
          key={currentUser._id} 
          {...currentUser} 
          onAction={handleUserAction} 
        />
      </div>
    </div>
  );
};

export default Feed;
