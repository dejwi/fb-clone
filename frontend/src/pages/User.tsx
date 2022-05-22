import React, { useEffect, useState, useContext } from 'react';
import PostTimeline from '../components/Post/Post-timeline';
import fetchApi from '../helpers/fetchApi';
import PostSkeletonTimeline from '../components/Skeleton/Post-skeleton-timeline';
import {motion, AnimatePresence} from 'framer-motion';
import {useParams} from 'react-router-dom';
import UserInfo from '../components/UserInfo';
import UserInfoSkeleton from '../components/Skeleton/UserInfo-skeleton';
import { userContext } from '../userContext'

interface _PostType extends PostType {
  author: UserType
}

const User: React.FC = () => {
  const [posts, setPosts] = useState<_PostType[]>();
  const {user, setUser} = useContext(userContext) as UserContext;
  const [_user, _setUser] = useState<UserType>();
  const [localUser, setLocalUser] = useState<UserType>();
  const { id } = useParams();

  useEffect(()=>{
    window.scrollTo(0,0);
    (async()=>{
      // update user just in case new invite appeared
      if (user){
        const resU = await fetchApi('/auth/info');
        const dataU = await resU.json() as UserType;
        setLocalUser(dataU);
        setUser({...user, friends: dataU.friends, friendReqReceived: dataU.friendReqReceived , friendReqSend: dataU.friendReqSend});
      }

      const res = await fetchApi(`/user/${id}`);
      const data = await res.json();
      _setUser(data);
    })();
    (async()=>{
      const res = await fetchApi(`/user/${id}/posts`);
      setPosts(await res.json());
    })();
  }, []);

  const invite = () => {
    fetchApi(`/auth/addFriend/${_user?._id}`, 'POST');

    // update local context
    const newUser = {...user} as UserType;
    newUser.friendReqSend.push(_user?._id as never);
    setUser(newUser);
  };

  const acceptInvite = async () => {
    fetchApi(`/auth/acceptFriend/${_user?._id}`, 'POST');

    // update local context
    const newUser = {...user} as UserType;
    newUser.friends.push(_user?._id as never);
    newUser.friendReqReceived = newUser.friendReqReceived.filter(e => e !== _user?._id) as [];
    setUser(newUser);
  };

  const exitOpt = {
    exit: {
      y: 30,
      opacity: 0,
      transition: {duration: 0.3},
    }
  };

  const animOptInv = {
    initial: {y: -5, opacity: 0},
    animate: {y: 0, opacity: 1},
    exit: {y: -5, opacity: 0},
    transition: {type: 'tween', ease: 'easeOut', duration: 0.15}
  };

  return (<>
    <motion.div className='flex flex-col items-center w-screen max-w-full' {...exitOpt}>
      <AnimatePresence exitBeforeEnter>
      {_user ?
        <><UserInfo user={_user} />
          <AnimatePresence exitBeforeEnter>
          {(!!localUser && !localUser?.friends.includes(_user._id as never) && !localUser?.friendReqSend.includes(_user._id as never) && localUser?._id !== _user._id) &&
            (localUser?.friendReqReceived.includes(_user._id as never) ?
              <motion.button {...animOptInv} className='text-sm text-emerald-600 -mt-4 mb-2.5' onClick={acceptInvite}>Accept to friends</motion.button> :
              <motion.button {...animOptInv} className='text-sm text-sky-500 -mt-4 mb-2.5' onClick={invite}>Invite to friends</motion.button>)}
          </AnimatePresence>
        </> :
        <UserInfoSkeleton />
      }
      </AnimatePresence>
      <div className='h-[1px] w-[22.5rem] bg-neutral-200 mb-5'></div>
      <AnimatePresence exitBeforeEnter>
        {!!posts && <PostTimeline posts={posts} key='feedposts'/>}
        {posts === undefined && <PostSkeletonTimeline key='feedskeleton' addClass='mt-0'/>}
        {posts?.length === 0 && <span>No posts :(</span>}
      </AnimatePresence>
    </motion.div>
  </>)
};

export default User;
