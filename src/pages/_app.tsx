import { AppComponent } from 'next/dist/next-server/lib/router/router';

import '@/styles/global.css';

/**
 * My APP
 * @param {AppProps} props - apps props
 * @returns {ReactNode}
 */
const App: AppComponent = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);

export default App;
