import axios from 'axios';
import { useEffect, useState } from 'react';

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading('loading...');
    setData(null);
    setError(null);

    axios
      .get(url)
      .then((res) => {
        setLoading(false);
        console.log(res.data.results);
        res.data.results && setData(res.data.results);
      })
      .catch((err) => {
        setLoading(false);
        setError('An error occurred. Awkward..');
      });
  }, [url]);

  return { data, loading, error };
};
