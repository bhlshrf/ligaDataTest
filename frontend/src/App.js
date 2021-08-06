import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import Countries from './pages/countries';
import Cases from './pages/cases';
import { FavoriteContext, FavoriteBuilder } from './util/favorite';

export default function App() {
  return (
    <FavoriteContext.Provider value={FavoriteBuilder()}>
      <Router>
        <Switch>
          <Route path='/cases/:id'> <Cases /> </Route>
          <Route path='/'><Countries /> </Route>
        </Switch>
      </Router>
    </FavoriteContext.Provider>
  );
}

