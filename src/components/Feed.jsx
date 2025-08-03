import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFeed } from '../api/index';
import { addFeed, setLoading, removeUserFromFeed } from '../store/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const dispatch = useDispatch();
  const { data: feedData, loading } = useSelector((root) => root.feed);
  
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
    // Remove the user from the feed after action
    dispatch(removeUserFromFeed(userId));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
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
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="text-6xl mb-4">👥</div>
          <h1 className="text-2xl font-bold text-base-content mb-2">No users found</h1>
          <p className="text-base-content/70">There are no users to display at the moment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center py-6 px-4">
      <div className="space-y-4 max-w-2xl w-full">
        {feedData.data.map((user) => {
          console.log('Rendering user:', user);
          return <UserCard key={user._id} {...user} onAction={handleUserAction} />;
        })}
      </div>
    </div>
  );
};

export default Feed;
