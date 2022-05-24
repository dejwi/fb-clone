import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form'
import fetchApi from '../../../helpers/fetchApi'
import ImgIcon from '../../ImgIcon'
import { userContext } from '../../../userContext'
import { motion } from 'framer-motion'

interface prop {
  hide: () => void,
}

const Top_popup: React.FC<prop> = ({hide}) => {
  const { register, handleSubmit } = useForm();
  const apiUrl = process.env.REACT_APP_BACKEND as string;
  const {user} = useContext(userContext) as UserContext;
  const [fileName, setFileName] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(false);

  const onSubmit = (data: any) => {
    if (!data.content) return;

    const formData = new FormData();
    formData.append('content', data.content);
    formData.append('file', data.image[0]);

    setBtnDisabled(true);
    fetchApi('/post', 'POST', formData)
      .then(() => hide());
  };

  const fileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files)
      setFileName(e.target.files[0].name);
  };

  const animeOptsBg = {
    initial:{ opacity: 0},
    animate:{ opacity: 1},
    exit: { opacity: 0},
    transition:{ type: 'spring', duration: 0.25}
  };

  const animeOptsConf = {
    initial: { opacity: 0, scale: 0.55},
    animate: { opacity: 1, scale: 1},
    exit: { opacity: 0, scale: 0.55, transition: {type: 'tween', duration: 0.15, ease: 'easeIn'}},
    transition:{ type: 'spring', duration: 0.4}
  };

  return (<><motion.div className='fixed top-0 left-0 h-screen w-full z-50 flex items-center justify-center pointer-events-none'
                        {...animeOptsConf}>
      <form onClick={e=>e.stopPropagation()} onSubmit={handleSubmit(onSubmit)} className='flex flex-col bg-white shadow-md px-4 rounded-md pb-2 -mt-28 pointer-events-auto'>
        <div className='flex items-center gap-1.5 py-2.5'>
          <img alt='avatar' src={user?.picUrl} className='w-12 h-12 min-w-[3rem] rounded-full'/>
          <div className='relative w-full'>
            <span className=''>{user?.username}</span>
            <p className='text-sm text-neutral-500 -mt-1.5'>{new Date().toLocaleDateString("en-gb", {
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}</p>

            <button type='submit' disabled={btnDisabled} className='font-semibold text-sky-600 disabled:text-neutral-500 transition-colors absolute right-2 top-1/4'>Post</button>
          </div>
        </div>
        <hr/>
        <textarea className='mt-1 w-[19.5rem] min-h-[6rem] focus:outline-0' {...register('content')} placeholder={`What's on your mind, ${user?.username.split(' ')[0]}?`} required/>

        <div className='flex flex-col w-full items-center'>
          <label className='flex justify-center'>
            <input type='file' {...register('image')} accept="image/*" className='hidden' onInput={fileChange}/>
            <ImgIcon classes='w-9 h-9'/>
          </label>
          <span className='text-sm text-zinc-400'>{fileName}</span>
        </div>
      </form>
  </motion.div>
  <motion.div onClick={()=>hide()} className='fixed top-0 left-0 bg-neutral-600 bg-opacity-40 h-screen w-full z-40'
              {...animeOptsBg}></motion.div>
  </>)
};

export default Top_popup;
