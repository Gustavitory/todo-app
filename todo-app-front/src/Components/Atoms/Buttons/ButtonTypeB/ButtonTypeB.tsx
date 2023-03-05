import React,{CSSProperties} from 'react';
import './ButtonTypeB.css';
import { IconType } from 'react-icons';

interface ButtonTypeBProps{
    action:null|((e:React.FormEvent)=>void)
    text:string;
    color:string;
    Icon?:IconType
}

interface bgColor extends CSSProperties{
    '--bg':string
}

export const ButtonTypeB = ({action,text,color,Icon}:ButtonTypeBProps) => {
    return (
        <button type='submit' className="buttonTypeB" style={{'--bg':`var(${color})`} as bgColor} onClick={(e:React.FormEvent)=>action?action(e):null}>
            {Icon?<Icon className='icon' />:null}
            {text}
        </button>
    )
}