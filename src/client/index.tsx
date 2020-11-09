import React from "react";
import ReactDOM from "react-dom";
import { RouteProps } from "react-router-dom";
import { Router } from "react-router";
import { renderRoutes } from "react-router-config";
import { loadableReady } from "@loadable/component";
import { createMemoryHistory, createBrowserHistory } from "history";
import routes from "../routes";

const history =
  typeof window === "undefined"
      ? createMemoryHistory({
          initialEntries: ["/"],
      })
      : createBrowserHistory();

const render = (Routes: RouteProps[]) =>
    ReactDOM.hydrate(
        <Router history={history}>{renderRoutes(Routes)}</Router>,
        document.getElementById("react-view")
    );

// loadable-component setup
loadableReady(() => render(routes));
