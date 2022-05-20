import React, {useContext, useRef, useState } from 'react';
import niceDate from '../../../helpers/niceDate';
import { userContext } from '../../../userContext';
import Comment from './Comment';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CommentNew from './CommentNew';

import {ReactComponent as LikeIcon} from '../../../svg/like.svg';
import {ReactComponent as CommentIcon} from '../../../svg/comment.svg';
import {ReactComponent as ShareIcon} from '../../../svg/share.svg';
import likeBlue from '../../likeBlue';
import LikeBlue from '../../likeBlue'

const animeOpts = {
  initial:{ y: -4 , opacity: 0},
  animate:{ y: 0, opacity: 1},
  transition:{ type: 'spring', duration: 0.6}
};

const Post: React.FC<PostType & {author: UserType}> = ({ author, content, date, likes, picUrl, comments, _id}) => {
  const user = useContext(userContext);
  const input = useRef<HTMLInputElement | null>(null);
  const [_comments, _setComments] = useState(comments);

  // Added sa user doesnt have to re-fetch whole post when commenting
  const addLocalComment = (content: string) => {
    const newComment = { author: user , content };

    _setComments([..._comments, newComment] as unknown as []);
  };

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

    <div className='mt-0.5'>
      {!!likes && <span className='flex gap-0.5 float-left'><LikeBlue/>{likes}</span>}
      {!!_comments.length && <span className='float-right text-neutral-600'>{_comments.length} Comments</span>}
    </div>

    <hr className='mt-1.5'/>
    <div className='flex justify-between py-1'>
      <button className={btnClass}><LikeIcon className={iconClass}/> Like</button>
      <button className={btnClass} onClick={()=>input.current!.focus()}><CommentIcon className={iconClass}/>Comment</button>
      <button className={btnClass}><ShareIcon className={iconClass}/> Share</button>
    </div>
    <hr/>

    {!!_comments.length && <>
      <div className='flex flex-col gap-2 mt-1.5 mb-2'>
        {_comments.slice(-3).reverse().map(data => <Comment {...data} key={data['author'] + data['content']}/> )}
      </div>
      <hr/>
    </>}

    <CommentNew picUrl={user?.picUrl as string} refInput={input} postId={_id} addLocalComment={addLocalComment}/>

  </motion.article>);
};

export default Post;
