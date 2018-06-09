import React from "react";
import { renderToString } from "react-dom/server";
import { onPageLoad } from "meteor/server-render";
import { StaticRouter } from "react-router";
import { object } from "prop-types";
import { Helmet } from "react-helmet";
import routes from "../client_server/routes";
import { patchUser } from "./patch_user";
import { getCookies } from "./cookies";

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

  const cookies = getCookies(sink.request.headers.cookie);
  patchUser(cookies.clientId, sink.request.url.query.token);

  sink.renderIntoElementById(
    "app",
    renderToString(<App location={sink.request.url} />)
  );

  const helmet = Helmet.renderStatic();
  sink.appendToHead(helmet.meta.toString());
  sink.appendToHead(helmet.title.toString());
});
