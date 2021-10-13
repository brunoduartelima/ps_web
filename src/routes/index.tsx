import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import CompanyRegister from '../pages/CompanyRegister';
import Dashboard from '../pages/Dashboard';
import Customers from '../pages/Customers';
import CustomersDetails from '../pages/CustomersDetails';

const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/company-register" component={CompanyRegister} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/reset-password" component={ResetPassword} />

        <Route  path="/dashboard" component={Dashboard} isPrivate />
        <Route path="/customers" component={Customers} isPrivate /> 
        <Route path="/customer/:id" component={CustomersDetails} isPrivate /> 
    </Switch>
);

export default Routes;