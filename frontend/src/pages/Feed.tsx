import React, { useEffect, useState } from 'react'
import Top from '../components/Feed/PostNew/Top';
import PostTimeline from '../components/Post/Post-timeline'
import fetchApi from '../helpers/fetchApi'
import PostSkeletonTimeline from '../components/Skeleton/Post-skeleton-timeline'
import {motion, AnimatePresence} from 'framer-motion'

interface _PostType extends PostType {
  author: UserType
}

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<_PostType[]>();

  useEffect(()=>{
    window.scrollTo(0,0);
    (async()=>{
      const res = await fetchApi('/post');
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

  const reFetchPosts = () => {
    (async()=>{
      setPosts(undefined);
      const res = await fetchApi('/post');
      setPosts(await res.json());
    })();
  };
  return (<>
    <motion.div className='flex flex-col items-center mt-3.5' {...exitOpt}>
        <Top reFetch={reFetchPosts}/>
      <div className='h-[1px] w-[22.5rem] bg-neutral-200 mt-3.5 mb-2.5'></div>
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

export default Feed;
