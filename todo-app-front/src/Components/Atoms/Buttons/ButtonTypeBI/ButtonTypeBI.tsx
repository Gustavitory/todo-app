import React,{CSSProperties} from 'react'
import styles from '../../../styles/components/atoms/ButtomTypeBInverted.module.css'

interface ButtomTypeBProps{
    action:null|((e:React.FormEvent)=>void)|(()=>void)
    text:string;
    color:string;
}

interface bgColor extends CSSProperties{
    '--bg':string
}

export const ButtonTypeBInverted = ({action,text,color}:ButtomTypeBProps) => {
    return (
        <button type='submit' className="buttonTypeBInverted" 
        style={{'--bg':color} as bgColor} onClick={(e:React.FormEvent)=>action?action(e):null}>{text}</button>
    )
}