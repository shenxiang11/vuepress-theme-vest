const Layout = () => import('../layouts/Layout.vue');

const install = (Vue, { router, theme }) => {
  const routes = [];

  routes.push({
    path: '/',
    component: Layout,
    meta: {
      layout: 'list',
    },
  });

  router.addRoutes(routes);
};

export default { install };
