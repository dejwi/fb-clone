import React from "react";
import { ReactComponent as FbLogo } from '../svg/fblogo.svg';
import {motion} from "framer-motion";

const animeOpts = {
    initial:{ y: -16 , opacity: 0},
    animate:{ y: 0, opacity: 1},
    transition:{ type: 'spring', delay: 0.2, duration: 2}
};

const Login: React.FC = () => {
    const apiUrl = process.env.REACT_APP_BACKEND as string;

    return (<motion.main {...animeOpts} className='h-screen flex flex-col justify-center items-center font-["Roboto"] gap-2.5'>
        <FbLogo className='absolute top-2.5'/>

        <a href={`${apiUrl}/auth/facebook`} className='bg-blue-500 w-48 text-center py-2 rounded text-white font-medium'>Sign-in with Facebook</a>
        <button className='bg-neutral-700 w-48 text-center py-2 rounded text-white font-medium'>Demo account</button>
    </motion.main>);
};

export default Login;
