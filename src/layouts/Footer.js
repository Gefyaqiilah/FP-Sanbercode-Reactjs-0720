import React, { Component } from 'react';

import './css/footer.css';

class Footer extends Component {

    render() {
        return (
            <>
                <footer id="footer">
                    <ul>
                        <li><img src="/img/logo.png" /> </li>
                        <li><span style={{ color: "gold" }}> Ayam Berkokok</span> For Final Project Bootcamp Reactjs 0720 by Gefy Aqiilah Aqshal</li>
                        <li><span style={{ color: "gold" }}>Ayam Berkokok</span> &copy; Gefy Aqiilah Aqshal</li>
                        <li><span style={{ color: "gold" }}>My Telegram</span> : +6282118575403 </li>
                    </ul>

                </footer>
            </>

        )
    }
}

export default Footer;