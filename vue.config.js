const { defineConfig } = require("@vue/cli-service");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    resolve: { extensions: [".ts", ".tsx", ".js", ".json"] },
    plugins: [new NodePolyfillPlugin()],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          exclude: /node_modules/,
          options: {
            appendTsSuffixTo: [/\.vue$/],
          },
        },
      ],
    },
  },
  devServer: {
    proxy: {
      "/api": {
        // target: "http://localhost:9090",
        target: "http://123.249.26.49:8082",
        ws: true,
        // 测试
        changeOrigin: true,
      },
    },
  },
});
