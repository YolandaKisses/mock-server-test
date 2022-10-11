const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
})
