import nextConfig from '../next.config';

function getSkipValue(value: number) {
  if (value === 1) {
    return 0;
  } else {
    return (value - 1) * 10;
  }
}

export const getKey = (pageIndex: number, previousPageData: object[]) => {
  if (previousPageData && !previousPageData.length) return null; // reached the end
  pageIndex = pageIndex + 1;

  //to get query from the shallow query
  let category = '';

  //to prevent Hydration error check if window exists
  if (typeof window !== 'undefined') {
    category = window.location.search.substring(1);
  }

  const skipData = getSkipValue(pageIndex);
  return `/api/getBlogs?page=${pageIndex}&limit=10&skip=${skipData}&${category}`; // SWR key
};

const isProd = process.env.NODE_ENV === 'production';
const baseOne = 'https://blog-project-ebon-two.vercel.app';
const assetPrefix = isProd ? baseOne : 'http://localhost:3000';

export const fetchingDatas = (resource: any) => {
  return fetch(`${assetPrefix}${resource}`)
    .then((res) => {
      // {
      //   credentials: 'include',
      //   mode: 'cors',
      // }
      console.log('Response geldi');

      return res.json();
    })
    .catch((error) => {
      console.log('(customFuns.ts/fetchingDatas) Fetching error:', error);
    });
};
