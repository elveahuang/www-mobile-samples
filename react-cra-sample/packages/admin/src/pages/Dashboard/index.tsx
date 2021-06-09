import { Avatar, Button, DatePicker, version } from 'antd';
import images from '@commons/utils/images';
import React, { FC, useEffect } from 'react';
import { post } from '@commons/utils/http';

const Dashboard: FC = () => {
    useEffect(() => {
        post('/dashboard/activity-chart').then();
    }, []);

    return (
        <div className="app text-center">
            <h1 className="app-title">antd version: {version}</h1>
            <DatePicker />
            <Button type="primary" style={{ marginLeft: 8 }}>
                Primary Button 1 2 3
            </Button>
            <Avatar size={64} src={images.logo} />
            <img alt="Avatar" src={images.logo} />
        </div>
    );
};

export default Dashboard;
