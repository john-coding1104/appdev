import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import configureStore from './src/redux/store';
import rootSaga from './src/app/sagas';
import AppNav from './src/navigations';

// Initialise store and kick off the root saga — matches the reference pattern
const { store, persistor, runSaga } = configureStore();
runSaga(rootSaga);

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        {/* PersistGate waits for AsyncStorage rehydration before rendering */}
        <PersistGate
          loading={<View style={{ flex: 1 }}><ActivityIndicator size="large" color="#7C3AED" style={{ flex: 1 }} /></View>}
          persistor={persistor}>
          <AppNav />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
