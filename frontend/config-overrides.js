// const { override, fixBabelImports, addLessLoader, adjustStyleLoaders } = require('customize-cra');

// module.exports = override(
//   // Load antd
//   fixBabelImports('import', { ... }),

//   // Add `javascriptEnabled` and antd theme configuration
//   // to the Less loader
//   addLessLoader({ ... }),

//   adjustStyleLoaders(({ use: [, , postcss] }) => {
//     const postcssOptions = postcss.options;
//     postcss.options = { postcssOptions };
//   })
// );