import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./index.css";
// import App from "./App";
import Home from "./Containers/Home";
import Projects from "./Containers/Projects/index";
import Project from "./Containers/Projects/single";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact={true} component={Home} />
      <Route
        path="/projetos"
        render={({ match: { url } }) => (
          <>
            <Route path={`${url}/`} component={Projects} exact />
            <Route path={`${url}/:project`} component={Project} />
          </>
        )}
      />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
