import { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import '../App.css';

import useApi from '../hooks/useApi';


export default function Countries() {
    const [region, setRegion] = useState('')
    const [orderBy, setOrderBy] = useState('');
    const [desc, setDesc] = useState(false);

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

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
                                : <select defaultValue='' onChange={v => {
                                    setRegion(v.target.value);
                                    setPage(0);
                                }}>
                                    <option value=''>...</option>
                                    {regions.data?.map(x => <option key={x.id} value={x.id}>{x.region}</option>)}
                                </select>
                        }
                    </label>
                    . .
                    <label>
                        order by
                        <select defaultValue='' onChange={v => setOrderBy(v.target.value)}>
                            <option value=''> nothing </option>
                            <option value='death'>death</option>
                            <option value='recovered'>recovered</option>
                            <option value='confirmed'>confirmed</option>
                        </select>
                    </label>
                    . .
                    {
                        orderBy && <label>
                            desc ordering
                            <input type='checkbox' checked={desc} onChange={v => setDesc(v.target.checked)} />
                        </label>

                    }

                    <select defaultValue='10' onChange={v => {
                        setLimit(v.target.value);

                        const totalPages = Math.ceil(countries.data?.totalCount / v.target.value) - 1;
                        if (page > totalPages)
                            setPage(totalPages);
                    }}>
                        <option value='5'>5</option>
                        <option value='10'>10</option>
                        <option value='20'>20</option>
                    </select>


                </div>
                <hr />
                {countries.loading
                    ? 'loading'
                    : countries.error ? 'error'
                        : <ul>
                            {
                                countries.data?.countries?.map(x =>
                                    <li key={x.id}>
                                        <Link to={`/cases/${x.id}`}>{x.country}</Link> - {x.death} - {x.recovered} - {x.confirmed}
                                    </li>
                                )}
                        </ul>
                }

                {
                    countries.data?.totalCount && <ReactPaginate
                        pageCount={countries.data?.totalCount / limit}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={1}

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


