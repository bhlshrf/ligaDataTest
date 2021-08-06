import { Link } from "react-router-dom";
import CoronaDetails from "../../components/CoronaDetails";

const CountryList = ({ items }) => <CoronaDetails
    items={items}
    keys={x => x.id}
    Labels={({ id, country, className }) => <Link to={`/cases/${id}`} className={className}> {country} </Link>}
/>

export default CountryList;