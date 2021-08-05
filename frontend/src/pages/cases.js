import { useHistory, useParams } from 'react-router-dom';
import useApi from '../hooks/useApi';


export default function Cases() {
    let history = useHistory();
    let { id } = useParams();
    const { loading, error, data } = useApi(`/countries/${id}/cases`);

    return <div>
        <h2>Cases</h2>
        {
            loading
                ? 'loading'
                : error
                    ? 'error'
                    : data?.map(x => <span key={x.id}>{x.date}</span>)
        }
        <button onClick={history.goBack}>Go Back</button>
    </div>;
}
