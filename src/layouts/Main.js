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

            < Router >
                <Header />
                <Section />
                <Footer />
            </Router >
        </>
    )
}
export default Main;