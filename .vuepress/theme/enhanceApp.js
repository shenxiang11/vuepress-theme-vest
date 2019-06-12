import blog from './libs/blog';

export default ({ Vue, options, router, siteData }) => {
  const { themeConfig: theme, pages } = siteData;
  Vue.use(blog, { theme, pages });
};
