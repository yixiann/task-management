const RoutePaths = {
  overview: {
    path: "/overview",
  },
  task: {
    path: "/task",
    children: {
      create: {
        path: "/task/create",
      },
      update: {
        path: "/task/update",
      },
      details: {
        path: "/task/details",
      },
    },
  },
};

export { RoutePaths };
