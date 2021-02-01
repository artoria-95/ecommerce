import { combineReducers } from "redux";
import productReducer from "./reducers/productReducer";
import categoryReducer from "./reducers/categoryReducer";
import cartReducer from "./reducers/cartReducer";
import orders_reducer from "./reducers/orderReducer";
import userReducer from "./reducers/userReducer";
import reviewReducer from "./reducers/reviewReducer";

// Scaffolding
// store = {
//   product: {
//     products: [],
//     filteredProducts: [],
//     productDetail: {},
//   },
//   category: {
//     categories: []
//   }
// }

const rootReducer = combineReducers({
  product: productReducer,
  category: categoryReducer,
  cart: cartReducer,
  order: orders_reducer,
  user: userReducer,
  reviews: reviewReducer
});

export default rootReducer;
