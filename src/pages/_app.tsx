import App, { AppInitialProps, AppProps } from 'next/app';

import '@/core/styles/css/global.css';

/**
 * My APP
 * @param {AppProps} props - apps props
 * @returns {ReactNode}
 */
const MyApp = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
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
