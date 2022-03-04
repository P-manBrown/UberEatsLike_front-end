import React from 'react'
import { DialogContent, Dialog, DialogTitle, DialogActions } from '@mui/material'
import styled from 'styled-components'

// components
import { SubText } from './StyledText'
import { CountUpButton } from './Buttons/CountUpButton'
import { CountDownButton } from './Buttons/CountDownButton'
import { OrderButton } from './Buttons/OrderButton'
// images
import OrderHeaderImage from '../images/order-header.png';

const OrderHeader = styled.img`
  width: 100%;
  height: 350px;
`;

const DescriptionWrapper = styled.div`
  padding: 0 8px 8px 8px;
  height: 50px;
`;

const CountersWrapper = styled.div`
  margin-right: auto;
  display: flex;
  padding: 0 16px;
`;

const CountItem = styled.div`
  margin: 0 8px;
`;

const countNum = styled.div`
  padding-top: 10px;
`;

const OrderTextWrapper = styled.div`
  display: flex;
`;

const OrderButtonTextWrapper = styled.div`
  width: 300px;
`;

const PriceWrapper = styled.div`
  padding-top: 4px;
`



export const FoodOrderDialog = ({
  food,
  isOpen,
  onClose,
  countNumber,
  onClickCountUp,
  onClickCountDown,
  onClickOrder,
}) => {
  return (
    // MUIのDialogはopenとonCloseをpropsとして受け取る必要がある
    // openはbooleanでモーダルの開閉。
    // onCloseは関数を受け取ってモーダルが閉じるタイミングで受け取った関数を実行する
    <Dialog
      open={isOpen}
      onClose={onClose}
    >
      <OrderHeader src={OrderHeaderImage} alt="order header" />
      {/* DialogTitle等でスタイリングを簡単にすることができる */}
      <DialogTitle>
        {food.name}
      </DialogTitle>
      <DialogContent>
        <DescriptionWrapper>
          <SubText>
            {food.description}
          </SubText>
        </DescriptionWrapper>
      </DialogContent>
      <DialogActions>
        <CountersWrapper>
          <CountItem>
            <CountDownButton
              onClick={() => onClickCountDown()}
              // 数量が1の場合にはカウントダウン不可にする
              isDisabled={countNumber <= 1}
            />
          </CountItem>
          <CountItem>
            <countNum>
              {countNumber}
            </countNum>
          </CountItem>
          <CountItem>
            <CountUpButton
              onClick={() => onClickCountUp()}
              // 数量が9の場合にはカウントアップ不可にする
              isDisabled={countNumber >= 9}
            />
          </CountItem>
        </CountersWrapper>
        <OrderButton onClick={() => onClickOrder()}>
          <OrderTextWrapper>
            <OrderButtonTextWrapper>
              {`${countNumber}点を注文に追加`}
            </OrderButtonTextWrapper>
            <PriceWrapper>
              {`${countNumber * food.price}円`}
            </PriceWrapper>
          </OrderTextWrapper>
        </OrderButton>
      </DialogActions>
    </Dialog>
  )
}
