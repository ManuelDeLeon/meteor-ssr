import React from "react";
import { Route } from "react-router-dom";
import { Home } from "../ui/Home/Home";
import { Layout } from "../ui/Layout";
import { Admin } from "../ui/Admin/Admin";

export default (
  <Layout>
    <Route exact path="/" component={Home} />
    <Route exact path="/admin" component={Admin} />
  </Layout>
);
