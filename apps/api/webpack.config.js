const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = function (options, webpack) {
  options.plugins = options.plugins.map(plugin => {
    if (plugin.constructor.name === 'ForkTsCheckerWebpackPlugin' || plugin instanceof ForkTsCheckerWebpackPlugin) {
      // Increase memory limit to 8GB (8192 MB)
      plugin.options.memoryLimit = 8192;
    }
    return plugin;
  });
  return options;
};
