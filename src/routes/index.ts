import { Home, UserInfo, NotFound } from '../pages';

const routes = [
    {
        path: '/',
        exact: true,
        component: Home, // Add your route here
    },
    {
        path: '/UserInfo/:id',
        component: UserInfo,
    },
    {
        component: NotFound,
    },
];

export default routes;
