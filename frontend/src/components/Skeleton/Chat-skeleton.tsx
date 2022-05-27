import React from 'react';
import Skeleton from 'react-loading-skeleton'
import {AnimateSharedLayout, motion} from "framer-motion";
import ChatMessages from "../Chat/ChatMessages";

const ChatSkeleton: React.FC = () => {

    const animeOpts = {
        initial: { y: -20 , opacity: 0},
        animate: { y: 0, opacity: 1},
        exit: {y: 30, opacity: 0},
        transition:{ type: 'spring',  duration: 0.4}
    };

    return (<motion.div className='grid grid-cols-chat grid-rows-chat flex-1 max-h-full brightness-[96%]' {...animeOpts}>
        <div className='flex flex-col h-full max-h-full row-span-2 gap-1.5 items-center pt-1'>
            <Skeleton width={'3.5rem'} height={'3.5rem'} circle={true}/>
            <Skeleton width={'3.5rem'} height={'3.5rem'} circle={true}/>
            <Skeleton width={'3.5rem'} height={'3.5rem'} circle={true}/>
            <Skeleton width={'3.5rem'} height={'3.5rem'} circle={true}/>
        </div>
            <div className='w-full relative overflow-hidden'>
                <div className='w-full max-h-full grid auto-rows-max absolute bottom-0 overflow-y-scroll gap-0.5'>
                    <Skeleton containerClassName={'justify-self-start ml-0.5'} width={'8rem'} height={'5rem'}/>
                    <Skeleton containerClassName={'justify-self-start ml-0.5'} width={'8rem'} height={'2rem'}/>
                    <Skeleton containerClassName={'justify-self-end mr-0.5'} width={'8rem'} height={'4rem'}/>
                    <Skeleton containerClassName={'justify-self-start ml-0.5'} width={'8rem'} height={'2rem'}/>
                    <Skeleton containerClassName={'justify-self-end mr-0.5'} width={'8rem'} height={'2rem'}/>
                    <Skeleton containerClassName={'justify-self-end mr-0.5'} width={'8rem'} height={'3.5rem'}/>
                </div>
            </div>
        <div className='flex w-full h-full row-start-2 col-start-2 items-center justify-center'>
            <Skeleton containerClassName={'mr-1 my-2.5'} width={'20rem'} height={'2.5rem'}/>
        </div>
    </motion.div>)
};

export default ChatSkeleton;
