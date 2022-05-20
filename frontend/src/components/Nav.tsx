import React, { useContext } from 'react';
import {userContext} from '../userContext'
import { ReactComponent as FbLogo} from '../svg/fblogo.svg';
import { ReactComponent as SearchIcon} from '../svg/search.svg';
import { ReactComponent as HomeIcon} from '../svg/home.svg';
import { motion } from 'framer-motion'

const animeOpts = {
  initial:{ y: -4, opacity: 0},
  animate:{ y: 0, opacity: 1},
  transition:{ type: 'spring', delay: 0.2, duration: 1.2}
};

const Nav: React.FC = () => {
  const user = useContext(userContext);

  return (<motion.nav className='sticky top-0 grid grid-cols-nav bg-white drop-shadow-sm py-1 items-center px-2.5'
                      {...animeOpts}>
    <div className='flex'>
      <FbLogo className='w-10 h-10'/>
      {/* TODO: Maybe add search bar */}
      {/*<div className='flex items-center hidden'>*/}
      {/*  <div className='bg-neutral-600 py-1.5 pl-2 pr-4 rounded-lg'>*/}
      {/*    <SearchIcon className='w-4 h-4 fill-zinc-300'/>*/}
      {/*  </div>*/}
      {/*  <input type='text' placeholder='Search' className='hidden'/>*/}
      {/*</div>*/}
    </div>

    <HomeIcon className='fill-neutral-800 justify-self-center'/>

    <div className='flex items-center justify-self-end'>
      <img alt='avatar' src={user?.picUrl} className='w9 h-9 rounded-full'/>
      <span className='ml-1'>{user?.username.split(' ')[0]}</span>
    </div>
  </motion.nav>);
};

export default Nav;
