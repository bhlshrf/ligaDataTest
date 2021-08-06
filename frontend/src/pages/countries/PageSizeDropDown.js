import { useDispatch, useSelector } from 'react-redux';
import DropDown from '../../components/DropDown';
import { changeLimit, changePage } from '../../redux/paginationSlice';


export const PageSizeDropDown = () => {
    const { limit, page } = useSelector((state) => state.pagination);
    const dispatch = useDispatch();

    const countries = useSelector(state => state.api.countries)

    const totalCount = countries.data?.totalCount;

    return (
        <DropDown
            label='Page Size'
            value={limit}
            items={[5, 10, 20, 30, 50]}
            onChange={v => {
                dispatch(changeLimit(v.target.value));

                const totalPages = Math.ceil(totalCount / v.target.value) - 1;
                if (page > totalPages)
                    dispatch(changePage(totalPages));
            }}
        />
    )

}
