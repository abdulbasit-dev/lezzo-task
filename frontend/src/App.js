import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Categoires from './pages/Categoires';
import Products from './pages/Products';
import VirtualData from './pages/VirtualData';

import 'antd/dist/antd.css';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <div className='app'>
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='/stores_table' exact>
            <VirtualData />
          </Route>
          <Route path='/store/:sid/categories/:cid/products' exact>
            <Products />
          </Route>
          <Route path='/store/:sid/categories' exact>
            <Categoires />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
