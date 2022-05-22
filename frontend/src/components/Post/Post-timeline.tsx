import React from 'react'
import { motion } from 'framer-motion'
import Post from './Post'

interface _PostType extends PostType {
  author: UserType
}
interface props {
  posts: _PostType[],
}

const PostTimeline: React.FC<props> = ({ posts}) => {
  const animeOpts = {
    initial:{ y: -20 , opacity: 0, transition: {delay: 0.5}},
    animate:{ y: 0, opacity: 1},
    transition:{ type: 'spring', duration: 0.6},
  };

  return (
  <motion.main className='flex flex-col gap-5 items-center pb-4' {...animeOpts}>
    {posts.map(data => <Post {...data} key={data._id} />)}
  </motion.main>);
};

export default PostTimeline;
