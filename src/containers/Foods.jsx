import React, { useEffect, useReducer } from 'react';
import { useParams, Link } from 'react-router-dom';
// components
import { LocalMallIcon } from '../components/Icons';
import { FoodWrapper } from '../components/FoodWrapper';
import { Skeleton } from '@mui/material';

// reducers
import { initialState as foodsInitialState, foodsActionTypes, foodsReducer } from '../reducers/foods';
// apis
import { fetchFoods } from '../apis/foods';
// constants
import { REQUEST_STATE } from '../constants';
// style
import styled from 'styled-components';
import { COLORS } from './style_constants'

// images
import MainLogo from '../images/logo.png';
import FoodImage from '../images/food-image.jpg';

// styling
const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 32px;
`;

const BagIconWrapper = styled.div`
  padding-top: 24px;
`

const ColoredBagIcon = styled(LocalMallIcon)`
  color: ${COLORS.MAIN};
`;

const MainLogoImage = styled.img`
  height: 90px;
`

const FoodsList = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 50px;
`

const ItemWrapper = styled.div`
  margin: 16px;
`

export const Foods = () => {
  // useParamsでパラメーターを受け取ることができる
  const { restaurantsId } = useParams()

  const [ foodsState, dispatch ] = useReducer( foodsReducer, foodsInitialState);

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
      <HeaderWrapper>
        <Link to="/restaurants">
          <MainLogoImage src={MainLogo} alt="main logo" />
        </Link>
        <BagIconWrapper>
          <Link to="/orders">
            <ColoredBagIcon fontSize='large' />
          </Link>
        </BagIconWrapper>
      </HeaderWrapper>
      <FoodsList>
        {
          foodsState.fetchState === REQUEST_STATE.LOADING ?
            <>
              {
                // 配列分スケルトンスクリーンを表示
                // iでユニークキーを与える
                [...Array(12).keys()].map(i =>
                  <ItemWrapper key={i}>
                    <Skeleton key={i} variant="rect" width={450} height={180} />
                  </ItemWrapper>
                )
              }
            </>
          :
            foodsState.foodsList.map(food =>
              <ItemWrapper key={food.id}>
              {/* FoodWrapperに渡すpropsを記述 */}
                <FoodWrapper
                  food={food}
                  onClickFoodWrapper={(food) => console.log(food)}
                  imageUrl={FoodImage}
                />
              </ItemWrapper>
            )
        }
      </FoodsList>
    </>
  )
}
