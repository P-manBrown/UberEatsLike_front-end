import React from 'react'
import { useParams } from 'react-router-dom'

export const Foods = () => {
  const { id } = useParams()
  return (
    <>
      <div>フード一覧</div>
      <p>restaurantsIdは{id}です。</p>
    </>
  )
}
