import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useApi from '../hooks/useApi';
import { favorite } from '../util/favorite';


const LikableButton = ({ id }) => {
    const [liked, setLiked] = useState(favorite.includes(id));

    return (
        <button onClick={() => setLiked(favorite.toggle(id))}>
            {liked ? 'liked' : 'not liked'}
        </button>
    )
}

export default function Cases() {
    let { id } = useParams();

    const { error, data, refresh } = useApi(`/api/countries/${id}/cases`);

    if (error)
        return <button onClick={refresh}>refresh</button>
    if (!data)
        return 'loading';
    return (
        <div>
            <h2>Cases {data && data[0].country}</h2>
            <Link to='/'>Go Home</Link>
            <LikableButton id={id} />
            {data?.map(x => <li key={x.date}>{x.date} - {x.death} - {x.confirmed} - {x.recovered}</li>)}
        </div>
    );
}
