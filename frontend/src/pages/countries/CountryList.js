import { Link } from "react-router-dom";

const CountryList = ({ items }) => (
    <>
        {
            items.map(x => <div key={x.id} className='row-container'>
                <Link to={`/cases/${x.id}`}> {x.country} </Link>
                <span>{x.death}</span>
                <span>{x.recovered}</span>
                <span>{x.confirmed}</span>
            </div>)
        }
    </>
)

export default CountryList;