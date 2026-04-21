import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { persistReducer, persistStore, Persistor } from 'redux-persist';
import createSagaMiddleware, { SagaMiddleware, Task } from 'redux-saga';
import AsyncStorage from '@react-native-async-storage/async-storage';

import authReducer from './authSlice';
import bookingReducer from './bookingSlice';

interface ConfigureStoreResult {
  store: Store<unknown>;
  persistor: Persistor;
  runSaga: (saga: () => Generator<unknown, void, unknown>) => Task;
}

const sagaMiddleware: SagaMiddleware = createSagaMiddleware();

// Root persist config — auth is handled by its own nested config below
const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['auth'],
};

// Auth gets its own persist config so the token-based rehydration is separate
const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  blacklist: [],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  booking: bookingReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

// Factory function — matches the reference repo pattern:
// call configureStore() in App.js, then runSaga(rootSaga)
export default (): ConfigureStoreResult => {
  const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
  const persistor = persistStore(store);
  const runSaga = sagaMiddleware.run;
  return { store, persistor, runSaga };
};
