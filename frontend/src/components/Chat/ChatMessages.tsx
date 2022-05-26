import React, { useState, useContext} from 'react';
import {userContext} from "../../userContext";

interface props {
    chat: Chat
}

const ChatMessages: React.FC<props> = ({chat}) => {
    const {user} = useContext(userContext) as UserContext;

    return (
        <div className='w-full max-h-full grid auto-rows-max absolute bottom-0 overflow-y-scroll gap-0.5'>
        {chat.messages.map(e=> <p key={e._id}
      className={`${e.from === user?._id ? 'justify-self-end pr-3 pl-3.5 bg-blue-500 mr-0.5' : 'justify-self-start pl-3 pr-3.5 bg-[#3f4041] ml-0.5'} text-white max-w-[10rem] break-words shadow-sm rounded-md py-0.5`}>{e.content}</p>)}
    </div>);
};

export default ChatMessages;
