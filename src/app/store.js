import { configureStore } from '@reduxjs/toolkit' 
import { newsAPI } from '../servies/newsAPI';
import { StocksAPI } from '../servies/StockAPI';
import { FinanceAPI } from '../servies/FinanceAPI';
export default configureStore({
  reducer: {
   [newsAPI.reducerPath]:newsAPI.reducer,
   [StocksAPI.reducerPath]:StocksAPI.reducer,
   [FinanceAPI.reducerPath]:FinanceAPI.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat( newsAPI.middleware ,StocksAPI.middleware,FinanceAPI.middleware),
 
 
})
  