import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
// reducers
import { initialState as foodsInitialState, foodsActionTypes, foodsReducer } from '../reducers/foods';
// apis
import { fetchFoods } from '../apis/foods';
// constants
import { REQUEST_STATE } from '../constants';



export const Foods = () => {
  // useParamsでパラメーターを受け取ることができる
  const { restaurantsId } = useParams()

  const [ foodsState, dispatch] = useReducer( foodsReducer, foodsInitialState);

  useEffect(() => {
    dispatch({ type: foodsActionTypes.FETCHING });
    fetchFoods(restaurantsId)
      .then((data) => {
        dispatch({
          type: foodsActionTypes.FETCH_SUCCESS,
          payload: {
            foods: data.foods
          }
        });
      })
  }, [])

  return (
    <>
      {
        foodsState.fetchState === REQUEST_STATE.LOADING ?
          <>
            <p>ロード中...</p>
          </>
        :
          foodsState.foodsList.map(food =>
            <div key={food.id}>
              {food.name}
            </div>
          )
      }
    </>
  )
}
