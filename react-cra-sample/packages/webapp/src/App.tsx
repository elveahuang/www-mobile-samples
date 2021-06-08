import React from 'react';
import { Button, DatePicker, version } from 'antd';
import message from '@commons/constants';
//
import '@/App.less';

function App() {
    console.log(message);
    return (
        <div className="app text-center">
            <h1 className="app-title">antd version: {version}</h1>
            <DatePicker />
            <Button type="primary" style={{ marginLeft: 8 }}>
                Primary Button
            </Button>
        </div>
    );
}

export default App;
