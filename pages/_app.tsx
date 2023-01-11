import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        fetcher: (resource, init) => {
          console.log(`init`, init);

          return fetch(`http://localhost:3000/${resource}`, init).then((res) =>
            res.json()
          );
        },
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}
