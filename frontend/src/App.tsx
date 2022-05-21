import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import {userContext} from "./userContext";
import { DotPulse } from "@uiball/loaders";
import fetchApi from './helpers/fetchApi';
import { AnimatePresence } from 'framer-motion'

import User from './pages/User';
import Login from "./pages/Login";
import Feed from './pages/Feed'
import Nav from './components/Nav'

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

      if(res.ok)
        setUser(await res.json());
    })();
  },[]);

  return (<div className='bg-stone-100 h-full'>{
    isLoading ?
        <div className='h-screen flex justify-center items-center'>
          <DotPulse color={'#181818'}/>
        </div> :

        <userContext.Provider value={{ user, setUser: (updt)=>setUser(updt) } }>
            {isAuth && <Nav/>}
            <AnimatePresence exitBeforeEnter>
            <Routes key={location.pathname} location={location}>
              {!isAuth ? <Route path='/*' element={<Login/>}/> : <>

                <Route path='/#_=_' element={<Navigate to='/' replace/>}/>

                <Route path='/' element={ <Feed/> }/>
                <Route path='/user/:id' element={ <User/> }/>
              </>}
            </Routes>
            </AnimatePresence>
        </userContext.Provider>
  }</div>);
};
export default App;
