import React, { FC, lazy, Suspense } from 'react';
import { Layout } from 'antd';
import { Route, Switch } from 'react-router-dom';
import { Loading } from '@commons/webapp/components';
//
const { Content } = Layout;
//
const DashBoard = lazy(() => import('@/pages/Dashboard'));
const Demo = lazy(() => import('@/pages/Demo'));

const AdminLayout: FC = () => {
    return (
        <Layout>
            <Content>
                <Suspense fallback={<Loading />}>
                    <Switch>
                        <Route path="/dashboard" component={DashBoard} />
                        <Route path="/demo" component={Demo} />
                    </Switch>
                </Suspense>
            </Content>
        </Layout>
    );
};

export default AdminLayout;
