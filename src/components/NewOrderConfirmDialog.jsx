import React from "react";

// components
import { DialogContent, Dialog, DialogTitle } from "@mui/material";
import { OrderButton } from "./Buttons/OrderButton";

export const NewOrderConfirmDialog = ({
  isOpen,
  onClose,
  // 他店の名称
  existingRestaurantName,
  // 現在選択している店の名前
  newRestaurantName,
  // 仮注文を置き換えるAPIを呼ぶ
  onClickSubmit,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="xs"
    >
      <DialogTitle>
        新規注文を開始しますか？
      </DialogTitle>
      <DialogContent>
        <p>
          {
            `ご注文に${existingRestaurantName}の商品が含まれています。
            新規の注文を開始して${newRestaurantName}の商品を追加してください。`
          }
        </p>
        <OrderButton onClick={onClickSubmit}>
          新規注文
        </OrderButton>
      </DialogContent>
    </Dialog>
  )
}