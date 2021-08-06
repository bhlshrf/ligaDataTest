import { useEffect, useState } from 'react';
const axios = require('axios');

const useApi = (url) => {
    const [error, setError] = useState('');
    const [data, setData] = useState(null);

    const refresh = () => {
        setError('');
        axios.get(url)
            .then(res => setData(res.data))
            .catch(err => setError(err.message || err.toString()))
    }

    useEffect(refresh, [url])

    return { refresh, data, error };
}

export default useApi;