import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import LikableButton from '../components/LikableButton';
import Loading from '../components/Loading';
import RetryButton from '../components/RetryButton';
import useApi from '../hooks/useApi';

export default function Cases() {
    let { id } = useParams();

    const { error, data, refresh } = useApi(`/api/countries/${id}/cases`);

    if (error)
        return <RetryButton refresh={refresh} />
    if (!data)
        return <Loading />;

    return (
        <div>
            <h2>Cases {data && data[0].country}</h2>
            <Link to='/'>Go Home</Link>
            <LikableButton id={id} />
            {data?.map(x => <li key={x.date}>{x.date} - {x.death} - {x.confirmed} - {x.recovered}</li>)}
        </div>
    );
}
