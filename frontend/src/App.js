import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Countries from './pages/countries';
import Cases from './pages/cases';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path='/cases/:id' component={Cases} />
        <Route path='/' component={Countries} />
      </Switch>
    </Router>
  );
}

