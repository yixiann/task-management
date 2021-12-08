import React from 'react';
import { connect } from 'react-redux';
import { Route, Routes} from 'react-router-dom';
import { PublicRoutes, PrivateRoutes } from './routes';

const PublicRouteHandling = ({ path, component, route, ...props }) => {
  return (
    <Routes>
      <Route exact path={path} element={component}/>
    </Routes>
  )
};

const PrivateRouteHandling = ({ children, component, ...props }) => {
  return (
    <></>
  )
};

const NotFoundRouteHandling = ({ ...props }) => {
  return (
    <></>
  )
}

const mapStateToProps = state => ({
});


const PublicRouter = connect(mapStateToProps, null)(PublicRouteHandling);
const PrivateRouter = connect(mapStateToProps, null)(PrivateRouteHandling);
const NotFoundRouter = connect(mapStateToProps, null)(NotFoundRouteHandling);

export { PublicRoutes, PublicRouter, PrivateRoutes, PrivateRouter, NotFoundRouter };
