import React from 'react';
import {Link} from 'react-router-dom';
import { motion } from 'framer-motion'

const DropdownMenu: React.FC = () => {

  const linkClass = 'pl-5 pr-12 ';

  return (<motion.div className='absolute top-11 right-1 w-max grid bg-white shadow py-2 gap-2 text-left rounded'
              initial={{opacity: 0, y: -10, scale: 0.95}} animate={{opacity: 1, y: 0, scale: 1}} transition={{type: 'spring', duration: 0.4}} exit={{opacity: 0, y: -10, scale: 0.95}}>
    <Link to={'/'} className={linkClass}>Profile</Link>
    <Link to={'/'} className={linkClass}>Friends</Link>
    <Link to={'/'} className={linkClass}>Settings</Link>
    <div className='h-px  bg-neutral-200 -mt-px -mb-px'></div>
    <Link to={'/'} className={linkClass}>Logout</Link>
  </motion.div>);
};

export default DropdownMenu;
