/// <reference types="react-scripts" />
interface UserType {
    _id: string,
    username: string,
    facebook_id: string,
    picUrl: string,
    friends: [],
    friendReqSend: [],
    friendReqReceived: [],
    liked: []
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

declare module "*.svg" {
    import React = require("react");
    const src: React.FC<React.SVGProps<SVGSVGElement>>;
    export default src;
}
