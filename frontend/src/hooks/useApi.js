import { useEffect, useState } from 'react';

const useApi = (url) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [data, setData] = useState(null);

    const refresh = () => {
        setLoading(true);
        fetch(url)
            .then(res => res.json())
            .then(res => setData(res))
            .then(res => setError(''))
            .catch(err => setError(err.message || err.toString()))
            .finally(() => setLoading(false))
    }

    useEffect(refresh, [url])

    return { refresh, loading, data, error };
}

export default useApi;