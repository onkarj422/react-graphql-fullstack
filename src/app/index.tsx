/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Helmet } from 'react-helmet';
import logo from '../static/logo.svg';
import config from '../config';
// Import your global styles here
import 'normalize.css/normalize.css';

// import routes from '../routes';

const App = (): JSX.Element => (
    <div>
        <Helmet {...config.APP} />
        <div>
            <img src={logo} alt="Logo" role="presentation" />
            <h1>
                <em>{config.APP.title}</em>
            </h1>
        </div>
        <hr />
    </div>
);

export default App;
