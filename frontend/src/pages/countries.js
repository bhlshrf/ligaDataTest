import { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import '../App.css';

import useApi from '../hooks/useApi';
import queryString from '../util/quertString';


const DropDown = ({ label, value, items = [], onChange }) => (
    <label>
        {label}
        <select value={value} onChange={onChange}>
            {items.map(x => <option key={x.value ?? x} value={x.value ?? x}>{x.label ?? x}</option>)}
        </select>
    </label>
)

const DescOrderingCheckbox = ({ isHidden, desc, onChange }) => (
    !isHidden &&
    <label> desc ordering
        <input type='checkbox' checked={desc} onChange={onChange} />
    </label>
)


const RegionsDropDown = ({ region, onChange }) => {
    const { error, data, refresh } = useApi('/api/regions');

    if (error)
        return <button onClick={refresh}>refresh</button>

    if (!data)
        return 'loading';

    return (
        <DropDown
            label='regions'
            value={region}
            onChange={onChange}
            items={[
                { label: 'All regions', value: '' },
                ...data.map(x => ({ value: x.id, label: x.region }))
            ]}
        />
    )
}

export default function Countries() {
    const query = queryString();

    const [region, setRegion] = useState(query('region', ''))
    const [orderBy, setOrderBy] = useState(query('orderBy', ''));
    const [desc, setDesc] = useState(false);

    return (
        <div className="App">
            <div>
                <RegionsDropDown region={region} onChange={v => setRegion(v.target.value)} />

                <DropDown
                    label='order by'
                    value={orderBy}
                    items={['', 'death', 'confirmed', 'recovered']}
                    onChange={v => setOrderBy(v.target.value)}
                />

                <DescOrderingCheckbox desc={desc} isHidden={!orderBy} onChange={v => setDesc(v.target.checked)} />

            </div>
            <hr />
            <PaginatedCountryList desc={desc} orderBy={orderBy} region={region} />
        </div >
    );
}

const PaginatedCountryList = ({ region, orderBy, desc }) => {
    const query = queryString();

    const [limit, setLimit] = useState(parseInt(query('limit', 10)));
    const [page, setPage] = useState(parseInt(query('page', 0)));

    const { error, data, refresh } = useApi(`/api/countries?region_id=${region}` +
        `&orderBy=${orderBy}&desc=${desc}&limit=${limit}&page=${page + 1}`);

    if (error)
        return <button onClick={refresh}>refresh</button>

    if (!data)
        return 'loading';

    return (
        <>
            <CountryList items={data.countries} />
            <DropDown
                label='items/page'
                value={limit}
                items={[5, 10, 20, 30, 50]}
                onChange={v => {
                    setLimit(v.target.value);

                    const totalPages = Math.ceil(data?.totalCount / v.target.value) - 1;
                    if (page > totalPages)
                        setPage(totalPages);
                }}
            />

            <ReactPaginate
                pageCount={data?.totalCount / limit}

                containerClassName={'pagination'}
                activeClassName={'active'}

                forcePage={page}
                initialPage={page}
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                onPageChange={({ selected }) => setPage(selected)}
            />
        </>
    );
}

const CountryList = ({ items }) => (
    <ul>
        {items.map(x => <li key={x.id}>
            <Link to={`/cases/${x.id}`}>{x.country}</Link> - {x.death} - {x.recovered} - {x.confirmed}
        </li>)}
    </ul>
)
