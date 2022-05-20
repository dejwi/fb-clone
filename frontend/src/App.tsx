import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {userContext} from "./userContext";
import { DotPulse } from "@uiball/loaders";
import fetchApi from './helpers/fetchApi'

import Login from "./pages/Login";
import Feed from './pages/Feed'

const App: React.FC = () => {
  const apiUrl = process.env.REACT_APP_BACKEND as string;
  const [user, setUser] = useState<UserType>();
  const [isLoading, setLoading] = useState(true);
  const [isAuth, setAuth] = useState(false);

  useEffect(()=>{
    (async () =>{
      const res = await fetchApi('/auth/info');
      setAuth(res.ok);
      setLoading(false);

      if(res.ok) {
        const data = await res.json();
        setUser(data);
        console.log(data);
      }
    })();
  },[]);

  return (<div className='bg-stone-100 h-full'>{
    isLoading ?
        <div className='h-screen flex justify-center items-center'>
          <DotPulse color={'#181818'}/>
        </div> :

        <userContext.Provider value={user}>
          <BrowserRouter>
            <Routes>
              {!isAuth ? <Route path='/*' element={<Login/>}/> : <>

                <Route path='/#_=_' element={<Navigate to='/' replace/>}/>
                <Route path='/' element={ <Feed/> }/>
              </>}
            </Routes>
          </BrowserRouter>
        </userContext.Provider>
  }</div>);
};
export default App;
