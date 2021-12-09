import React from "react"

const PublicRoutes = [
  {
    path: '/overview',
    exact: true,
    component: React.lazy(() => import("../pages/OverviewPage"))
  },
  {
    path: '/task/create',
    exact: true,
    component: React.lazy(() => import("../pages/TaskPages/CreateTaskPage")),
  },
  {
    path: '/task/details',
    exact: true,
    component: React.lazy(() => import("../pages/TaskPages/ViewTaskPage")),
  },
  {
    path: '/task/edit',
    exact: true,
    component: React.lazy(() => import("../pages/TaskPages/EditTaskPage")),
  },
];

const PrivateRoutes = [
  // {
  //   path: '/',
  //   exact: true,
  //   component: React.lazy(() => import("../pages/Dashboard"))
  // },
];

export { PublicRoutes, PrivateRoutes };