import React from 'react';
import {Link} from 'react-router-dom';
import { motion } from 'framer-motion'

interface props {
  userid: string
}

const DropdownMenu: React.FC<props> = ({userid}) => {

  const linkClass = 'pl-5 pr-12 ';

  return (<motion.div className='absolute top-11 right-1 w-max grid bg-white shadow py-2 gap-2 text-left rounded'
              initial={{opacity: 0, y: -10, scale: 0.95}} animate={{opacity: 1, y: 0, scale: 1}} transition={{type: 'spring', duration: 0.4}} exit={{opacity: 0, y: -10, scale: 0.95}}>
    <Link to={`/user/${userid}`} className={linkClass}>Profile</Link>
    <div className='h-px  bg-neutral-200 -mt-px -mb-px'></div>
    <Link to='/logout' className={linkClass}>Logout</Link>
  </motion.div>);
};

export default DropdownMenu;
