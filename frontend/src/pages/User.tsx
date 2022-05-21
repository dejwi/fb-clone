import React, { useEffect, useState } from 'react'
import PostTimeline from '../components/Post/Post-timeline'
import fetchApi from '../helpers/fetchApi'
import PostSkeletonTimeline from '../components/Skeleton/Post-skeleton-timeline'
import {motion, AnimatePresence} from 'framer-motion'
import {useParams} from 'react-router-dom'

interface _PostType extends PostType {
  author: UserType
}

const User: React.FC = () => {
  const [posts, setPosts] = useState<_PostType[] | null>(null);
  const { id } = useParams();

  useEffect(()=>{
    (async()=>{
      const res = await fetchApi(`/user/${id}/posts`);
      setPosts(await res.json());
    })();
  }, []);

  const exitOpt = {
    exit: {
      y: 30,
      opacity: 0,
      transition: {duration: 0.3},
    }
  };

  return (<>
    <motion.div className='flex flex-col items-center mt-3.5' {...exitOpt}>

      {/*<div className='h-[1px] w-[22.5rem] bg-neutral-200 mt-3.5 mb-2.5'></div>*/}
      <AnimatePresence exitBeforeEnter>
        {posts ?
          <PostTimeline posts={posts} key='feedposts'/>
          :
          <PostSkeletonTimeline key='feedskeleton'/>
        }
      </AnimatePresence>
    </motion.div>
  </>)
};

export default User;
