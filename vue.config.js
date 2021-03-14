module.exports = {
  // baseUrl: "./",
  // // outputDir: "../WebRoot/",
  assetsDir: "static",
  filenameHashing: false, // 关闭文件哈希值
  productionSourceMap: false, // 取消打包的source map文件
  devServer: {
    proxy: {
      "/api": {
        target: "http://119.3.211.106:80",
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};
