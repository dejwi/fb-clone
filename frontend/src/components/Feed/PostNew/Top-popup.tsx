import React from 'react';
import { useForm } from 'react-hook-form'
import fetchApi from '../../../helpers/fetchApi'

interface prop {
  hide: () => void,
}

const Top_popup: React.FC<prop> = ({hide}) => {
  const { register, handleSubmit } = useForm();
  const apiUrl = process.env.REACT_APP_BACKEND as string;

  const onSubmit = (data: any) => {
    if (!data.content) return;

    const formData = new FormData();
    formData.append('content', data.content);
    formData.append('file', data.image[0]);

    fetchApi('/post', 'POST', formData)
      .then(() => hide());
  };

  return (<div onClick={()=>hide()} className='fixed top-0 left-0 bg-neutral-600 bg-opacity-20 h-screen w-full'>
      <form onClick={e=>e.stopPropagation()} onSubmit={handleSubmit(onSubmit)} >

        <input type='file' {...register('image')} accept="image/*"/>
        <textarea {...register('content')}  placeholder={`What's on your mind `} required/>
        <button type='submit'>Submit</button>
      </form>
  </div>)
};

export default Top_popup;