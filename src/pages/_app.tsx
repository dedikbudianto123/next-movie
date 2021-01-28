import App, { AppInitialProps, AppProps } from 'next/app';

import '@/utils/styles/css/global.css';
import { csrfToken } from '@/utils/modules/csrf';

/**
 * My APP
 * @param {AppProps} props - apps props
 * @returns {ReactNode}
 */
const MyApp = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} csrf={csrfToken} />
);

MyApp.getInitialProps = async (appContext): Promise<AppInitialProps> => {
  const appProps = await App.getInitialProps(appContext);

  return {
    ...appProps,
    pageProps: {
      ...appProps.pageProps,
      isLoggedIn: true
    }
  };
};

export default MyApp;
