import React, { memo } from "react";
import { Helmet } from "react-helmet";
import { List } from "../../components";
import styles from "./styles.module.scss";

const Home = (): JSX.Element => {
    const renderList = () => {
        return <List items={[]} />;
    };

    return (
        <div className={styles.Home}>
            <Helmet title="Home" />
            {renderList()}
        </div>
    );
};

export default memo(Home);
