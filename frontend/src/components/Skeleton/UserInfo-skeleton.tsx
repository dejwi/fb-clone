import React from 'react';
import skeleton from 'react-loading-skeleton';
import Skeleton from 'react-loading-skeleton'
import {motion} from 'framer-motion'

const UserInfoSkeleton: React.FC = () =>{
  const animeOpts = {
    initial:{ y: -20 , opacity: 0, transition: {delay: 0.2} },
    animate:{ y: 0, opacity: 1 },
    exit: { opacity: 0 },
    transition:{ type: 'spring', duration: 0.6},
  };

  return (<motion.div className='flex flex-col mb-5 items-center' {...animeOpts}>
    <Skeleton width={'22.5rem'} height={'9rem'} containerClassName={'rounded-b-xl overflow-hidden -mt-1 brightness-95'}/>
    <div className='flex flex-col items-center -mt-[4rem]'>
      <Skeleton circle={true} width={'6rem'} height={'6rem'}/>
      <Skeleton width={'12rem'} height={'1.4rem'}/>
      <Skeleton width={'6rem'} height={'1rem'}/>
    </div>
  </motion.div>)
};

export default UserInfoSkeleton;
