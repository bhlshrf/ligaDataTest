export default DescOrderingCheckbox = ({ isHidden, desc, onChange }) => (
    !isHidden &&
    <label>
        desc ordering?
        <input type='checkbox' checked={desc} onChange={onChange} />
    </label>
)