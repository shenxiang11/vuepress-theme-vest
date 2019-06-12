const path = require('path');

module.exports = {
  title: '香饽饽胖覆覆',
  description: '你好骚啊～',
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    lastUpdated: '上次更新',
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@images': path.join(__dirname, '../images'),
      },
    },
  },
};
