import React, { FC, lazy, Suspense, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { ConfigProvider, Spin } from 'antd';
import { RawIntlProvider, useIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
//
import { createReactIntl } from '@commons/utils/i18n';
import { antdLocalProvider } from '@commons/webapp/utils/antd';
import Loading from '@commons/webapp/components/Loading';
//
import '@/App.scss';
import store from '@commons/store';
import { useAppSelector } from '@commons/hooks';
import { Home } from '@/pages';
//
const AdminLayout = lazy(() => import('@/layouts/AdminLayout'));

const App: FC = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    return loading ? (
        <Loading />
    ) : (
        <Provider store={store}>
            <AppContainer />
        </Provider>
    );
};

const AppTitle = (): React.ReactElement => {
    const intl = useIntl();
    return (
        <Helmet
            title={intl.formatMessage({
                id: 'site_title',
            })}
        />
    );
};

const AppContainer: FC = () => {
    const { direction, lang } = useAppSelector((state) => state.app);

    return (
        <RawIntlProvider value={createReactIntl(lang)}>
            <ConfigProvider direction={direction} locale={antdLocalProvider[lang]}>
                <React.Fragment>
                    <AppTitle />
                    <Router>
                        <Suspense fallback={<Spin />}>
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route path="/" component={AdminLayout} />
                            </Switch>
                        </Suspense>
                    </Router>
                </React.Fragment>
            </ConfigProvider>
        </RawIntlProvider>
    );
};

export default App;
