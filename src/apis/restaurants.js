import axios from 'axios';
import { restaurantsIndex } from '../urls/index'

export const fetchRestaurants =() => {
  // ../urls/indexのrestaurantsIndexに記述したURLに対してリクエスト
  return axios.get(restaurantsIndex)
  // リクエストが成功した場合には.then以降
  // 返り値をresという名前で取得し、res.dataでレスポンスの中身をreturn
  .then(res => {
    return res.data
  })
  // リクエストが失敗した場合には.catch以降
  // .catch以降でバリデーションエラーメッセージを返すことでフロントエンドで画面に表示することができる
  .catch((e) => console.error(e))
}

