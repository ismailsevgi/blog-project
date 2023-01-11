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
  const skipData = getSkipValue(pageIndex);
  return `api/getBlogs?page=${pageIndex}&limit=10&skip=${skipData}`; // SWR key
};
