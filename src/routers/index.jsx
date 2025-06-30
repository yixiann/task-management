import { connect } from "react-redux";
import { PublicRoutes, PrivateRoutes } from "./routes";

const PublicRouteHandling = ({ path, component, route, ...props }) => {
  return <></>;
};

const PrivateRouteHandling = ({ children, component, ...props }) => {
  return <></>;
};

const mapStateToProps = (state) => ({});

const PublicRouter = connect(mapStateToProps, null)(PublicRouteHandling);
const PrivateRouter = connect(mapStateToProps, null)(PrivateRouteHandling);

export { PublicRoutes, PublicRouter, PrivateRoutes, PrivateRouter };
