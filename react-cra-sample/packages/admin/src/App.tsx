import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { Button, DatePicker, version } from 'antd';
//
import images from '@commons/utils/images';
//
import '@/App.less';
import store from '@/store';
import { test } from '@/store/app';
import useAppSelector, { useAppDispatch } from '@/hooks';

const App: FC = () => {
    return (
        <Provider store={store}>
            <AppContainer />
        </Provider>
    );
};

const AppContainer: FC = () => {
    const dispatch = useAppDispatch();
    const accessToken = useAppSelector((state) => state.app.accessToken);

    dispatch(test('World'));

    return (
        <div className="app text-center">
            <h1 className="app-title">antd version: {version}</h1>
            <DatePicker />
            <Button type="primary" style={{ marginLeft: 8 }}>
                Primary Button
            </Button>
            {accessToken}
            <img alt="Avatar" src={images.logo} />
        </div>
    );
};

export default App;
