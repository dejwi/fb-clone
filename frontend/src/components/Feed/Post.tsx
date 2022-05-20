import React, {useContext, useRef} from 'react';
import niceDate from '../../helpers/niceDate';
import { userContext } from '../../userContext';
import Comment from './Comment';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import {ReactComponent as LikeIcon} from '../../svg/like.svg';
import {ReactComponent as CommentIcon} from '../../svg/comment.svg';
import {ReactComponent as ShareIcon} from '../../svg/share.svg';

const animeOpts = {
  initial:{ y: -4 , opacity: 0},
  animate:{ y: 0, opacity: 1},
  transition:{ type: 'spring', duration: 0.6}
};

const Post: React.FC<PostType & {author: UserType}> = ({ author, content, date, likes, picUrl, comments}) => {
  const user = useContext(userContext);
  const input = useRef<HTMLInputElement | null>(null);

  const iconClass = 'w-5 h-5 mr-0.5 fill-neutral-400';
  const btnClass = 'flex items-center text-neutral-500 hover:bg-neutral-100 px-4 py-0.5 rounded-md text-[0.85rem] ';

  return (<motion.article className='w-[21.5rem] flex flex-col bg-white p-2.5 shadow rounded-md' {...animeOpts}>
    <div className='flex items-center'>
      <img alt='avatar' src={author.picUrl} className='h-9 w-9 rounded-full'/>
      <div className='flex flex-col ml-1'>
        <Link to={`/user/${author._id}`} className='-mb-1.5 font-semibold'>{author.username}</Link>
        <span className='text-neutral-500 text-sm'>{niceDate(date)}</span>
      </div>
    </div>

    <p className='mt-1'>{content}</p>

    {/*TODO: styling - it was a fast add*/}
    {!!picUrl && <img src={picUrl}/>}

    <hr className='mt-1.5'/>
    <div className='flex justify-between py-1'>
      <button className={btnClass}><LikeIcon className={iconClass}/> Like</button>
      <button className={btnClass} onClick={()=>input.current!.focus()}><CommentIcon className={iconClass}/>Comment</button>
      <button className={btnClass}><ShareIcon className={iconClass}/> Share</button>
    </div>
    <hr/>

    {!!comments.length && <>
      <div className='flex flex-col gap-2 mt-1.5 mb-2'>
        {comments.slice(0,3).map(data => <Comment {...data} key={data['author'] + data['content']}/> )}
      </div>
      <hr/>
    </>}

    <div className='flex items-center mt-2'>
      <img alt='avatar' src={user?.picUrl} className='w-6 h-6 rounded-full'/>
      <input ref={input} type='text' placeholder='Write a comment...' className='bg-zinc-100 placeholder:text-neutral-500 py-0.5 pl-2.5 ml-2 rounded-xl flex-1 focus:outline-0'/>
    </div>

  </motion.article>);
};

export default Post;
