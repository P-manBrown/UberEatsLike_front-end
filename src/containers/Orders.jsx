import React, { useEffect, useReducer } from 'react'
import { fetchLineFoods } from '../apis/line_foods'
import { initialState, lineFoodsActionTypes, lineFoodsReducer } from '../reducers/lineFood';


export const Orders = () => {
  const [state, dispatch] = useReducer(lineFoodsReducer, initialState);

  useEffect(() => {
    dispatch({ type: lineFoodsActionTypes.FETCHING })
    fetchLineFoods()
      .then((data) =>
        dispatch({
          type: lineFoodsActionTypes.FETCH_SUCCESS,
          payload: {
            lineFoodsSummary: data
          }
        })
      )
      // line_foods.jsのfetchLineFoodsでthrowしたエラーをcatch
      .catch((e) => {
        console.error(e)
      });
  }, []);


  return (
    <div>注文画面</div>
  )
}

