import React, { useEffect, useReducer, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
// components
import { LocalMallIcon } from '../components/Icons';
import { FoodWrapper } from '../components/FoodWrapper';
import { Skeleton } from '@mui/material';
import { FoodOrderDialog } from '../components/FoodOrderDialog';
import { NewOrderConfirmDialog } from '../components/NewOrderConfirmDialog';
import { postLineFoods, replaceLineFoods } from '../apis/line_foods';
import { HTTP_STATUS_CODE } from '../constants';

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

  const navigate = useNavigate()

  const initialState = {
    // MUIではモーダル = Dialogとなっている
    isOpenOrderDialog: false,
    // クリックされたFoodは何か
    selectedFood: null,
    // selectedFoodの数
    selectedFoodCount: 1,
    //  modalの開閉
    isOpenNewOrderDialog: false,
    // 既存レストランの名称（初期値は空文字）
    existingRestaurantName: " ",
    // 新しく注文を作成するレストラン名（初期値は空文字）
    newRestaurantName: " ",
  }

  const [state, setState] = useState(initialState);

  const submitOrder = () => {
    postLineFoods({
      // selectedFoodはFoodItemをクリックした際にセットされる
      foodId: state.selectedFood.id,
      // selectedFoodCountはmodalでcountを変更した際にセットされている
      count: state.selectedFoodCount,
      // 成功した場合には注文ページに遷移
    }).then(() => navigate("/orders"))
      // 失敗した場合にはe.response.statusを参照し、HTTP_STATUS_CODE.NOT_ACCEPTABLEか否か判定する
      .catch((e) => {
        if (e.response.status === HTTP_STATUS_CODE.NOT_ACCEPTABLE) {
          // trueであればNewOrderConfirmDialogを表示させるためにstateを更新
          setState({
            ...state,
            isOpenOrderDialog: false,
            isOpenNewOrderDialog: true,
            // 以下２つはNewOrderConfirmDialogに渡すために保持
            existingRestaurantName: e.response.data.existing_restaurant,
            newRestaurantName: e.response.data.new_restaurant,
          })
        } else {
          throw e;
        }
      })
  }

  const replaceOrder = () => {
    replaceLineFoods({
      foodId: state.selectedFood.id,
      count: state.selectedFoodCount,
    }).then(() => navigate("/orders"))
    .catch((e) => {console.log(e)})
  }

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
                  onClickFoodWrapper={
                    (food) => setState({
                      ...state,
                      isOpenOrderDialog: true,
                      selectedFood: food,
                    })
                  }
                  imageUrl={FoodImage}
                />
              </ItemWrapper>
            )
        }
      </FoodsList>
      {
        /* state.isOpenOrderDialogがtrueの場合に&&以降を返す */
        state.isOpenOrderDialog &&
          <FoodOrderDialog
            food={state.selectedFood}
            isOpen={state.isOpenOrderDialog}
            // モーダルが閉じる際に全てのstateを初期化
            countNumber={state.selectedFoodCount}
            onClose={() => setState({
              ...state,
              isOpenOrderDialog: false,
              selectedFood: null,
              selectedFoodCount: 1,
            })}
            onClickCountUp={() => setState({
              ...state,
              selectedFoodCount: state.selectedFoodCount + 1,
            })}
            onClickCountDown={() => setState({
              ...state,
              selectedFoodCount: state.selectedFoodCount - 1,
            })}
            onClickOrder={() => submitOrder()}
          />
      }
      {
        /* isOpenNewOrderDialogがtrueの場合にNewOrderConfirmationをレンダリング */
        state.isOpenNewOrderDialog &&
        <NewOrderConfirmDialog
          isOpen={state.isOpenNewOrderDialog}
          onClose={() => setState({ ...state, isOpenNewOrderDialog: false })}
          existingRestaurantName={state.existingRestaurantName}
          newRestaurantName={state.newRestaurantName}
          onClickSubmit={() => replaceOrder()}
        />
      }
    </>
  )
}
