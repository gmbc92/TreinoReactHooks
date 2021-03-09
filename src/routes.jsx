import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import Index from './pages';
import User from './pages/User';
import Todo from './pages/Todos';

const routes = [
  {
    path: '/',
    component: Index,
    name: 'Home',
    exact: true,
  },
  {
    path: '/todo',
    component: Todo,
    name: 'Todo',
    exact: true,
  },
  {
    path: '/todo/:id',
    component: Todo,
    name: 'Todo',
    header: false,
  },
  {
    path: '/user',
    component: User,
    name: 'User',
    exact: true,
  },
];

const Routes = () => (
  <BrowserRouter>
    <Header title='ALOU' routes={routes} />
    <Switch>
      {routes.map(({ component, exact, path }) => (
        <Route key={path} path={path} exact={exact} component={component} />
      ))}
    </Switch>
  </BrowserRouter>
);

export default Routes;
