import React,{CSSProperties} from 'react';
import './ButtonTypeB.css';

interface ButtonTypeBProps{
    action:null|((e:React.FormEvent)=>void)
    text:string;
    color:string;
}

interface bgColor extends CSSProperties{
    '--bg':string
}

export const ButtonTypeB = ({action,text,color}:ButtonTypeBProps) => {
    return (
        <button type='submit' className="ButtonTypeB" style={{'--bg':color} as bgColor} onClick={(e:React.FormEvent)=>action?action(e):null}>{text}</button>
    )
}