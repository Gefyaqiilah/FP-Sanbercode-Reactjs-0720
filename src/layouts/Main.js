import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Section from './Section';

import {
    BrowserRouter as Router
} from 'react-router-dom';

const Main = () => {
    return (
        <>
            <div style={{ backgroundColor: "rgb(25, 29, 27)" }}>
                < Router >
                    <Header />
                    <Section />
                    <Footer />
                </Router >
            </div>
        </>
    )
}
export default Main;