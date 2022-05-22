import React from 'react'
import {Link} from 'react-router-dom'
import { motion } from 'framer-motion'

interface props {
  data: UserType,
  children?: JSX.Element
}

const Fcard: React.FC<props> = ({data, children}) => {

  const animeOpts = {
    initial:{ y: -20 , opacity: 0, transition: {delay: 0.5}},
    animate:{ y: 0, opacity: 1},
    transition:{ type: 'spring', duration: 0.6},
  };

  return (<motion.div {...animeOpts} className='grid grid-cols-invite bg-white/80 w-[15rem] py-1 pl-2.5 shadow-sm rounded-md'>
    <Link to={`/user/${data._id}`}><img alt='avatar' src={data.picUrl} className='w-12 h-12 rounded-full'/></Link>
    <div className='flex flex-col items-start justify-center'>
      <span>{data.username}</span>
      {children}
    </div>
  </motion.div>)
};

export default Fcard;
