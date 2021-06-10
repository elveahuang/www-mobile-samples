import React, { FC, lazy, Suspense, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { ConfigProvider, Spin } from 'antd';
import { RawIntlProvider, useIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
//
import '@/App.less';
import store from '@/store';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { createReactIntl } from '@commons/utils/i18n';
import { antdLocalProvider } from '@commons/webapp/utils/antd';
import { init } from '@commons/store/app';
import { useMount, useThrottleFn } from 'ahooks';
import { dynIframeSize } from '@commons/utils';
import Loading from '@commons/webapp/components/Loading';
import Index from '@/pages/Index';

const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Demo = lazy(() => import('@/pages/Demo'));
const AdminLayout = lazy(() => import('@/layouts/AdminLayout'));

const App: FC = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    const { run } = useThrottleFn(() => {
        dynIframeSize();
    });

    useMount(() => {
        dynIframeSize();
        window.onresize = () => run;
    });

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
    const { lang } = useAppSelector((state) => state.app);

    return (
        <RawIntlProvider value={createReactIntl(lang)}>
            <ConfigProvider locale={antdLocalProvider[lang]}>
                <React.Fragment>
                    <AppTitle />
                    <Router>
                        <Suspense fallback={<Spin />}>
                            <Switch>
                                <Route exact path="/" component={Index} />
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
