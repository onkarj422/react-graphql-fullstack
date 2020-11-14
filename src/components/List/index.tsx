import React, { memo } from 'react';

import { User } from '../../services/jsonPlaceholder';
import styles from './styles.module.scss';

interface Props {
    items: User[];
}

export default memo(({ items }: Props) => (
    <div className={styles.UserList}>
        <h4>User List</h4>
        <ul>
            {items.map(({ id, name }) => (
                <li key={id}>{name}</li>
            ))}
        </ul>
    </div>
));
