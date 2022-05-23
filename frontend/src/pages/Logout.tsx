import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom'
import fetchApi from '../helpers/fetchApi'

const Logout: React.FC<{ changeAuth: () => void }> = ({changeAuth}) => {
  const nav = useNavigate();
  useEffect(()=> {
    fetchApi('/auth/logout').then(()=> {
      changeAuth();
      window.localStorage.setItem('token','');
      nav('/');
    });
  }, []);

  return (<div></div>)
};

export default Logout;
