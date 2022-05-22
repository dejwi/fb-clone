import React from 'react'
import {motion} from 'framer-motion'

interface props{
  user: UserType,
}

const UserInfo: React.FC<props> = ({user}) =>{
  const animeOpts = {
    initial:{ opacity: 0, transition: {} },
    animate:{ opacity: 1 },
    exit: { y:30, opacity: 0 },
    transition:{ type: 'spring', duration: 0.6},
  };

  return (<motion.div className='flex flex-col mb-5 items-center' {...animeOpts}>
    <div className='w-[22.5rem] h-36 bg-gray-200 rounded-b-xl overflow-hidden'>
      {!!user.bgUrl && <img src={user.bgUrl} alt='background' className='object-contain w-full'/>}
    </div>
    <div className='flex flex-col items-center -mt-[4rem]'>
      <img alt='avatar' src={user.picUrl} className='w-24 h-24 rounded-full'/>
      <h2 className='font-semibold text-2xl -mb-1.5'>{user.username}</h2>
      <p className='text-neutral-600'>{user.friends.length} friends</p>
    </div>
  </motion.div>)
};

export default UserInfo;
