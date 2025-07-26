import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFeed } from '../api/index';
import { addFeed, setLoading } from '../store/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const dispatch = useDispatch();
  const { data: feedData, loading } = useSelector((root) => root.feed);
  const fetchFeed = async () => {
    dispatch(setLoading());
    const data = await getFeed();
    dispatch(addFeed(data));
  };
  useEffect(() => {
    fetchFeed();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center my-16">
        <div className="flex w-52 flex-col gap-4">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center my-5 flex-col">
      {feedData?.data?.map((user) => {
        return <UserCard key={user._id} {...user} />;
      })}
    </div>
  );
};

export default Feed;
