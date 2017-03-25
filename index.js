/**
 * Created by axetroy on 2017/3/25.
 */
const process = require('process');
const through = require('through2');
const gutil = require('gulp-util');
const PluginError = gutil.PluginError;
const CryptoJS = require("crypto-js");

// 常量
const PLUGIN_NAME = 'gulp-crypto-js';

// 插件级别函数 (处理文件)
function gulpCryptoJS(config = {}) {
  let {key, algorithm, action}  = config;
  key = key || process.env.private_key;
  if (!key) {
    throw new PluginError(PLUGIN_NAME, 'Missing encrypt key!');
  }

  if (!CryptoJS[algorithm]) {
    throw new PluginError(PLUGIN_NAME, 'Invalid algorithm!');
  }

  if (!CryptoJS[algorithm][action]) {
    throw new PluginError(PLUGIN_NAME, 'Invalid action about this algorithm!');
  }

  // 创建一个让每个文件通过的 stream 通道
  const stream = through.obj(function (file, enc, cb) {
    if (file.isBuffer()) {
      let fileStr = file.contents.toString();
      const encryptRaw = CryptoJS[algorithm][action](fileStr + '', key);
      file.contents = new Buffer(encryptRaw.toString(action === 'decrypt' ? CryptoJS.enc.Utf8 : void 0));
    }

    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Stream not supported!'));
      return cb();
    }

    // 确保文件进去下一个插件
    this.push(file);
    // 告诉 stream 转换工作完成
    cb();
  });

  // 返回文件 stream
  return stream;
}

// 暴露（export）插件的主函数
module.exports = gulpCryptoJS;