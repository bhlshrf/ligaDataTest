import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useApi from '../hooks/useApi';
import { favorite } from '../util/favorite';


export default function Cases() {
    let history = useHistory();
    let { id } = useParams();
    const { error, data } = useApi(`/api/countries/${id}/cases`);

    const [liked, setLiked] = useState(favorite.includes(id));

    return (
        <div>
            <h2>Cases {data && data[0].country}</h2>
            <button onClick={() => history.goBack()}>Go Back</button>
            <button onClick={() => {
                setLiked(favorite.toggle(id))
            }}>{liked ? 'liked' : 'not liked'} </button>
            {
                error ? 'error'
                    : !data ? 'loading' : <ul>
                        {data?.map(x => <li key={x.date}>{x.date} - {x.death} - {x.confirmed} - {x.recovered}</li>)}
                    </ul>
            }
        </div>
    );
}
