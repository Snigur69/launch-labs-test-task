import { useEffect, useState } from 'react';

import { ATHLETES_API_ROUTE } from '../../constants/api/routes.ts';
import type { Athlete } from '../../types/athletes.ts';

const useAthletes = () => {
  const [data, setData] = useState<Athlete[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(ATHLETES_API_ROUTE)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to load athletes');
        }

        return res.json();
      })
      .then((res: unknown) => {
        if (Array.isArray(res)) {
          setData(res as Athlete[]);
        } else {
          setData([]);
        }
      })
      .catch((err) => {
        setError(err?.message || 'Unknown error');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
};

export default useAthletes;
