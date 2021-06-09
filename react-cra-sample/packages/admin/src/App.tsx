import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
//
import '@/App.less';
import store from '@/store';
import { init } from '@commons/store/app';
import { useAppDispatch } from '@/hooks';
import Dashboard from '@/pages/Dashboard';

const App: FC = () => {
    return (
        <Provider store={store}>
            <AppContainer />
        </Provider>
    );
};

const AppContainer: FC = () => {
    const dispatch = useAppDispatch();

    dispatch(init());

    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/dashboard" component={Dashboard} />
            </Switch>
        </Router>
    );
};

export default App;
