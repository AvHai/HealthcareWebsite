import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './redux/user/user.slice'

import {
  persistStore,
  persistReducer,
  
} from 'redux-persist'

import sessionStorage from 'redux-persist/lib/storage/session'

const rootReducer = combineReducers({
  user: userReducer,
})

const persistConfig = {
  key: 'root',
  storage:sessionStorage,
  whitelist: ['user'], // only persist 'user' slice
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)



// import { configureStore, combineReducers } from '@reduxjs/toolkit'
// import userReducer from './redux/user/user.slice'

// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist'

// import storage from 'redux-persist/lib/storage' // defaults to localStorage

// const rootReducer = combineReducers({
//   user: userReducer,
// })

// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['user'], // only persist 'user' slice
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer)

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// })

// export const persistor = persistStore(store)