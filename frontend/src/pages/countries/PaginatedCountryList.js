import ReactPaginate from "react-paginate";
import Loading from "../../components/Loading";
import RetryButton from "../../components/RetryButton";
import useApi from "../../hooks/useApi";
import CountryList from "./CountryList";


export default function PaginatedCountryList({ region, orderBy, desc, limit, page, setPage }) {
    const { error, data, refresh } = useApi(`/api/countries?region_id=${region}` +
        `&orderBy=${orderBy}&desc=${desc}&limit=${limit}&page=${page + 1}`);


    if (error)
        return <RetryButton refresh={refresh} />

    if (!data)
        return <Loading />;

    return (
        <>
            <CountryList items={data.countries} />

            <ReactPaginate
                pageCount={data?.totalCount / limit}

                containerClassName={'pagination'}
                activeClassName={'active'}

                forcePage={page}
                initialPage={page}

                previousLabel={'<'}
                nextLabel={'>'}

                breakLabel={'...'}
                onPageChange={({ selected }) => setPage(selected)}
            />
        </>
    );
}
