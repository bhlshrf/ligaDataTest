import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import Countries from './pages/countries';
import Cases from './pages/cases';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path='/cases/:id'> <Cases /> </Route>
        <Route path='/'><Countries /> </Route>
      </Switch>
    </Router>
  );
}

