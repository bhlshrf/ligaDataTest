import { useHistory, useParams } from 'react-router-dom';
import useApi from '../hooks/useApi';


export default function Cases() {
    let history = useHistory();
    let { id } = useParams();
    const { loading, error, data } = useApi(`/api/countries/${id}/cases`);

    return <div>
        <h2>Cases</h2>
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
