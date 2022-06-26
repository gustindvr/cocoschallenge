import { Provider } from 'react-redux';

import { store } from '../src/store/store';

import { ChakraProvider } from '@chakra-ui/react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
