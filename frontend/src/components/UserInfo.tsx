import React, { useContext, useState } from 'react'
import {motion} from 'framer-motion'
import { userContext } from "../userContext";
import { ReactComponent as EditIcon} from "../svg/edit.svg";
import fetchApi from "../helpers/fetchApi";

interface props{
  profile: UserType,
}

const UserInfo: React.FC<props> = ({profile}) =>{
  const { user, setUser } = useContext(userContext) as UserContext;
  const isOwner = profile._id === user?._id;
  const [showEditName, setShowEditName] = useState(false);
  const [username, setUsername] = useState(profile.username);
  const [bgUrl, setBgUrl] = useState(profile.bgUrl || '');
  const [picUrl, setPicUrl] = useState(profile.picUrl || '');

  const updateName = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username) return;
    if (username === user?.username) return;

    fetchApi('/auth/username', 'PUT', JSON.stringify({username}), true)
        .then(res => res.json())
        .then(res => {
          setShowEditName(false);
          setUser({...user, username: res.username});
        });
  };

  const bgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!e.target.files) return;

    const formData = new FormData();
    formData.append('file', e.target.files[0]);

    fetchApi('/auth/bg', 'PUT', formData)
        .then(res => res.json())
        .then(res => setBgUrl(res.bgUrl));
  };

  const picChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!e.target.files) return;

    const formData = new FormData();
    formData.append('file', e.target.files[0]);

    fetchApi('/auth/prof', 'PUT', formData)
        .then(res => res.json())
        .then(res => {
            fetch(res.picUrl)
                .then(res => res.blob())
                .then(blob => {
                  const url = URL.createObjectURL(blob);
                  setPicUrl(url);
                  setUser({...user, picUrl: url});
                });
        });
  };


  const animeOpts = {
    initial:{ opacity: 0, transition: {} },
    animate:{ opacity: 1 },
    exit: { y:30, opacity: 0 },
    transition:{ type: 'spring', duration: 0.6},
  };

  return (<motion.div className='flex flex-col mb-5 items-center' {...animeOpts}>
    <div className='w-[22.5rem] h-36 bg-gray-200 rounded-b-xl overflow-hidden relative z-20'>
      {!!bgUrl && <img src={bgUrl} alt='background' className='object-cover w-full h-full'/>}
      {isOwner && <label className='absolute right-0 bottom-0 w-5 h-5 fill-neutral-800'><input type='file' accept="image/*" className='hidden' onChange={bgChange}/><EditIcon/></label>}
    </div>
    <div className='flex flex-col items-center -mt-[4rem]'>
      <div className='z-30 relative'>
        <img alt='avatar' src={picUrl} className='w-24 h-24 rounded-full '/>
        {isOwner && <label className='absolute right-0 bottom-0 w-5 h-5 fill-neutral-700'><input type='file' accept="image/*" className='hidden' onChange={picChange}/><EditIcon/></label>}
      </div>
      {!showEditName &&
          <h2 className='font-semibold text-2xl -mb-1.5 relative'>{username}
            {isOwner && <button className='absolute -right-4 bottom-1 w-4 h-4 fill-neutral-700' onClick={()=>setShowEditName(true)}><EditIcon/></button>}
          </h2>}
      {showEditName && isOwner &&
          <form onSubmit={updateName}>
          <input type='text' value={username} className='font-semibold text-2xl -mb-1.5 text-center bg-white/90 rounded'
            onChange={e=>setUsername(e.target.value)}/></form>}
      <p className='text-neutral-600'>{profile.friends.length} friends</p>
    </div>
  </motion.div>)
};

export default UserInfo;
