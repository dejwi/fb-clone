import React, {FormEvent, useContext, useEffect, useState, useMemo} from 'react';
import fetchApi from "../helpers/fetchApi";
import ChatMessages from '../components/Chat/ChatMessages';
import { io } from "socket.io-client";
import {userContext} from "../userContext";
import {motion, AnimateSharedLayout} from "framer-motion";

interface recivedMess {
    between: [],
    data: ChatMessage
}

const Chat: React.FC = () => {
    const {user} = useContext(userContext) as UserContext;
    const [friends, setFriends] = useState<UserType[]>();
    const [selected, setSelected] = useState<string>();
    const [chats, setChats] = useState<Chat[]>();
    const [socket, setSocket] = useState<any>();
    const [inputTxt, setInputTxt] = useState('');

    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingSocket, setIsLoadingSocket] = useState(true);

    useEffect(()=>{
        if(!user || !isLoading) return;
        (async () => {
            const res = await fetchApi('/auth/fdetail');
            const data = await res.json();

            const ress = await fetchApi('/auth/chats');
            const _chats = await ress.json() as Chat[];
            const _friends = data.friends as UserType[];

            const filled = _friends.map(e => {
                const index = _chats.findIndex(el => el.between.includes(e._id));
                if(index !== -1) return _chats[index];
                return {between: [user?._id , e._id], messages: []};
            })
            setFriends(_friends);
            setChats(filled as Chat[]);
            setSelected(_friends[0]._id);
            setIsLoading(false);
        })();
    },[user]);

    useEffect(()=>{
        const newSocket = io(`${process.env.REACT_APP_BACKEND}`, {
            extraHeaders: {
                Authorization: `Bearer ${window.localStorage.getItem('token')}`,
            },
        });
        setSocket(newSocket);
        return ()=>newSocket.close() as any;
    },[]);

    useEffect(()=>{
        if(!socket || !isLoadingSocket || !chats) return;
        socket.on('message', ({between, data}: recivedMess) => {
            if(!chats) return;
            const secondUsr = between.filter(e => e !== user?._id)[0];

            const index = chats.findIndex(el => el.between.includes(secondUsr));
            const newChats = [...chats];
            if(index !== -1)
                newChats[index].messages.push(data);
            setChats(newChats);
        });
        setIsLoadingSocket(false);
    },[socket, chats]);

    const sendMessage = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!inputTxt || !chats) return;
        const payload = {
            from: user?._id,
            to: selected,
            message: inputTxt
        };
        socket?.emit('message', payload);
        setInputTxt('');
    };


    return (<div className='grid grid-cols-chat grid-rows-chat flex-1 max-h-full'>
        <div className='flex flex-col h-full max-h-full row-span-2 gap-1.5 items-center pt-1'>
        {/*@ts-ignore*/}
        <AnimateSharedLayout >
        {!!friends &&
            friends.map((e) => (selected === e._id ?
                    <div className='relative rounded-full' key={e._id}>
                        <img alt='avatar' onClick={()=>setSelected(e._id)} src={e.picUrl} className={`w-14 h-14 rounded-full p-0.5 `} />
                        <motion.div layoutId='outline' initial={false} transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30
                        }} className='outline outline-2 outline-indigo-900 w-14 h-14 rounded-full absolute top-0'></motion.div>
                    </div>
            : <img alt='avatar' key={e._id+'img'} onClick={()=>setSelected(e._id)} src={e.picUrl} className={`w-14 h-14 rounded-full p-0.5 `} />
            ))
        }
        </AnimateSharedLayout>
        </div>

        {!!chats && !!selected &&
            <div className='w-full relative overflow-hidden'>
            <ChatMessages chat={chats.find(e => e.between.includes(selected)) as Chat}/>
            </div>
        }
        <form onSubmit={sendMessage} className='flex w-full h-full'>
            <input type='text' placeholder='Type your message...' value={inputTxt} onChange={e=>setInputTxt(e.target.value)} className='pl-3.5 mr-1 my-2.5 w-full rounded-md shadow-sm'/>
        </form>
    </div>)
};

export default Chat;
