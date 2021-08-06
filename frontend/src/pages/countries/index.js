import { useState } from 'react';
import queryString from '../../util/quertString';
import DropDown from '../../components/DropDown';
import DescOrderingCheckbox from './DescOrderingCheckbox';
import RegionsDropDown from './RegionsDropDown';
import PaginatedCountryList from './PaginatedCountryList';


export default function Countries() {
    const query = queryString();

    const [region, setRegion] = useState(query('region', ''))
    const [orderBy, setOrderBy] = useState(query('orderBy', ''));
    const [desc, setDesc] = useState(false);

    const [limit, setLimit] = useState(parseInt(query('limit', 10)));
    const [page, setPage] = useState(parseInt(query('page', 0)));


    return (
        <div className="App">
            <div className='header'>
                <RegionsDropDown region={region} onChange={v => setRegion(v.target.value)} />

                <DropDown
                    label='Order By'
                    value={orderBy}
                    items={[
                        { label: 'Nothing', value: '' },
                        { label: 'Death', value: 'death' },
                        { label: 'Confirmed', value: 'confirmed' },
                        { label: 'Recovered', value: 'recovered' },
                    ]}
                    onChange={v => setOrderBy(v.target.value)}
                />

                <DescOrderingCheckbox desc={desc} isHidden={!orderBy} onChange={setDesc} />

                <DropDown
                    label='Page Size'
                    value={limit}
                    items={[5, 10, 20, 30, 50]}
                    onChange={v => {
                        setLimit(v.target.value);

                        // const totalPages = Math.ceil(data?.totalCount / v.target.value) - 1;
                        // if (page > totalPages)
                        //     setPage(totalPages);
                    }}
                />
            </div>
            <hr />
            <PaginatedCountryList desc={desc} orderBy={orderBy} region={region} limit={limit} page={page} setPage={setPage} />
        </div >
    );
}
