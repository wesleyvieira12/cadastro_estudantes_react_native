import { createStore } from 'redux';
import {AsyncStorage} from 'react-native';
import { persistStore, persistReducer} from 'redux-persist';

import students from './reducers/students'; 

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, students);

const store = createStore(persistedReducer);
const persistor = persistStore(store);
export {store, persistor};