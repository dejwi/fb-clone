import React, {useContext, useState} from 'react'
import { Link } from 'react-router-dom';
import { userContext } from '../../../userContext';
import { motion, AnimatePresence } from 'framer-motion';
import Top_popup from './Top-popup'

const animeOpts = {
  initial:{ y: -4, opacity: 0},
  animate:{ y: 0, opacity: 1},
  transition:{ type: 'spring', delay: 0.1, duration: 0.35}
};

const Top: React.FC = () => {
  const {user} = useContext(userContext) as UserContext;
  const [showPopup, setShowPopup] = useState(false);

  return (<><motion.div className='flex bg-white w-[21.5rem] py-3 rounded-lg justify-center' {...animeOpts}>
    <Link to={`/user/${user?._id}`}>
      <img alt='avatar' src={user?.picUrl} className='w-10 h-10 rounded-full'/>
    </Link>
    <button className='ml-1.5 bg-zinc-100 pl-3 pr-8 rounded-lg' onClick={()=>setShowPopup(true)}>What's on your mind, {user?.username.split(' ')[0]}?</button>


  </motion.div>
    <AnimatePresence exitBeforeEnter>
    {showPopup && <Top_popup hide={()=>setShowPopup(false)}/>}
    </AnimatePresence>
    </>);

};

export default Top;
