import React, { useEffect, useState } from 'react';
import PostTimeline from '../components/Post/Post-timeline';
import fetchApi from '../helpers/fetchApi';
import PostSkeletonTimeline from '../components/Skeleton/Post-skeleton-timeline';
import {motion, AnimatePresence} from 'framer-motion';
import {useParams} from 'react-router-dom';
import UserInfo from '../components/UserInfo';
import UserInfoSkeleton from '../components/Skeleton/UserInfo-skeleton';

interface _PostType extends PostType {
  author: UserType
}

const User: React.FC = () => {
  const [posts, setPosts] = useState<_PostType[]>();
  const [user, setUser] = useState<UserType>();
  const { id } = useParams();

  useEffect(()=>{
    window.scrollTo(0,0);
    (async()=>{
      const res = await fetchApi(`/user/${id}`);
      const data = await res.json();
      setUser(data);
    })();
    (async()=>{
      const res = await fetchApi(`/user/${id}/posts`);
      setPosts(await res.json());
    })();
  }, []);

  const exitOpt = {
    exit: {
      y: 30,
      opacity: 0,
      transition: {duration: 0.3},
    }
  };

  return (<>
    <motion.div className='flex flex-col items-center w-screen max-w-full' {...exitOpt}>
      <AnimatePresence exitBeforeEnter>
      {user ?
        <UserInfo user={user} /> :
        <UserInfoSkeleton />
      }
      </AnimatePresence>
      <div className='h-[1px] w-[22.5rem] bg-neutral-200 mb-5'></div>
      <AnimatePresence exitBeforeEnter>
        {!!posts && <PostTimeline posts={posts} key='feedposts'/>}
        {posts === undefined && <PostSkeletonTimeline key='feedskeleton'/>}
        {!posts?.length && <span>No posts :(</span>}

      </AnimatePresence>
    </motion.div>
  </>)
};

export default User;
