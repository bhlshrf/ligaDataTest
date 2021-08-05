import { useState } from 'react';
import './App.css';
import useApi from './hooks/useApi';

function App() {
  const [region, setRegion] = useState('')
  const [orderBy, setOrderBy] = useState('');
  const [desc, setDesc] = useState(false);

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const regions = useApi('/api/regions');
  const countries = useApi(`/api/countries?region_id=${region}` +
    `&orderBy=${orderBy}&desc=${desc}&limit=${limit}&page=${page}`);


  const nextPageAvailable = () => limit == countries.data.length;
  const previousPageAvailable = () => page > 1;
  const nextPage = () => {
    if (nextPageAvailable())
      setPage(page + 1)
  }

  const previousPage = () => {
    if (previousPageAvailable())
      setPage(page - 1)
  }

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

          <select onChange={v => setLimit(v.target.value)}>
            <option value='5'>5</option>
            <option selected value='10'>10</option>
            <option value='20'>20</option>
          </select>

          <button onClick={previousPage} disabled={!previousPageAvailable()}> Previous Page </button>
          current page: {page}
          <button onClick={nextPage} disabled={!nextPageAvailable()}> Next Page </button>

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
