import React from 'react'
import {Link} from 'react-router-dom'

interface props {
  data: UserType,
  children?: JSX.Element
}

const Fcard: React.FC<props> = ({data, children}) => {

  return (<div  className='grid grid-cols-invite bg-white/80 w-[15rem] py-1 pl-2.5 shadow-sm rounded-md'>
    <Link to={`/user/${data._id}`}><img alt='avatar' src={data.picUrl} className='w-12 h-12 rounded-full'/></Link>
    <div className='flex flex-col items-start justify-center'>
      <span>{data.username}</span>
      {children}
    </div>
  </div>)
};

export default Fcard;
