import React, {useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom'

const Auth: React.FC = () => {
  const nav = useNavigate();
  const {token} = useParams();

  useEffect(()=> {
      window.localStorage.setItem('token', token as string);
      nav('/');
      window.location.reload();
  }, []);

  return (<div></div>)
};

export default Auth;
