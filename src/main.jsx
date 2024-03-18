import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import App from './app';
import { store, persistor } from './store';
import client from './components/apollo/ApolloClient';
import MessageSubscription from './components/apollo/MessageSubscription';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ApolloProvider client={client}>
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MessageSubscription>
          <HelmetProvider>
            <BrowserRouter>
              <Suspense>
                <App />
              </Suspense>
            </BrowserRouter>
          </HelmetProvider>
        </MessageSubscription>
      </PersistGate>
    </ReduxProvider>
  </ApolloProvider>
);
