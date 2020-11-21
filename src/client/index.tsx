/* eslint-disable react/no-render-return-value */
import React from 'react';
import { hydrate } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from 'app';

const render = (AppRoot: () => JSX.Element) =>
    hydrate(
        <AppContainer>
            <AppRoot />
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
