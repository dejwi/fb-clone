import React, { useState, useContext} from 'react';
import {userContext} from "../../userContext";
import {motion} from "framer-motion";

interface props {
    chat: Chat
}

const ChatMessages: React.FC<props> = ({chat}) => {
    const {user} = useContext(userContext) as UserContext;

    const animeOpts = {
        initial:{ y: -20 , opacity: 0},
        animate:{ y: 0, opacity: 1},
        transition:{ type: 'tween', duration: 0.15, ease: 'easeInOut'},
        exit: {
            y: 30,
            opacity: 0,
        }
    };

    return (
        <motion.div {...animeOpts} className='w-full max-h-full grid auto-rows-max absolute bottom-0 overflow-y-scroll gap-0.5'>
        {chat.messages.map(e=> <motion.p key={e._id}
      className={`${e.from === user?._id ? 'justify-self-end pr-3 pl-3.5 bg-blue-500 mr-0.5' : 'justify-self-start pl-3 pr-3.5 bg-[#3f4041] ml-0.5'} text-white max-w-[10rem] break-words shadow-sm rounded-md py-0.5`}>{e.content}</motion.p>)}
    </motion.div>);
};

export default ChatMessages;
