
const RetryButton = ({ refresh }) => (
    <div className='error'>
        <span className='error-txt'>Something does not add up</span>
        <button className='btn' onClick={refresh}>retry</button>
    </div>
)

export default RetryButton;