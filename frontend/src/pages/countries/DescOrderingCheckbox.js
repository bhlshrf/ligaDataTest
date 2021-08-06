import { useDispatch, useSelector } from "react-redux";
import { toggleDesc } from "../../redux/coronaSlice";

const DescOrderingCheckbox = () => {
    const desc = useSelector((state) => state.corona.desc);
    const orderBy = useSelector((state) => state.corona.orderBy);
    const dispatch = useDispatch()

    if (!orderBy)
        return null
    return (
        <div className='select centered' onClick={() => dispatch(toggleDesc())}>
            <span>{desc ? 'Descending' : 'Ascending'}</span>
        </div>
    )
}
export default DescOrderingCheckbox;