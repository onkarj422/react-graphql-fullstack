import React, { memo } from 'react';
import { Helmet } from 'react-helmet';

const Home = (): JSX.Element => (
    <div>
        <Helmet title="Home" />
    </div>
);

export default memo(Home);
