const DescOrderingCheckbox = ({ isHidden, desc, onChange }) => (
    !isHidden &&
    <div className='select centered' onClick={() => onChange(!desc)}>
        <span>{desc ? 'Descending' : 'Ascending'}</span>
    </div>
)
export default DescOrderingCheckbox;