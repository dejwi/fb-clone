/// <reference types="react-scripts" />
interface UserType {
    username: string,
    facebook_id: string,
    picUrl: string,
    friends: [],
    friendReqSend: [],
    friendReqReceived: [],
    liked: []
}

interface PostType {
    author: string | UserType,
    likes: number,
    content: string,
    picUrl?: string,
    date: any,
    comments: []
}
