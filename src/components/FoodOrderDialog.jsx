import React from 'react'
import { DialogContent, Dialog, DialogTitle, DialogActions } from '@mui/material'
import styled from 'styled-components'

// components
import { SubText } from './StyledText'
// images
import OrderHeaderImage from '../images/order-header.png';

const OrderHeader = styled.img`
  width: 100%;
  height: 350px;
`

const DescriptionWrapper = styled.div`
  padding: 0 8px 8px 8px;
  height: 50px;
`


export const FoodOrderDialog = ({food, isOpen, onClose}) => {
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
        {/* 数量を操作するアクション */}
      </DialogActions>
    </Dialog>
  )
}
