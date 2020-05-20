/**
 * vue.config.js
 */

const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  assetsDir: "static", // 打包静态资源目录
  publicPath: "./", // 部署项目的基本URL，默认基于根路径
  outputDir: "dist", //打包文件输出的目录
  productionSourceMap: false, //是否生成map文件
  // 以下是pwa配置
  pwa: {
    // fsbox icon配置
    iconPaths: {
      favicon32: "favicon.ico",
      favicon16: "favicon.ico",
      appleTouchIcon: "favicon.ico",
      maskIcon: "favicon.ico",
      msTileImage: "favicon.ico"
    }
  },
  // webpack相关配置
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...
      config.mode = "production";
      // 代码压缩（需安装uglifyjs-webpack-plugin）
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            //生产环境自动删除console
            compress: {
              drop_debugger: true,
              drop_console: true,
              pure_funcs: ["console.log"]
            }
          },
          sourceMap: false,
          parallel: true //使用多进程并行运行来提高构建速度
        })
      );
    } else {
      // 为开发环境修改配置...
      config.mode = "development";
    }
  },
  // chainWebpack链式调用
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "FS Box";
      return args;
    });
    //添加别名
    config.resolve.alias
      .set("@", path.join(__dirname, "src"))
      .set("@assets", path.join(__dirname, "src/assets"))
      .set("@components", path.join(__dirname, "src/components"))
      .set("@views", path.join(__dirname, "src/views"))
      .set("@service", path.join(__dirname, "src/service"));
    // 压缩图片（需安装image-webpack-loader）
    config.module
      .rule("images")
      .use("image-webpack-loader")
      .loader("image-webpack-loader")
      .options({
        mozjpeg: {
          progressive: true,
          quality: 65
        },
        optipng: {
          enabled: false
        },
        pngquant: {
          quality: [0.65, 0.9],
          speed: 4
        },
        gifsicle: {
          interlaced: false
        },
        webp: {
          quality: 75
        }
      });
  },
  devServer: {
    host: "localhost",
    port: "12345",
    // 配置反向代理
    proxy: {
      "/api": {
        target: "http://54.245.72.232/api/",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
