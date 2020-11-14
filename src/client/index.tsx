/* eslint-disable react/no-render-return-value */
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from 'app';
// import { createMemoryHistory, createBrowserHistory } from 'history';

// const history =
//     typeof window === 'undefined'
//         ? createMemoryHistory({
//               initialEntries: ['/'],
//           })
//         : createBrowserHistory();

const render = (Root: () => JSX.Element) =>
    ReactDOM.hydrate(
        <AppContainer>
            <Root />
        </AppContainer>,
        document.getElementById('react-view'),
    );

render(App);

if (__DEV__ && module.hot) {
    module.hot.accept('../app', () => {
        const HotRoot = require('../app').default;
        render(HotRoot);
    });
}
