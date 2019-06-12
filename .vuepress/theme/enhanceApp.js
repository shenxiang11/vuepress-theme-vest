import routes from './libs/routes';

export default ({ Vue, options, router, siteData }) => {
  const { themeConfig: theme, pages } = siteData;
  console.log(siteData);
  Vue.use(routes, { router, theme });
};
