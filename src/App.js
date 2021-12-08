import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import 'antd/dist/antd.css';
import './css/common.css';
import './css/custom.css';
import { PublicRoutes as publicRoutes, PublicRouter} from './routers';
import { connect } from 'react-redux';
import MainLayout from './layouts/MainLayout';

function App({...props}) {

  return (
    <Router>
      <MainLayout>
        {
          publicRoutes.map(route => (
            <PublicRouter key={route.path} path={route.path} component={<route.component/>} />
          ))
        }
      </MainLayout>
    </Router>
  )
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(App);