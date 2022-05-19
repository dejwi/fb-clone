import React from 'react';
import { Link } from 'react-router-dom'

interface props {
  author: UserType,
  content: string
}

const Comment: React.FC<props> = ({author, content}) => {

  return (<div className='flex max-w-full'>
    <img alt='avatar' src={author.picUrl} className='h-6 w-6 rounded-full mt-1'/>
    <div className='bg-stone-100 py-1 px-2 rounded-lg ml-1 max-w-[90%]'>
      <Link to={`/user/${author._id}`} className='font-semibold'>{author.username}</Link>
      <p className='break-words -mt-1'>{content}</p>
    </div>
  </div>);
};

export default Comment;
