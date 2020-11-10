import React from 'react';
import { Helmet } from 'react-helmet';
import logo from '../static/logo.svg';
import config from '../config';
import useSSR from 'use-ssr';
// Import your global styles here
import 'normalize.css/normalize.css';
import styles from './styles.module.scss';

// import routes from '../routes';

const App = (): JSX.Element => {
    const { isBrowser, isServer } = useSSR();

    return (
        <div className={styles.App}>
            <Helmet {...config.APP} />
            <div className={styles.header}>
                <img src={logo} alt="Logo" role="presentation" />
                <h1>
                    <em>{config.APP.title}</em>
                    {isBrowser && 'Browser'}
                    {isServer && 'Server'}
                </h1>
            </div>
            <hr />
        </div>
    );
};

export default App;
