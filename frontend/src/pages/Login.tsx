import React from "react";
import { ReactComponent as FbLogo } from '../svg/fblogo.svg';
import {motion} from "framer-motion";
import googleSignin from '../img/google2x.png';
import facebookSignin from '../img/facebook.png';
import FbLogoCustom from '../img/fakebooklogo-nobg.png';

const animeOpts = {
    initial:{ y: -16 , opacity: 0},
    animate:{ y: 0, opacity: 1},
    transition:{ type: 'spring', delay: 0.2, duration: 2}
};

const Login: React.FC = () => {
    const apiUrl = process.env.REACT_APP_BACKEND as string;

    return (<motion.main {...animeOpts} className='h-screen flex flex-col justify-center items-center font-["Roboto"] gap-2.5 ' id='fb-root'>
        {/*<FbLogo className='absolute top-2.5'/>*/}
        <img alt='ds' src={FbLogoCustom} className='absolute top-2.5 w-12'/>

        <h1 className='absolute bottom-3.5 text-xs text-zinc-600 font-[Poppins]'>Hi! Select either one to proceed</h1>
        <motion.a whileHover={{scale: 1.05}} whileTap={{scale: 0.95}} href={`${apiUrl}/auth/facebook`} >
            <img alt='signin facebook' src={facebookSignin} className='w-48 shadow-md'/>
        </motion.a>
        <motion.a whileHover={{scale: 1.05}} whileTap={{scale: 0.95}} href={`${apiUrl}/auth/google`} >
            <img alt='signin google' src={googleSignin} className='w-[12.35rem]'/>
        </motion.a>
        {/*<button className='bg-neutral-700 w-48 text-center py-2 rounded text-white font-medium'>Demo account</button>*/}
    </motion.main>);
};

export default Login;
