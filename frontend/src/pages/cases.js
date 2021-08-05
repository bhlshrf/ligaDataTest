import { useHistory, useParams } from "react-router-dom";


export default function Cases() {
    let history = useHistory();

    let { id } = useParams();

    return <div>
        <h2>Cases {id}</h2>
        <button onClick={history.goBack}>Go Back</button>
    </div>;
}
