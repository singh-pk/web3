import { useCallback, useMemo } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';

interface Query {
  [key: string]: string;
}

const useQuery = (): [Query, (queryObj: Query) => void] => {
  const { search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams(search);

  const query: Query = {};

  for (const [key, value] of searchParams.entries()) {
    query[key] = value;
  }

  const setQuery = useCallback((queryObj: Query) => {
    const newQueryObj: Query = {};

    for (const x in queryObj) {
      if (queryObj[x].toString().length) newQueryObj[x] = queryObj[x];
    }

    setSearchParams(newQueryObj);
  }, []);

  return useMemo(() => [query, setQuery], [search]);
};

export default useQuery;
