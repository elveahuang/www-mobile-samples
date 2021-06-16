import React, { FC } from 'react';
import { Spin } from 'antd';

const Home: FC = () => {
    return (
        <div className="app text-center">
            <Spin />
        </div>
    );
};

export default Home;
