import { configureStore } from '@reduxjs/toolkit'
import monitorReducersEnhancer from './config/enhancers/monitorReducers.js'
import logger from "./config/middleware/logger.js";
import rootReducer from "./reducers.js";


export default function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    preloadedState,
    enhancers: [monitorReducersEnhancer]
  })


  return store
}