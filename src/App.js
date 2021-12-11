import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "antd/dist/antd.css";
import "./css/common.css";
import "./css/custom.css";
import {
  PublicRoutes as publicRoutes,
} from "./routers";
import { connect } from "react-redux";
import MainLayout from "./layouts/MainLayout";
import language from "../src/constants/Languages/english";

function App({ ...props }) {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Router>
        <MainLayout>
          <Routes>
            {publicRoutes.map((route) => (
              <Route
                exact
                path={route.path}
                element={<route.component language={language} />}
              />
            ))}
          </Routes>
        </MainLayout>
      </Router>
    </Suspense>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
