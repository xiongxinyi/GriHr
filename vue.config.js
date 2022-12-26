const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://123.249.26.49:8082',
        ws: true,
        changeOrigin: true
      }
    }
  }
})
