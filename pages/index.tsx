import Head from 'next/head';
import Featured from '../components/MainPage/featured/Featured';
import Navbar from '../components/navbar/Navbar';
import RecentBlogs from '../components/MainPage/RecentBlogs/RecentBlogs';

import Blogs from '../components/MainPage/blogs/Blogs';
import usePagination from '../utils/usePagination';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '../components/Loading/Loading';
import Spinner from '../components/spinner/Spinner';
import { useSession, signIn, signOut } from 'next-auth/react';

const Home: React.FC = () => {
  const { data: session } = useSession();
  console.log(session);

  const {
    isReachedEnd,
    flattedData,
    data,
    error,
    isLoading,
    isValidating,
    mutate,
    size,
    setSize,
  } = usePagination();

  return (
    <>
      <Head>
        <title>Akademik Örgücü</title>

        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='author' content='Şeyma Sevgi'></meta>
        <meta
          name='description'
          content='Merhaba ben şeyma sevgi, bloğumda gündelik, kültür ve hobilerimden bahsediyorum'
        ></meta>
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/images/favicon.png'
        />
      </Head>
      <main>
        {/* Navbar */}
        <Navbar />

        {isLoading && <Loading />}
        {/* Featured Posts */}
        {data && (
          <>
            <Featured lastBlog={flattedData[0]} />
            {/* Recent Blogs */}

            <RecentBlogs otherBlogs={flattedData.slice(1, 6)} />

            {/* About Me */}
            <InfiniteScroll
              next={() => setSize(size + 1)}
              hasMore={!isReachedEnd}
              loader={<Spinner />}
              endMessage={<p>Reached to the end</p>}
              dataLength={flattedData?.length}
            >
              <Blogs blogs={flattedData.slice(6)} />
            </InfiniteScroll>
          </>
        )}
      </main>
    </>
  );
};

export default Home;
