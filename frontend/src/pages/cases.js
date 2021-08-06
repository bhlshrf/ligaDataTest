import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useApi from '../hooks/useApi';
import { favorite } from '../util/favorite';



export default function Cases() {
    let history = useHistory();
    let { id } = useParams();
    const { loading, error, data } = useApi(`/api/countries/${id}/cases`);

    const [liked, setLiked] = useState(favorite.includes(id));


    return <div>
        <h2>Cases {data && data[0].country}</h2>
        <button onClick={() => history.goBack()}>Go Back</button>
        <button onClick={() => {
            const newValue = favorite.toggle(id)
            setLiked(newValue)
        }}>{liked ? 'liked' : 'not liked'} </button>
        {
            loading
                ? 'loading'
                : error
                    ? 'error'
                    : <ul>{data?.map(x => <li key={x.date}>{x.date} - {x.death} - {x.confirmed} - {x.recovered}</li>)}</ul>
        }
    </div>;
}
