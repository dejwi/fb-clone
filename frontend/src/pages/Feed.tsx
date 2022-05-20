import React, {useState, useEffect} from 'react'
import Nav from '../components/Nav'
import Post from '../components/Feed/Post';
import Top from '../components/Feed/Top';
import Post_skeleton from '../components/Feed/Post-skeleton';
import {AnimatePresence} from 'framer-motion';

interface _PostType extends PostType {
  author: UserType
}

const Feed: React.FC = () => {
  const apiUrl = process.env.REACT_APP_BACKEND as string;
  const [posts, setPosts] = useState<_PostType[] | null>(null);

  useEffect(()=>{
    (async()=>{
      const res = await fetch(`${apiUrl}/post`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      console.log(data);
      setPosts(data);
    })();
  }, []);

  return (<>
    <Nav/>
    <main className='flex flex-col gap-5 items-center mt-5'>
      <Top />
      <div className='h-[1px] w-[22.5rem] bg-neutral-200 -mt-2 -mb-2'></div>

      <AnimatePresence initial={false} exitBeforeEnter={true}  >
      {!posts ?
      <> <Post_skeleton/> <Post_skeleton/> <Post_skeleton/> </>:

        posts.map(data => <Post {...data } key={data._id}/>)}
      </AnimatePresence>
    </main>
  </>)
};

export default Feed;
