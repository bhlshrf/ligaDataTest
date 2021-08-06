import useApi from "../../hooks/useApi";
import Loading from "../../components/Loading";
import RetryButton from "../../components/RetryButton";
import DropDown from "../../components/DropDown";

export default RegionsDropDown = ({ region, onChange }) => {
    const { error, data, refresh } = useApi('/api/regions');

    if (error)
        return <RetryButton refresh={refresh} />
    if (!data)
        return <Loading />;

    return (
        <DropDown
            label='regions'
            value={region}
            onChange={onChange}
            items={[
                { label: 'All regions', value: '' },
                ...data.map(x => ({ value: x.id, label: x.region }))
            ]}
        />
    )
}