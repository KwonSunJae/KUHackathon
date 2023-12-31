import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Error from './error';
import Home from './home';

const Routers = () => {

    return (
        <Router>
            <Routes>
                <Route  path="/" element={<Home />} />
                
                <Route path = "*" element={<Error/>}/>
            </Routes>
        </Router>
    );
};

export default Routers;