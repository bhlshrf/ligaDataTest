
const CoronaDetails = ({ items, keys, Labels }) => (
    <div className='centered cases-content'>
        <div className='row-container no-hover'>
            <span className='cases-label' />
            <span className='case deaths'>Death</span>
            <span className='case confirmeds'>Confirmed</span>
            <span className='case recovereds'>Recovered</span>
        </div>

        {
            items.map(x => <div key={keys(x)} className='row-container'>
                <Labels {...x} className='cases-label' />

                <span className='case deaths'>{x.death}</span>
                <span className='case confirmeds'>{x.confirmed}</span>
                <span className='case recovereds'>{x.recovered}</span>
            </div>
            )
        }
    </div>
)

export default CoronaDetails;