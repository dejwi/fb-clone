import React from 'react';
import Post_skeleton from './Post-skeleton';
import { motion } from 'framer-motion'

const PostSkeletonTimeline: React.FC = () => {
  const animeOpts = {
    initial: { y: -20 , opacity: 0},
    animate: { y: 0, opacity: 1},
    exit: {y: 30, opacity: 0},
    transition:{ type: 'spring',  duration: 0.4}
  };

  return (<motion.main className='flex flex-col gap-5 items-center mt-3.5 pb-4' {...animeOpts}>
    <div className='h-[1px] w-[22.5rem] bg-neutral-200 -mt-2 -mb-2'></div>
      <Post_skeleton/> <Post_skeleton/> <Post_skeleton/>
  </motion.main>);
};

export default PostSkeletonTimeline;
