import React, { useContext, useState, useEffect, useRef } from 'react'
import {Link} from 'react-router-dom';
import {userContext} from '../userContext'
import { ReactComponent as FbLogo} from '../svg/fblogo.svg';
import { ReactComponent as HomeIcon} from '../svg/home.svg';
import { motion, useAnimation } from 'framer-motion'

const Nav: React.FC = () => {
  const {user} = useContext(userContext) as UserContext;

  const control = useAnimation();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [show, setShow] = useState(true);

  const navVariant = {
    initial: {
      y: -4,
      opacity: 0
    },
    loaded: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', delay: 0.2, duration: 1.2}
    },
    hide: {
      y: '-100%' ,
      transition: { duration: 0.22},
    },
    show: {
      y: 0,
      transition: { duration: 0.22},
    },
  };

  useEffect(()=>{

    if (show)
      control.start('show');
    else
      control.start('hide');
  },[show]);

  useEffect(()=> {
    control.start('loaded');
  },[]);

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) { // if scroll down hide the navbar
        setShow(false);
      } else { // if scroll up show the navbar
        setShow(true);
      }

      // remember current page location to use in the next move
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (<motion.nav className={`sticky top-0 grid grid-cols-nav bg-white drop-shadow-sm py-1 items-center px-2.5`}
                      variants={navVariant} initial={'initial'} animate={control}>
    <Link to='/' className=''>
      <FbLogo className='w-10 h-10'/>
    </Link>

    <HomeIcon className='fill-neutral-800 justify-self-center'/>

    <div className='flex items-center justify-self-end'>
      <img alt='avatar' src={user?.picUrl} className='w9 h-9 rounded-full'/>
      <span className='ml-1'>{user?.username.split(' ')[0]}</span>
    </div>
  </motion.nav>);
};

export default Nav;
