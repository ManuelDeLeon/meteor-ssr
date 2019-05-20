import React from "react";
import { renderToString } from "react-dom/server";
import { onPageLoad } from "meteor/server-render";
import { StaticRouter } from "react-router";
import { object } from "prop-types";
import { Helmet } from "react-helmet";
import { patchUser, restoreUser } from "./patch_user";
import { getCookies } from "./cookies";
import renderBag from "/client_server/renderBag";
import { routes } from "/client_server/routes";

onPageLoad(sink => {
  const context = {};

  const App = props => (
    <StaticRouter location={props.location} context={context}>
      {routes}
    </StaticRouter>
  );

  App.propTypes = {
    location: object.isRequired
  };
  const clientId =
    (sink.request.headers.cookie && getCookies(sink.request.headers.cookie).clientId) ||
    sink.request.url.query.token;
  renderBag.token = sink.request.url.query.token;
  try {
    patchUser(clientId);
    sink.renderIntoElementById("app", renderToString(<App location={sink.request.url} />));
  } finally {
    restoreUser();
  }

  const helmet = Helmet.renderStatic();
  sink.appendToHead(helmet.meta.toString());
  sink.appendToHead(helmet.title.toString());
});
