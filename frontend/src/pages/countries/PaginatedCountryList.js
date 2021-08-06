import { useState } from "react";
import ReactPaginate from "react-paginate";
import DropDown from "../../components/DropDown";
import Loading from "../../components/Loading";
import RetryButton from "../../components/RetryButton";
import useApi from "../../hooks/useApi";
import queryString from "../../util/quertString";
import CountryList from "./CountryList";


export default function PaginatedCountryList({ region, orderBy, desc }) {
    const query = queryString();

    const [limit, setLimit] = useState(parseInt(query('limit', 10)));
    const [page, setPage] = useState(parseInt(query('page', 0)));

    const { error, data, refresh } = useApi(`/api/countries?region_id=${region}` +
        `&orderBy=${orderBy}&desc=${desc}&limit=${limit}&page=${page + 1}`);


    if (error)
        return <RetryButton refresh={refresh} />

    if (!data)
        return <Loading />;

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
