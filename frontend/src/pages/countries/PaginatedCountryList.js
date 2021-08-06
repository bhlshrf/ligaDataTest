import { useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading';
import RetryButton from '../../components/RetryButton';
import { fetchCountries } from '../../redux/apiSlice';
import { changePage } from '../../redux/paginationSlice';
import CountryList from './CountryList';


export default function PaginatedCountryList() {

    const { region, desc, orderBy } = useSelector((state) => state.corona);
    const { limit, page } = useSelector((state) => state.pagination);
    const countries = useSelector(state => state.api.countries)

    const dispatch = useDispatch();

    const dispatchCountries = () => dispatch(fetchCountries({ region, orderBy, desc, limit, page }));

    useEffect(dispatchCountries,
        [region, orderBy, desc, limit, page, dispatch])


    if (countries.status === 'error')
        return <RetryButton refresh={dispatchCountries} />

    if (countries.status !== 'success')
        return <Loading />;

    return (
        <>
            <CountryList items={countries.data.countries} />

            <ReactPaginate
                pageCount={countries.data.totalCount / limit}

                containerClassName={'pagination'}
                activeClassName={'active'}

                forcePage={page}
                initialPage={page}

                previousLabel={'<'}
                nextLabel={'>'}

                breakLabel={'...'}
                onPageChange={({ selected }) => dispatch(changePage(selected))}
            />
        </>
    );
}
