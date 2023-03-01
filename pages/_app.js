import '../styles/globals.css';
import { NextUIProvider } from '@nextui-org/react';
import MyLayout from '../components/MyLayout';

function MyApp({ Component, pageProps }) {
  return (
    // 2. Use at the root of your app
    <NextUIProvider>
      <MyLayout>
      <Component {...pageProps} />
      </MyLayout>
    </NextUIProvider>
  );
}

export default MyApp;

