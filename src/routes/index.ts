import App from "../app";
import { asyncHome, asyncUserInfo, NotFound } from "../pages";

export default [
  {
    component: App,
    routes: [
      {
        path: "/",
        exact: true,
        component: asyncHome, // Add your route here
      },
      {
        path: "/UserInfo/:id",
        component: asyncUserInfo,
      },
      {
        component: NotFound,
      },
    ],
  },
];
