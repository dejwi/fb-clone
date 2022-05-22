import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { motion } from 'framer-motion'

const FcardSkeleton: React.FC = () => {

  const animeOpts = {
    initial: { y: -20 , opacity: 0},
    animate: { y: 0, opacity: 1},
    exit: {y: 30, opacity: 0},
    transition:{ type: 'spring',  duration: 0.4}
  };

  return (<motion.div {...animeOpts}  className='grid grid-cols-invite bg-white/80 w-[15rem] py-1 pl-2.5 shadow-sm rounded-md'>
    <Skeleton circle={true} width={'3rem'} height={'3rem'}/>
    <div className='flex flex-col items-start justify-center'>
      <Skeleton height={'0.9rem'} width={'7rem'} />
      <Skeleton height={'0.7rem'} width={'4rem'} containerClassName='-mt-1.5'/>
    </div>
  </motion.div>)
};

export default FcardSkeleton;
