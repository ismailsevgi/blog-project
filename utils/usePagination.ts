import useSWRInfinite from 'swr/infinite';
import { Ipost, IpostResponse } from '../Interfaces/FeatureTypes';
import { getKey } from './customFuns';

export default function usePagination() {
  const { data, error, isLoading, isValidating, mutate, size, setSize } =
    useSWRInfinite(getKey) as IpostResponse;
  console.log('usePeg Worked!');

  const flattedData: Ipost[] = data?.flat();
  const isReachedEnd = data && data[data.length - 1]?.length < 4;
  return {
    isReachedEnd,
    flattedData,
    data,
    error,
    isLoading,
    isValidating,
    mutate,
    size,
    setSize,
  };
}
