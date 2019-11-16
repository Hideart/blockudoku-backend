import React, { Component } from 'react';
import { Router as BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { history } from './history';
import { SALayout } from '@admin/layout/main-layout';
import { userRoutes, SAPage } from './routes-path';

function NotFoundComponent() {
  return <div>Not found</div>;
}

class Router extends Component {
  render() {
    return (
      <BrowserRouter history={history}>
        <Switch>
          {userRoutes.map(route => (<Route key={route.path as string} {...route} />))}
          <Redirect from='/' to={SAPage.DASHBORD_PAGE} exact={true} />
          <Redirect from={SAPage.LAYOUT_PREFFIX} to={SAPage.DASHBORD_PAGE} exact={true} />
          <Route component={SALayout} path={SAPage.LAYOUT_PREFFIX} />
          <Route component={NotFoundComponent} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
