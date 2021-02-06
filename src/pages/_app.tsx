import { AppProps } from 'next/app';

import '@/library/styles/css/global.css';

/**
 * My APP
 * @param {AppProps} props - apps props
 * @returns {ReactNode}
 */
const MyApp = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default MyApp;
