import { Link, useParams } from 'react-router-dom';
import LikableButton from '../../components/LikableButton';
import Loading from '../../components/Loading';
import RetryButton from '../../components/RetryButton';
import useApi from '../../hooks/useApi';


export default function Cases() {
    let { id } = useParams();

    const { error, data, refresh } = useApi(`/api/countries/${id}/cases`);

    if (error)
        return <RetryButton refresh={refresh} />
    if (!data)
        return <Loading />;

    return (
        <>
            <div className='cases-header'>
                <Link className='return-link' to='/'> {'<'} Go Home</Link>
                <h2>{data && data[0].country}</h2>
                <LikableButton id={id} />
            </div>
            <div className='centered cases-content'>
                {data?.map(x =>
                    <div key={x.date} className='row-container'>
                        <span>{x.date}</span>
                        <span>{x.death}</span>
                        <span>{x.confirmed}</span>
                        <span>{x.recovered}</span>
                    </div>
                )}
            </div>
        </>
    );
}
