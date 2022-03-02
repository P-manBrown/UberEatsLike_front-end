import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
// apis
import { fetchFoods } from '../apis/foods'


export const Foods = () => {
  // useParamsでパラメーターを受け取ることができる
  const { restaurantsId } = useParams()

  useEffect(() => {
    fetchFoods(restaurantsId)
    .then((data) =>
      console.log(data)
    )
  }, [])

  return (
    <>
      <div>フード一覧</div>
      <p>restaurantsIdは{restaurantsId}です。</p>
    </>
  )
}
