import React from 'react';
import TestService from '@common/service/test.service';
import './App.css';

TestService.test();

function App() {
    return (
        <div className="App">
            Hello World
        </div>
    );
}

export default App;
