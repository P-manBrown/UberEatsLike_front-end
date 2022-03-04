import axios from "axios";
import { lineFoods, lineFoodsReplace } from "../urls";

// paramsの中身は
// {
//  foodId: 1,
//  count: 1,
// }
// のような形のオブジェクトになっている
export const postLineFoods = (params) => {
  // postの場合には第一引数にURLを第二引数にparamsを渡す
  // サーバーサイドではprams[:food_id], params[:count]の形になる
  return axios.post(lineFoods,
    {
      food_id: params.foodId,
      count: params.count,
    }
  )
  .then(res => {
    return res.data
  })
  // not_acceptableが返ってきた際にエラーメッセージを表示する
  // eはAPIからのエラーレスポンスであり、オブジェクト。e.response.statusとすることでHTTPステータスコードを取得することができる。
  .catch((e) => { throw e; })
};

export const replaceLineFoods = (params) => {
  // 更新のためputを使用。postはデータの新規作成。patchは既存データの更新。putは両方。
  return axios.put(lineFoodsReplace,
    {
      food_id: params.foodId,
      count: params.count
    }
  )
  .then(res => {
    return res.data
  })
  .catch((e) => { throw e; })
};
