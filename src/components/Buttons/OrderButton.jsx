import styled from 'styled-components';
// components
import { BaseButton } from '../shared_style';

// constants
import { FONT_SIZE } from '../../containers/style_constants';

// styled-components
// propsの受け取りや関数が不要である場合にはstyled-componentsの設定だけでも良い
export const OrderButton = styled(BaseButton)`
  width: 390px;
  background-color: black;
  color: white;
  border-style: none;
  padding: 8px 16px;
  font-size: ${FONT_SIZE.BODY1};
`;