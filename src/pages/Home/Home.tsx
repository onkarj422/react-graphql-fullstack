import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { List } from '../../components';

const Home = (): JSX.Element => {
    const renderList = () => <List items={[]} />;

    return (
        <div>
            <Helmet title="Home" />
            {renderList()}
        </div>
    );
};

export default memo(Home);
