import { useDispatch, useSelector } from "react-redux";
import DropDown from "../../components/DropDown";
import { changeOrderBy } from "../../redux/coronaSlice";


export const OrderByDropDown = () => {
    const orderBy = useSelector((state) => state.corona.orderBy);

    const dispatch = useDispatch();

    return (
        <DropDown
            label='Order By'
            items={[
                { label: 'Nothing', value: '' },
                { label: 'Death', value: 'death' },
                { label: 'Confirmed', value: 'confirmed' },
                { label: 'Recovered', value: 'recovered' },
            ]}
            value={orderBy}
            onChange={v => dispatch(changeOrderBy(v.target.value))}
        />
    )
}