import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import '../App.css';

import useApi from '../hooks/useApi';
import { favorite } from '../util/favorite';

const queryString = () => {
    var objURL = {};

    window.location.search.replace(
        new RegExp("([^?=&]+)(=([^&]*))?", "g"),
        function ($0, $1, $2, $3) {
            objURL[$1] = $3;
        }
    );

    return (name, elseValue) => {
        if (!objURL[name])
            return elseValue;
        return decodeURIComponent(objURL[name]) ?? elseValue
    };
}


export default function Countries() {
    const query = queryString();

    let history = useHistory();

    const [region, setRegion] = useState(query('region', ''))
    const [orderBy, setOrderBy] = useState(query('orderBy', ''));
    const [desc, setDesc] = useState(false);

    const [limit, setLimit] = useState(query('limit', 10));
    const [page, setPage] = useState(query('page', 0));



    const regions = useApi('/api/regions');
    const countries = useApi(`/api/countries?region_id=${region}` +
        `&orderBy=${orderBy}&desc=${desc}&limit=${limit}&page=${page + 1}`);


    return (
        <div className="App">
            <header className="App-header">
                <div>
                    <label>
                        region
                        {regions.loading
                            ? 'loading'
                            : regions.error
                                ? (<button onClick={regions.refresh} disabled={regions.loading}>refresh</button>)
                                : <select value={region} onChange={v => {
                                    setRegion(v.target.value);
                                    setPage(0);



                                    history.push(
                                        history.location.pathname + `?region=${v.target.value}&page=${0}&orderBy=${orderBy}&desc=${desc}&limit=${limit}`
                                    )
                                }}>
                                    <option value=''>...</option>
                                    {regions.data?.map(x => <option key={x.id} value={x.id}>{x.region}</option>)}
                                </select>
                        }
                    </label>
                    . .
                    <label>
                        order by
                        <select value={orderBy} onChange={v => {
                            setOrderBy(v.target.value);

                            history.push(
                                history.location.pathname +
                                `?region=${region}&page=${page}&orderBy=${v.target.value}&desc=${desc}&limit=${limit}`
                            )
                        }}>
                            <option value=''> nothing </option>
                            <option value='death'>death</option>
                            <option value='recovered'>recovered</option>
                            <option value='confirmed'>confirmed</option>
                        </select>
                    </label>

                    {
                        orderBy && <label> desc ordering
                            <input type='checkbox' checked={desc} onChange={v => {
                                setDesc(v.target.checked);

                                history.push(
                                    history.location.pathname +
                                    `?region=${region}&page=${page}&orderBy=${orderBy}&desc=${v.target.checked}&limit=${limit}`);
                            }} />
                        </label>
                    }

                    <label>
                        items/page
                        <select value={limit} onChange={v => {
                            setLimit(v.target.value);

                            const totalPages = Math.ceil(countries.data?.totalCount / v.target.value) - 1;
                            if (page > totalPages)
                                setPage(totalPages);



                            history.push(
                                history.location.pathname + `?region=${region}&page=${page}&orderBy=${orderBy}&desc=${desc}&limit=${v.target.value}`
                            )
                        }}>
                            <option value='5'>5</option>
                            <option value='10'>10</option>
                            <option value='20'>20</option>
                            <option value='30'>30</option>
                            <option value='50'>50</option>
                        </select>

                    </label>

                </div>
                <hr />
                {countries.loading
                    ? 'loading'
                    : countries.error ? 'error'
                        : <ul>
                            {
                                countries.data?.countries?.map(x =>
                                    <li key={x.id}>
                                        {favorite.includes(x.id) ? 'x' : '-'}
                                        <Link to={`/cases/${x.id}`}>{x.country}</Link> - {x.death} - {x.recovered} - {x.confirmed}
                                    </li>
                                )}
                        </ul>
                }

                {
                    countries.data?.totalCount && <ReactPaginate
                        pageCount={countries.data?.totalCount / limit}

                        containerClassName={'pagination'}
                        activeClassName={'active'}

                        forcePage={page}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={2}
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        onPageChange={({ selected }) => setPage(selected)}
                    />
                }
            </header>
        </div >
    );
}


