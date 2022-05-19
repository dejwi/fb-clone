import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { motion, AnimatePresence } from 'framer-motion';

const animeOpts = {
  initial: { y: -20 , opacity: 0},
  animate: { y: 0, opacity: 1},
  exit: {y: 30, opacity: 0},
  transition:{ type: 'spring',  duration: 0.2}
};

const Post_skeleton: React.FC = () => {

  return(
    <motion.article className='w-[21.5rem] flex flex-col bg-white p-2.5 shadow rounded-md overflow-hidden' {...animeOpts}>
      <div className='flex items-center -mt-2'>
        <Skeleton circle={true} width={35} height={35}/>
        <div className='flex flex-col ml-1'>
          <Skeleton containerClassName='-mb-1.5 mt-2' width={130} height={14}/>
          <Skeleton height={12} />
        </div>
      </div>

    {/*<p className='mt-1'>{content}</p>*/}
      <Skeleton count={3} />

    <hr className='mt-1.5'/>
    <div className='flex justify-between py-1'>
      <Skeleton height={20} width={100}/>
      <Skeleton height={20} width={100}/>
      <Skeleton height={20} width={100}/>
    </div>
    <hr/>

    {/*<div className='mt-1.5'>*/}
    {/*  {comments.slice(0,3).map(data => <Comment {...data}/> )}*/}
    {/*</div>*/}
      <div className='flex mt-1 mb-2'>
        <Skeleton circle={true} width={25} height={25} containerClassName='mr-2'/>
        <Skeleton height={50} width={140}/>
      </div>
      <hr/>

    <div className='flex items-center mt-2'>
      <Skeleton circle={true} width={25} height={25} containerClassName='mr-2'/>
      <Skeleton height={20} width={290}/>
    </div>

  </motion.article> );
};

export default Post_skeleton;
