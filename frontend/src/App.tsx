import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import {userContext} from "./userContext";
import { DotPulse } from "@uiball/loaders";
import fetchApi from './helpers/fetchApi';
import { AnimatePresence } from 'framer-motion'

import User from './pages/User';
import Login from "./pages/Login";
import Feed from './pages/Feed'
import Nav from './components/Nav/Nav'
import FriendsFeed from './pages/FriendsFeed'
import Friends from './pages/Friends'
import FriendsDiscover from './pages/FriendsDiscover'
import Logout from './pages/Logout'
import Auth from './pages/Auth'
import Chat from './pages/Chat'

const App: React.FC = () => {
  const apiUrl = process.env.REACT_APP_BACKEND as string;
  const [user, setUser] = useState<UserType>();
  const [isLoading, setLoading] = useState(true);
  const [isAuth, setAuth] = useState(false);
  const location = useLocation();

  useEffect(()=>{
    (async () =>{
      const res = await fetchApi('/auth/info');
      setAuth(res.ok);
      setLoading(false);

      if(res.ok){
        const data: UserType = await res.json();
        // store image 'localy' so user doesnt have to redownload it
        fetch(data.picUrl).then(resp => resp.blob())
          .then(imgBlob => {
            data.picUrl = URL.createObjectURL(imgBlob);
            setUser(data);
          });
      }
    })();
  },[]);

  return (<div className='bg-stone-100 min-h-screen flex flex-col'>{
    isLoading ?
        <div className='h-screen flex justify-center items-center'>
          <DotPulse color={'#181818'}/>
        </div> :

        <userContext.Provider value={{ user, setUser: (updt)=>setUser(updt) } }>
            {isAuth && <Nav/>}
            <AnimatePresence exitBeforeEnter>
            <Routes key={location.pathname} location={location}>
                <Route path='/auth/:token' element={ <Auth/> }/>
                <Route path='/auth/:token/*' element={ <Auth/> }/>
              {!isAuth ?<>
                <Route path='/*' element={<Login/>}/>
              </>: <>

                <Route path='/#_=_' element={<Navigate to='/' replace/>}/>

                <Route path='/' element={ <Feed/> }/>
                <Route path='/user/:id' element={ <User/> }/>
                <Route path='/friends' element={ <Friends/> }/>
                <Route path='/friendsfeed' element={ <FriendsFeed/> }/>
                <Route path='/newfriends' element={ <FriendsDiscover/> }/>
                <Route path='/chat' element={ <Chat/> }/>
                <Route path='/logout' element={ <Logout changeAuth={()=>setAuth(false)}/> }/>

              </>}
            </Routes>
            </AnimatePresence>
        </userContext.Provider>
  }</div>);
};
export default App;
