import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Home from '../pages/Home';
import CompanyRegister from '../pages/CompanyRegister';

const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/company-register" component={CompanyRegister} />
    </Switch>
);

export default Routes;