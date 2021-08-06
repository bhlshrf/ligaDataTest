import { Link, useParams } from 'react-router-dom';
import CoronaDetails from '../../components/CoronaDetails';
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
        return <Loading className='centered' />;

    return (
        <>
            <div className='cases-header'>
                <Link className='return-link' to='/'> {'< '} Home</Link>
                <h2>{data && data[0].country}</h2>
                <LikableButton id={id} />
            </div>
            <CoronaDetails
                items={data}
                keys={x => x.date}
                Labels={({ className, date }) => <span className={className}>{date}</span>}
            />
        </>
    );
}


