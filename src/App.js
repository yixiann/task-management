import React, { Suspense } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import 'antd/dist/antd.css';
import './css/common.css';
import './css/custom.css';
import { PublicRoutes as publicRoutes, PublicRouter} from './routers';
import { connect } from 'react-redux';
import MainLayout from './layouts/MainLayout';
import language from '../src/constants/Languages/english'

function App({...props}) {

  return (
    <Router>
      <MainLayout>
        <Suspense fallback={<div>{global.loading}...</div>}>
        {
          publicRoutes.map(route => (
            <PublicRouter key={route.path} path={route.path} 
              component={<route.component language={language}/>} 
            />
          ))
        }
        </Suspense>
      </MainLayout>
    </Router>
  )
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(App);