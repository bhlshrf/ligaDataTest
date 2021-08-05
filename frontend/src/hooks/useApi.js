import { useEffect, useState } from 'react';
const axios = require('axios');

const useApi = (url) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [data, setData] = useState(null);

    const refresh = () => {
        setLoading(true);
        axios.get(url)
            .then(res => setData(res.data) && setError(''))
            .catch(err => setError(err.message || err.toString()))
            .finally(() => setLoading(false))
    }

    useEffect(refresh, [url])

    return { refresh, loading, data, error };
}

export default useApi;