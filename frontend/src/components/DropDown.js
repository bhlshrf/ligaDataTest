
const DropDown = ({ label, value, items = [], onChange }) => (
    <label className='dropDown'>
        {label}
        <select className='select' value={value} onChange={onChange}>
            {items.map(x => <option key={x.value ?? x} value={x.value ?? x}>{x.label ?? x}</option>)}
        </select>
    </label>
)

export default DropDown;