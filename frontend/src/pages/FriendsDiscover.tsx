import React, { useState, useEffect, useContext} from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { userContext } from '../userContext'
import Fcard from '../components/Friends/Fcard'
import fetchApi from '../helpers/fetchApi'

const FriendsDiscover: React.FC = () => {
  const {user, setUser} = useContext(userContext) as UserContext;
  const [found, setFound] = useState<UserType[]>();

  useEffect(()=> {
    (async () => {
      const res = await fetchApi('/auth/discovernew');
      const data = await res.json();
      setFound(data);
    })()
  },[]);

  const exitOpt = {
    exit: {
      y: 30,
      opacity: 0,
      transition: {duration: 0.3},
    }
  };

  const invite = (id: string) => {
    fetchApi(`/auth/addFriend/${id}`, 'POST');

    setFound(found?.filter(e => e._id !== id));

    // update local context
    const newUser = {...user} as UserType;
    newUser.friendReqSend.push(id as never);
    setUser(newUser);
  };

  return (
    <motion.div className='flex flex-col items-center w-screen max-w-full ' {...exitOpt}>
      {/*skeleton*/}

      <div className='flex flex-col gap-2.5 mt-3'>
        {!!found?.length && found.map(e => <Fcard data={e} key={e._id}>
          <button className='-mt-1.5 text-sky-600 text-sm' onClick={()=>invite(e._id)}>Invite</button>
        </Fcard>)}
        {!found?.length && <span className='text-sm text-neutral-500 mt-2'>No one to show :(</span>}
      </div>

      <AnimatePresence exitBeforeEnter>


      </AnimatePresence>
    </motion.div>
  )
};

export default FriendsDiscover;
