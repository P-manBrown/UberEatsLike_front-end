// export const REQUEST_STATE = {
//   INITIAL: 'INITIAL',
//   LOADING: 'LOADING',
//   OK: 'OK',
// }
import { REQUEST_STATE } from "../constants";

// 初期stateを定義（useReducerに渡す）
export const initialState = {
  // GET APIの状態を表す
  fetchState: REQUEST_STATE.INITIAL,
  // APIから取得したデータを配列で受け取る
  restaurantsList: [],
};


export const restaurantsActionTypes = {
  FETCHING: "FETCHING",
  FETCH_SUCCESS: "FETCH_SUCCESS",
};

// state,actionを引数に取る。
// stateには初期値はinitialStateが入り、それ以外は加工されたstateが入る
// actionにはreducerを使用する側が指定したrestaurantsActionTypeのいずれかが入る
export const restaurantsReducer = (state, action) => {
  switch (action.type) {
    // action.typeがrestaurantsActionTypes.FETCHINGであれば
    case restaurantsActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    // action.typeがrestaurantsActionTypes.FETCH_SUCCESSであれば
    case restaurantsActionTypes.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        restaurantsList: action.payload.restaurants,
      };
    default:
      throw new Error();
  }
}