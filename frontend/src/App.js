import './App.css';
import useApi from './hooks/useApi';

function App() {
  const { refresh, loading, data, error } = useApi('/api/status');

  return (
    <div className="App">
      <header className="App-header">
        <p>
          server statues: {loading ? 'loading' : error ? 'error' : data?.status ?? 'unkownen'}
          <br />
          <button onClick={refresh} disabled={loading}>refresh</button>
        </p>
      </header>
    </div>
  );
}

export default App;
