import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "antd/dist/antd.css";
import "./css/common.css";
import "./css/custom.css";
import { PublicRoutes as publicRoutes } from "./routers";
import { connect } from "react-redux";
import MainLayout from "./layouts/MainLayout";
import Languages from "../src/constants/Languages";

function App({ languageCode, ...props }) {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Router basename="/">
        <MainLayout>
          <Routes>
            {publicRoutes.map((route) => (
              <Route
                path={route.path}
                element={<route.component language={Languages[languageCode]} />}
              />
            ))}
          </Routes>
        </MainLayout>
      </Router>
    </Suspense>
  );
}

const mapStateToProps = (state) => ({
  languageCode: state.app.languageCode,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
