import React, {useContext, useRef, useState, useEffect } from 'react';
import niceDate from '../../helpers/niceDate';
import { userContext } from '../../userContext';
import Comment from './Comment';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import CommentNew from './CommentNew';
import FetchApi from '../../helpers/fetchApi'

import {ReactComponent as LikeIcon} from '../../svg/like.svg';
import {ReactComponent as CommentIcon} from '../../svg/comment.svg';
import {ReactComponent as ShareIcon} from '../../svg/share.svg';
import LikeBlue from '../likeBlue';
import fetchApi from '../../helpers/fetchApi'

const Post: React.FC<PostType & {author: UserType}> = ({ author, content, date, likes, picUrl, comments, _id}) => {
  const {user, setUser} = useContext(userContext) as UserContext;
  const input = useRef<HTMLInputElement | null>(null);
  const [_comments, _setComments] = useState(comments);
  const [showCount, setShowCount] = useState(3);
  const [isLiked, setIsLiked] = useState<boolean>(user?.liked.includes(_id as never) as boolean);
  const [likeCount, setLikeCount] = useState(likes);
  const likeControl = useAnimation();

  const likeVariants = {
    liked: {
      fill: '#0188e0',
      color: '#1197f5',
    },
    notLiked: {
      fill: '#a3a3a3',
      color: '#a3a3a3',
    },
    tap: {
      scale: 1.05,
    },
  };

  // Added sa user doesnt have to re-fetch whole post when commenting
  const addLocalComment = (content: string) => {
    const newComment = { author: user , content };

    _setComments([..._comments, newComment] as unknown as []);
  };

  const LikeBtnClick = () => {
    const method = !isLiked ? 'POST' : 'DELETE';

    fetchApi(`/post/${_id}/like`,method);
    // Update context just in case
    if (!isLiked){
      //add
      setUser({...user, liked: [...user?.liked as [], _id]});
      setLikeCount(likeCount+1);
    }else{
      //remove
      const filtered = user?.liked.filter(e => e !== _id);
      setUser({...user, liked: filtered});
      setLikeCount(likeCount-1);
    }
    setIsLiked(!isLiked);
  };

  useEffect(()=>{
    if(isLiked)
      likeControl.start('liked');
    else
      likeControl.start('notLiked');
  },[isLiked]);

  const iconClass = 'w-4 h-4 mr-0.5 fill-neutral-400 mt-0.5';
  const btnClass = 'flex items-center text-neutral-500 px-4 py-1 transition-[background] hover:bg-neutral-100 -my-0.5 rounded-md text-[0.85rem] ';

  return (<article className='w-[21.5rem] flex flex-col bg-white p-2.5 shadow rounded-md'>
    <div className='flex items-center'>
      <img alt='avatar' src={author.picUrl} className='h-9 w-9 rounded-full' loading='lazy'/>
      <div className='flex flex-col ml-1'>
        <Link to={`/user/${author._id}`} className='-mb-1.5 font-semibold'>{author.username}</Link>
        <span className='text-neutral-500 text-sm'>{niceDate(date)}</span>
      </div>
    </div>

    <p className='mt-1'>{content}</p>

    {/*TODO: styling - it was a fast add*/}
    {!!picUrl && <img src={picUrl} className='mb-1' loading='lazy'/>}

    <div className='flex items-center justify-between'>
      {!!likeCount && <span className='flex items-center gap-0.5 float-left text-sm'><LikeBlue/>{likeCount}</span>}
      {!!_comments.length && <span className='flex text-neutral-500 text-sm '>{_comments.length} Comments</span>}
    </div>

    {/*TODO: MAYBE MOVE THIS TO SEPARATE COMPONENT*/}
    <hr className='mt-1'/>
    <div className='flex justify-between py-1'>
      <motion.button className={btnClass} animate={likeControl} variants={likeVariants} whileTap='tap' onClick={LikeBtnClick}>
        <LikeIcon className={'w-4 h-4 mr-0.5'}/> Like
      </motion.button>
      <button className={btnClass} onClick={()=>input.current!.focus()}><CommentIcon className={iconClass}/>Comment</button>
      <button className={btnClass}><ShareIcon className={iconClass}/> Share</button>
    </div>
    <hr/>

    {!!_comments.length && <>
      <div className='flex flex-col gap-2 mt-1.5 mb-2'>
        {_comments.slice(-showCount).reverse().map(data => <Comment {...data} key={data['author'] + data['content']}/> )}
      </div>
      {_comments.length > showCount &&
        <button onClick={()=>setShowCount(showCount+2)}
        className='float-left max-w-max -mt-1.5 text-sm text-neutral-500' >View more comments</button>
      }
      <hr/>
    </>}

    <CommentNew picUrl={user?.picUrl as string} refInput={input} postId={_id} addLocalComment={addLocalComment}/>

  </article>);
};

export default Post;
