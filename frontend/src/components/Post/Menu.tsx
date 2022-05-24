import React, { useState } from 'react';
import { ReactComponent as OptionsIcon } from "../../svg/options.svg";
import { ReactComponent as TrashIcon } from "../../svg/trash.svg";
import {motion, AnimatePresence} from "framer-motion";

interface props {
    isAuthor: boolean,
    removePost: () => void
}

const Menu: React.FC<props> = ({isAuthor, removePost }) => {
    const [show, setShow] = useState(false);
    const [showConf, setShowConf] = useState(false);

    const animeOptsMenu = {
        initial:{ y: -20, x: 15, scale: 0.5, opacity: 0},
        animate:{ y: 0, x: 0, opacity: 1, scale: 1},
        exit: { y: -20, x: 15, scale: 0.5, opacity: 0},
        transition:{ type: 'spring', duration: 0.25}
    };

    const animeOptsBg = {
        initial:{ opacity: 0},
        animate:{ opacity: 1},
        exit: { opacity: 0},
        transition:{ type: 'spring', duration: 0.25}
    };

    const animeOptsConf = {
        initial: { opacity: 0, scale: 0.7},
        animate: { opacity: 1, scale: 1},
        exit: { opacity: 0, scale: 0.55, transition: {type: 'tween', duration: 0.15, ease: 'easeIn'}},
        transition:{ type: 'spring', duration: 0.4}
    };

    return (<div className='justify-self-end self-start relative' >
        <button onClick={()=>setShow(!show)}>
            <OptionsIcon />
        </button>
        <AnimatePresence exitBeforeEnter>
        {show &&
        <motion.div className='absolute -left-8 w-max top-6' {...animeOptsMenu}>
                <button className='flex items-center bg-white shadow pl-1 pr-1.5 py-0.5 text-[0.75rem] rounded' onClick={()=> {
                    setShowConf(true); setShow(false);
                }}>
                    <TrashIcon className='w-4 h-4'/>
                    Delete
                </button>
        </motion.div>
        }
        </AnimatePresence>
        <AnimatePresence exitBeforeEnter>
        {showConf && <>
        <motion.div {...animeOptsConf} className='fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50 pointer-events-none'>
            <div className='bg-white flex flex-col items-center p-2 gap-1 rounded pointer-events-auto' onClick={e=>e.stopPropagation()}>
                <span className='text-lg'>Are you sure?</span>
                <div className='flex gap-6'>
                    <button className='text-[0.95rem]' onClick={()=>setShowConf(false)}>No, cancel</button>
                    <button className='text-pink-600 text-[0.95rem]' onClick={removePost}>Yes, delete it</button>
                </div>
                <span className='text-xs text-neutral-400 font-light mt-2'>There's no recovery!</span>
            </div>
        </motion.div>
        <motion.div {...animeOptsBg} className='fixed top-0 left-0 bg-black/20 w-screen h-screen z-40 flex items-center justify-center' onClick={()=>setShowConf(false)}>
        </motion.div></>
        }
        </AnimatePresence>
    </div>)
};

export default Menu;
