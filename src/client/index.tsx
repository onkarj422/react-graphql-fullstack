import React from 'react';
import { hydrate } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from 'app';
// import { Router } from 'react-router-dom';
// import { createMemoryHistory, createBrowserHistory } from 'history';

// const history =
//     typeof window === 'undefined'
//         ? createMemoryHistory({
//               initialEntries: ['/'],
//           })
//         : createBrowserHistory();

const render = (Boot: () => JSX.Element) =>
    hydrate(
        <AppContainer>
            <Boot />
        </AppContainer>,
        document.getElementById('react-view'),
    );

render(App);

if (__DEV__ && module.hot) {
    module.hot.accept('../app', () => {
        const NextApp = require('../app').default;
        render(NextApp);
    });
}
