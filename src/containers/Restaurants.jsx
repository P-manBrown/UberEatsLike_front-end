import React, { useEffect, useReducer } from "react";
// styled-componentsを利用可能にする
import styled from "styled-components";
import { Link } from "react-router-dom";
// components
// Skeltonはロード状態を表すパーツ
import { Skeleton } from '@mui/material';
// apis
import { fetchRestaurants } from "../apis/restaurants";
// reducer
import { initialState, restaurantsActionTypes, restaurantsReducer } from "../reducers/restaurants";
// constants
import { REQUEST_STATE } from "../constants";
// images
import MainLogo from "../images/logo.png";
import MainCoverImage from "../images/main-cover-image.png";
import RestaurantImage from "../images/restaurant-image.jpg";


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
`;

const RestaurantsContentsList = styled.div`
  /* 横並びにする */
  display: flex;
  /* 等しく間隔をあける */
  justify-content: space-around;
  margin-bottom: 150px;
`;

const RestaurantsContentWrapper = styled.div`
  width: 300px;
  height: 300px;
  padding: 48px;
`;

const RestaurantsImageNode = styled.img`
  width: 100%;
`;
const MainText = styled.p`
  color: black;
  font-size: 18px;
`;

const SubText = styled.p`
  color: black;
  font-size: 12px;
`;


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
      <RestaurantsContentsList>
      {/* JSの変数を参照するため{}で括る */}
      {/* 三項演算子で表示を分ける */}
        {
          state.fetchState === REQUEST_STATE.LOADING ?
            <>
            {/* 四角形＝rect */}
              <Skeleton variant="rect" width={300} height={250} />
              <Skeleton variant="rect" width={300} height={250} />
              <Skeleton variant="rect" width={300} height={250} />
            </>
          :
          state.restaurantsList.map((item, index) =>
            <Link to={`/restaurants/${item.id}/foods`} key={index} style={{ textDecoration: 'none' }}>
              <RestaurantsContentWrapper>
                <RestaurantsImageNode src={RestaurantImage} />
                <MainText>{item.name}</MainText>
                <SubText>{`配送料：${item.fee}円 ${item.time_required}分`}</SubText>
              </RestaurantsContentWrapper>
            </Link>
          )
        }
      </RestaurantsContentsList>
    </>
  )
}

