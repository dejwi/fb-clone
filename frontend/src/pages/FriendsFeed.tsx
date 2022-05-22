import React, { useEffect, useState } from 'react';
import PostTimeline from '../components/Post/Post-timeline';
import fetchApi from '../helpers/fetchApi';
import PostSkeletonTimeline from '../components/Skeleton/Post-skeleton-timeline';
import {motion, AnimatePresence} from 'framer-motion';
import {Link} from 'react-router-dom';

interface _PostType extends PostType {
  author: UserType
}

const FriendsFeed: React.FC = () => {
  const [posts, setPosts] = useState<_PostType[]>();

  useEffect(()=>{
    window.scrollTo(0,0);
    (async()=>{
      const res = await fetchApi(`/auth/friendsfeed`);
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
  const headerOpts = {
    initial: {y: -5, opacity: 0},
    animate: {y: 0, opacity: 1},
    transition: {type: 'tween', ease: 'easeOut', duration: 0.15}
  };

  return (
    <motion.div className='flex flex-col items-center w-screen max-w-full' {...exitOpt}>

      <motion.span {...headerOpts} className='mt-2 text-sm text-neutral-700'>Check your <Link to='/friends' className='underline text-sky-700'>friends</Link></motion.span>
      <div className='h-[1px] w-[22.5rem] bg-neutral-200 mb-5 mt-1.5'></div>
      <AnimatePresence exitBeforeEnter>
        {!!posts && <PostTimeline posts={posts} key='feedposts'/>}
        {posts === undefined && <PostSkeletonTimeline key='feedskeleton'/>}
        {!posts?.length && <span>No posts :(</span>}

      </AnimatePresence>
    </motion.div>
  )
};

export default FriendsFeed;
