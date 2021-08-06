import { Link } from "react-router-dom";

export default CountryList = ({ items }) => (
    <ul>
        {items.map(x => <li key={x.id}>
            <Link to={`/cases/${x.id}`}>
                {x.country}
            </Link>
            - {x.death} - {x.recovered} - {x.confirmed}
        </li>)}
    </ul>
)