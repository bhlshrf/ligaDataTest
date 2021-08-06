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
