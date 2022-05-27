import React, { useState, useEffect } from 'react'
import { ReactComponent as Home } from '../../svg/home.svg'
import { ReactComponent as People } from '../../svg/people.svg'
import { ReactComponent as Chat } from '../../svg/chat.svg'

import { ReactComponent as HomeOut } from '../../svg/homeOutline.svg'
import { ReactComponent as PeopleOut } from '../../svg/peopleOutline.svg'
import { ReactComponent as ChatOut } from '../../svg/chatOutline.svg'

import {Link, useLocation} from 'react-router-dom';

const PageSwitch: React.FC = () => {
  const [current, setCurrent] = useState<'home' | 'friends' | 'chat' | 'none'>('home');
  const loc = useLocation();
  const iconClass = 'w-7 h-7';

  useEffect(()=>{
    switch (loc.pathname){
      case '/':
        setCurrent('home')
        break;
      case '/friendsfeed':
        setCurrent('friends')
        break;
      case '/chat':
        setCurrent('chat')
        break;
      default:
        setCurrent('none');
        break;
    }
  },[loc.pathname]);

  return (<div className='justify-self-center flex gap-2'>
    {current === 'home' && <>
      <Link to={'/'}><Home className={iconClass + ' fill-neutral-900 '}/></Link>
      <Link to={'/friendsfeed'}><PeopleOut className={iconClass + ' fill-neutral-500'}/></Link>
      <Link to={'/chat'}><ChatOut className={iconClass + ' fill-neutral-500'}/></Link>
    </>}

    {current === 'friends' && <>
      <Link to={'/'}><HomeOut className={iconClass + ' fill-neutral-500'}/></Link>
      <Link to={'/friendsfeed'}><People className={iconClass + ' fill-neutral-800'}/></Link>
      <Link to={'/chat'}><ChatOut className={iconClass + ' fill-neutral-500'}/></Link>
    </>}

    {current === 'chat' && <>
      <Link to={'/'}><HomeOut className={iconClass + ' fill-neutral-500'}/></Link>
      <Link to={'/friendsfeed'}><People className={iconClass + ' fill-neutral-500'}/></Link>
      <Link to={'/chat'}><Chat className={iconClass + ' fill-neutral-800'}/></Link>
    </>}

    {current === 'none' && <>
      <Link to={'/'}><HomeOut className={iconClass + ' fill-neutral-500'}/></Link>
      <Link to={'/friendsfeed'}><PeopleOut className={iconClass + ' fill-neutral-500'}/></Link>
      <Link to={'/chat'}><ChatOut className={iconClass + ' fill-neutral-500'}/></Link>
    </>}
  </div>);
};

export default PageSwitch;
