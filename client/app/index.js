import React from 'react';
import { render } from 'react-dom';

// React Router related
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

// Redux related
import { Provider } from 'react-redux';
import store from './store';

// Containers
import App from './containers/App/App';
import NotFound from './containers/App/NotFound';
import Home from './containers/Home/Home';
import HelloWorld from './containers/HelloWorld/HelloWorld';
import Counters from './containers/Counters/Counters';

// Styles
import './styles/styles.scss';

render((
  <Provider
    store={store}
  >
    <Router>
      <App>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/counters" component={Counters} />
          <Route path="/helloworld" component={HelloWorld} />
          <Route component={NotFound}/>
        </Switch>
      </App>
    </Router>
  </Provider>
), document.getElementById('app'));
