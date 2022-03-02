import axios from "axios";

// export const foodsIndex = (restaurantId) =>
//   `${DEFAULT_API_LOCALHOST}/restaurants/${restaurantId}/foods`
import { foodsIndex } from "../urls";


export const fetchFoods = (restaurantId) => {
  return axios.get(foodsIndex(restaurantId))
  .then(res => {
    return res.data
  })
  .catch((e) => console.error(e))
}


