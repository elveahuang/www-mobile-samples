import React, { FC, memo } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
//
import Index from '@/pages';
import AdminLayout from '@/layouts/AdminLayout';

const Router: FC = () => {
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/" component={Index} />
                <Route path="/" component={AdminLayout} />
            </Switch>
        </HashRouter>
    );
};

export default memo(Router);
