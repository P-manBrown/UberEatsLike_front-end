import React from 'react'
import { useParams } from 'react-router-dom'

export const Foods = () => {
  // useParamsでパラメーターを受け取ることができる
  const { restaurantsId } = useParams()
  return (
    <>
      <div>フード一覧</div>
      <p>restaurantsIdは{restaurantsId}です。</p>
    </>
  )
}
