import React, { useEffect, useReducer } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// components
import { OrderDetailItem } from '../components/OrderDetailItem';
import { OrderButton } from '../components/Buttons/OrderButton';
import { CircularProgress } from '@mui/material';
// apis
import { fetchLineFoods } from '../apis/line_foods'
import { postOrder } from '../apis/orders';
// reducers
import { initialState, lineFoodsActionTypes, lineFoodsReducer } from '../reducers/lineFood';
// images
import MainLogo from '../images/logo.png';
// constants
import { REQUEST_STATE } from '../constants';


const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 8px 32px;
`;

const MainLogoImage = styled.img`
  height: 90px;
`;

const OrderListWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const OrderItemWrapper = styled.div`
  margin-bottom: 10px;
`;


export const Orders = () => {
  const [state, dispatch] = useReducer(lineFoodsReducer, initialState);

  const postLineFoods = () => {
    dispatch({ type: lineFoodsActionTypes.POSTING });
    postOrder({
      // state.lineFoodsSummaryには仮注文データが入っている
      line_food_ids: state.lineFoodsSummary.line_food_ids,
    }).then(() => {
      dispatch({ type: lineFoodsActionTypes.POST_SUCCESS });
      // 画面をリロード
      window.location.reload();
    });
  };

  // 注文ボタン
  // 状態によってボタンに表示される文字を変更

  const orderButtonLabel = () => {
    switch (state.postState) {
      case REQUEST_STATE.LOADING:
        return "注文中...";
      case REQUEST_STATE.OK:
        return "注文が完了しました！！";
      default:
        return "注文を確定する";
    }
  };


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
    <>
      <HeaderWrapper>
        <Link to="restaurants">
          <MainLogoImage src={MainLogo} alt="main logo" />
        </Link>
      </HeaderWrapper>
      <OrderListWrapper>
        <div>
          <OrderItemWrapper>
            {
              /* ローディング中はローディングコンポーネントを表示 */
              state.fetchState === REQUEST_STATE.LOADING ?
                <CircularProgress />
              :
              state.lineFoodsSummary &&
                <OrderDetailItem
                  restaurantFee={state.lineFoodsSummary.restaurant.fee}
                  restaurantName={state.lineFoodsSummary.restaurant.name}
                  restaurantId={state.lineFoodsSummary.restaurant.id}
                  timeRequired={state.lineFoodsSummary.restaurant.time_required}
                  foodCount={state.lineFoodsSummary.count}
                  price={state.lineFoodsSummary.amount}
                />
            }
          </OrderItemWrapper>
          <div>
            {
              state.fetchState === REQUEST_STATE.OK && state.lineFoodsSummary &&
                <OrderButton
                  onClick={() => postLineFoods()}
                  // APIを呼んでいる最中や成功した場合にはボタンをdisabledにする
                  disabled={state.postState === REQUEST_STATE.LOADING || state.postState === REQUEST_STATE.OK}
                >
                  {orderButtonLabel()}
                </OrderButton>
            }
            {
              /* postが成功して仮注文のデータがなくなったら文言を表示させる */
              state.fetchState === REQUEST_STATE.OK && !(state.lineFoodsSummary) &&
                <p>
                  注文予定の商品はありません。
                </p>
            }
          </div>
        </div>
      </OrderListWrapper>
    </>
  )
}

