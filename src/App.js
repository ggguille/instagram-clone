import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';

const Dashboard = lazy(() => import('./pages/dashboard'));
const Login = lazy(() => import('./pages/login'));
const Signup = lazy(() => import('./pages/signup'));

function App() {
  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route path={ROUTES.DASHBOARD} exact component={Dashboard} />
          <Route path={ROUTES.LOGIN} component={Login} />
          <Route path={ROUTES.SIGNUP} component={Signup} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
