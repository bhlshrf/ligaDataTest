import Loading from '../../components/Loading';
import RetryButton from '../../components/RetryButton';
import DropDown from '../../components/DropDown';
import { changeRegion } from '../../redux/coronaSlice';

import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { fetchRegions } from '../../redux/apiSlice';


export default function RegionsDropDown() {
    const region = useSelector((state) => state.corona.region);
    const regions = useSelector((state) => state.api.regions);
    const dispatch = useDispatch()

    useEffect(() => dispatch(fetchRegions()), [dispatch])

    if (regions.status === 'error')
        return <RetryButton refresh={() => dispatch(fetchRegions())} />
    if (regions.status !== 'success')
        return <Loading />;

    return (
        <DropDown
            label='Regions'
            value={region}
            onChange={(v) => dispatch(changeRegion(v.target.value))}
            items={[
                { label: 'All regions', value: '' },
                ...regions.data.map(x => ({ value: x.id, label: x.region }))
            ]}
        />
    )
}