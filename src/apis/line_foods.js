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

export const fetchLineFoods = () => {
  return axios.get(lineFoods)
  // throw hoge;で例外を生成する。あえてエラーを定義して処理を停止させるために使用する。
  // var hoge = 1;
  // throw hoge;
  // console.log(hoge);
  // × VM112:2 Uncaught 1（console.log(hoge);は実行されない）
  // throw new Error("エラーメッセージを引数に渡すことができる")
  // 単なる文字列ではなく、APIから返ってきたErrorオブジェクトの中身に入れることができる。
  // 単にエラー文を表示させるだけであればconsole.error("エラー"))でも可能。
  // そのため、throwはtry...catch...やthen...catch...の中で使用することに意味がある。
  // try {
  //   console.log("正常な処理開始...")
  //   throw new Error("なにかエラーが起きました！");  // ここで例外発生させると
  //   console.log("処理が完了しました");              // ここは表示されない
  // } catch(e) {                                      // eという変数名でErrorオブジェクトを捕まえ
  //   console.log("エラーの内容は...");
  //   console.error(e);                               // ここで出力される
  // }
  // throwでエラーを投げ、catchで捕まえる（catchに入る）。
  .then(res => {
    return res.data
  })
  // 例外が発生した際にはcatchを実行する。
  // catchの中身はエラーをthrowする。
  // throwすることで他の箇所でエラー文を取得することができる。
  .catch((e) => { throw e; })
};


