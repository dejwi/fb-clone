import React from 'react';
import Post_skeleton from './Post-skeleton';
import { motion } from 'framer-motion'

const PostSkeletonTimeline: React.FC<{addClass?: string}> = ({addClass}) => {
  const animeOpts = {
    initial: { y: -20 , opacity: 0},
    animate: { y: 0, opacity: 1},
    exit: {y: 30, opacity: 0},
    transition:{ type: 'spring',  duration: 0.4}
  };

  return (<motion.main className={'flex flex-col gap-5 items-center mt-3.5 pb-4 '+addClass} {...animeOpts}>
      <Post_skeleton/> <Post_skeleton/> <Post_skeleton/>
  </motion.main>);
};

export default PostSkeletonTimeline;
