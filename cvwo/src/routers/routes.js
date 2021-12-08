import React from "react"

const PublicRoutes = [
  {
    path: '/overview',
    exact: true,
    component: React.lazy(() => import("../pages/OverviewPage"))
  }
  // {
  //   path: '/task/create',
  //   exact: true,
  //   component: React.lazy(() => import("../pages/task/create")),
  // },
  // {
  //   path: '/task/update',
  //   exact: true,
  //   component: React.lazy(() => import("../pages/task/update")),
  // },
  // {
  //   path: '/task/delete',
  //   exact: true,
  //   component: React.lazy(() => import("../pages/task/delete")),
  // },
];

const PrivateRoutes = [
  // {
  //   path: '/',
  //   exact: true,
  //   component: React.lazy(() => import("../pages/Dashboard"))
  // },
];

export { PublicRoutes, PrivateRoutes };