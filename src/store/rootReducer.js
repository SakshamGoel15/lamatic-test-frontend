import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices

import llmsReducer from './slices/llms';
import userReducer from './slices/user';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const rootReducer = combineReducers({
  user: userReducer,
  llms: llmsReducer,
});

export { rootReducer, rootPersistConfig };
