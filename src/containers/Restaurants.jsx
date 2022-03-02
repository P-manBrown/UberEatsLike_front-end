import React, { useEffect, useReducer } from "react";
// styled-componentsを利用可能にする
import styled from "styled-components";
// apis
import { fetchRestaurants } from "../apis/restaurants";
// reducer
import { initialState, restaurantsActionTypes, restaurantsReducer } from "../reducers/restaurants";
// images
import MainLogo from "../images/logo.png";
import MainCoverImage from "../images/main-cover-image.png";


// divに対するスタイル
const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 8px 32px;
`

const MainLogoImage = styled.img`
  height: 90px;
`

const MainCoverImageWrapper = styled.div`
  text-align: center;
`

// imgに対してスタイルを適用
const MainCover = styled.img`
  height: 600px;
`


export const Restaurants = () => {
  // stateのデータとdispatch関数を扱うことができる。stateとdispatchの名称は変更可能
  // 第一引数にrestaurantReducer（処理）、第二引数にinitialState（stateの初期値）を渡す
  const [state, dispatch] = useReducer(restaurantsReducer, initialState);

  useEffect(() => {
    // dispatchはstateとは依存しない関数。reducerを通じて間接的にstateを変更する。
    dispatch({ type: restaurantsActionTypes.FETCHING });
    fetchRestaurants()
    .then((data) =>
      dispatch({
        type: restaurantsActionTypes.FETCH_SUCCESS,
        // payloadとは通信に含まれるデータのことをペイロードデータと呼ぶことから命名されている。dataでも可。
        payload: {
          restaurants: data.restaurants
        }
      })
    )
  }, [])

  return (
    <>
      <HeaderWrapper>
        {/* MainLogoImageの実態はimgタグなのでその後にsrcやaltを記述する */}
        <MainLogoImage src={MainLogo} alt="main logo" />
      </HeaderWrapper>
      <MainCoverImageWrapper>
        <MainCover src={MainCoverImage} alt="main cover" />
      </MainCoverImageWrapper>
      {
        state.restaurantsList.map(restaurant =>
        <div key={restaurant.id}>
          {restaurant.name}
        </div>
        )
      }
    </>
  )
}

