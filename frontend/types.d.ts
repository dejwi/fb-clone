/// <reference types="react-scripts" />
interface UserType {
    _id: string,
    username: string,
    facebook_id: string,
    picUrl: string,
    friends: [],
    friendReqSend: [],
    friendReqReceived: [],
    liked: [],
    bgUrl?: string
}

interface PostType {
    _id: string,
    author: UserType | string,
    likes: number,
    content: string,
    picUrl?: string,
    date: any,
    comments: []
}

type UserContext = {
    user: UserType | undefined,
    setUser: (updt: any) => void
};

interface ChatMessage {
    from: string,
    content: string,
    _id: string
}

interface Chat {
    between: [id1: string, id2: string],
    messages: ChatMessage[],
    _id: string
}

declare module "*.svg" {
    import React = require("react");
    const src: React.FC<React.SVGProps<SVGSVGElement>>;
    export default src;
}
