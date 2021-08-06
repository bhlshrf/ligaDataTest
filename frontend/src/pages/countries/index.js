import DescOrderingCheckbox from './DescOrderingCheckbox';
import RegionsDropDown from './RegionsDropDown';
import PaginatedCountryList from './PaginatedCountryList';
import { OrderByDropDown } from './OrderByDropDown';
import { PageSizeDropDown } from './PageSizeDropDown';

export default function Countries() {
    return (
        <div className="App">
            <div className='header'>
                <RegionsDropDown />
                <OrderByDropDown />
                <DescOrderingCheckbox />
                <PageSizeDropDown />
            </div>
            <hr />
            <PaginatedCountryList />
        </div >
    );
}
