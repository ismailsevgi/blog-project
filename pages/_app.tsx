import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { fetchingDatas } from '../utils/customFuns';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        fetcher: (resource) => fetchingDatas(resource),
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}
