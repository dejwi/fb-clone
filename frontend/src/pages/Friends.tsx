import React, { useState, useEffect, useContext} from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { userContext } from '../userContext'
import Fcard from '../components/Friends/Fcard'
import fetchApi from '../helpers/fetchApi'

const Friends: React.FC = () => {
  const {user, setUser} = useContext(userContext) as UserContext;
  const [invites, setInvites] = useState<UserType[]>();
  const [friends, setFriends] = useState<UserType[]>();
  const [isLoaded, setLoaded] = useState(false);

  useEffect(()=> {
    (async () => {
      const res = await fetchApi('/auth/fdetail');
      const data = await res.json();
      setInvites(data.invites);
      setFriends(data.friends);
    })()
  },[]);

  const exitOpt = {
    exit: {
      y: 30,
      opacity: 0,
      transition: {duration: 0.3},
    }
  };

  const acceptInvite = async (id: string) => {
    fetchApi(`/auth/acceptFriend/${id}`, 'POST');

    setInvites(invites?.filter(e => e._id !== id));

    // update local context
    const newUser = {...user} as UserType;
    newUser.friends.push(id as never);
    newUser.friendReqReceived = invites?.filter(e => e._id !== id) as [];
    setUser(newUser);
  };

  const headerOpts = {
    initial: {y: -5, opacity: 0},
    animate: {y: 0, opacity: 1},
    transition: {type: 'tween', ease: 'easeOut', duration: 0.15}
  };

  return (
    <motion.div className='flex flex-col items-center w-screen max-w-full ' {...exitOpt}>
      {/*skeleton*/}
      <motion.span {...headerOpts} className='text-sm mt-2'>Discover new <Link to='/newfriends' className='text-sky-800 underline'>Friends</Link></motion.span>
      <div className='mt-2 flex flex-col gap-1'>
        {!!invites?.length && invites.map(e => <Fcard data={e} key={e._id} >
          <button className='-mt-1.5 text-sky-600 text-sm' onClick={()=>acceptInvite(e._id)}>Accept</button>
        </Fcard>)}
      {!invites?.length && <span className='text-sm text-neutral-500 -mb-1.5'>0 invites</span>}
      </div>
      <div className='h-[1px] w-[22.5rem] bg-neutral-200 mb-5 mt-3.5'></div>

      <div className='flex flex-col gap-2.5'>
      {!!friends?.length && friends.map(e => <Fcard data={e} key={e._id}/>)}
      {!friends?.length && <span className='text-sm text-neutral-500 -mt-2'>0 friends</span>}
      </div>

      <AnimatePresence exitBeforeEnter>


      </AnimatePresence>
    </motion.div>
  )
};

export default Friends;
