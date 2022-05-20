import React, { useState } from 'react';
import fetchApi from '../../../helpers/fetchApi';

interface props {
  picUrl: string,
  refInput: React.LegacyRef<HTMLInputElement>,
  postId: string,
  addLocalComment: (content: string) => void
}

const CommentNew: React.FC<props> = ({picUrl, refInput, postId, addLocalComment}) => {
  const [content, setContent] = useState('');

  const submit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!content) return;

    const res = await fetchApi(`/post/${postId}/comment`, 'POST', JSON.stringify({content}), true);
    if (res.ok) addLocalComment(content);
    setContent('');
  };

  return (<form className='flex items-center mt-2' onSubmit={submit}>
    <img alt='avatar' src={picUrl} className='w-6 h-6 rounded-full'/>
    <input ref={refInput} type='text' value={content} onChange={e=>setContent(e.target.value)} placeholder='Write a comment...' className='bg-zinc-100 placeholder:text-neutral-500 py-0.5 pl-2.5 ml-2 rounded-xl flex-1 focus:outline-0'/>
  </form>);
};

export default CommentNew;
