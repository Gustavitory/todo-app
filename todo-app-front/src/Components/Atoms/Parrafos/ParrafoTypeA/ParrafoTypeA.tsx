import React from 'react'
interface parrafoTypeAProps{
    title:string,
    content:string
}

export const ParrafoTipeA = ({title,content}:parrafoTypeAProps) => {
  return (
    <>
        <h3>{title}</h3>
        <p>{content}</p>
    </>
  )
}
