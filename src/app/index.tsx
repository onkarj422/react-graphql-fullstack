/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
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
    const [isTitle, setIsTitle]: any = React.useState(true);

    return (
        <div className={styles.App}>
            <Helmet {...config.APP} />
            <div className={styles.header}>
                <img src={logo} alt="Logo" role="presentation" />
                <h1>
                    {isTitle && <em>{config.APP.title}</em>}
                    {isBrowser && 'Browser'}
                    {isServer && 'Server'}
                </h1>
                <div>
                    <div onClick={() => setIsTitle(!isTitle)}>Toggle title</div>
                </div>
            </div>
            <hr />
        </div>
    );
};

export default App;
