import { useState } from 'react';
import './App.css';
import useApi from './hooks/useApi';

function App() {
  const [region, setRegion] = useState('')
  const [orderBy, setOrderBy] = useState('');
  const [desc, setDesc] = useState(false);


  const regions = useApi('/api/regions');
  const countries = useApi(`/api/countries?region_id=${region}&orderBy=${orderBy}&desc=${desc}`);


  return (
    <div className="App">
      <header className="App-header">
        <div>
          <label>
            region
            {regions.loading
              ? 'loading'
              : regions.error
                ? (<button onClick={regions.refresh} disabled={regions.loading}>refresh</button>)
                : <select onChange={v => setRegion(v.target.value)}>
                  <option selected value=''>...</option>
                  {regions.data?.map(x => <option key={x.id} value={x.id}>{x.region}</option>)}
                </select>
            }
          </label>
          . .
          <label>
            order by
            <select onChange={v => setOrderBy(v.target.value)}>
              <option selected value=''> nothing </option>
              <option value='death'>death</option>
              <option value='recovered'>recovered</option>
              <option value='confirmed'>confirmed</option>
            </select>
          </label>
          . .
          {
            orderBy && <label>
              desc ordering
              <input type='checkbox' checked={desc} onChange={v => setDesc(v.target.checked)} />
            </label>

          }

        </div>
        <hr />
        {countries.loading
          ? 'loading'
          : countries.error ? 'error'
            : countries?.data?.map(x => <span key={x.id}>{x.country} - {x.death} - {x.recovered} - {x.confirmed}</span>)}

      </header>
    </div >
  );
}

export default App;
