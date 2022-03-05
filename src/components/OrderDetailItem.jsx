import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// components
import { LocalMallIcon, QueryBuilderIcon } from './Icons';

// constants
import { FONT_SIZE } from '../containers/style_constants.js';

const LineWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AmountText = styled.p`
  font-size: ${FONT_SIZE.STAND_BODY};
  font-weight: bold;
`;


// 関数コンポーネントで関数等がなく、JSXを返すだけであればreturnは記述しないほうが良い。
// returnを記述しない場合には{}ではなく、()であることに注意
export const OrderDetailItem = ({
  restaurantId,
  restaurantName,
  restaurantFee,
  timeRequired,
  foodCount,
  price,
}) => (
    <>
      <LineWrapper>
        <LocalMallIcon />
        <Link to={`/restaurants/${restaurantId}/foods`} >
          {restaurantName}
        </Link>
      </LineWrapper>
      <LineWrapper>
        <QueryBuilderIcon />
        {timeRequired}分で到着予定
      </LineWrapper>
      <LineWrapper>
        <p>
          商品数
        </p>
        <p>
          {foodCount}
        </p>
      </LineWrapper>
      <LineWrapper>
        <p>
          商品数：{foodCount}
        </p>
        <p>
          {price}円
        </p>
      </LineWrapper>
      <LineWrapper>
        <AmountText>
          合計
        </AmountText>
        <AmountText>
          {price + restaurantFee}
        </AmountText>
      </LineWrapper>
    </>
)
