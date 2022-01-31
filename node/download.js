import https from 'https';
import http from 'http';
import fs from 'fs';
import Url from 'url';
import path from 'path';
 
const getLocalFileSize = (filePath) => new Promise((resolve, reject) => {
  fs.access(filePath, (error) => {
    if (!error) {
      fs.stat(filePath, (err, stat) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(stat.size);
      });
    } else {
      resolve(0);
    }
  });
});
 
/**
 *
 * @param {Number} status http status code
 * @returns {Boolean} status code valid
 */
function validateStatus(status) {
  return status >= 200 && status < 300;
}
 
/**
 *
 * download file
 * @param {object} downloadOption - 下载配置
 * @param {string} downloadOption.url - 文件链接
 * @param {string} downloadOption.dir - 文件在本地存放的目录
 * @param {string} downloadOption.fileName - 自定义文件名
 * @param {boolean} downloadOption.force - 无论本地文件是否存在，强制下载
 * @param {function} downloadOption.onBeforeDownload - 如果文件已经存在事件
 * @param {function} downloadOption.onSuccess - 文件下载成功事件
 * @param {function} downloadOption.onProgress - 文件下载进度事件
 * @param {function} downloadOption.onError - 文件下载失败事件
 * @returns {object} <https.ClientRequest>
 *
 */
function download(
  {
    url,
    dir,
    fileName,
    force = false,
    onBeforeDownload = () => {},
    onSuccess = () => {},
    onProgress = () => {},
    onError = () => {},
  } = {},
) {
  if (!url || !dir) {
    onError(new Error('url and dir is required'));
    return;
  }
 
  let chunkSize = 0;
 
  // get distPath
  const {
    pathname, path: urlPath, hostname, port, protocol
  } = Url.parse(url);
  const finalFileName = fileName || pathname.split('/').pop();
  const distPath = path.resolve(dir, finalFileName);
 
  const isHttps = protocol === 'https:';
  const client = isHttps ? https : http;
 
  // https://nodejs.org/docs/latest-v8.x/api/http.html#http_http_request_options_callback
  const reqOption = {
    hostname,
    path: urlPath,
    port,
    protocol,
    timeout: 5000, // timeout 5000ms
  };
 
  const req = client.get(reqOption, async (res) => {
    const { statusCode, headers } = res;
 
    // 状态码不对
    if (!validateStatus(statusCode)) {
      onError(new Error('invalid status code'));
      return;
    }
 
    // 远程文件的大小
    let { 'content-length': remoteFileSize } = headers;
    remoteFileSize = parseInt(remoteFileSize, 10);
 
    // 本地文件大小
    const localFileSize = await getLocalFileSize(distPath)
      .catch(err => console.error(err)); // 不是关键步骤，打印error即可
 
    // 文件是否已经完整存在于本地
    const fileReady = localFileSize === remoteFileSize;
 
    // 下载成功时的，传入回调函数的参数
    const successRes = {
      distPath, // 本地文件路径
      fileName: finalFileName, // 文件名
      fileSize: remoteFileSize, // 文件大小
    };
 
    // 文件已经存在，并且不是强制下载的情况，直接执行成功的回调
    if (fileReady && !force) {
      onSuccess(successRes);
      return;
    }
 
    // 下载前的钩子
    try {
      const shouldDownload = await onBeforeDownload();
      if (shouldDownload === false) { // return false 来阻止下载流程
        req.abort(); // 销毁http request
        return;
      }
    } catch (err) {
      console.error(err); // 不是关键步骤，打印error即可
    }
 
    // 开始下载
    const writeStream = fs.createWriteStream(distPath);
    res.pipe(writeStream);
 
    // write steam finish 代表文件下载完毕
    // https://nodejs.org/docs/latest-v10.x/api/stream.html#stream_event_finish
    writeStream.on('finish', () => {
      onSuccess(successRes);
    });
 
    res.on('data', (chunk) => {
      chunkSize += chunk.length;
      const progress = Math.round((chunkSize / remoteFileSize) * 100);
      onProgress(progress);
    });
 
    // 断点恢复下载
    res.on('readable', () => {
      res.read();
    });
 
    // 下载出错
    res.on('error', (err) => {
      onError(err);
    });
  });
 
  // 请求出错
  req.on('error', (err) => {
    onError(err);
  });
 
  // 请求超时
  req.on('timeout', (err) => {
    onError(err);
  });
 
  return req;
}
 
export default download;
