import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useApi from '../hooks/useApi';

function favoriteItems() {
    const key = 'likedCountries';
    const likedCountries = JSON.parse(localStorage.getItem(key)) ?? [];

    return Object.freeze({
        includes: (id) => likedCountries.includes(id),
        add: (id) => localStorage.setItem(key, JSON.stringify([...likedCountries, id])),
        remove: (id) => localStorage.setItem(key, JSON.stringify(likedCountries.filter(x => x != id))),
    });

}

const storage = favoriteItems();

export default function Cases() {
    let history = useHistory();
    let { id } = useParams();
    const { loading, error, data } = useApi(`/api/countries/${id}/cases`);

    const [liked, setLiked] = useState(storage.includes(id));

    return <div>
        <h2>Cases</h2>
        <button onClick={() => {
            if (!liked)
                storage.add(id);
            else
                storage.remove(id);

            setLiked(!liked)
        }}>{liked ? 'liked' : 'not liked'} </button>
        {
            loading
                ? 'loading'
                : error
                    ? 'error'
                    : <ul>{data?.map(x => <li key={x.date}>{x.date}</li>)}</ul>
        }
        <button onClick={history.goBack}>Go Back</button>
    </div>;
}
