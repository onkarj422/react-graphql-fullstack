import React, { memo } from "react";
import { Helmet } from "react-helmet";
import styles from "./styles.module.scss";

type Props = {
  match: Record<string, any>;
};

const UserInfo = ({ match }: Props): JSX.Element => {
  const { id } = match.params;

  return (
    <div className={styles.UserInfo}>
      <Helmet title="User Info" />
      {id}
    </div>
  );
};

export default memo(UserInfo);
