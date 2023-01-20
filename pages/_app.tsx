import '../styles/globals.css';
import '../components/Blog/Slick.css';
export { reportWebVitals } from 'next-axiom';
import { SWRConfig } from 'swr';
import { fetchingDatas } from '../utils/customFuns';
import { SessionProvider } from 'next-auth/react';

interface AppProps {
  Component: React.ComponentType<any>;
  pageProps: {
    session: any;
  };
}

const App: React.FunctionComponent<AppProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <SWRConfig
        value={{
          revalidateOnFocus: false,
          fetcher: (resource) => fetchingDatas(resource),
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </SessionProvider>
  );
};

export default App;
